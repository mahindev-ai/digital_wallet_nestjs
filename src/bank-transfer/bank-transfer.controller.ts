import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BankTransferService } from './bank-transfer.service';
import { CreateBankTransferDto } from './dto/create-bank-transfer.dto';
import { UpdateBankTransferDto } from './dto/update-bank-transfer.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('bank-transfer')
@UseGuards(AuthGuard)
export class BankTransferController {
  constructor(private readonly bankTransferService: BankTransferService) { }

  @Post()
  create(@Body() createBankTransferDto: CreateBankTransferDto) {
    return this.bankTransferService.create(createBankTransferDto);
  }

  @Get()
  findAll() {
    return this.bankTransferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankTransferService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBankTransferDto: UpdateBankTransferDto) {
    return this.bankTransferService.update(+id, updateBankTransferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankTransferService.remove(+id);
  }
}
