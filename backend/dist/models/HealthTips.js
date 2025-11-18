import { Schema, model } from 'mongoose';
const HealthTipSchema = new Schema({
    tip: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        default: 'General',
    },
});
const HealthTip = model('HealthTip', HealthTipSchema);
export default HealthTip;
