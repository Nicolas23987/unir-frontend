import { 
  Logger, 
  BadRequestException, 
  ConflictException, 
  NotFoundException, 
  InternalServerErrorException 
} from '@nestjs/common';

export function handleServiceError(
  error: any,
  logger: Logger,
  customMessage: string
): never {
  // Si ya es un error conocido, lo re-lanzamos tal cual
  if (
    error instanceof NotFoundException ||
    error instanceof ConflictException ||
    error instanceof BadRequestException
  ) {
    throw error;
  }

  // Log del error completo para depuración
  logger.error(`${customMessage}: ${error.message}`, error.stack);

  // Lanzamos un error genérico al cliente
  throw new InternalServerErrorException(customMessage);
}
