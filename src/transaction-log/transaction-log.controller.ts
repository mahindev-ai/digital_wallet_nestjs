import { Controller, Get, Param } from '@nestjs/common';
import { TransactionLogService } from './transaction-log.service';

@Controller('transaction-logs')
export class TransactionLogController {
  constructor(private readonly transactionLogService: TransactionLogService) { }

  // Obtener todos los logs de transacciones
  @Get()
  async getAllTransactionLogs() {
    return await this.transactionLogService.findAll();
  }

  // Obtener un log específico por ID
  @Get(':id')
  async getTransactionLogById(@Param('id') id: number) {
    return await this.transactionLogService.findById({ id });
  }

  // Obtener los logs de transacciones por el ID de la cuenta de usuario
  @Get('user/:idUserAccount')
  async getLogsByUserAccountId(@Param('idUserAccount') idUserAccount: number) {
    return await this.transactionLogService.findByUserAccountId({ idUserAccount });
  }

  // Obtener los logs de transacciones por tipo de transacción
  @Get('type/:transaction_type')
  async getLogsByTransactionType(@Param('transaction_type') transaction_type: string) {
    return await this.transactionLogService.findByTransactionType({ transaction_type });
  }
}
