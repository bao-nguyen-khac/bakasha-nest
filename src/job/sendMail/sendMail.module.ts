import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BullBoardModule } from 'src/bull-board/bull-board.module';
import { sendMailController } from './sendMail.controller';
import { sendMailProcessor } from './sendMail.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'sendMail',
    }),
    BullBoardModule,
  ],
  controllers: [sendMailController],
  providers: [sendMailProcessor],
})
export class sendMailModule {}
