import { Controller, Request, Get, UseGuards, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { AuthService } from 'src/auth/service/auth.service';
import { VerifyPhoneService } from 'src/job/verify-phone/verify-phone.service';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private verifyPhoneService: VerifyPhoneService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.getToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('run-job')
  runJob() {
    this.verifyPhoneService.verifyPhone();
    return {
      good: true,
    };
  }
}
