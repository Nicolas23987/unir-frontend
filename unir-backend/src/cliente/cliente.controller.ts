import { Controller, Post, Body, UseGuards, Put, Req } from '@nestjs/common';
import { ClientService } from './cliente.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly clienteService: ClientService,
    private readonly authService: AuthService
  ) { }

  @Post('registrar')
  create(@Body() body: any) {
    return this.clienteService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-profile')
  async updateProfile(@Req() req, @Body() body) {
    const userId = req.user.sub;
    return this.authService.updateProfile(userId, body);
  }
}
