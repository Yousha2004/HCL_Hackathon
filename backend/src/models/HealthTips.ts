import { Schema, model, Document } from 'mongoose';

export interface IHealthTip extends Document {
  tip: string;
  category: string;
}

const HealthTipSchema = new Schema<IHealthTip>({
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

const HealthTip = model<IHealthTip>('HealthTip', HealthTipSchema);
export default HealthTip;