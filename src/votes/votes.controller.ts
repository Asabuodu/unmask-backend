import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { VotesService } from './votes.service';

@Controller('votes')
export class VotesController {
  constructor(private votesService: VotesService) {}

  @Post()
  async cast(
    @Body() body: { voter: string; statement: string; guess: 'truth' | 'lie' }
  ) {
    return this.votesService.castVote(body.voter, body.statement, body.guess);
  }

  @Get(':statementId')
  async findByStatement(@Param('statementId') statementId: string) {
    return this.votesService.findByStatement(statementId);
  }
}
