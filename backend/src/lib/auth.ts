import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../config/db.js"; // Ensure this exports a MongoClient
import { bearer } from "better-auth/plugins";
import User from "../models/users.js";
import PatientProfile from "../models/patientProfile.js";

const db = client.db(); // Uses the default DB name from your connection string

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: string;
  consent?: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

export const auth = betterAuth({
  plugins: [bearer()],
  database: mongodbAdapter(db),
  
  // You likely need this enabled to actually log people in
  emailAndPassword: {  
    enabled: true 
  },
  
  async register(data: RegisterData) {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) throw new Error("User already exists");

      const newUser = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        role: (data as any).role || "patient",
        consent: (data as any).consent || false,
      });

      if (newUser.role === "patient") {
        await PatientProfile.create({
          user: newUser._id,
        });
      }

      return {
        user: {
          id: newUser._id.toString(),
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
        redirect: "/dashboard",
      };
    },

    async verify(data: LoginData) {
      const user = await User.findOne({ email: data.email }).select(
        "+password"
      );

      if (!user) return false;

      const isMatch = await user.comparePassword(data.password);

      if (isMatch) {
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
      return false;
    },
  // Add social providers here if needed
  // socialProviders: { ... } 
});


