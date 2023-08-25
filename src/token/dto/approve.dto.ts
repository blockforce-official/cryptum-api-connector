import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';
import { Wallet } from 'cryptum-sdk/dist/src/features/wallet/entity';
import { CreateTransactionDto } from "../../transaction/dto/create-transaction.dto";


export class ApproveDto extends CreateTransactionDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  token: string;
  
  @ApiProperty()
  privateKey: string;

  @ApiProperty()
  spender: string;

  @ApiProperty()
  amount: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  feeCurrency?: string;

  @ApiProperty()
  fee: object | string;
}
