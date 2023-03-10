import { TextField, TextFieldProps } from '@mui/material';
import { Control, useController } from 'react-hook-form';

export type InputFieldProps = TextFieldProps & {
  name: string;
  control: Control<any>;
};

export function InputField({
  control,
  name,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ref: externalRef,
  value: externalValue,
  ...rest
}: InputFieldProps) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control, rules: { minLength: 4 } });

  // render whatever you want
  return (
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      fullWidth
      size="small"
      variant="outlined"
      margin="normal"
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  );
}
