import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';

export class ApproveLootBoxDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  @IsString()
  privateKey: string;

  @ApiProperty()
  @IsString()
  tokenAddress: string;

  @ApiProperty()
  @IsString()
  amount: string;

  @ApiProperty()
  @IsString()
  lootBoxAddress: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  tokenId?: string;

  @ApiProperty()
  @IsString()
  tokenType: 'ERC721' | 'ERC1155' | 'ERC20';
}
