import { Injectable } from '@nestjs/common';
import { CreateBankTransferDto } from './dto/create-bank-transfer.dto';
import { UpdateBankTransferDto } from './dto/update-bank-transfer.dto';

@Injectable()
export class BankTransferService {
  create(createBankTransferDto: CreateBankTransferDto) {
    return 'This action adds a new bankTransfer';
  }

  findAll() {
    return `This action returns all bankTransfer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bankTransfer`;
  }

  update(id: number, updateBankTransferDto: UpdateBankTransferDto) {
    return `This action updates a #${id} bankTransfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankTransfer`;
  }
}
