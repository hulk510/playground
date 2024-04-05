'use client';
import { TextField } from '@mui/material';
import { SubmitHandler, useController, useForm } from 'react-hook-form';

type FormData = {
  name: string;
};

export function NativeForm() {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
  return (
    <div style={{ color: 'white' }}>
      Formだよ
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {formState.errors.name ? (
          <span style={{ color: 'white' }}>This field is required</span>
        ) : null}
        <input
          type='text'
          {...register('name', {
            required: '必須項目です',
          })}
          style={{ marginBottom: '2000px' }}
        />
        <button type='submit'>送信</button>
      </form>
    </div>
  );
}

// submit時にエラーになってもfocusされない。
export function ControllerForm() {
  const { handleSubmit, formState, control } = useForm<FormData>();
  const {
    field: { ref, ...field },
  } = useController({
    name: 'name',
    control,
    rules: { required: '必須項目です' },
  });
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
  return (
    <div style={{ color: 'white' }}>
      Formだよ
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {formState.errors.name ? (
          <span style={{ color: 'white' }}>This field is required</span>
        ) : null}
        <TextField
          type='text'
          {...field}
          inputRef={ref}
          style={{ marginBottom: '2000px' }}
          sx={{ backgroundColor: 'white', color: 'black' }}
        />
        <button type='submit'>送信</button>
      </form>
    </div>
  );
}
