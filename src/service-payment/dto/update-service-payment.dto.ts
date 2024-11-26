import { PartialType } from '@nestjs/mapped-types';
import { CreateServicePaymentDto } from './create-service-payment.dto';

export class UpdateServicePaymentDto extends PartialType(CreateServicePaymentDto) {}
