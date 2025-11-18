import { Schema, model, Document, Types } from 'mongoose';

export interface IDailyEntry extends Document {
  user: Types.ObjectId; 
  date: Date; 
  steps: number;
  sleepHours: number;
  activeTimeMinutes: number;
  waterIntake: number;
}

const DailyEntrySchema = new Schema<IDailyEntry>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  steps: {
    type: Number,
    default: 0,
    min: 0,
  },
  sleepHours: {
    type: Number,
    default: 0,
    min: 0,
  },
  activeTimeMinutes: {
    type: Number,
    default: 0,
    min: 0,
  },
  waterIntake: {
    type: Number,
    default: 0,
    min: 0,
  },
}, {
  timestamps: true
});
DailyEntrySchema.index({ user: 1, date: 1 }, { unique: true });


const DailyEntry = model<IDailyEntry>('DailyEntry', DailyEntrySchema);
export default DailyEntry;