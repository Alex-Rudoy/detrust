export type DropdownSearchProps = {
  value: string;
  id: string;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  alwaysFocused?: boolean;
};
