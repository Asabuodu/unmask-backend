import { Injectable, BadRequestException } from '@nestjs/common';
import { SessionsService } from '../sessions/sessions.service';
import { UsersService } from '../users/users.service';
import { StatementsService } from '../statements/statements.service';
import { VotesService } from '../votes/votes.service';
import { Session, Statement, Guess, GameResult } from '../types';

@Injectable()
export class GamesService {
  constructor(
    private sessionsService: SessionsService,
    private usersService: UsersService,
    private statementsService: StatementsService,
    private votesService: VotesService
  ) {}

  /* Session helpers */
  async getSession(code: string): Promise<Session | null> {
    return this.sessionsService.getSession(code);
  }

  async handlePlayerJoin(
    sessionCode: string,
    userId: string
  ): Promise<Session> {
    return this.sessionsService.addPlayer(sessionCode, userId);
  }

  async handlePlayerLeave(
    sessionCode: string,
    userId: string
  ): Promise<Session> {
    const session = await this.sessionsService.getSession(sessionCode);
    if (!session) throw new BadRequestException('Session not found');

    session.players = session.players.filter(
      (p) => p._id.toString() !== userId
    );
    await session.save();
    return session;
  }

  async startGame(sessionCode: string): Promise<Session> {
    const session = await this.sessionsService.getSession(sessionCode);
    if (!session) throw new BadRequestException('Session not found');

    session.isActive = true;
    session.round = 1;
    await session.save();
    return session;
  }

  /* Statement & Vote */
  async createStatement(
    owner: string,
    text: string,
    type: 'truth' | 'lie'
  ): Promise<Statement> {
    return this.statementsService.create(text, type, owner);
  }

  async castVote(
    voter: string,
    statementId: string,
    guess: 'truth' | 'lie'
  ): Promise<Guess> {
    return this.votesService.castVote(voter, statementId, guess);
  }

  async getVoteCounts(
    statementId: string
  ): Promise<{ total: number; counts: Record<'truth' | 'lie', number> }> {
    const votes: Guess[] = await this.votesService.findByStatement(statementId);
    const counts: Record<'truth' | 'lie', number> = { truth: 0, lie: 0 };

    votes.forEach((v) => {
      counts[v.guess] = (counts[v.guess] || 0) + 1;
    });

    return { total: votes.length, counts };
  }

  /* Core elimination logic */
  async processRound(
    sessionCode: string,
    statementId: string
  ): Promise<GameResult> {
    const session = await this.sessionsService.getSession(sessionCode);
    if (!session) throw new BadRequestException('Session not found');

    const statement = await this.statementsService.findById(statementId);
    if (!statement) throw new BadRequestException('Statement not found');

    const votes: Guess[] = await this.votesService.findByStatement(statementId);
    const actualType = statement.type;
    const correctVotes = votes.filter((v) => v.guess === actualType);

    const result: GameResult = {
      statementId,
      owner: statement.owner,
      actualType,
      totalVotes: votes.length,
      correctVotes: correctVotes.length,
      eliminated: null,
      reason: 'no_elimination',
      session: null,
    };

    if (correctVotes.length >= 2) {
      await this.usersService.updateStatus(
        statement.owner.toString(),
        'eliminated'
      );
      result.eliminated = statement.owner;
      result.reason = '2+ guessed correctly';
    } else if (correctVotes.length === 0) {
      result.reason = 'owner_choose_elimination';
    }

    const updatedSession = await this.sessionsService.getSession(sessionCode);
    result.session = updatedSession;
    return result;
  }
}
