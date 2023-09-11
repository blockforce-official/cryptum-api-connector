import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
  getHealthReady(): any {
    throw new Error('Method not implemented.');
  }
  getHealthAlive(): any {
    throw new Error('Method not implemented.');
  }
}
