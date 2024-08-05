import { Module } from '@nestjs/common';
import { SaleSertificateService } from './sale_sertificate.service';
import { SaleSertificateController } from './sale_sertificate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleCertificate } from './sale_certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleCertificate])],
  controllers: [SaleSertificateController],
  providers: [SaleSertificateService],
  exports: [SaleSertificateService],
})
export class SaleSertificateModule {}
