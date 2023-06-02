import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Queue } from 'bull';
import { getQueuesRegistrations, getQueuesTokens } from './bull-board.helper';
import { BullBoardMiddleware } from './bull-board.middleware';

const queuesNames = ['sendMail'];
const queuesRegistrations = getQueuesRegistrations(queuesNames);
@Module({
  imports: queuesRegistrations,
  exports: queuesRegistrations,
  providers: [
    {
      provide: 'Queues',
      useFactory: (...queue: Queue[]) => queue,
      inject: getQueuesTokens(queuesNames),
    },
  ],
})
export class BullBoardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BullBoardMiddleware).forRoutes('/bull-board');
  }
}
