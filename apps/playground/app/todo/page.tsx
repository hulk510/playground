import { PrismaClient } from '@repo/db';
import { ModeToggle } from '@repo/ui/molecules/mode-toggle';
import { Input } from '@repo/ui/shadcn/input';

export default async function Page() {
  const prisma = new PrismaClient();
  const todos = await prisma.todo.findMany();

  return (
    <div className='container mx-auto px-4'>
      <h1>Hello World</h1>
      <ModeToggle />
      <Input placeholder='Something Add Your Todo...' />
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  );
}
