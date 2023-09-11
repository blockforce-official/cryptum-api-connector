import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';

export class DeployDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  privateKey: string;

  @ApiProperty()
  @IsString()
  source: string;

  @ApiProperty()
  @IsString()
  contractName: string;

  @ApiProperty()
  @IsArray()
  params: any[];

  @ApiProperty()
  feeCurrency: string;

  @ApiProperty()
  fee: object | string;
}
