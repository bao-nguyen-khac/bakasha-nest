import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { setTimeout } from 'timers/promises';

@Processor('verify-phone')
export class VerifyPhoneProcessor {
  @Process('send-otp')
  async sendOTP(job: Job) {
    job.log('STARTED');

    for (let i = 0; i < 100; i++) {
      job.progress(i);
      await setTimeout(1000);
    }

    job.log('FINISHED');
    return true;
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `${job.queue.name}: Processing job ${job.id} of type ${job.name}`,
    );
    console.log(job.data);
  }

  @OnQueueCompleted()
  onCompleted(job: Job, result: any) {
    job.progress(100);
    return result;
  }
}
