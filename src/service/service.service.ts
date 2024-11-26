import { Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { sequelize } from 'sequelize/db';

@Injectable()
export class ServiceService {
  // Crear un nuevo servicio
  async create(data: any) {
    try {
      const result = await sequelize.query(
        `INSERT INTO Service (name, number_account) VALUES (:name, :number_account)`,
        {
          type: QueryTypes.INSERT,
          replacements: {
            name: data.name,
            number_account: data.number_account,
          },
        }
      );
      return { success: true, id: result[0] };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Obtener todos los servicios
  async findAll() {
    try {
      const result = await sequelize.query(
        `SELECT * FROM Service`,
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

  // Obtener un servicio por su ID
  async findById(data: any) {
    try {
      const result = await sequelize.query(
        `SELECT * FROM Service WHERE idService = :idService`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            idService: data.idService,
          },
        }
      );
      return result.length > 0
        ? result[0]
        : { error: 1, msj: 'Servicio no encontrado' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Actualizar un servicio por su ID
  async update(data: any) {
    try {
      const result = await sequelize.query(
        `UPDATE Service 
         SET name = :name, number_account = :number_account 
         WHERE idService = :idService`,
        {
          type: QueryTypes.UPDATE,
          replacements: {
            name: data.name,
            number_account: data.number_account,
            idService: data.idService,
          },
        }
      );
      return result[1] > 0
        ? { success: true, msj: 'Servicio actualizado correctamente' }
        : { error: 1, msj: 'No se encontró el servicio para actualizar' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

  // Eliminar un servicio por su ID
  async delete(data: any) {
    try {
      const result = await sequelize.query(
        `DELETE FROM Service WHERE idService = :idService`,
        {
          type: QueryTypes.DELETE,
          replacements: {
            idService: data.idService,
          },
        }
      );
      return result[1] > 0
        ? { success: true, msj: 'Servicio eliminado correctamente' }
        : { error: 1, msj: 'No se encontró el servicio para eliminar' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }
}
