import { Injectable } from '@nestjs/common';
import { sequelize } from 'sequelize/db';
import { QueryTypes } from 'sequelize';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";

interface UserAccount {
  idUserAccount: number;
  User_idUser: number;
  mobile: string;
  email: string | null;
  password: string;
  state: 'Activa' | 'Inactiva' | 'Suspendida';
  current_balance: number;
}

@Injectable()
export class AccountService {

  constructor(private readonly jwtService: JwtService) { } // Inyecta JwtService

  // Registro de usuario con generación automática del token
  async register(data: any, res: any) {
    const transaction = await sequelize.transaction();

    try {
      // 1. Crear el usuario
      const userResult = await sequelize.query(
        `INSERT INTO User (name, lastname, document_id) VALUES (:name, :lastname, :document_id)`,
        {
          type: QueryTypes.INSERT,
          replacements: {
            name: data.name,
            lastname: data.lastname,
            document_id: data.document_id,
          },
          transaction,
        }
      );

      const userId = userResult[0];

      // 2. Crear la cuenta
      const hashedPassword = await bcryptjs.hash(data.password, 10); // Encriptar la contraseña
      const accountResult = await sequelize.query(
        `INSERT INTO UserAccount (User_idUser, mobile, email, password) VALUES (:User_idUser, :mobile, :email, :password)`,
        {
          type: QueryTypes.INSERT,
          replacements: {
            User_idUser: userId,
            mobile: data.mobile,
            email: data.email,
            password: hashedPassword,
          },
          transaction,
        }
      );

      const accountId = accountResult[0];

      // 3. Generar JWT
      const token = await this.jwtService.signAsync(
        { idUserAccount: accountId, idUser: userId },
      );

      // 4. Guardar el token en cookies
      res.cookie('token', token, { httpOnly: true, secure: false });

      // Confirmar la transacción
      await transaction.commit();
      return { success: true, message: 'Usuario registrado exitosamente', token };
    } catch (error) {
      await transaction.rollback();
      return { error: 1, message: `Error al registrar usuario: ${error.message}` };
    }
  }

  // Inicio de sesión basado en mobile y password
  async login(data: any, res: any) {
    try {
      // 1. Buscar cuenta por mobile
      const accountResult = await sequelize.query<UserAccount>(
        `SELECT * FROM UserAccount WHERE mobile = :mobile`,
        {
          type: QueryTypes.SELECT,
          replacements: { mobile: data.mobile },
        }
      );

      if (accountResult.length === 0) {
        return { error: 1, message: 'Credenciales inválidas' };
      }

      const account = accountResult[0];

      // 2. Verificar contraseña
      const isPasswordValid = await bcryptjs.compare(data.password, account.password);
      if (!isPasswordValid) {
        return { error: 1, message: 'Contraseña incorrecta' };
      }

      // 3. Generar JWT
      const token = await this.jwtService.signAsync(
        { idUserAccount: account.idUserAccount, idUser: account.User_idUser },
      );

      // 4. Guardar token en cookies
      res.cookie('token', token, { httpOnly: true, secure: false });

      return { success: true, message: 'Inicio de sesión exitoso', token };
    } catch (error) {
      return { error: 1, message: `Error al iniciar sesión: ${error.message}` };
    }
  }
  // Cierre de sesión
  async logout(res: any) {
    try {
      res.clearCookie('token');
      return { success: true, message: 'Sesión cerrada exitosamente' };
    } catch (error) {
      return {
        error: 1, message: 'Error al cerrar sesión: ${ error.message }'
      };
    }
  }

  // Obtener todas las cuentas
  async findAll() {
    try {
      const result = await sequelize.query(
        `SELECT * FROM UserAccount`, // Consulta sin filtros
        { type: QueryTypes.SELECT }
      );
      return result;
    } catch (error) {
      return { error: 1, message: `Error al obtener las cuentas: ${error}` };
    }
  }

  // Obtener cuenta por ID
  async findById(id: number) {
    console.log("ID de cuenta:", id);  // Verifica que el valor de 'id' sea correcto
    try {
      const result = await sequelize.query(
        `SELECT * FROM UserAccount WHERE idUserAccount = :id_account`,  // Mantienes :id_account
        {
          type: QueryTypes.SELECT,
          replacements: { id_account: id },  // La clave también debe ser 'id_account'
        }
      );
      if (result.length === 0) { throw new Error('User not found'); }

      return result[0];

    } catch (error) {
      return { error: 1, message: `Error al obtener la cuenta: ${error}` };
    }
  }

  // Buscar cuentas por nombre (u otro atributo)
  async findByName(name: string) {
    try {
      const result = await sequelize.query(
        `SELECT * FROM UserAccount WHERE name = :name`,
        {
          type: QueryTypes.SELECT,
          replacements: { name: `%${name}%` },
        }
      );
      return result;
    } catch (error) {
      return { error: 1, message: `Error al buscar cuentas: ${error}` };
    }
  }
}
