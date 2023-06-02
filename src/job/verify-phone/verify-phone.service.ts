import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class VerifyPhoneService {
  constructor(
    @InjectQueue('verify-phone') private readonly verifyPhoneQueue: Queue,
  ) {}

  async verifyPhone() {
    const a = 5000;
    await this.verifyPhoneQueue.add(
      'send-otp',
      {
        email: 'example@gmail.com',
      },
      { delay: a },
    );
  }
}
