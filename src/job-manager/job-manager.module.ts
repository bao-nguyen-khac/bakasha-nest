import { Module } from '@nestjs/common';
import { JobManagerController } from './job-manager.controller';
import { BullModule } from '@nestjs/bull';
import { JobModule } from 'src/job/job.module';
import { queues } from 'src/constants/constants';

@Module({
  imports: [BullModule.registerQueue(...queues), JobModule],
  controllers: [JobManagerController],
})
export class JobManagerModule {}
