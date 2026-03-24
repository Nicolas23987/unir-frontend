import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/cliente.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly ClientRepository: Repository<Client>,
  ) {}

  async findByEmail(email: string): Promise<Client | null> {
    return this.ClientRepository.findOne({ where: { email } });
  }

  async create(Client: Partial<Client>) {
    const nuevoClient = this.ClientRepository.create(Client);
    return this.ClientRepository.save(nuevoClient);
  }

    async updateProfile(userId: string, data: Partial<Client>) {
    const user = await this.ClientRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Solo se pueden actualizar si el perfil no está completo
    if (user.profileComplete) {
      throw new Error('El perfil ya está completo y no se puede editar');
    }

    Object.assign(user, {
      name: data.name ?? user.name,
      picture: data.picture ?? user.picture,
      fechaNacimiento: data.fechaNacimiento ?? user.fechaNacimiento,
      isForaneo: data.isForaneo ?? user.isForaneo,
      profileComplete: true,
    });

    await this.ClientRepository.save(user);
    return { message: 'Perfil actualizado correctamente', user };
  }

}
