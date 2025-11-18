import { Schema, model, Document, Types } from 'mongoose';


export interface IReminder extends Document {
  user: Types.ObjectId;
  title: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean; 
  createdBy: Types.ObjectId; 
}

const ReminderSchema = new Schema<IReminder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ReminderSchema.index({ user: 1, isCompleted: 1 });

const PreventiveReminder = model<IReminder>(
  'PreventiveReminder',
  ReminderSchema
);
export default PreventiveReminder;