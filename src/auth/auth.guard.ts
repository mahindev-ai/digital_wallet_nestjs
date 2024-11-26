import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const path = request.url;  // Obtener la ruta actual

    // Excluir rutas de login y register
    if (path === '/accounts/login' || path === '/accounts/register') {
      return true;
    }

    const token = request.cookies?.['token'];  // Extrae el token de las cookies

    if (!token) {
      throw new UnauthorizedException('No se encontró el token en las cookies');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);  // Verifica el token
      request['user'] = payload; // Adjunta la información del usuario a la solicitud
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
