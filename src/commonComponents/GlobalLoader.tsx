import { Backdrop, CircularProgress } from "@mui/material";

export default function GlobalLoader({ loading }: { loading: boolean }) {
  return (
    <Backdrop sx={{ color: "var(--white)", zIndex: 1000000000 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
