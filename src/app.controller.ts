import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const user = await this.authService.validateUser(
      req.Username,
      req.Password,
    );

    console.log('app-controller: ', user);
    return this.authService.login(user);
  }
}
