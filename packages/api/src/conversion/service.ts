import type { IConversion } from "../models";
import type { ConversionRepository } from "./repository";

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
