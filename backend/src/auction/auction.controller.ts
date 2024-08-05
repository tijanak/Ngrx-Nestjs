import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/auction.create-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnerGuard } from './guards/owner.guard';
import { UpdateAuctionDto } from '@org/models';

@Controller('auction')
@UseGuards(JwtAuthGuard)
export class AuctionController {
  constructor(private service: AuctionService) {}
  @Post()
  async create(@Body() auctionDto: CreateAuctionDto, @Req() req) {
    return await this.service.create(auctionDto, req.user);
  }
  @Get('all')
  async getAll() {
    return await this.service.getAll();
  }
  @Get()
  async getForUser(@Req() req) {
    return await this.service.getForUser(req.user.id);
  }
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.service.get(id, ['owner']);
  }
  @UseGuards(OwnerGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
  @UseGuards(OwnerGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAuctionDto
  ) {
    if (updateDto == null || updateDto == undefined)
      throw new BadRequestException();
    return this.service.update(id, updateDto);
  }
}
