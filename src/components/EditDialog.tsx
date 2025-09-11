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
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import type { EditAndViewDialogProps, User, UserFormData } from "../lib/type";
import { schema } from "../utils/userValidation";
import CustomButton from "../commonComponents/CustomButton";
import classes from "../styles/Dialog.module.css";
import GlobalLoader from "../commonComponents/GlobalLoader";
import ErrorIcon from "@mui/icons-material/Error";

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
    defaultValues: { name: "", email: "", age: 18, address: "", phone: "" },
  });

  const onSubmit = async (data: UserFormData) => {
    // instead of FormData create your own Form Type "UserFormData"
    if (!id) return;

    setIsSubmitting(true);
    const userToUpdate: User = {
      id,
      ...data,
      phone: data.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
    };
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
      setValue("age", user.age);
      setValue("address", user.address);
      setValue("phone", user.phone.replace(/-/g, ""));
    } else {
      setValue("name", "");
      setValue("email", "");
      setValue("age", 18);
      setValue("address", "");
      setValue("phone", "");
    }
  }, [user, setValue]);

  const autoFormatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    return (e.target.value = e.target.value
      .replace(/[^0-9]/g, "")
      .slice(0, 10));
  };

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
              <Box className="error-container">
                <ErrorIcon sx={{ color: "red", fontSize: "20px" }} />
                <Typography variant="body1" className="error">
                  {errors?.name?.message}
                </Typography>
              </Box>
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
              <Box className="error-container">
                <ErrorIcon sx={{ color: "red", fontSize: "20px" }} />
                <Typography variant="body1" className="error">
                  {errors?.email?.message}
                </Typography>
              </Box>
            )}

            <TextField
              id="age"
              label="Age"
              variant="filled"
              {...register("age")}
              fullWidth
              type="number"
            />
            {errors.age && (
              <Box className="error-container">
                <ErrorIcon sx={{ color: "red", fontSize: "20px" }} />
                <Typography variant="body1" className="error">
                  {errors?.age?.message}
                </Typography>
              </Box>
            )}

            <TextField
              id="address"
              label="Address"
              variant="filled"
              {...register("address")}
              fullWidth
              multiline
            />
            {errors.address && (
              <Box className="error-container">
                <ErrorIcon sx={{ color: "red", fontSize: "20px" }} />
                <Typography variant="body1" className="error">
                  {errors?.address?.message}
                </Typography>
              </Box>
            )}

            <TextField
              id="phone"
              label="Phone"
              variant="filled"
              {...register("phone")}
              fullWidth
              type="tel"
              onInput={autoFormatPhone}
            />
            {errors.phone && (
              <Box className="error-container">
                <ErrorIcon sx={{ color: "red", fontSize: "20px" }} />
                <Typography variant="body1" className="error">
                  {errors?.phone?.message}
                </Typography>
              </Box>
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

