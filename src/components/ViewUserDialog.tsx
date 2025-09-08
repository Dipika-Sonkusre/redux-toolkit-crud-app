import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUser } from "../redux/action/userAction";
import { useEffect, useMemo } from "react";

export default function ViewUserDialog({
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

  useEffect(() => {
    if (open && id) {
      dispatch(getUser(id));
    }
  }, [open, id, dispatch]);

  const initials = useMemo(() => {
    const name = (user?.name || "").trim();
    if (!name) return "?";
    const parts = name.split(/\s+/);
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] || "" : "";
    return (first + last).toUpperCase();
  }, [user?.name]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="view-user-dialog-title"
      aria-describedby="view-user-dialog-description"
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle id="view-user-dialog-title" sx={{ pb: 1 }}>
        View User
      </DialogTitle>

      <Divider />

      <DialogContent id="view-user-dialog-description" sx={{ pt: 3 }}>
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          textAlign="center"
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              width: 72,
              height: 72,
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            {initials}
          </Avatar>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {user?.name || "—"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email || "—"}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2.5,
          pt: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
