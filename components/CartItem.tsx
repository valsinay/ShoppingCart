import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from '@mui/icons-material/Delete';
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItemProps } from "../interfaces/App.types";

const CartItem = ({ id, quantity }: CartItemProps) => {
  const {
    products,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const product = products.find((i) => i.id === id);
  if (product == null) return null;

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        padding="1rem"
        height="100%"
        maxHeight="6.25rem"
        sx={{
          ...(matches && {
            flexDirection: "column",
            height: "auto",
            maxHeight: "none",
          }),
        }}
      >
        <Avatar
          src={product.imageUrl}
          sx={{ width: 96, height: 96, mr: 2, objectFit: "contain" }}
        />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            ...(!matches && {
              justifyContent: "normal",
            }),
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
            width="10rem"
            sx={{ ...(matches && { width: "100%", marginBottom: "0.6rem" }) }}
          >
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body1" justifyContent="end">
              ${product.price.toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
                color: "text.secondary",
                "& svg": {
                  m: 1,
                },
                ...(matches && { height: "fit-content" }),
              }}
            >
              <Button
                onClick={() => decreaseCartQuantity(id)}
                sx={{ height: "2rem" }}
              >
                <RemoveIcon />
              </Button>
              <Typography component="span" fontWeight="700">
                {quantity}
              </Typography>
              <Button
                onClick={() => increaseCartQuantity(id)}
                sx={{ height: "2rem" }}
              >
                <AddIcon />
              </Button>
            </Box>
            <Button onClick={() => removeFromCart(id)} sx={{ height: "2rem" }}>
              <DeleteIcon fontSize="medium" color="error" />
            </Button>
          </Box>
        </Box>
        <Typography
          component="span"
          marginLeft="auto"
          fontSize={"1.5rem"}
          fontWeight="700"
          sx={{ ...(matches && { marginTop: "0.6rem" }) }}
        >
          ${(quantity * product.price).toFixed(2)}
        </Typography>
      </Box>
      <Divider variant="middle" />
    </>
  );
};

export default CartItem;
