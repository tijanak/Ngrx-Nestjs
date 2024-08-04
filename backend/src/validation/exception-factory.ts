import { ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export function exceptionFactory(
  validationErrors: ValidationError[]
): BadRequestException {
  const firstError = validationErrors[0];
  const errorMessage = firstError.constraints
    ? Object.values(firstError.constraints).join(', ')
    : 'Nevalidno';

  return new BadRequestException({
    statusCode: 400,
    message: errorMessage,
    error: 'Bad Request',
  });
}
