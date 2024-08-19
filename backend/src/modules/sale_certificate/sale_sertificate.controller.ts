import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SaleSertificateService } from './sale_sertificate.service';

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
