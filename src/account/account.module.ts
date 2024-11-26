import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule, JwtModule.register({
    global: true,
    secret: 'your_jwt_secret_key',  // Usa una clave secreta segura
    signOptions: { expiresIn: '1h' },  // Opciones de expiración del token
  }),],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule { }
