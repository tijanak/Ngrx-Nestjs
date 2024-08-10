import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { BidService } from './bid.service';
import { CreateBidDto } from './dto/bid.create-dto';
import { UpdateBidDto } from './dto/bid.update-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnerGuard } from './guards/owner.guard';
import { Bid } from './bid.entity';

@Controller('bid')
@UseGuards(JwtAuthGuard)
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post(':auctionId')
  create(
    @Body() createBidDto: CreateBidDto,
    @Param('auctionId', ParseIntPipe) auctionId,
    @Req() req
  ) {
    return this.bidService.create(createBidDto, req.user, auctionId);
  }
  @Get('all')
  findAll() {
    return this.bidService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(OwnerGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBidDto: UpdateBidDto
  ) {
    return this.bidService.update(id, updateBidDto);
  }

  @Delete(':id')
  @UseGuards(OwnerGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bidService.remove(id);
  }
  @Get('auction/:id')
  async getBidsForAuction(
    @Param('id', ParseIntPipe) auctionId: number
  ): Promise<Bid[]> {
    return this.bidService.findAllBidsForAuction(auctionId);
  }
}
