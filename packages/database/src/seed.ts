import { PrismaClient } from './client';

// prismaはgenerateすると@prisma/clientからexportされる
import type { Todo } from '@prisma/client';

const prisma = new PrismaClient();
const DEFAULT_TODOS = [
  // Add your own todo to pre-populate the database with
  {
    id: '1',
    content: 'Learn how to use Prisma Client',
  },
] as Array<Partial<Todo>>;

(async () => {
  try {
    await Promise.all(
      DEFAULT_TODOS.map((todo) =>
        prisma.todo.upsert({
          where: {
            id: todo.id,
          },
          update: {
            ...todo,
          },
          create: {
            ...todo,
          },
        }),
      ),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
