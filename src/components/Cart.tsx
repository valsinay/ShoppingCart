import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useShoppingCart } from "../context/ShoppingCartContext";
import { CartItemProps, DiscountCodes, ResponseData } from "../models/App.types";
import CartItem from "./CartItem";
import { EmptyCart } from "./EmptyCart";

const API_URL_POST =
  "https://man-shopping-cart-test.azurewebsites.net/api/Cart/CalculateCost";

export const Cart = () => {
  const discountCodeRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<ResponseData>();
  const [discountCode, setDiscountCode] = useState<string>("");
  const { isOpen, toggleDrawer, cartItems } = useShoppingCart();
  const [prevCartItems, setPrevCartItems] =
    useState<CartItemProps[]>(cartItems);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const items = cartItems.map((item) => ({
    productId: item.id,
    unitQuantity: item.quantity,
  }));

  let body = useMemo(
    () => ({
      items: items,
      couponCode: items.length === 0 ? "" : discountCode,
    }),
    [items, discountCode]
  );

  const handlePostRequest = useCallback(async () => {
    try {
      const response = await fetch(API_URL_POST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setData(data);
    } finally {
    }
  }, [body]);

  useEffect(() => {
    if (JSON.stringify(cartItems) !== JSON.stringify(prevCartItems) && isOpen) {
      if (cartItems.length === 0) {
        setDiscountCode("");
      }
      handlePostRequest();
      setPrevCartItems(cartItems);
    }
  }, [handlePostRequest, cartItems, prevCartItems, discountCode, isOpen]);

  const handleDiscountCode = () => {
    if (discountCodeRef.current) {
      setDiscountCode(discountCodeRef.current.value);
      body = {
        ...body,
        couponCode: items.length === 0 ? "" : discountCodeRef.current.value,
      };
    }
    handlePostRequest();
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          ...(matches && { width: "100%" }),
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          background: "#f2f2f2",
        }}
      >
        <Typography
          component="p"
          marginRight="auto"
          fontWeight="700"
          fontSize="1.5rem"
        >
          My Cart
        </Typography>

        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider variant="fullWidth" />
      <Box
        sx={{
          height: "100%",
          width: matches ? "100%" : "650px",
          ...(cartItems.length === 0 && {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }),
        }}
        role="presentation"
      >
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <Box sx={{ padding: "1rem" }}>
              <Typography fontSize="1.2rem" fontWeight="700">
                Subtotal: ${data?.itemsCost.toFixed(2)}
              </Typography>
              <Typography fontSize="1.2rem" fontWeight="700">
                Shipping: ${data?.shippingCost.toFixed(2)}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  ...(data?.discount !== 0 && { color: "green" }),
                }}
              >
                Discount: {data?.discount !== 0 && "-"}$
                {data?.discount.toFixed(2)}
              </Typography>
              <Box marginTop="0.6rem">
                <TextField
                  size="small"
                  error={
                    discountCode !== "" &&
                    discountCode !== DiscountCodes.APPL10 &&
                    discountCode !== DiscountCodes.AUDIO15 &&
                    discountCode !== DiscountCodes.ELEC25 &&
                    discountCode !== DiscountCodes.FreeShipping
                  }
                  inputRef={discountCodeRef}
                  label="Discount code"
                  defaultValue={body.couponCode}
                />
                <Button variant="contained" onClick={handleDiscountCode}>
                  APPLY
                </Button>
              </Box>
              <Typography fontSize="1.5rem" fontWeight="700">
                Total: ${data?.finalCost.toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};
