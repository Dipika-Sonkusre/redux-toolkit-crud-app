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