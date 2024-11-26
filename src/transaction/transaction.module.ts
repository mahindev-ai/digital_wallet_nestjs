import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule { }
