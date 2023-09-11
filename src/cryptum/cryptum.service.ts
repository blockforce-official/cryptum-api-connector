import { BadRequestException, Injectable } from '@nestjs/common';
import CryptumSdk from 'cryptum-sdk';
import { Block, GetBlockDto } from '../block/dto/get-block.dto';
import { Prices } from '../prices/dto/get-prices.dto';
import { GetTransactionByHashDto } from '../transaction/dto/get-transaction.dto';
import { GetUtxosDto } from '../transaction/dto/get-utxo.dto';
import { SendTransactionDto } from '../transaction/dto/send-transaction.dto';
import { Transaction, UTXO, TransactionResponse } from '../transaction/dto/transaction.dto';
import { GetWalletInfoDto } from '../wallet/dto/get-wallet-info.dto';
import { GenerateWalletDto } from '../wallet/dto/generate-wallet.dto';
import {
  CreateBitcoinTransferTransactionDto,
  CreateCardanoTransferTransactionDto,
  CreateCeloTransferTransactionDto,
  CreateEthereumTransferTransactionDto,
  CreateHathorTokenTransactionFromUTXODto,
  CreateHathorTransferTransactionDto,
  CreateRippleTransferTransactionDto,
  CreateSolanaCustomProgramInteractionDto,
  CreateSolanaTransferTransactionDto,
  CreateStellarTransferTransactionDto,
  CreateTrustlineTransactionDto,
} from '../transaction/dto/create-transaction.dto';
import { Protocol, TrustlineProtocol } from './interfaces/protocols.interface';
import {
  CallSmartContractDto,
  CallSmartContractResponse,
  CreateSmartContractCallTransactionDto,
  CreateSmartContractDeployTransactionDto,
} from '../transaction/dto/smartcontract-transaction.dto';
import {
  CreateEthTokenDeployTransactionDto,
  CreateHathorMeltTokenTransaction,
  CreateHathorMintTokenTransaction,
  CreateHathorTokenDeployTransaction,
  CreateSolanaTokenDeployTransaction,
  CreateSolanaTokenMintTransaction,
  CreateSolanaTokenBurnTransaction,
} from '../transaction/dto/token-transaction.dto';
import {
  BitcoinTransferTransactionInput,
  CeloTransferTransactionInput,
  EthereumTransferTransactionInput,
  HathorTransferTransactionInput,
  RippleTransferTransactionInput,
  SignedTransaction,
  SmartContractDeployTransactionInput,
  SolanaTransferTransactionInput,
  StellarTransferTransactionInput,
} from 'cryptum-sdk/dist/src/features/transaction/entity';
import config from '../config';
import { GetInfoDto } from 'src/token/dto/get-info.dto';
import { GetBalanceDto } from 'src/token/dto/get-balance.dto';
import { TokenTransferDto } from 'src/token/dto/transfer.dto';
import { TokenCreateDto } from 'src/token/dto/create.dto';
import { MintDto } from 'src/token/dto/mint.dto';
import { BurnDto } from 'src/token/dto/burn.dto';
import { ApproveDto } from 'src/token/dto/approve.dto';
import { CallMethodDto } from 'src/contract/dto/call-method.dto';
import { SupportsInterfaceId } from 'src/contract/dto/supports-interfaceId.dto';
import { DeployDto } from 'src/contract/dto/deploy.dto';
import { DeployTokenDto } from 'src/contract/dto/deploy-token.dto';
import { CallMethodTransactionDto } from 'src/contract/dto/call-method-transaction.dto';
import { GetWebhooksDto } from 'src/webhooks/dto/get-webhook.dto';
import { CreateWebhookDto } from 'src/webhooks/dto/create-webhook.dto';
import { DestroyWebhookDto } from 'src/webhooks/dto/destroy-webhook.dto';
import { DeployLootboxDto } from 'src/lootbox/dto/deploy.dto';
import { OpenLootBoxDto } from 'src/lootbox/dto/open-loot-box.dto';
import { CreateLootBoxDto } from 'src/lootbox/dto/create-loot-box.dto';
import { GetLootBoxContentDto } from 'src/lootbox/dto/get-loot-box-content.dto';
import { ApproveLootBoxDto } from 'src/lootbox/dto/approve.dto';
import { LockStakingDto } from 'src/staking/dto/lock.dto';
import { VoteStakingDto } from 'src/staking/dto/vote.dto';
import { IsRegisteredAccountDto } from 'src/staking/dto/is-registered-account.dto';
import { RegisterAccountDto } from 'src/staking/dto/register-account.dto';
import { ActivateStakingDto } from 'src/staking/dto/activate.dto';
import { RevokeActiveStakingDto } from 'src/staking/dto/revoke-active.dto';
import { RevokePendingStakingDto } from 'src/staking/dto/revoke-pending.dto';
import { UnlockStakingDto } from 'src/staking/dto/unlock.dto';
import { RelockStakingDto } from 'src/staking/dto/relock.dto';
import { WithdrawStakingDto } from 'src/staking/dto/withdraw.dto';
import { PendingWithdrawalsDto } from 'src/staking/dto/pending-withdrawals.dto';
import { PendingTotalWithdrawalsDto } from 'src/staking/dto/pending-total-withdrawals.dto';
import { GetGroupsVotedForByAccountDto } from 'src/staking/dto/get-groups-voted-for-by-account.dto.ts';
import { GetVotesForGroupByAccountDto } from 'src/staking/dto/get-votes-for-group-by-account.dto';
import { GetAccountSummaryDto } from 'src/staking/dto/get-account-sumary.dto';

