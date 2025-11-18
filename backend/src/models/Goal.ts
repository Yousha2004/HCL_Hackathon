import { Schema, model, Document, Types } from 'mongoose';

export interface IGoal extends Document {
  user: Types.ObjectId; 
  createdBy: Types.ObjectId; 
  goalType: 'steps' | 'sleepHours' | 'activeTimeMinutes' | 'waterIntake';
  targetValue: number;
  frequency: 'daily';
  isActive: boolean;
  createdAt: Date;
}
const GoalSchema = new Schema<IGoal>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  goalType: {
    type: String,
    enum: ['steps', 'sleepHours', 'activeTimeMinutes', 'waterIntake'],
    required: true,
  },
  targetValue: {
    type: Number,
    required: true,
    min: 1,
  },
  frequency: {
    type: String,
    enum: ['daily'],
    default: 'daily',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: { createdAt: true, updatedAt: false } 
});

GoalSchema.index({ user: 1, isActive: 1 });
const Goal = model<IGoal>('Goal', GoalSchema);
export default Goal;