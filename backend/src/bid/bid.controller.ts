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
} from '@nestjs/common';
import { BidService } from './bid.service';
import { CreateBidDto } from './dto/bid.create-dto';
import { UpdateBidDto } from './dto/bid.update-dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
  @Get()
  findForUser(@Req() req) {
    return this.bidService.findUserBids(req.user.id);
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
  update(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
    return this.bidService.update(+id, updateBidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bidService.remove(+id);
  }
}
