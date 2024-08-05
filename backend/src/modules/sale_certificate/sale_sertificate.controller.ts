import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SaleSertificateService } from './sale_sertificate.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('sale-certificate')
@UseGuards(JwtAuthGuard)
export class SaleSertificateController {
  constructor(
    private readonly saleSertificateService: SaleSertificateService
  ) {}

  @Get()
  findAll(@Req() req) {
    return this.saleSertificateService.getUserCertificates(req.user.id);
  }
}
