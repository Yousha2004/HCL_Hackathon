import { Request, Response } from "express";
import PatientProfile from "../models/patientProfile";
import Goal from "../models/Goal";
import DailyEntry from "../models/DailyEntry";
import PreventiveReminder from "../models/Reminder";


const getUserId = (req: Request) => (req as any).user.id;

/**
 * @desc    Get full dashboard data for the logged-in patient
 * @route   GET /api/patient/dashboard
 * @access  Private (Patient only)
 */
export const getPatientDashboard = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [activeGoals, todayEntry, reminders] = await Promise.all([

      Goal.find({ user: userId, isActive: true }),

   
      DailyEntry.findOne({ user: userId, date: today }),

      PreventiveReminder.find({ user: userId, isCompleted: false })
        .sort({ dueDate: 1 }),
    ]);

    res.status(200).json({
      goals: activeGoals,
      todayLog: todayEntry || null, 
      reminders,
    });
  } catch (error) {
    console.error("Error fetching patient dashboard:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

/**
 * @desc    Get the patient's own profile
 * @route   GET /api/patient/profile
 * @access  Private (Patient only)
 */
export const getPatientProfile = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);


    const profile = await PatientProfile.findOne({ user: userId })
      .populate("user", "name email")
      .populate("assignedProvider", "name email");

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching patient profile:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

/**
 * @desc    Update the patient's own profile (e.g., allergies, medications)
 * @route   PUT /api/patient/profile
 * @access  Private (Patient only)
 */
export const updatePatientProfile = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { allergies, currentMedications } = req.body;

    const updatedProfile = await PatientProfile.findOneAndUpdate(
      { user: userId },
      { 
        $set: { 
          allergies: allergies || [], 
          currentMedications: currentMedications || [] 
        } 
      },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

/**
 * @desc    Log a daily wellness entry (Steps, Water, etc.)
 * @route   POST /api/patient/log
 * @access  Private (Patient only)
 */
export const logDailyEntry = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { steps, sleepHours, activeTimeMinutes, waterIntake } = req.body;


    const today = new Date();
    today.setHours(0, 0, 0, 0);


    const entry = await DailyEntry.findOneAndUpdate(
      { user: userId, date: today },
      {
        $set: {
          steps,
          sleepHours,
          activeTimeMinutes,
          waterIntake,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(entry);
  } catch (error) {
    console.error("Error logging daily entry:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

/**
 * @desc    Mark a preventive reminder as complete
 * @route   PUT /api/patient/reminders/:id/complete
 * @access  Private (Patient only)
 */
export const completeReminder = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const reminderId = req.params.id;

    const reminder = await PreventiveReminder.findOneAndUpdate(
      { _id: reminderId, user: userId },
      { $set: { isCompleted: true } },
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({ msg: "Reminder not found or unauthorized" });
    }

    res.status(200).json(reminder);
  } catch (error) {
    console.error("Error completing reminder:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};