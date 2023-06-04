import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateMailDto } from 'src/job-manager/dto/create-mail.dto';

@Injectable()
export class SendMailService {
  constructor(
    @InjectQueue('send-mail') private readonly sendMailQueue: Queue,
  ) {}

  async verifyEmail(createMailDto: CreateMailDto) {
    const delay = parseInt(createMailDto.delay);
    await this.sendMailQueue.add(
      'verify',
      {
        email: createMailDto.email,
      },
      { delay },
    );
    return true;
  }

  async advertiseEmail(createMailDto: CreateMailDto) {
    const delay = parseInt(createMailDto.delay);
    await this.sendMailQueue.add(
      'advertise',
      {
        email: createMailDto.email,
      },
      { delay },
    );
    return true;
  }
}
