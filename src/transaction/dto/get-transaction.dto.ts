import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';

export class GetTransactionByHashDto {
  @ApiProperty()
  @IsString()
  hash: string;

  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  constructor(hash: string, protocol: Protocol) {
    this.hash = hash;
    this.protocol = protocol;
  }
}
