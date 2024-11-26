import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  // Obtener todas las transacciones
  @Get()
  async getAllTransactions() {
    return await this.transactionService.findAll();
  }

  // Obtener una transacción específica por ID
  @Get(':id')
  async getTransactionById(@Param('id') id: number) {
    return await this.transactionService.findById({ id });
  }

  // Crear una nueva transacción
  @Post()
  async createTransaction(@Body() data: any) {
    return await this.transactionService.create(data);
  }

  // Actualizar una transacción existente
  @Put(':id')
  async updateTransaction(@Param('id') id: number, @Body() data: any) {
    return await this.transactionService.update({ ...data, id });
  }

  // Eliminar una transacción
  @Delete(':id')
  async deleteTransaction(@Param('id') id: number) {
    return await this.transactionService.delete({ id });
  }
}
