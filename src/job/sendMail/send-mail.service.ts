import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class SendMailService {
  constructor(
    @InjectQueue('send-mail') private readonly sendMailQueue: Queue,
  ) {}

  async verifyEmail(time: number) {
    const a = time;
    await this.sendMailQueue.add(
      'verify',
      {
        email: 'example@gmail.com',
      },
      { delay: a },
    );
  }
}
