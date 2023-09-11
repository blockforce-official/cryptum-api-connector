import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { LootBoxContent } from 'cryptum-sdk/dist/src/features/lootBox/entity';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';

export class CreateLootBoxDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  @IsString()
  privateKey: string;

  @ApiProperty()
  contents: LootBoxContent[];

  @ApiProperty()
  @IsString()
  lootBoxAddress: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lootBoxURI?: string;

  @ApiProperty()
  @IsString()
  openStartTimestamp: string;

  @ApiProperty()
  @IsString()
  recipient: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  amountDistributedPerOpen?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  rewardUnits?: string;
}
