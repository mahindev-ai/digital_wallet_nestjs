import { Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { sequelize } from 'sequelize/db';


@Injectable()
export class UserService {
  async create(data: any) {
    try {
      const result = await sequelize.query(
        `INSERT INTO User (name, lastname, document_id) VALUES (:name, :lastname, :document_id)`,
        {
          type: QueryTypes.INSERT,
          replacements: {
            name: data.name,
            lastname: data.lastname,
            document_id: data.document_id,
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


  async findAll() {
    try {
      const result = await sequelize.query(
        `SELECT * FROM User`, // Sin filtros
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


  async findById(data: any) {
    try {
      const result = await sequelize.query(
        `SELECT * FROM User WHERE idUser = :id_usuario`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            id_usuario: data.id_usuario,
          },
        }
      );
      return result.length > 0 ? result[0] : { error: 1, msj: 'Usuario no encontrado' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }


  async update(data: any) {
    try {
      const result = await sequelize.query(
        `UPDATE User 
         SET name = :name, lastname = :lastname 
         WHERE idUser = :id_usuario`,
        {
          type: QueryTypes.UPDATE,
          replacements: {
            name: data.name,
            lastname: data.lastname,
            id_usuario: data.id_usuario,
          },
        }
      );
      return result[1] > 0
        ? { success: true, msj: 'Usuario actualizado correctamente' }
        : { error: 1, msj: 'No se encontró el usuario para actualizar' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }


  async delete(data: any) {
    try {
      const result = await sequelize.query(
        `DELETE FROM User WHERE idUser = :id_usuario`,
        {
          type: QueryTypes.DELETE,
          replacements: {
            id_usuario: data.id_usuario,
          },
        }
      );
      return result[1] > 0
        ? { success: true, msj: 'Usuario eliminado correctamente' }
        : { error: 1, msj: 'No se encontró el usuario para eliminar' };
    } catch (error) {
      return {
        error: 1,
        result: 1,
        msj: `Error del lado del servidor: ${error.message}`,
      };
    }
  }

}
