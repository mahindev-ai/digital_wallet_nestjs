import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post('register')
  async register(@Body() data: any, @Res() res: Response) {
    const result = await this.accountService.register(data, res);
    res.status(result.success ? 201 : 400).json(result);
  }

  @Post('login')
  async login(@Body() data: any, @Res() res: Response) {
    const result = await this.accountService.login(data, res);
    res.status(result.success ? 200 : 401).json(result);
  }

  // Cierre de sesión
  @Post('logout')
  async logout(@Res() res: Response) {
    const result = await this.accountService.logout(res);
    res.status(200).json(result);
  }

  @Get('search')
  @UseGuards(AuthGuard)
  async searchAccounts(@Query('name') name: string) {
    return await this.accountService.findByName(name);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllAccounts() {
    return await this.accountService.findAll();
  }

  @Get('getAccount')
  @UseGuards(AuthGuard)
  async getAccountById(@Req() req: any, @Res() res: Response) {
    const user = req.user; // Obtén la información del usuario autenticado
    const id = user['idUserAccount'];
    console.log(id);
    try {
      const result = await this.accountService.findById(id);
      return res.status(200).json(result); // Si se encuentra al usuario, devolvemos los datos
    } catch (error) {
      // Si se lanza un error (como 'User not found'), devolvemos 404 Not Found
      return res.status(404).json({ message: error.message || 'User not found' });
    }
  }
}
