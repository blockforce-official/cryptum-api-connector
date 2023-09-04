import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';

export class OpenLootBoxDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  privateKey: string;

  @ApiProperty()
  @IsString()
  lootBoxId: string;

  @ApiProperty({ required: false })
  @IsString()
  amount?: string;

  @ApiProperty()
  @IsString()
  lootBoxAddress: string;
}
