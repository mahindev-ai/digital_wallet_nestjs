import { Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { sequelize } from 'sequelize/db';

@Injectable()
export class TransactionService {

  // Obtener todas las transacciones
  async findAll() {
    try {
      const result = await sequelize.query(
        `SELECT * FROM Transaction`, // Sin filtros
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

  // Obtener una transacción específica por ID
  async findById(data: any) {
    try {
      const result = await sequelize.query(
        `SELECT * FROM Transaction WHERE idTransaction = :id`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            id: data.id,
          },
        }
      );
      return result.length > 0 ? result[0] : { error: 1, msj: 'Transacción no encontrada' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Crear una nueva transacción
  async create(data: any) {
    try {
      const result = await sequelize.query(
        `INSERT INTO Transaction (idUserAccount, type, amount, location) 
        VALUES (:idUserAccount, :type, :amount, :location)`,
        {
          type: QueryTypes.INSERT,
          replacements: {
            idUserAccount: data.idUserAccount,
            type: data.type,
            amount: data.amount,
            location: data.location,
          },
        }
      );
      return { success: true, id: result[0] };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error al crear la transacción: ${error.message}`,
      };
    }
  }

  // Actualizar una transacción existente
  async update(data: any) {
    try {
      const result = await sequelize.query(
        `UPDATE Transaction 
         SET idUserAccount = :idUserAccount, type = :type, amount = :amount, location = :location
         WHERE idTransaction = :id`,
        {
          type: QueryTypes.UPDATE,
          replacements: {
            idUserAccount: data.idUserAccount,
            type: data.type,
            amount: data.amount,
            location: data.location,
            id: data.id,
          },
        }
      );
      return result[1] > 0
        ? { success: true, msj: 'Transacción actualizada correctamente' }
        : { error: 1, msj: 'No se encontró la transacción para actualizar' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error al actualizar la transacción: ${error.message}`,
      };
    }
  }

  // Eliminar una transacción
  async delete(data: any) {
    try {
      const result = await sequelize.query(
        `DELETE FROM Transaction WHERE idTransaction = :id`,
        {
          type: QueryTypes.DELETE,
          replacements: {
            id: data.id,
          },
        }
      );
      return result[1] > 0
        ? { success: true, msj: 'Transacción eliminada correctamente' }
        : { error: 1, msj: 'No se encontró la transacción para eliminar' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error al eliminar la transacción: ${error.message}`,
      };
    }
  }
}
