import { Button } from "@mui/material";
import type { CustomButtonProps } from "../lib/type";

export default function CustomButton({
  children,
  onClick,
  className,
  type,
  disabled,
  variant = "contained",
  color,
  sx,
  size,
  startIcon,
  endIcon,
  fullWidth,
}: CustomButtonProps) {
  return (
    <Button
      type={type}
      variant={variant}
      className={className}
      onClick={onClick}
      disabled={disabled}
      color={color}
      sx={sx}
      size={size}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {children}
    </Button>
  );
}
