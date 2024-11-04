
import { Box, Typography } from "@mui/material";

const Error = () => {
  

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
        style={{ width: "64px", height: "64px", color: "#dc2626" }} 
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>
      <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
       Ha ocurrido un error en la carga de datos.
      </Typography>
    </Box>
  );
};

export default Error;
