import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptumService } from '../cryptum/cryptum.service';
import { StakingController } from './staking.controller';

describe('TokenController', () => {
  let controller: StakingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StakingController],
      providers: [CryptumService, ConfigService],
    }).compile();

    controller = module.get<StakingController>(StakingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
