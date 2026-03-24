import { Controller, Post, Body, UnauthorizedException, Put, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateProfileDto } from 'src/cliente/dto/update-cliente.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() body: { cedula: string; contraseña: string }) {
    const user = await this.authService.validateUser(body.cedula, body.contraseña);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    return this.authService.login(user);
  }

 @Post('google')
  async loginWithGoogle(@Body('credential') credential: string) {
    console.log(credential)
    return this.authService.loginWithGoogle(credential);
  } 

  @Get('/')
  async message(){
    console.log('no se xD')
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard) // Solo usuarios autenticados
  async updateProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    const userId = req.user.sub; // Id del usuario extraído del JWT
    return this.authService.updateProfile(userId, dto);
  }

}
