import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptumService } from '../cryptum/cryptum.service';
import { LootboxController } from './lootbox.controller';

describe('TokenController', () => {
  let controller: LootboxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LootboxController],
      providers: [CryptumService, ConfigService],
    }).compile();

    controller = module.get<LootboxController>(LootboxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
