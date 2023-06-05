import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { SendMailService } from 'src/job/sendMail/send-mail.service';
import { VerifyPhoneService } from 'src/job/verify-phone/verify-phone.service';
import { CreateMailDto } from './dto/create-mail.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('job-manager')
@Controller('job-manager')
export class JobManagerController {
  constructor(
    @InjectQueue('send-mail') private readonly sendMailQueue: Queue,
    @InjectQueue('verify-phone') private readonly verifyPhoneQueue: Queue,
    private verifyPhoneService: VerifyPhoneService,
    private sendMailService: SendMailService,
  ) {}

  @Get('get-all')
  @ApiOperation({ summary: 'Get all queues and jobs' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getAllJob() {
    const mails = await this.sendMailQueue.getJobs([
      'completed',
      'active',
      'delayed',
      'failed',
      'paused',
      'waiting',
    ]);
    const phones = await this.verifyPhoneQueue.getJobs([
      'completed',
      'active',
      'delayed',
      'failed',
      'paused',
      'waiting',
    ]);
    return {
      mails,
      phones,
    };
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

  @Get('phone')
  async runVerifyPhone() {
    await this.verifyPhoneService.adverisePhone(1);
    return {
      successful: true,
    };
  }
}
