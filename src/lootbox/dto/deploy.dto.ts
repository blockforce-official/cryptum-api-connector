import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';

export class DeployLootboxDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  privateKey: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  symbol: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  contractURI?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  trustedForwarders?: string[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  royaltyRecipient?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  royaltyBps?: number;
}
