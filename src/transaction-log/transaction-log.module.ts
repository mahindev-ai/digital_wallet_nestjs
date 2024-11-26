import { Module } from '@nestjs/common';
import { TransactionLogService } from './transaction-log.service';
import { TransactionLogController } from './transaction-log.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule],
  controllers: [TransactionLogController],
  providers: [TransactionLogService],
})
export class TransactionLogModule { }
