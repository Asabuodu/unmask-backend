// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Statement } from './schemas/statement.schema';

// @Injectable()
// export class StatementsService {
//   constructor(
//     @InjectModel(Statement.name) private statementModel: Model<Statement>
//   ) {}

//   async create(text: string, type: 'truth' | 'lie', owner: string) {
//     return this.statementModel.create({ text, type, owner });
//   }

//   async findByOwner(ownerId: string) {
//     return this.statementModel.find({ owner: ownerId }).exec();
//   }

//   async findById(id: string) {
//     return this.statementModel.findById(id).exec();
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Statement } from '../types';

@Injectable()
export class StatementsService {
  constructor(
    @InjectModel('Statement') private statementModel: Model<Statement>
  ) {}

  async create(
    text: string,
    type: 'truth' | 'lie',
    owner: string
  ): Promise<Statement> {
    const stmt = new this.statementModel({ text, type, owner });
    return stmt.save();
  }

  async findById(id: string): Promise<Statement | null> {
    return this.statementModel.findById(id).exec();
  }

  async findByOwner(ownerId: string): Promise<Statement[]> {
    return this.statementModel.find({ owner: ownerId }).exec();
  }
  
}