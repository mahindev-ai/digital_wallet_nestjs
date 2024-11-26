import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ServicePaymentService } from './service-payment.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('service-payment')
@UseGuards(AuthGuard)

export class ServicePaymentController {
  constructor(private readonly servicePaymentService: ServicePaymentService) { }

  // Crear un nuevo pago de servicio
  @Post()
  async create(@Body() data: any) {
    const result = await this.servicePaymentService.create(data);
    return result;
  }

  // Obtener todos los pagos de servicio
  @Get()
  async findAll() {
    const result = await this.servicePaymentService.findAll();
    return result;
  }

  // Obtener un pago de servicio por ID
  @Get(':idServicePayment/:Service_idService')
  async findById(
    @Param('idServicePayment') idServicePayment: number,
    @Param('Service_idService') Service_idService: number
  ) {
    const result = await this.servicePaymentService.findById({
      idServicePayment,
      Service_idService,
    });
    return result;
  }

  // Obtener pagos de servicio por número de factura
  @Get('invoice/:invoice_number')
  async findByInvoiceNumber(@Param('invoice_number') invoice_number: string) {
    const result = await this.servicePaymentService.findByInvoiceNumber({
      invoice_number,
    });
    return result;
  }

  // Obtener pagos de servicio por cuenta de usuario
  @Get('user/:idUserAccount_origin')
  async findByUserAccountId(@Param('idUserAccount_origin') idUserAccount_origin: number) {
    const result = await this.servicePaymentService.findByUserAccountId({
      idUserAccount_origin,
    });
    return result;
  }

  // Obtener pagos de servicio por ID de servicio
  @Get('service/:Service_idService')
  async findByServiceId(@Param('Service_idService') Service_idService: number) {
    const result = await this.servicePaymentService.findByServiceId({
      Service_idService,
    });
    return result;
  }
}
