import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';
import { CreateTransactionDto } from "../../transaction/dto/create-transaction.dto";

export class TokenCreateDto extends CreateTransactionDto  {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  @IsString()
  privateKey: string;

  @ApiProperty()
  @IsString()
  symbol: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  amount: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  mintAuthorityAddress?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  meltAuthorityAddress: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  fixedSupply?: boolean;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  decimals?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  feeCurrency?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  fee: object | string;
}
