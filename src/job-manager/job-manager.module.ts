import { Module } from '@nestjs/common';
import { JobManagerController } from './job-manager.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'send-mail',
    }),
    BullModule.registerQueue({
      name: 'verify-phone',
    }),
  ],
  controllers: [JobManagerController],
})
export class JobManagerModule {}
