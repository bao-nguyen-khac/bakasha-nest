import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from '../services/author.service';

describe('AuthorController', () => {
  let controller: AuthorController;
  const mockAuthorService = {
    createAuthor: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
    getAll: jest.fn(),
    findById: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [AuthorService],
    })
      .overrideProvider(AuthorService)
      .useValue(mockAuthorService)
      .compile();

    controller = module.get<AuthorController>(AuthorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new author', async () => {
    const dto = {
      name: 'John',
    };
    expect(await controller.createAuthor(dto)).toEqual({
      author: {
        id: expect.any(Number),
        ...dto,
      },
      successs: true,
    });
    expect(mockAuthorService.createAuthor).toHaveBeenCalledWith(dto);
  });
});
