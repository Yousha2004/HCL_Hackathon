import { Schema, model, Document, Types } from 'mongoose';


export interface IPatientProfile extends Document {
  user: Types.ObjectId;
  assignedProvider: Types.ObjectId; 
  allergies: string[];
  currentMedications: string[];
}

const PatientProfileSchema = new Schema<IPatientProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    assignedProvider: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    allergies: {
      type: [String],
      default: [],
    },
    currentMedications: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);


PatientProfileSchema.index({ assignedProvider: 1 });

const PatientProfile = model<IPatientProfile>(
  'PatientProfile',
  PatientProfileSchema
);
export default PatientProfile;