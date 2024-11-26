import { Controller, Get, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('service')
@UseGuards(AuthGuard)

export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  // Crear un nuevo servicio
  @Post('create')
  async create(@Body() data: any) {
    const result = await this.serviceService.create(data);
    return result;
  }

  // Obtener todos los servicios
  @Get('findAll')
  async findAll() {
    const result = await this.serviceService.findAll();
    return result;
  }

  // Obtener un servicio por su ID
  @Post('findById')
  async findById(@Body() data: any) {
    const result = await this.serviceService.findById(data);
    return result;
  }

  // Actualizar un servicio
  @Put('update')
  async update(@Body() data: any) {
    const result = await this.serviceService.update(data);
    return result;
  }

  // Eliminar un servicio
  @Delete('delete')
  async delete(@Body() data: any) {
    const result = await this.serviceService.delete(data);
    return result;
  }
}
