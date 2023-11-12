import { Schema, model } from "mongoose";

import { PlatformValues } from "../../utils/platform";

import type { IAdminAuthToken } from "./type";


const AdminAuthTokenSchema = new Schema<IAdminAuthToken>(
  {
    platform: { type: String, enum: PlatformValues, required: true },
    userId: { type: String, required: false },
    token: { type: String, required: true },
  },
  { timestamps: true },
);

AdminAuthTokenSchema.index({
  platform: 1,
});

export default model<IAdminAuthToken>("AdminAuthToken", AdminAuthTokenSchema);
