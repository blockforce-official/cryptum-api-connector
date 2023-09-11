import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CallMethodDto } from './dto/call-method.dto';
import { CryptumService } from '../cryptum/cryptum.service';
import { SupportsInterfaceId } from './dto/supports-interfaceId.dto';
import { CallMethodTransactionDto } from './dto/call-method-transaction.dto';
import { DeployDto } from './dto/deploy.dto';
import { DeployTokenDto } from './dto/deploy-token.dto';

@ApiTags('contract')
@Controller('contract')
export class ContractController {
  constructor(private cryptumService: CryptumService) {}

  @Post('/call-method')
  async callMethod(@Body() callMethodDto: CallMethodDto) {
    return await this.cryptumService.callMethod(callMethodDto);
  }
  @Post('/supports-interface')
  async supportsInterfaceId(@Body() supportsInterfaceIdDto: SupportsInterfaceId) {
    return await this.cryptumService.supportsInterfaceId(supportsInterfaceIdDto);
  }
  @Post('/method-transaction')
  async callMethodTransaction(@Body() callMethodTransactionDto: CallMethodTransactionDto) {
    return await this.cryptumService.callMethodTransaction(callMethodTransactionDto);
  }
  @Post('/deploy-contract')
  async deploy(@Body() deployDto: DeployDto) {
    return await this.cryptumService.deploy(deployDto);
  }
  @Post('deploy-token')
  async deployToken(@Body() deployTokenDto: DeployTokenDto) {
    return await this.cryptumService.deployToken(deployTokenDto);
  }
}
