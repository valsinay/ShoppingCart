import { Typography } from "@mui/material";

export const EmptyCart = () => {
  return (
    <>
      <img
        style={{ width: "100%" }}
        src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
        alt="empty cart"
      />
      <Typography
        fontSize="2rem"
        fontWeight="700"
        fontFamily="monospace"
        component="p"
        align="center"
      >
        Your Cart Is Empty
      </Typography>
    </>
  );
};
