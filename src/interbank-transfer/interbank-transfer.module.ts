import { Module } from '@nestjs/common';
import { InterbankTransferService } from './interbank-transfer.service';
import { InterbankTransferController } from './interbank-transfer.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule],
  controllers: [InterbankTransferController],
  providers: [InterbankTransferService],
})
export class InterbankTransferModule { }
