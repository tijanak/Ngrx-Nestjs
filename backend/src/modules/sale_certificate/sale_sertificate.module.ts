import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleCertificate } from './sale_certificate.entity';
import { SaleSertificateController } from './sale_sertificate.controller';
import { SaleSertificateService } from './sale_sertificate.service';

@Module({
  imports: [TypeOrmModule.forFeature([SaleCertificate])],
  controllers: [SaleSertificateController],
  providers: [SaleSertificateService],
  exports: [SaleSertificateService],
})
export class SaleSertificateModule {}
