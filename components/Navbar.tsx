import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { theme } from "../theme";

export const Navbar = () => {
  const { toggleDrawer, cartQuantity } = useShoppingCart();

  return (
    <AppBar position="static">
      <Toolbar sx={{ background: theme.palette.primary.light }}>
        <IconButton color="inherit">
          <StorefrontIcon />
        </IconButton>
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
          Shopping Cart Task
        </Typography>
        <Stack direction="row" spacing={2}>
          <IconButton data-testid="cartBtn" color="inherit" onClick={toggleDrawer(true)}>
            <ShoppingCartIcon sx={{ position: "relative" }} />
            {cartQuantity > 0 && (
              <Typography
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "0.4rem",
                  height: "0.3rem",
                  position: "absolute",
                  top: "-4px",
                  left: "18px",
                  background: "red",
                  borderRadius: "50%",
                  border: "1px solid #fff",
                  fontWeight: "700",
                  padding: "0.6rem",
                }}
              >
                {cartQuantity}
              </Typography>
            )}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
