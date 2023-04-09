import type { IAdminAuthToken } from "../models";
import type { Platform } from "../utils/platform";
import type { AdminAuthTokenRepository } from "./repository";

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
    platform: Platform;
    userId?: string;
  }): Promise<IAdminAuthToken> {
    const adminAuthToken = {
      token,
      platform,
      userId,
    };

    return this.adminAuthTokenRepository.create(adminAuthToken);
  }

  async getByPlatform({
    platform,
  }: {
    platform: Platform;
  }): Promise<IAdminAuthToken | null> {
    return this.adminAuthTokenRepository.findOneByPlatform(platform);
  }
}
