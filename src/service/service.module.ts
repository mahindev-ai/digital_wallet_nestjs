import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule { }
