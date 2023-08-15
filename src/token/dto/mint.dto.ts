import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';
import { Wallet } from 'cryptum-sdk/dist/src/features/wallet/entity';

export class MintDto {
  @ApiProperty()
  protocol: Protocol;

  @ApiProperty()
  wallet: Wallet;
  token: string;
  amount: string;
  fee: any;
}
