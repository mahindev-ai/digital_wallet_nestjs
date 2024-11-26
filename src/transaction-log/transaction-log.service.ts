import { Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { sequelize } from 'sequelize/db';

@Injectable()
export class TransactionLogService {

  // Obtener todos los logs de transacciones
  async findAll() {
    try {
      const result = await sequelize.query(
        `SELECT * FROM TransactionLog`, // Sin filtros
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

  // Obtener un log específico por ID
  async findById(data: any) {
    try {
      const result = await sequelize.query(
        `SELECT * FROM TransactionLog WHERE idTransactionLog = :id`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            id: data.id,
          },
        }
      );
      return result.length > 0 ? result[0] : { error: 1, msj: 'Log de transacción no encontrado' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Obtener los logs de transacciones por el ID de la cuenta de usuario
  async findByUserAccountId(data: any) {
    try {
      const result = await sequelize.query(
        `SELECT * FROM TransactionLog WHERE UserAccount_idUserAccount = :idUserAccount`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            idUserAccount: data.idUserAccount,
          },
        }
      );
      return result.length > 0 ? result : { error: 1, msj: 'No se encontraron logs para esta cuenta de usuario' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Obtener los logs de transacciones por el tipo de transacción
  async findByTransactionType(data: any) {
    try {
      const result = await sequelize.query(
        `SELECT * FROM TransactionLog WHERE transaction_type = :transaction_type`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            transaction_type: data.transaction_type,
          },
        }
      );
      return result.length > 0 ? result : { error: 1, msj: 'No se encontraron logs para este tipo de transacción' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }
}
