import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post()
  async create(@Body() body: { code: string }) {
    await this.sessionsService.getSession(body.code);
  }

  @Post('join')
  async join(@Body() body: { code: string; userId: string }) {
    await this.sessionsService.addPlayer(body.code, body.userId);
  }

  @Get(':code')
  async get(@Param('code') code: string) {
    await this.sessionsService.getSession(code);
  }

  @Post(':code/end')
  async end(@Param('code') code: string) {
    return await this.sessionsService.endSession(code);
  }
}
