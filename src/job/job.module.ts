import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BullBoardModule } from 'src/bull-board/bull-board.module';
import { SendMailProcessor } from './sendMail/send-mail.processor';
import { VerifyPhoneProcessor } from './verify-phone/verify-phone.processor';
import { VerifyPhoneService } from './verify-phone/verify-phone.service';
import { SendMailService } from './sendMail/send-mail.service';
import { queues } from 'src/constants/constants';

@Module({
  imports: [BullModule.registerQueue(...queues), BullBoardModule],
  providers: [
    SendMailProcessor,
    VerifyPhoneProcessor,
    VerifyPhoneService,
    SendMailService,
  ],
  exports: [VerifyPhoneService, SendMailService],
})
export class JobModule {}
