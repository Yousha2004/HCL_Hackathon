import { Request, Response } from "express";
import PatientProfile from "../models/patientProfile";
import Goal from "../models/Goal";
import Reminder from "../models/Reminder";
import DailyEntry from "../models/DailyEntry";

const getUserId = (req: Request) => (req as any).user.id;





export const getDoctorDashboard = async (req: Request, res: Response) => {
  try {
    const doctorId = getUserId(req);

    const patients = await PatientProfile.find({ assignedProvider: doctorId })
      .populate("user", "name email")
      .select("user allergies currentMedications");

    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching provider dashboard:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};





export const getPatientDetails = async (req: Request, res: Response) => {
  try {
    const doctorId = getUserId(req);
    const { patientId } = req.params;

    const profile = await PatientProfile.findOne({
      user: patientId,
      assignedProvider: doctorId,
    }).populate("user", "name email");

    if (!profile) {
      return res.status(404).json({ msg: "Patient not found or not assigned to you." });
    }

    const goals = await Goal.find({ user: patientId, isActive: true });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentLogs = await DailyEntry.find({
      user: patientId,
      date: { $gte: sevenDaysAgo },
    }).sort({ date: 1 }); 

    const reminders = await Reminder.find({
      user: patientId,
      isCompleted: false,
    });

    res.status(200).json({
      profile,
      goals,
      recentLogs,
      reminders,
    });
  } catch (error) {
    console.error("Error fetching patient details:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};


export const createPatientGoal = async (req: Request, res: Response) => {
  try {
    const doctorId = getUserId(req);
    const { patientId, goalType, targetValue, frequency } = req.body;


    const profile = await PatientProfile.findOne({
      user: patientId,
      assignedProvider: doctorId,
    });

    if (!profile) {
      return res.status(403).json({ msg: "Not authorized to create goals for this patient." });
    }

    const newGoal = await Goal.create({
      user: patientId,
      createdBy: doctorId,
      goalType,
      targetValue,
      frequency: frequency || "daily",
      isActive: true,
    });

    res.status(201).json(newGoal);
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const createPreventiveReminder = async (req: Request, res: Response) => {
  try {
    const doctorId = getUserId(req);
    const { patientId, title, description, dueDate } = req.body;

    const profile = await PatientProfile.findOne({
      user: patientId,
      assignedProvider: doctorId,
    });

    if (!profile) {
      return res.status(403).json({ msg: "Not authorized for this patient." });
    }

    const newReminder = await Reminder.create({
      user: patientId,
      createdBy: doctorId,
      title,
      description,
      dueDate,
      isCompleted: false,
    });

    res.status(201).json(newReminder);
  } catch (error) {
    console.error("Error creating reminder:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};