'use client';
import { Todo } from '@repo/db';
import { useToast } from '@repo/ui/shadcn/hooks/use-toast';
import { Button } from '@repo/ui/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/ui/card';
import { useCallback } from 'react';
import { deleteTodo } from '../actions/todo';

export function TodoItem({ todo }: { todo: Todo }) {
  const { toast } = useToast();
  const handleDelete = useCallback(async () => {
    try {
      await deleteTodo(todo.id);
      toast({
        title: 'Todo deleted successfully.',
        description: 'Please refresh the page to see the changes.',
      });
    } catch (error) {
      toast({
        title: 'Failed to delete todo.',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  }, [todo.id, toast]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{todo.content}</CardTitle>
        <CardDescription>{todo.id}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant='destructive' onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
