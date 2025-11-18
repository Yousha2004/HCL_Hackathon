import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor';
  consent: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ['patient', 'provider'],
      required: true,
    },
    consent: {
      type: Boolean,
      required: [true, 'Data usage consent is required.'],
      validate: {
        validator: (v: boolean) => v === true,
        message: 'Consent must be given.'
      }
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {

  return bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>('User', UserSchema);

export default User;