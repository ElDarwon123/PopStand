import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';
import { ClerAuthkGuard } from './modules/auth/cleck.guard';
import { Roles } from './common/decorators/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Public()
  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
