import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';

export class GetInfoQuerystringDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  tokenAddress?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  tokenUid?: string;
}

export class GetInfoDto extends GetInfoQuerystringDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  symbol: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  totalSupply?: string;

  @ApiProperty()
  @IsString()
  decimals: string;

  constructor(info: any) {
    super();
    if (info) {
      this.name = info.name;
      this.symbol = info.symbol;
      this.totalSupply = info.totalSupply || undefined;
      this.decimals = info.decimals;
      this.tokenAddress = info.tokenAddress || undefined;
    }
  }
}
