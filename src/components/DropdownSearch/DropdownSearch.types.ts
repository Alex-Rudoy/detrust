import { ChangeEvent, FocusEvent } from 'react';

export type DropdownSearchProps = {
  value: string;
  id: string;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  alwaysFocused?: boolean;
};
