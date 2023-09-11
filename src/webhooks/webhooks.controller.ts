import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CryptumService } from '../cryptum/cryptum.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { GetWebhooksDto } from './dto/get-webhook.dto';
import { DestroyWebhookDto } from './dto/destroy-webhook.dto';

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhooksController {
  constructor(private cryptumService: CryptumService) {}

  @Post('/')
  async createWebhook(@Body() createWebhookDto: CreateWebhookDto) {
    return await this.cryptumService.createWebhook(createWebhookDto);
  }
  @Get('/')
  async getWebhooks(@Query() queryString: GetWebhooksDto) {
    const { protocol, asset, startDate, endDate, limit, offset } = queryString;
    return await this.cryptumService.getWebhooks({ protocol, asset, startDate, endDate, limit, offset });
  }
  @Delete('/')
  async destroyWebhook(@Body() destroyWebhookDto: DestroyWebhookDto) {
    return await this.cryptumService.destroyWebhook(destroyWebhookDto);
  }
}
