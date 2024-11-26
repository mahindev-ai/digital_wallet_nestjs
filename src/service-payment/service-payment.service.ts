import { Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { sequelize } from 'sequelize/db';

@Injectable()
export class ServicePaymentService {

  // Crear un nuevo pago de servicio
  async create(data: any) {
    try {
      const result = await sequelize.query(
        `INSERT INTO ServicePayment (amount, invoice_number, idUserAccount_origin, Service_idService) 
        VALUES (:amount, :invoice_number, :idUserAccount_origin, :Service_idService)`,
        {
          type: QueryTypes.INSERT,
          replacements: {
            amount: data.amount,
            invoice_number: data.invoice_number,
            idUserAccount_origin: data.idUserAccount_origin,
            Service_idService: data.Service_idService,
          },
        }
      );
      return { success: true, idServicePayment: result[0] };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Obtener todos los pagos de servicio
  async findAll() {
    try {
      const result = await sequelize.query(
        `SELECT * FROM ServicePayment`, // Sin filtros
        {
          type: QueryTypes.SELECT,
        }
      );
      return result;
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Obtener un pago de servicio por ID
  async findById(data: any) {
    try {
      const result = await sequelize.query(
        `SELECT * FROM ServicePayment WHERE idServicePayment = :idServicePayment AND Service_idService = :Service_idService`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            idServicePayment: data.idServicePayment,
            Service_idService: data.Service_idService,
          },
        }
      );
      return result.length > 0 ? result[0] : { error: 1, msj: 'Pago de servicio no encontrado' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Obtener los pagos de servicio por número de factura
  async findByInvoiceNumber(data: any) {
    try {
      const result = await sequelize.query(
        `SELECT * FROM ServicePayment WHERE invoice_number = :invoice_number`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            invoice_number: data.invoice_number,
          },
        }
      );
      return result.length > 0 ? result : { error: 1, msj: 'Pago de servicio no encontrado con ese número de factura' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Obtener pagos de servicio por cuenta de usuario
  async findByUserAccountId(data: any) {
    try {
      const result = await sequelize.query(
        `SELECT * FROM ServicePayment WHERE idUserAccount_origin = :idUserAccount_origin`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            idUserAccount_origin: data.idUserAccount_origin,
          },
        }
      );
      return result.length > 0 ? result : { error: 1, msj: 'No se encontraron pagos para esta cuenta de usuario' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Obtener pagos de servicio por ID de servicio
  async findByServiceId(data: any) {
    try {
      const result = await sequelize.query(
        `SELECT * FROM ServicePayment WHERE Service_idService = :Service_idService`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            Service_idService: data.Service_idService,
          },
        }
      );
      return result.length > 0 ? result : { error: 1, msj: 'No se encontraron pagos para este servicio' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }
}
