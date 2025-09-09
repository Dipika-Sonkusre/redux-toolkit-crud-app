/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUser, updateUser } from "../redux/action/userAction";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import type { EditAndViewDialogProps, User, UserFormData } from "../lib/type";
import { schema } from "../utils/userValidation";
import CustomButton from "../commonComponents/CustomButton";
import classes from "../styles/Dialog.module.css";
import GlobalLoader from "../commonComponents/GlobalLoader";

export default function EditDialog({
  open,
  handleClose,
  id,
}: EditAndViewDialogProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: UserFormData) => {
    // instead of FormData create your own Form Type "UserFormData"
    if (!id) return;

    setIsSubmitting(true);
    const userToUpdate: User = { id, ...data };
    await dispatch(updateUser(userToUpdate));
    setIsSubmitting(false);
    handleClose();
  };

  // fetch user by id
  useEffect(() => {
    if (open && id) {
      dispatch(getUser(id));
    }
  }, [open, id, dispatch]);

  // set form values when user data is available
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
    } else {
      setValue("name", "");
      setValue("email", "");
    }
  }, [user, setValue]);

  return (
    <>
      {isSubmitting && <GlobalLoader loading={true} />}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Box className={classes["title"]}>
            <h2>Edit User</h2>
          </Box>
          <Divider />
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              id="name"
              label="Name"
              variant="filled"
              {...register("name")}
              fullWidth
            />
            {errors.name && (
              <span style={{ color: "red" }}>{errors?.name?.message}</span>
            )}
            <TextField
              id="email"
              type="email"
              label="Email"
              variant="filled"
              fullWidth
              {...register("email")}
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors?.email?.message}</span>
            )}
          </DialogContent>
          <DialogActions>
            <CustomButton
              onClick={handleClose}
              sx={{
                backgroundColor: "var(--color-gray)",
              }}
            >
              Cancel
            </CustomButton>

            <CustomButton
              type="submit"
              sx={{
                backgroundColor: "var(--color-success)",
              }}
            >
              Save
            </CustomButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
