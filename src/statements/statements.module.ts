import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Statement, StatementSchema } from './schemas/statement.schema';
import { StatementsService } from './statements.service';
import { StatementsController } from './statements.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Statement.name, schema: StatementSchema },
    ]),
  ],
  providers: [StatementsService],
  controllers: [StatementsController],
  exports: [StatementsService],
})
export class StatementsModule {}
