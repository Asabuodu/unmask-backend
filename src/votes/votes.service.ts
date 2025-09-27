// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Vote } from './schemas/vote.schema';

// @Injectable()
// export class VotesService {
//   constructor(@InjectModel(Vote.name) private voteModel: Model<Vote>) {}

//   async castVote(voter: string, statement: string, guess: 'truth' | 'lie') {
//     return this.voteModel.create({ voter, statement, guess });
//   }

//   async findByStatement(statementId: string) {
//     return this.voteModel
//       .find({ statement: statementId })
//       .populate('voter')
//       .exec();
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guess } from '../types';

@Injectable()
export class VotesService {
  constructor(@InjectModel('Vote') private voteModel: Model<Guess>) {}

  async castVote(
    voter: string,
    statementId: string,
    guess: 'truth' | 'lie'
  ): Promise<Guess> {
    const vote = new this.voteModel({ voter, statementId, guess });
    return vote.save();
  }

  async findByStatement(statementId: string): Promise<Guess[]> {
    return this.voteModel.find({ statementId }).exec();
  }

  async findByVoter(voter: string): Promise<Guess[]> {
    return this.voteModel.find({ voter }).exec();
  }
}
