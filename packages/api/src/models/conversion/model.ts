import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";

import { IConversion } from "./type";

import { PlatformValues } from "../../utils/platform";

const ConversionSchema = new Schema<IConversion>(
  {
    importLink: { type: String, required: true },
    exportLink: { type: String, required: true },
    toPlatform: { type: String, enum: PlatformValues, required: true },
    playlistId: { type: ObjectId },
  },
  { timestamps: true },
);

ConversionSchema.index({
  importLink: 1,
  exportLink: 1,
  playlistId: 1,
});

export default model<IConversion>("Conversion", ConversionSchema);
