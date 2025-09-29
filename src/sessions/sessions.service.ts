import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, Player } from '../types';

@Injectable()
export class SessionsService {
  constructor(@InjectModel('Session') private sessionModel: Model<Session>) {}

  async getSession(code: string): Promise<Session | null> {
    return this.sessionModel.findOne({ code }).exec();
  }

  async endSession(code: string): Promise<Session | null> {
    console.log(`Ending session with code: ${code}`);
    console.trace();
    const ended = await this.sessionModel.findOne({ code, ended: true }).exec();
    if (ended) {
      console.log(`Session with code: ${code} is already ended.`);
      return ended;
    }
    const session = await this.getSession(code);
    if (!session) throw new BadRequestException('Session not found');

    (session as any).ended = true;
    await session.save();
    return session;
  }

  async addPlayer(sessionCode: string, userId: string): Promise<Session> {
    const session = await this.getSession(sessionCode);
    if (!session) throw new BadRequestException('Session not found');

    // Prevent duplicate players
    if (!session.players.some((p) => p._id.toString() === userId)) {
      session.players.push({
        _id: userId,
        name: '',
        status: 'active',
      } as Player);
    }
    await session.save();
    return session;
  }

  async removePlayer(sessionCode: string, userId: string): Promise<Session> {
    const session = await this.getSession(sessionCode);
    if (!session) throw new BadRequestException('Session not found');

    session.players = session.players.filter(
      (p) => p._id.toString() !== userId
    );
    await session.save();
    return session;
  }
}
