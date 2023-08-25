import { IsArray, IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';
import { Wallet } from 'cryptum-sdk/dist/src/features/wallet/entity';
import { CardanoOutput, Output } from 'cryptum-sdk/dist/src/features/transaction/entity';
import { CreateTransactionDto } from "../../transaction/dto/create-transaction.dto";


export class TokenTransferDto extends CreateTransactionDto  {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  privateKey: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  destination?: string;

  @ApiProperty()
  @IsString()
  amount: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  destinations?: (Output | CardanoOutput)[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  issuer?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  createAccount?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  feeCurrency?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  ffee: object | string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  data?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  memo?: string;
}
