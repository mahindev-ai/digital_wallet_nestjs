import { Module } from '@nestjs/common';
import { BankTransferService } from './bank-transfer.service';
import { BankTransferController } from './bank-transfer.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule],
  controllers: [BankTransferController],
  providers: [BankTransferService],
})
export class BankTransferModule { }
