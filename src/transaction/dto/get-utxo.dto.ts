import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, isString } from 'class-validator';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';

export class GetUtxosDto {
  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  constructor(address: string, protocol: Protocol) {
    this.address = address;
    this.protocol = protocol;
  }
}
