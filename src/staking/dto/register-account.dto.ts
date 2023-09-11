import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, isSemVer, isString } from 'class-validator';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';
import { Wallet } from 'cryptum-sdk/dist/src/features/wallet/entity';

export class RegisterAccountDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  @IsString()
  privateKey: string;
}
