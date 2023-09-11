import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Protocol, TrustlineProtocol } from '../../cryptum/interfaces/protocols.interface';
import { TransactionHathorType, TransactionType } from './transaction.dto';

export class EthFee {
  gas: number;
  gasPrice: string;
}

export class CreateTransactionDto {
  @ApiProperty()
  privateKey: string;
}

export class CreateTrustlineTransactionDto extends CreateTransactionDto {
  @ApiProperty()
  @IsEnum(TrustlineProtocol)
  protocol: TrustlineProtocol;

  @ApiProperty({
    description: 'Asset symbol',
  })
  @IsString()
  @IsNotEmpty()
  assetSymbol: string;

  @ApiProperty({
    description: 'Issuer account of the asset symbol',
  })
  @IsString()
  @IsNotEmpty()
  issuer: string;

  @ApiProperty({
    description: 'Amount limit this account is allowed to hold for this asset',
  })
  @IsNumberString()
  limit: string;

  @ApiProperty({
    description: 'Memo string',
  })
  @IsOptional()
  @IsString()
  memo?: string;

  @ApiProperty()
  fee?: string;
}

export class CreateTransferTransactionDto extends CreateTransactionDto {
  protocol: Protocol;
}

export class CreateStellarTransferTransactionDto extends OmitType(CreateTransferTransactionDto, ['protocol']) {
  @ApiProperty()
  assetSymbol: string;

  @ApiProperty()
  issuer?: string;

  @ApiProperty({
    description: 'Indicate if this transfer will be used to create an account',
  })
  createAccount?: boolean;

  @ApiProperty()
  @IsNumberString()
  amount: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty()
  memo?: string;

  @ApiProperty()
  fee?: string;
}

export class CreateRippleTransferTransactionDto extends OmitType(CreateTransferTransactionDto, ['protocol']) {
  @ApiProperty()
  assetSymbol: string;

  @ApiProperty()
  issuer?: string;

  @ApiProperty()
  @IsNumberString()
  amount: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty()
  memo?: string;

  @ApiProperty()
  fee?: string;
}

export class CreateEthereumTransferTransactionDto extends OmitType(CreateTransferTransactionDto, ['protocol']) {
  @ApiProperty()
  tokenSymbol?: string;

  @ApiProperty()
  contractAddress?: string;

  @ApiProperty()
  @IsNumberString()
  amount: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty()
  fee?: EthFee;
}

export class CreateCeloTransferTransactionDto extends CreateEthereumTransferTransactionDto {
  @ApiProperty()
  feeCurrency?: string;
}

export class Output {
  address: string;
  amount: string;
  token: string;
}
export class HathorOutput extends Output {
  token: string;
}
export class CardanoToken {
  policy: string;
  asset: string;
  amount: string;
}
export class CardanoOutput extends OmitType(Output, ['token']) {
  token?: CardanoToken;
}
export class Input {
  txHash: string;
  index: number;
  privateKey: string;
}

export class CreateHathorTransferTransactionDto extends OmitType(CreateTransferTransactionDto, [
  'protocol',
  'privateKey',
]) {
  @ApiProperty()
  privateKey?: string;

  @ApiProperty()
  inputs?: Input[];

  @ApiProperty()
  outputs: HathorOutput[];
}

export class CreateBitcoinTransferTransactionDto extends OmitType(CreateTransferTransactionDto, [
  'protocol',
  'privateKey',
]) {
  @ApiProperty()
  privateKey?: string;

  @ApiProperty()
  inputs?: Input[];

  @ApiProperty()
  outputs: Output[];
}

export class CardanoPrivateKey {
  stakingPrivateKey: string;
  spendingPrivateKey: string;
}
export class CreateCardanoTransferTransactionDto extends OmitType(CreateBitcoinTransferTransactionDto, [
  'privateKey',
  'outputs',
]) {
  @ApiProperty()
  privateKey?: CardanoPrivateKey;

  @ApiProperty()
  outputs: CardanoOutput[];
}

export class CreateSolanaTransferTransactionDto extends OmitType(CreateTransferTransactionDto, ['protocol']) {
  @ApiProperty()
  token?: string;

  @ApiProperty()
  @IsNumberString()
  amount: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  destination: string;
}

export class CreateHathorTokenTransactionFromUTXODto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  type: TransactionHathorType;

  @ApiProperty()
  inputs: InputHathor[];

  @ApiProperty()
  @IsString()
  tokenName: string;

  @ApiProperty()
  @IsString()
  tokenSymbol: string;

  @ApiProperty()
  @IsString()
  amount: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  changeAddress: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  mintAuthorityAddress: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  meltAuthorityAddress: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  testnet: boolean;
}

export class InputHathor extends Input {
  hex: string;
  value: string;
  blockhash: string;
}

export class CreateSolanaCustomProgramInteractionDto {
  @ApiProperty()
  @IsEnum(Protocol)
  protocol: Protocol;

  @ApiProperty()
  @IsString()
  privateKey: string;

  @ApiProperty()
  keys: [];

  @ApiProperty()
  @IsString()
  programId: string;

  @ApiProperty()
  data: Buffer;
}
