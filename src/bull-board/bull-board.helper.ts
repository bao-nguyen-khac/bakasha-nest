import { BullModule } from '@nestjs/bull';
import { getQueueToken } from '@nestjs/bull-shared';
import { Queue } from 'bull';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

export const getQueuesRegistrations = (queueNames: string[]) => {
  return queueNames.map((name) =>
    BullModule.registerQueue({
      name,
    }),
  );
};

export const getQueuesTokens = (queueNames: string[]) => {
  return queueNames.map((name) => getQueueToken(name));
};

export const getBullBoardQueuesAdapted = (queues: Queue[]) => {
  return queues.map((queue) => new BullMQAdapter(queue));
};
