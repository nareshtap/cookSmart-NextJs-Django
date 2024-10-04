import { Box, Container } from "@mui/material";
import { styled } from "@mui/system";

export const GradientBackground = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  minHeight: "100vh",
  alignItems: "center",
  animation: "gradient 15s ease infinite",
  padding: theme.spacing(6),
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: theme.spacing(4),
  maxWidth: "600px",
  borderRadius: "10px",
  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "10px",
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
}));

export const FileInputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #4caf50",
  borderRadius: "5px",
  padding: "10px",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  backgroundColor: "#fff",
}));

export const FileInput = styled("input")({
  display: "none",
});
