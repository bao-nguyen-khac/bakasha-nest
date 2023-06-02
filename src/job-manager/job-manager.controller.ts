import { InjectQueue } from '@nestjs/bull';
import { Controller, Get } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('job-manager')
export class JobManagerController {
  constructor(
    @InjectQueue('verify-phone') private readonly sendMailQueue: Queue,
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
    console.log('🚀 ~ file: job-manager.controller.ts:14 ~ jobs:', jobs);
    return jobs;
  }
}
