import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CryptumService } from '../cryptum/cryptum.service';
import { GetBalanceDto } from './dto/get-balance.dto';
import { TokenTransferDto } from './dto/transfer.dto';
import { TokenCreateDto } from './dto/create.dto';
import { MintDto } from './dto/mint.dto';
import { BurnDto } from './dto/burn.dto';
import { GetInfoQuerystringDto } from './dto/get-info.dto';
import { ApproveDto } from './dto/approve.dto';
import { CreateTrustlineTransactionDto } from 'src/transaction/dto/create-transaction.dto';

@ApiTags('token')
@Controller('token')
export class TokenController {
  constructor(private cryptumService: CryptumService) {}

  @Get('/:tokenAddress/info')
  async getInfo(@Param('tokenAddress') tokenAddress: string, @Query() queryString: GetInfoQuerystringDto) {
    const { protocol, tokenUid } = queryString;
    return await this.cryptumService.getInfo({
      tokenUid,
      tokenAddress,
      protocol,
      name: '',
      symbol: '',
      decimals: '',
    });
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
  @Post('/create')
  async create(@Body() createDto: TokenCreateDto) {
    return await this.cryptumService.create(createDto);
  }
  @Post('/set-trustline')
  async setTrustline(@Body() setTrustlineDto: CreateTrustlineTransactionDto) {
    return this.cryptumService.createTrustlineTransaction(setTrustlineDto);
  }
  @Post('/mint')
  async mint(@Body() mintDto: MintDto) {
    return await this.cryptumService.mint(mintDto);
  }
  @Post('/burn')
  async burn(@Body() burnDto: BurnDto) {
    return await this.cryptumService.burn(burnDto);
  }
  @Post('/approve')
  async approve(@Body() approveDto: ApproveDto) {
    return await this.cryptumService.approve(approveDto);
  }
}
