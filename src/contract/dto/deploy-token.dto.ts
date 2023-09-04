import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';

export class DeployTokenDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  privateKey: string;

  @ApiProperty()
  @IsArray()
  params: any[];

  @ApiProperty()
  @IsString()
  tokenType: string;

  @ApiProperty({ required: false })
  @IsOptional()
  fee: object | string;

  @ApiProperty({ required: false })
  @IsOptional()
  feeCurrency: string;
}
