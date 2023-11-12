import type { ConversionRepository } from "./repository";
import type { IConversion } from "../models";

interface IConstructorOptions {
  conversionRepository: ConversionRepository;
}

export class ConversionService {
  private conversionRepository: ConversionRepository;

  constructor({ conversionRepository }: IConstructorOptions) {
    this.conversionRepository = conversionRepository;
  }

  async createConversion(
    conversion: Partial<IConversion>,
  ): Promise<IConversion> {
    return this.conversionRepository.create(conversion);
  }
}
