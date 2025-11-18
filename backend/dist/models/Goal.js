import { Schema, model } from 'mongoose';
const GoalSchema = new Schema({
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
const WellnessGoal = model('WellnessGoal', GoalSchema);
export default WellnessGoal;
