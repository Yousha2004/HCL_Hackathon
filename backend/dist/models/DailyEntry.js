import { Schema, model } from 'mongoose';
const DailyEntrySchema = new Schema({
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
// Create and export model
const WellnessEntry = model('WellnessEntry', DailyEntrySchema);
export default WellnessEntry;
