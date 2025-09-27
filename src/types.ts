// src/types.ts
export interface Player {
  _id: string;
  name: string;
  status: 'active' | 'eliminated';
}

export interface Session {
  code: string;
  players: Player[];
  isActive: boolean;
  round: number;
  save: () => Promise<void>;
}

export interface Statement {
  _id: string;
  owner: string;
  text: string;
  type: 'truth' | 'lie';
}

export interface Guess {
  _id: string;
  voter: string;
  statementId: string;
  guess: 'truth' | 'lie';
}

export interface GameResult {
  statementId: string;
  owner: string;
  actualType: 'truth' | 'lie';
  totalVotes: number;
  correctVotes: number;
  eliminated: string | null;
  reason:
    | '2+ guessed correctly'
    | 'owner_choose_elimination'
    | 'no_elimination';
  session: Session | null;
}

export interface JoinSessionPayload {
  sessionCode: string;
  userId: string;
  username: string;
}

export interface LeaveSessionPayload {
  sessionCode: string;
  userId: string;
  username: string;
}

export interface SubmitStatementPayload {
  sessionCode: string;
  owner: string;
  text: string;
  type: 'truth' | 'lie';
}

export interface CastVotePayload {
  sessionCode: string;
  voter: string;
  statementId: string;
  guess: boolean;
}

export interface ProcessRoundPayload {
  sessionCode: string;
  statementId: string;
}

export interface StartGamePayload {
  sessionCode: string;
}
