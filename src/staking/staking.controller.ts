import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CryptumService } from '../cryptum/cryptum.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { IsRegisteredAccountDto } from './dto/is-registered-account.dto';
import { LockStakingDto } from './dto/lock.dto';
import { VoteStakingDto } from './dto/vote.dto';
import { ActivateStakingDto } from './dto/activate.dto';
import { RevokeActiveStakingDto } from './dto/revoke-active.dto';
import { RevokePendingStakingDto } from './dto/revoke-pending.dto';
import { UnlockStakingDto } from './dto/unlock.dto';
import { RelockStakingDto } from './dto/relock.dto';
import { WithdrawStakingDto } from './dto/withdraw.dto';
import { PendingTotalWithdrawalsDto } from './dto/pending-total-withdrawals.dto';
import { PendingWithdrawalsDto } from './dto/pending-withdrawals.dto';
import { GetGroupsVotedForByAccountDto } from './dto/get-groups-voted-for-by-account.dto.ts';
import { GetVotesForGroupByAccountDto } from './dto/get-votes-for-group-by-account.dto';
import { GetAccountSummaryDto } from './dto/get-account-sumary.dto';
import { GetMethodAbiDto } from './dto/get-method-abi.dto';
import { FindLesserGreaterDto } from './dto/find-lesser-greater.dto';

@ApiTags('staking')
@Controller('staking')
export class StakingController {
  constructor(private cryptumService: CryptumService) {}

  @Get('/registered')
  async isRegisteredAccount(@Query() queryString: IsRegisteredAccountDto) {
    const { protocol, address } = queryString;
    return await this.cryptumService.isRegisteredAccount({ protocol, address });
  }
  @Post('/register')
  async registerAccount(@Body() registerAccountDto: RegisterAccountDto) {
    return await this.cryptumService.registerAccountStaking(registerAccountDto);
  }
  @Post('/lock')
  async lock(@Body() lockStakingDto: LockStakingDto) {
    return await this.cryptumService.lockStaking(lockStakingDto);
  }
  @Post('/vote')
  async vote(@Body() lockStakingDto: VoteStakingDto) {
    return await this.cryptumService.voteStaking(lockStakingDto);
  }
  @Post('/activate')
  async activate(@Body() activateStakingDto: ActivateStakingDto) {
    return await this.cryptumService.activateStaking(activateStakingDto);
  }
  @Post('/revokeActive')
  async revokeActive(@Body() revokeActiveStakingDto: RevokeActiveStakingDto) {
    return await this.cryptumService.revokeActiveStaking(revokeActiveStakingDto);
  }
  @Post('/revokePending')
  async revokePending(@Body() revokePendingStakingDto: RevokePendingStakingDto) {
    return await this.cryptumService.revokePendingStaking(revokePendingStakingDto);
  }
  @Post('/unlock')
  async unlock(@Body() unlockStakingDto: UnlockStakingDto) {
    return await this.cryptumService.unlockStaking(unlockStakingDto);
  }
  @Post('/relock')
  async relock(@Body() relockStakingDto: RelockStakingDto) {
    return await this.cryptumService.relockStaking(relockStakingDto);
  }
  @Get('/withdraw')
  async withdraw(@Query() queryString: WithdrawStakingDto) {
    const { index, privateKey, protocol } = queryString;
    return await this.cryptumService.withdrawStaking({ index, privateKey, protocol });
  }
  @Get('/pendingTotalWithdrawals')
  async getTotalPendingWithdrawals(@Query() PendingTotalWithdrawalsDto: PendingTotalWithdrawalsDto) {
    const { address, protocol } = PendingTotalWithdrawalsDto;
    return await this.cryptumService.getTotalPendingWithdrawals({ protocol, address });
  }
  @Get('/pendingWithdrawals')
  async getPendingWithdrawals(@Query() PendingWithdrawalsDto: PendingWithdrawalsDto) {
    const { address, protocol } = PendingWithdrawalsDto;
    return await this.cryptumService.getPendingWithdrawals({ protocol, address });
  }
  @Get('/getGroupsVotedForByAccount')
  async getGroupsVotedForByAccount(@Query() getGroupsVotedForByAccountDto: GetGroupsVotedForByAccountDto) {
    const { address, protocol } = getGroupsVotedForByAccountDto;
    return await this.cryptumService.getGroupsVotedForByAccount({ protocol, address });
  }
  @Get('/getVotesForGroupByAccount')
  async getVotesForGroupByAccount(@Query() getVotesForGroupByAccountDto: GetVotesForGroupByAccountDto) {
    const { address, protocol, group } = getVotesForGroupByAccountDto;
    return await this.cryptumService.getVotesForGroupByAccount({ protocol, address, group });
  }
  @Get('/getAccountSummary')
  async getAccountSummary(@Query() getAccountSummaryDto: GetAccountSummaryDto) {
    const { address, protocol } = getAccountSummaryDto;
    return await this.cryptumService.getAccountSummary({ protocol, address });
  }
  @Get('/:contract/abi')
  async getMethodAbi(@Query() getMethodAbiDto: GetMethodAbiDto, @Param('contract') contract: string) {
    const { protocol, method } = getMethodAbiDto;
    return await this.cryptumService.getMethodAbi({ protocol, contract, method });
  }
  @Get('/findLesserGreater')
  async findLesserGreater(@Query() findLesserGreaterDto: FindLesserGreaterDto) {
    const { protocol, validator, network, amount } = findLesserGreaterDto;
    return await this.cryptumService.findLesserGreater({ protocol, amount, network, validator });
  }
}
