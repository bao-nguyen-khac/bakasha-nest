import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { SendMailService } from 'src/job/sendMail/send-mail.service';
import { VerifyPhoneService } from 'src/job/verify-phone/verify-phone.service';
import { CreateMailDto } from './dto/create-mail.dto';

@Controller('job-manager')
export class JobManagerController {
  constructor(
    @InjectQueue('send-mail') private readonly sendMailQueue: Queue,
    private verifyPhoneService: VerifyPhoneService,
    private sendMailService: SendMailService,
  ) {}

  @Get('get-all')
  async getAllJob() {
    const jobs = await this.sendMailQueue.getJobs([
      'completed',
      'active',
      'delayed',
      'failed',
      'paused',
      'waiting',
    ]);
    return jobs;
  }

  @Post('mail')
  async runSendMail(@Body() createMailDto: CreateMailDto) {
    if (createMailDto.type === 'verify')
      await this.sendMailService.verifyEmail(createMailDto);
    else await this.sendMailService.advertiseEmail(createMailDto);
    return {
      successful: true,
    };
  }
}
