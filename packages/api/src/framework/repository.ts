import { ResourceError } from "../errors/resource-error";

import type { ObjectId } from "mongodb";
import type { Model, PipelineStage } from "mongoose";

interface IDocument {
  _id: ObjectId;
}

interface IRepositoryConstructor<T> {
  model: Model<T>;
}

export interface IFindOneOptions {
  projection?: { [key: string]: number };
}

export interface IFindMany<T> {
  total: number;
  pageSize: number;
  currentPage: number;
  data: T[];
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
    opt?: { upsert: boolean },
  ): Promise<T> {
    opt = { upsert: false, ...opt };

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

  protected async updateOneById(id: ObjectId, updates: Partial<T>): Promise<T> {
    const result = await this.findOneAndUpdate({ _id: id }, updates);

    return result;
  }

  protected async deleteOne(query: object): Promise<T | null> {
    const oldDocument = await this.model.findOneAndRemove(query);

    return oldDocument;
  }

  protected async deleteOneById(
    id: ObjectId,
  ): ReturnType<Repository<T>["deleteOne"]> {
    return this.deleteOne({ _id: id });
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

  protected async aggregate(pipeline: PipelineStage[]) {
    return this.model.aggregate(pipeline).exec();
  }

  protected async findMany({
    query = {},
    sort,
    paginationParams,
    projections,
  }: {
    query: PipelineStage.Match["$match"];
    sort?: PipelineStage.Sort["$sort"];
    paginationParams?: { currentPage?: number; limit?: number };
    projections?: Record<string, any>;
  }): Promise<IFindMany<T>> {
    const aggregateSort = sort ?? {};
    const limit = paginationParams?.limit ?? 10;
    const currentPage = paginationParams?.currentPage ?? 1;
    const skip = (currentPage - 1) * limit;
    const data: any = [{ $skip: skip }, { $limit: limit }];

    if (projections) {
      data.push({ $project: projections });
    }

    const result = await this.model.aggregate<{
      data: T[];
      metadata: [{ total?: number }];
    }>([
      { $match: query },
      { $sort: aggregateSort },
      {
        $facet: {
          data,
          metadata: [{ $count: "total" }],
        },
      },
    ]);

    return {
      total: result[0].metadata[0]?.total ?? 0,
      pageSize: limit,
      currentPage,
      data: result[0].data,
    };
  }
}
