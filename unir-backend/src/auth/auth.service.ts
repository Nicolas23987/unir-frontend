import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { jwtDecode } from 'jwt-decode';
import { ClientService } from 'src/cliente/cliente.service';
import { UpdateProfileDto } from 'src/cliente/dto/update-cliente.dto';
import { Client } from 'src/cliente/entities/cliente.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
    private readonly clienteService: ClientService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(cedula: string, pass: string) {
    const user = await this.clienteService.findByEmail(cedula);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id_cliente, nombre: user.nombre };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Login o registro usando Google JWT
  async loginWithGoogle(credential: string) {
    const payload: any = jwtDecode(credential);
    console.log(credential)

    // Buscar usuario por email
    let user = await this.clientRepo.findOne({ where: { email: payload.email } });

    if (!user) {
      // Crear nuevo usuario
      user = this.clientRepo.create({
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        isForaneo: false,
        profileComplete: false,
        fechaNacimiento: null,
      });
      await this.clientRepo.save(user);
    }

    // Generar JWT propio de tu app
    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    return { user, token };
  }

  // Obtener usuario por id
  async getUserById(id: string) {
    return this.clientRepo.findOne({ where: { id } });
  }

    async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.clientRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    Object.assign(user, dto);
    return this.clientRepo.save(user);
  }


}
