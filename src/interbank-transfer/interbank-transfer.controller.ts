import { Controller, Get, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { InterbankTransferService } from './interbank-transfer.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('interbank-transfer')
@UseGuards(AuthGuard)

export class InterbankTransferController {
  constructor(private readonly interbankTransferService: InterbankTransferService) { }

  // Crear una nueva transferencia interbancaria
  @Post('create')
  async create(@Body() data: any) {
    const result = await this.interbankTransferService.create(data);
    return result;
  }

  // Obtener todas las transferencias interbancarias
  @Get('findAll')
  async findAll() {
    const result = await this.interbankTransferService.findAll();
    return result;
  }

  // Obtener una transferencia interbancaria por su ID
  @Post('findById')
  async findById(@Body() data: any) {
    const result = await this.interbankTransferService.findById(data);
    return result;
  }

  // Actualizar una transferencia interbancaria
  @Put('update')
  async update(@Body() data: any) {
    const result = await this.interbankTransferService.update(data);
    return result;
  }

  // Eliminar una transferencia interbancaria
  @Delete('delete')
  async delete(@Body() data: any) {
    const result = await this.interbankTransferService.delete(data);
    return result;
  }
}
