import { IFindOneOptions, Repository } from "../framework/repository";

import * as Models from "../models";

import type { IAdminAuthToken } from "../models";
import type { Platform } from "../utils/platform";

export class AdminAuthTokenRepository extends Repository<IAdminAuthToken> {
  constructor() {
    super({ model: Models.AdminAuthToken });
  }

  public async create(
    adminAuthToken: Partial<Omit<IAdminAuthToken, "platform">> & {
      platform: Platform;
    },
  ): Promise<IAdminAuthToken> {
    return this.findOneAndUpdate(
      { platform: adminAuthToken.platform },
      adminAuthToken,
      { upsert: true },
    );
  }

  public async findOneByPlatform(
    platform: string,
    options?: IFindOneOptions,
  ): Promise<IAdminAuthToken | null> {
    return this.findOne({ platform }, options);
  }
}
