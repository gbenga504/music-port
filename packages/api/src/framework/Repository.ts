import type { ObjectId, Model } from "mongoose";

interface IDocument {
  _id: ObjectId;
}

interface IRepositoryConstructor {
  model: Model<any>;
}

export class Repository<T extends IDocument> {
  private readonly model: Model<any>;

  constructor({ model }: IRepositoryConstructor) {
    this.model = model;
  }
}
