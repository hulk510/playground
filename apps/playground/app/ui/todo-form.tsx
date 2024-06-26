'use client';

import { ModeToggle } from '@repo/ui/molecules/mode-toggle';
import { Button } from '@repo/ui/shadcn/button';
import { useToast } from '@repo/ui/shadcn/hooks/use-toast';
import { Input } from '@repo/ui/shadcn/input';
import { Label } from '@repo/ui/shadcn/label';
import { useFormState } from 'react-dom';
import { createTodo } from '../actions/todo';

const initialState = {
  message: '',
};

export function TodoForm() {
  const [state, formAction] = useFormState(createTodo, initialState);
  const { toast } = useToast();
  return (
    <form
      action={async (formData: FormData) => {
        await formAction(formData);
        toast({
          title: 'Todo added successfully.',
          description: 'Please refresh the page to see the changes.',
        });

        const input = document.getElementById('content') as HTMLInputElement;
        if (input) {
          input.value = '';
        }
      }}
      className='space-y-4'
    >
      <ModeToggle />
      <h1>Add your todo.</h1>
      <Label htmlFor='content'>Todo Content</Label>
      <Input
        name='content'
        id='content'
        placeholder='Something Add Your Todo...'
        required
      />
      <Button type='submit'>Add Todo</Button>
      <p aria-live='polite'>{state?.message}</p>
    </form>
  );
}
