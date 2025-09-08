/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUser, updateUser } from "../redux/action/userAction";

export default function EditDialog({
  open,
  handleClose,
  id,
}: {
  open: boolean;
  handleClose: () => void;
  id: string | "";
}) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleEditUser = () => {
    if (!id) return;

    if (name && email) {
      dispatch(
        updateUser({
          id,
          name,
          email,
        })
      );
      handleClose();
    }
  };

  useEffect(() => {
    if (open && id) {
      dispatch(getUser(id));
    }
  }, [open, id, dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [user]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Edit User</DialogTitle>
      <DialogContent style={{ marginTop: "0px" }}>
        <TextField
          id="filled-basic"
          label="Name"
          variant="filled"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <TextField
          id="filled-basic"
          label="Email"
          variant="filled"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleEditUser} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
