'use client';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useController, useForm } from 'react-hook-form';

type FormData = {
  name: string;
};

export function NativeForm() {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
  return (
    <div>
      Formだよ
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {formState.errors.name ? <span>This field is required</span> : null}
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
    <div>
      Formだよ
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {formState.errors.name ? <span>This field is required</span> : null}
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

// 送信前にHiddenに変更されると値が送られるかの検証コンポーネント
export function HiddenSubmitForm() {
  const { handleSubmit, control } = useForm<FormData>();
  const [hidden, setHidden] = useState(false);
  const {
    field: { ref, ...field },
  } = useController({
    name: 'name',
    control,
    // shouldUnregister: hidden, // これはなんのパラメーターか？
    disabled: hidden, // これを入れると値が送られない
  });
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
  return (
    <div>
      Formだよ
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <FormControlLabel
          label='hidden'
          control={
            <Checkbox
              onChange={(e) => {
                setHidden(e.target.checked);
              }}
            />
          }
        />
        {hidden ? null : (
          <TextField
            type='text'
            {...field}
            value={field.value || ''}
            inputRef={ref}
            style={{ marginBottom: '2000px' }}
            sx={{ backgroundColor: 'white', color: 'black' }}
          />
        )}
        <button type='submit'>送信</button>
      </form>
    </div>
  );
}
