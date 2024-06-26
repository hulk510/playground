import { PrismaClient } from '@repo/db';
import { TodoForm } from '../ui/todo-form';
import { TodoItem } from '../ui/todo-item';

export default async function Page() {
  const prisma = new PrismaClient();
  const todos = await prisma.todo.findMany();

  return (
    <div className='container mx-auto space-y-8 px-4'>
      <TodoForm />
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
