import { PrismaClient } from '@repo/db';

export default async function Page() {
  const prisma = new PrismaClient();
  const todos = await prisma.todo.findMany();

  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  );
}
