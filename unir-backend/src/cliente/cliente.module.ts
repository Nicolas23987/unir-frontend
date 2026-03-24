import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Client } from './entities/cliente.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { Review } from 'src/reviews/entities/review.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Client, Review]),forwardRef(() => AuthModule)],
  exports: [TypeOrmModule, ClientService],
  providers: [ClientService],
  controllers: [ClienteController],
})
export class ClienteModule {}
