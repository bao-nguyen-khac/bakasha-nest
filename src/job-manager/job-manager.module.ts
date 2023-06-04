import { Module } from '@nestjs/common';
import { JobManagerController } from './job-manager.controller';
import { BullModule } from '@nestjs/bull';
import { JobModule } from 'src/job/job.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'send-mail',
    }),
    BullModule.registerQueue({
      name: 'verify-phone',
    }),
    JobModule,
  ],
  controllers: [JobManagerController],
})
export class JobManagerModule {}
