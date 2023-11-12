import { Repository } from "../framework/repository";
import * as Models from "../models";

import type { IConversion } from "../models";

export class ConversionRepository extends Repository<IConversion> {
  constructor() {
    super({ model: Models.Conversion });
  }

  public async create(conversion: Partial<IConversion>): Promise<IConversion> {
    return this.createOne(conversion);
  }
}
