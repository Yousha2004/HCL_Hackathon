import { Schema, model } from 'mongoose';
const ReminderSchema = new Schema({
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
}, {
    timestamps: true,
});
ReminderSchema.index({ user: 1, isCompleted: 1 });
const PreventiveReminder = model('PreventiveReminder', ReminderSchema);
export default PreventiveReminder;
