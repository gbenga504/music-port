import type { ObjectId, Model } from "mongoose";

import { ResourceError } from "../errors/resource-error";

interface IDocument {
  _id: ObjectId;
}

interface IRepositoryConstructor<T> {
  model: Model<T>;
}

export interface IFindOneOptions {
  projection?: { [key: string]: number };
}

export class Repository<T extends IDocument> {
  private readonly model: Model<T>;

  constructor({ model }: IRepositoryConstructor<T>) {
    this.model = model;
  }

  protected async createOne(document: Partial<T>): Promise<T> {
    const result = await this.model.create(document);

    return result;
  }

  protected async findOneAndUpdate(
    query: object,
    update: Partial<T>,
    opt: { upsert: boolean } | undefined = { upsert: false },
  ) {
    const result = await this.model.findOneAndUpdate(query, update, {
      new: true,
      ...opt,
    });

    if (result === null) {
      throw new ResourceError({
        resource: this.model.name,
        message: `${this.model.name} returned null`,
      });
    }

    return result;
  }

  protected async findOne(
    query: object,
    options: IFindOneOptions | undefined = {},
  ): Promise<T | null> {
    const result = await this.model
      .findOne(query, options.projection || {}, {
        lean: true,
      })
      .exec();

    return result;
  }

  protected async findOneById(
    id: ObjectId | string,
    options?: IFindOneOptions,
  ): ReturnType<Repository<T>["findOne"]> {
    return this.findOne({ _id: id }, options);
  }
}
