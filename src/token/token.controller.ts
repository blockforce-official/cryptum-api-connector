import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CryptumService } from '../cryptum/cryptum.service';
import { GetBalanceDto } from './dto/get-balance.dto';
import { TokenTransferDto } from './dto/transfer.dto';
import { TokenCreateDto } from './dto/create.dto';
import { MintDto } from './dto/mint.dto';
import { BurnDto } from './dto/burn.dto';
import { GetInfoDto } from './dto/get-info.dto';

@ApiTags('token')
@Controller('token')
export class TokenController {
  constructor(private cryptumService: CryptumService) {}

  @Get('/:tokenAddress/info')
  async getInfo(@Param('tokenAddress') tokenAddress: string, @Query() queryString: GetInfoDto) {
    const { protocol, tokenUid } = queryString;
    return await this.cryptumService.getInfo({ tokenUid, tokenAddress, protocol });
  }

  @Get('/:tokenAddress/balance/:address')
  async getBalance(
    @Param('tokenAddress') tokenAddress: string,
    @Param('address') address: string,
    @Query() getBalanceDto: GetBalanceDto,
  ) {
    const { protocol, tokenUid } = getBalanceDto;
    return await this.cryptumService.getBalance({ tokenUid, tokenAddress, address, protocol });
  }

  @Post('/transfer')
  async transfer(@Body() transferDto: TokenTransferDto) {
    return await this.cryptumService.transfer(transferDto);
  }

  @Post('create')
  async create(@Body() tokenCreateDto: TokenCreateDto) {
    return await this.cryptumService.create(tokenCreateDto);
  }

  // @Post()
  // async mint(@Body() mintDto: MintDto) {
  //   return await this.cryptumService.mint(mintDto);
  // }
  // @Post()
  // async burn(@Body() burnDto: BurnDto) {
  //   return await this.cryptumService.burn(burnDto);
  // }
}
