import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';
import { Wallet } from 'cryptum-sdk/dist/src/features/wallet/entity';

export class TokenCreateDto {
  @ApiProperty()
  protocol: Protocol;

  @ApiProperty()
  wallet: Wallet;
  symbol: string;
  name: string;
  amount: string;
  fee: any;
}
