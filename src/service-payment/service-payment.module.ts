import { Module } from '@nestjs/common';
import { ServicePaymentService } from './service-payment.service';
import { ServicePaymentController } from './service-payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule],
  controllers: [ServicePaymentController],
  providers: [ServicePaymentService],
})
export class ServicePaymentModule { }
