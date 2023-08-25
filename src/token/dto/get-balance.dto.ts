import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';

export class GetBalanceDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  tokenAddress: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  tokenUid?: string;

  @ApiProperty()
  address: string;
}
