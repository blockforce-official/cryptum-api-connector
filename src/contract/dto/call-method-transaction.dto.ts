import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';
import { Wallet } from 'cryptum-sdk/dist/src/features/wallet/entity';

export class CallMethodTransactionDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  privateKey: string;

  @ApiProperty()
  @IsString()
  from: string;

  @ApiProperty()
  @IsString()
  contractAddress: string;

  @ApiProperty()
  @IsArray()
  contractAbi: Array<any>;

  @ApiProperty()
  @IsString()
  method: string;

  @ApiProperty()
  @IsArray()
  params: any[];

  @ApiProperty()
  value: any;

  @ApiProperty()
  feeCurrency: string;

  @ApiProperty()
  fee: object | string;
}
