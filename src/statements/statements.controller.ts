import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { StatementsService } from './statements.service';

@Controller('statements')
export class StatementsController {
  constructor(private statementsService: StatementsService) {}

  @Post()
  async create(
    @Body() body: { text: string; type: 'truth' | 'lie'; owner: string }
  ) {
    return this.statementsService.create(body.text, body.type, body.owner);
  }

  @Get(':ownerId')
  async findByOwner(@Param('ownerId') ownerId: string) {
    return this.statementsService.findByOwner(ownerId);
  }
}
