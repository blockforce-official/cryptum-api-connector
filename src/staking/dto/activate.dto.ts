import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';

export class ActivateStakingDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  @IsString()
  privateKey: string;

  @ApiProperty()
  @IsString()
  validator: string;
}
