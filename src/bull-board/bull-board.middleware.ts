import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Queue } from 'bull';
import { getBullBoardQueuesAdapted } from './bull-board.helper';

@Injectable()
export class BullBoardMiddleware implements NestMiddleware {
  @Inject('Queues')
  private readonly queues: Queue[];
  use(req: any, res: any, next: () => void) {
    const serverAdapter = new ExpressAdapter();
    createBullBoard({
      queues: getBullBoardQueuesAdapted(this.queues),
      serverAdapter,
    });
    serverAdapter.setBasePath('/api/bull-board');
    const router = serverAdapter.getRouter();
    router(req, res, next);
  }
}
