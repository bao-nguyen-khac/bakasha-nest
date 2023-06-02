import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Param } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('sendMail')
export class sendMailController {
  constructor(@InjectQueue('sendMail') private readonly sendMailQueue: Queue) {}

  @Get(':time')
  async verifyEmail(@Param('time') time: string) {
    const a = parseInt(time);
    await this.sendMailQueue.add(
      'verify',
      {
        email: 'example@gmail.com',
      },
      { delay: a },
    );
  }
}
