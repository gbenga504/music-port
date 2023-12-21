import { ResourceError } from "../errors/resource-error";

import type { AdminAuthTokenRepository } from "./repository";
import type { IAdminAuthToken } from "../models";
import type { PlatformType } from "../utils/platform";

interface IConstructorOptions {
  adminAuthTokenRepository: AdminAuthTokenRepository;
}

export class AdminAuthTokenService {
  private adminAuthTokenRepository: AdminAuthTokenRepository;

  constructor({ adminAuthTokenRepository }: IConstructorOptions) {
    this.adminAuthTokenRepository = adminAuthTokenRepository;
  }

  async createToken({
    token,
    platform,
    userId,
  }: {
    token: string;
    platform: PlatformType;
    userId?: string;
  }): Promise<IAdminAuthToken> {
    const adminAuthToken = {
      token,
      platform,
      userId,
    };

    return this.adminAuthTokenRepository.create(adminAuthToken);
  }

  async getTokenByPlatform({
    platform,
  }: {
    platform: PlatformType;
  }): Promise<IAdminAuthToken> {
    const token = await this.adminAuthTokenRepository.findOneByPlatform(
      platform,
    );

    if (token === null) {
      throw new ResourceError({
        resource: "adminAuthToken",
        message: "Couldn't retrieve credentials for this app",
      });
    }

    return token;
  }
}