@Injectable()
export class CryptumService {
  sdk: CryptumSdk;

  constructor() {
    this.sdk = new CryptumSdk(config.cryptumConfig());
  }
  async isRegisteredAccount(input: IsRegisteredAccountDto) {
    const { protocol, address } = input;
    return this.sdk.getStakingController({ protocol }).isRegisteredAccount({ address });
  }
  async registerAccountStaking(input: RegisterAccountDto) {
    const { protocol, privateKey } = input;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getStakingController({ protocol }).registerAccount({ wallet });
  }
  async lockStaking(input: LockStakingDto) {
    const { protocol, privateKey, amount } = input;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getStakingController({ protocol }).lock({ wallet, amount });
  }
  async voteStaking(input: VoteStakingDto) {
    const { protocol, amount, validator, privateKey } = input;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getStakingController({ protocol }).vote({ amount, validator, wallet });
  }
  async activateStaking(input: ActivateStakingDto) {
    const { protocol, privateKey, validator } = input;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });

    return this.sdk.getStakingController({ protocol }).activate({ wallet, validator });
  }
  async revokeActiveStaking(input: RevokeActiveStakingDto) {
    const { protocol, privateKey, amount, validator } = input;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getStakingController({ protocol }).revokeActive({ wallet, amount, validator });
  }
  async revokePendingStaking(input: RevokePendingStakingDto) {
    const { protocol, privateKey, amount, validator } = input;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getStakingController({ protocol }).revokePending({ amount, validator, wallet });
  }
  async unlockStaking(input: UnlockStakingDto) {
    const { protocol, privateKey, amount } = input;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getStakingController({ protocol }).unlock({ wallet, amount });
  }
  async relockStaking(input: RelockStakingDto) {
    const { protocol, privateKey, amount, index } = input;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getStakingController({ protocol }).relock({ amount, index, wallet });
  }
  async withdrawStaking(input: WithdrawStakingDto) {
    const { protocol, privateKey, index } = input;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getStakingController({ protocol }).withdraw({ wallet, index });
  }
  async getTotalPendingWithdrawals(input: PendingTotalWithdrawalsDto) {
    const { protocol } = input;
    return this.sdk.getStakingController({ protocol }).getTotalPendingWithdrawals(input);
  }
  async getPendingWithdrawals(input: PendingWithdrawalsDto) {
    const { protocol } = input;
    return this.sdk.getStakingController({ protocol }).getPendingWithdrawals(input);
  }
  async getGroupsVotedForByAccount(input: GetGroupsVotedForByAccountDto) {
    const { protocol } = input;
    return this.sdk.getStakingController({ protocol }).getGroupsVotedForByAccount(input);
  }
  async getVotesForGroupByAccount(input: GetVotesForGroupByAccountDto) {
    const { protocol, address, group } = input;
    return this.sdk.getStakingController({ protocol }).getVotesForGroupByAccount({ address, group });
  }
  async getAccountSummary(input: GetAccountSummaryDto) {
    const { protocol } = input;
    return this.sdk.getStakingController({ protocol }).getAccountSummary(input);
  }

  async deployLootbox(input: DeployLootboxDto) {
    const { protocol, privateKey } = input;
    delete input.privateKey;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getLootBoxController().deploy({ ...input, wallet });
  }
  async openLootBox(input: OpenLootBoxDto) {
    const { protocol, privateKey } = input;
    delete input.privateKey;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({ protocol, privateKey });
    return this.sdk.getLootBoxController().openLootBox({ ...input, wallet });
  }
  async createLootBox(input: CreateLootBoxDto) {
    console.log(input);
    const { protocol, privateKey } = input;
    delete input.privateKey;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({ protocol, privateKey });
    return this.sdk.getLootBoxController().createLootBox({ ...input, wallet });
  }
  async getLootBoxContent(input: GetLootBoxContentDto) {
    return this.sdk.getLootBoxController().getLootBoxContent(input);
  }
  async approveLootBox(input: ApproveLootBoxDto) {
    const { protocol, privateKey } = input;
    delete input.privateKey;
    const tokenId = !input.tokenId ? '0' : input.tokenId;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({ protocol, privateKey });
    return this.sdk.getLootBoxController().approve({ ...input, tokenId, wallet });
  }
  async createWebhook(input: CreateWebhookDto) {
    return this.sdk.getWebhooksController().createWebhook(input);
  }
  async getWebhooks(input: GetWebhooksDto) {
    return this.sdk.getWebhooksController().getWebhooks(input);
  }
  async destroyWebhook(input: DestroyWebhookDto) {
    return this.sdk.getWebhooksController().destroyWebhook(input);
  }
  async callMethod(input: CallMethodDto) {
    return this.sdk.getContractController().callMethod(input);
  }
  async supportsInterfaceId(input: SupportsInterfaceId) {
    return this.sdk.getContractController().supportsInterfaceId(input);
  }
  async callMethodTransaction(input: CallMethodTransactionDto) {
    const { protocol, privateKey } = input;
    delete input.privateKey;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getContractController().callMethodTransaction({ ...input, wallet });
  }
  async deploy(input: DeployDto) {
    const { protocol, privateKey } = input;
    delete input.privateKey;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getContractController().deploy({ ...input, wallet });
  }
  async deployToken(input: DeployTokenDto) {
    const { protocol, privateKey } = input;
    delete input.privateKey;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getContractController().deployToken({ ...input, wallet });
  }
  async getTokenInfo(input: GetInfoDto) {
    return this.sdk.getTokenController().getInfo(input);
  }
  async getTokenBalance(input: GetBalanceDto) {
    return this.sdk.getTokenController().getBalance(input);
  }
  async transferToken(input: TokenTransferDto) {
    const { protocol, privateKey } = input;
    delete input.privateKey;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getTokenController().transfer({ ...input, wallet });
  }
  async createToken(input: TokenCreateDto) {
    const { protocol, privateKey } = input;
    delete input.privateKey;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getTokenController().create({ ...input, wallet });
  }
  async mintToken(input: MintDto) {
    const { protocol, privateKey } = input;
    delete input.privateKey;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getTokenController().mint({ ...input, wallet });
  }
  async burnToken(input: BurnDto) {
    const { protocol, privateKey } = input;
    delete input.privateKey;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getTokenController().burn({ ...input, wallet });
  }
  async approveToken(input: ApproveDto) {
    const { protocol, privateKey } = input;
    delete input.privateKey;
    const walletController = this.sdk.getWalletController();
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getTokenController().burn({ ...input, wallet });
  }

  generateRandomMnemonic(strength?: number): string {
    return this.sdk.getWalletController().generateRandomMnemonic(strength);
  }
  async generateWallet(input: GenerateWalletDto) {
    return this.sdk.getWalletController().generateWallet(input);
  }
  async getWalletInfo(input: GetWalletInfoDto) {
    return this.sdk.getWalletController().getWalletInfo(input);
  }
  async getTransactionByHash(input: GetTransactionByHashDto): Promise<Transaction> {
    return this.sdk.getTransactionController().getTransactionByHash(input);
  }
  async getUtxos(input: GetUtxosDto): Promise<UTXO[]> {
    return this.sdk.getTransactionController().getUTXOs(input);
  }
  async getBlock(input: GetBlockDto): Promise<Block> {
    return this.sdk.getTransactionController().getBlock(input);
  }
  async sendTransaction(input: SendTransactionDto): Promise<TransactionResponse> {
    return this.sdk.getTransactionController().sendTransaction(input);
  }
  async getPrices(asset: string): Promise<Prices> {
    return this.sdk.getPricesController().getPrices(asset);
  }
  async createTrustlineTransaction(input: CreateTrustlineTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { protocol, privateKey, assetSymbol, issuer, limit, memo, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    const transaction = {
      wallet,
      assetSymbol,
      issuer,
      limit,
      memo,
      fee,
    } as any;
    switch (protocol) {
      case TrustlineProtocol.STELLAR:
        return txController.createStellarTrustlineTransaction(transaction);
      case TrustlineProtocol.RIPPLE:
        return txController.createRippleTrustlineTransaction(transaction);
      default:
        throw new BadRequestException('Unsupported protocol');
    }
  }
  async createStellarTransferTransaction(input: CreateStellarTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, issuer, assetSymbol, amount, destination, memo, createAccount, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.STELLAR,
      privateKey,
    });
    return txController.createStellarTransferTransaction({
      wallet,
      assetSymbol,
      issuer,
      amount,
      destination,
      createAccount,
      memo,
      fee,
    } as StellarTransferTransactionInput);
  }
  async createRippleTransferTransaction(input: CreateRippleTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, issuer, assetSymbol, amount, destination, memo, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.RIPPLE,
      privateKey,
    });
    return txController.createRippleTransferTransaction({
      wallet,
      assetSymbol,
      issuer,
      amount,
      destination,
      memo,
      fee,
    } as RippleTransferTransactionInput);
  }
  async createCeloTransferTransaction(input: CreateCeloTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenSymbol, contractAddress, amount, destination, feeCurrency, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.CELO,
      privateKey,
    });
    return txController.createCeloTransferTransaction({
      wallet,
      tokenSymbol,
      contractAddress,
      amount,
      destination,
      feeCurrency,
      fee,
    } as CeloTransferTransactionInput);
  }
  async createEthereumTransferTransaction(input: CreateEthereumTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenSymbol, contractAddress, amount, destination, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.ETHEREUM,
      privateKey,
    });
    return txController.createEthereumTransferTransaction({
      wallet,
      tokenSymbol,
      contractAddress,
      amount,
      destination,
      fee,
    } as EthereumTransferTransactionInput);
  }
  async createBscTransferTransaction(input: CreateEthereumTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenSymbol, contractAddress, amount, destination, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.BSC,
      privateKey,
    });
    return txController.createBscTransferTransaction({
      wallet,
      tokenSymbol,
      contractAddress,
      amount,
      destination,
      fee,
    } as EthereumTransferTransactionInput);
  }
  async createPolygonTransferTransaction(input: CreateEthereumTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenSymbol, contractAddress, amount, destination, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.POLYGON,
      privateKey,
    });
    return txController.createPolygonTransferTransaction({
      wallet,
      tokenSymbol,
      contractAddress,
      amount,
      destination,
      fee,
    } as EthereumTransferTransactionInput);
  }
  async createAvaxCChainTransferTransaction(input: CreateEthereumTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenSymbol, contractAddress, amount, destination, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.AVAXCCHAIN,
      privateKey,
    });
    return txController.createAvaxCChainTransferTransaction({
      wallet,
      tokenSymbol,
      contractAddress,
      amount,
      destination,
      fee,
    } as EthereumTransferTransactionInput);
  }
  async createChilizTransferTransaction(input: CreateEthereumTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenSymbol, contractAddress, amount, destination, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.CHILIZ,
      privateKey,
    });
    return txController.createChilizTransferTransaction({
      wallet,
      tokenSymbol,
      contractAddress,
      amount,
      destination,
      fee,
    } as EthereumTransferTransactionInput);
  }
  async createBitcoinTransferTransaction(input: CreateBitcoinTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, inputs, outputs } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.BITCOIN,
      privateKey,
    });
    return txController.createBitcoinTransferTransaction({
      wallet,
      inputs,
      outputs,
    } as BitcoinTransferTransactionInput);
  }
  async createHathorTransferTransaction(input: CreateHathorTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const { privateKey, inputs, outputs } = input;

    if (privateKey) {
      const walletController = this.sdk.getWalletController();
      const wallet = await walletController.generateWalletFromPrivateKey({
        protocol: Protocol.HATHOR,
        privateKey,
      });
      return txController.createHathorTransferTransactionFromWallet({
        wallet,
        outputs,
      } as HathorTransferTransactionInput);
    } else if (inputs) {
      return txController.createHathorTransferTransactionFromUTXO({
        inputs,
        outputs,
      } as HathorTransferTransactionInput);
    } else {
      throw new BadRequestException('Missing private key or inputs');
    }
  }
  async createCardanoTransferTransaction(input: CreateCardanoTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const { privateKey, inputs, outputs } = input;

    if (privateKey) {
      const walletController = this.sdk.getWalletController();
      const wallet = await walletController.generateWalletFromPrivateKey({
        protocol: Protocol.CARDANO,
        privateKey,
      } as any);
      return txController.createCardanoTransferTransactionFromWallet({
        wallet,
        outputs,
      } as any);
    } else if (inputs) {
      return txController.createCardanoTransferTransactionFromUTXO({
        inputs,
        outputs,
      } as any);
    } else {
      throw new BadRequestException('Missing private key or inputs');
    }
  }
  async createSolanaTransferTransaction(input: CreateSolanaTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, token, amount, destination } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.SOLANA,
      privateKey,
    });
    wallet.publicKey = wallet.address;
    return txController.createSolanaTransferTransaction({
      wallet,
      token,
      amount,
      destination,
    } as SolanaTransferTransactionInput);
  }
  async callSmartContractMethod(input: CallSmartContractDto): Promise<CallSmartContractResponse> {
    const { from, protocol, contractAbi, method, params, contractAddress } = input;
    const contractController = this.sdk.getContractController();
    return contractController.callMethod({
      from,
      contractAbi,
      method,
      params,
      contractAddress,
      protocol,
    });
  }
  async createSmartContractCallTransaction(input: CreateSmartContractCallTransactionDto): Promise<SignedTransaction> {
    const scController = this.sdk.getContractController();
    const walletController = this.sdk.getWalletController();
    const { protocol, privateKey, contractAddress, contractAbi, method, params, fee, feeCurrency } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return scController.buildMethodTransaction({
      protocol,
      wallet,
      contractAbi,
      method,
      params,
      contractAddress,
      fee,
      feeCurrency,
    });
  }
  async createSmartContractDeployTransaction(
    input: CreateSmartContractDeployTransactionDto,
  ): Promise<SignedTransaction> {
    const scController = this.sdk.getContractController();
    const walletController = this.sdk.getWalletController();
    const { protocol, privateKey, contractName, source, params, fee, feeCurrency } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return scController.buildDeployTransaction({
      protocol,
      wallet,
      contractName,
      source,
      params,
      fee,
      feeCurrency,
    } as SmartContractDeployTransactionInput);
  }
  async createSolanaCustomProgramInteraction(input: CreateSolanaCustomProgramInteractionDto) {
    const { protocol, privateKey } = input;
    const walletController = this.sdk.getWalletController();
    const from = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return this.sdk.getTransactionController().createSolanaCustomProgramInteraction({ ...input, from });
  }
  async createHathorTokenTransactionFromUTXO(input: CreateHathorTokenTransactionFromUTXODto) {
    console.log(input);
    return this.sdk.getTransactionController().createHathorTokenTransactionFromUTXO(input);
  }
}
