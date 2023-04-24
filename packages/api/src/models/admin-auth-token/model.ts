import { Schema, model } from "mongoose";

import { IAdminAuthToken } from "./type";

import { PlatformValues } from "../../utils/platform";

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
