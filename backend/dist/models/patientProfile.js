import { Schema, model } from 'mongoose';
const PatientProfileSchema = new Schema({
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
}, {
    timestamps: true,
});
PatientProfileSchema.index({ assignedProvider: 1 });
const PatientProfile = model('PatientProfile', PatientProfileSchema);
export default PatientProfile;
