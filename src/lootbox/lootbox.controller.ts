import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CryptumService } from '../cryptum/cryptum.service';
import { DeployLootboxDto } from './dto/deploy.dto';
import { OpenLootBoxDto } from './dto/open-loot-box.dto';
import { CreateLootBoxDto } from './dto/create-loot-box.dto';
import { GetLootBoxContentDto } from './dto/get-loot-box-content.dto';
import { ApproveLootBoxDto } from './dto/approve.dto';

@ApiTags('lootbox')
@Controller('lootbox')
export class LootboxController {
  constructor(private cryptumService: CryptumService) {}

  @Post('/deploy')
  async deploy(@Body() deployLootboxDto: DeployLootboxDto) {
    return await this.cryptumService.deployLootbox(deployLootboxDto);
  }
  @Post('/open')
  async openLootBox(@Body() openLootBoxDto: OpenLootBoxDto) {
    return await this.cryptumService.openLootBox(openLootBoxDto);
  }
  @Post('/:lootBoxAddress/create')
  async createLootBox(
    @Body() createLootBoxDto: Omit<CreateLootBoxDto, 'lootBoxAdddress'>,
    @Param('lootBoxAddress') lootBoxAddress: string,
  ) {
    const {
      protocol,
      privateKey,
      lootBoxURI,
      contents,
      openStartTimestamp,
      recipient,
      amountDistributedPerOpen,
      rewardUnits,
    } = createLootBoxDto;
    return await this.cryptumService.createLootBox({
      lootBoxAddress,
      lootBoxURI,
      protocol,
      privateKey,
      contents,
      openStartTimestamp,
      recipient,
      amountDistributedPerOpen,
      rewardUnits,
    });
  }
  @Post('/approve')
  async approve(@Body() approveLootBoxDto: ApproveLootBoxDto) {
    return await this.cryptumService.approveLootBox(approveLootBoxDto);
  }
  @Get('/content')
  async getLootBoxContent(@Query() queryString: GetLootBoxContentDto) {
    const { protocol, lootBoxAddress, lootBoxId } = queryString;
    return await this.cryptumService.getLootBoxContent({ protocol, lootBoxAddress, lootBoxId });
  }
}
