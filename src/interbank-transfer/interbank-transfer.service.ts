import { Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { sequelize } from 'sequelize/db';

@Injectable()
export class InterbankTransferService {
  // Crear una nueva transferencia interbancaria
  async create(data: any) {
    try {
      const result = await sequelize.query(
        `INSERT INTO InterbankTransfer (
          idUserAccount_origin, document_id_destination, name, bank_name, amount, description
        ) VALUES (
          :idUserAccount_origin, :document_id_destination, :name, :bank_name, :amount, :description
        )`,
        {
          type: QueryTypes.INSERT,
          replacements: {
            idUserAccount_origin: data.idUserAccount_origin,
            document_id_destination: data.document_id_destination,
            name: data.name,
            bank_name: data.bank_name,
            amount: data.amount ?? null,
            description: data.description ?? null,
          },
        }
      );
      return { success: true, id: result[0] };
    } catch (error) {
      return {
        error: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Obtener todas las transferencias interbancarias
  async findAll() {
    try {
      const result = await sequelize.query(
        `SELECT * FROM InterbankTransfer`,
        {
          type: QueryTypes.SELECT,
        }
      );
      return result;
    } catch (error) {
      return {
        error: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Obtener una transferencia interbancaria por su ID
  async findById(data: any) {
    try {
      const result = await sequelize.query(
        `SELECT * FROM InterbankTransfer WHERE idInterbankTransfer = :idInterbankTransfer`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            idInterbankTransfer: data.idInterbankTransfer,
          },
        }
      );
      return result.length > 0
        ? result[0]
        : { error: 1, msj: 'Transferencia no encontrada' };
    } catch (error) {
      return {
        error: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Actualizar una transferencia interbancaria
  async update(data: any) {
    try {
      const result = await sequelize.query(
        `UPDATE InterbankTransfer 
         SET 
           idUserAccount_origin = :idUserAccount_origin,
           document_id_destination = :document_id_destination,
           name = :name,
           bank_name = :bank_name,
           amount = :amount,
           description = :description
         WHERE idInterbankTransfer = :idInterbankTransfer`,
        {
          type: QueryTypes.UPDATE,
          replacements: {
            idInterbankTransfer: data.idInterbankTransfer,
            idUserAccount_origin: data.idUserAccount_origin,
            document_id_destination: data.document_id_destination,
            name: data.name,
            bank_name: data.bank_name,
            amount: data.amount ?? null,
            description: data.description ?? null,
          },
        }
      );
      return result[1] > 0
        ? { success: true, msj: 'Transferencia actualizada correctamente' }
        : { error: 1, msj: 'No se encontró la transferencia para actualizar' };
    } catch (error) {
      return {
        error: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Eliminar una transferencia interbancaria
  async delete(data: any) {
    try {
      const result = await sequelize.query(
        `DELETE FROM InterbankTransfer WHERE idInterbankTransfer = :idInterbankTransfer`,
        {
          type: QueryTypes.DELETE,
          replacements: {
            idInterbankTransfer: data.idInterbankTransfer,
          },
        }
      );
      return result[1] > 0
        ? { success: true, msj: 'Transferencia eliminada correctamente' }
        : { error: 1, msj: 'No se encontró la transferencia para eliminar' };
    } catch (error) {
      return {
        error: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }
}
