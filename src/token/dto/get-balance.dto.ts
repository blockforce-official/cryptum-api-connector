import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';

export class GetBalanceDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  tokenAddress: string;

  @ApiProperty()
  tokenUid: string;

  @ApiProperty()
  address: string;
}
