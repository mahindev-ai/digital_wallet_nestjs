import { PartialType } from '@nestjs/mapped-types';
import { CreateInterbankTransferDto } from './create-interbank-transfer.dto';

export class UpdateInterbankTransferDto extends PartialType(CreateInterbankTransferDto) {}
