import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';
import { Wallet } from 'cryptum-sdk/dist/src/features/wallet/entity';

export class TokenTransferDto {
  @IsNotEmpty()
  @IsString()
  protocol: Protocol;

  @ApiProperty()
  token: string;

  @ApiProperty()
  wallet: Wallet;

  @ApiProperty()
  amount: string;

  @ApiProperty()
  destination?: string;
}
