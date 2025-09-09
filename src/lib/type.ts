export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
}

export type UserFormData = {
  name: string;
  email: string;
};

export interface EditAndViewDialogProps {
  open: boolean;
  handleClose: () => void;
  id: string | "";
}

export interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "button";
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  sx?: React.CSSProperties;
  size?: "small" | "medium" | "large";
  startIcon?: React.ReactElement | React.ReactNode;
  endIcon?: React.ReactElement | React.ReactNode;
  fullWidth?: boolean;
}