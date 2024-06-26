'use server';
import { PrismaClient } from '@repo/db';

import { z } from 'zod';

const todoSchema = z.object({
  content: z.string().min(1),
});

export async function createTodo(prevState: unknown, formData: FormData) {
  const validatedFields = todoSchema.safeParse({
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.content?.join(', '),
    };
  }

  const prisma = new PrismaClient();
  await prisma.todo.create({
    data: {
      content: validatedFields.data.content,
    },
  });

  return {
    message: '',
  };
}

export async function deleteTodo(id: string) {
  const prisma = new PrismaClient();
  await prisma.todo.delete({ where: { id } });
}
