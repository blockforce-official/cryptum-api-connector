import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';

export class Block {}

export class GetBlockDto {
  @ApiProperty()
  @IsString()
  block: string;

  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  constructor(block: string, protocol: Protocol) {
    this.block = block;
    this.protocol = protocol;
  }
}
