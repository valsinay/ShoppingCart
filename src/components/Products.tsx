import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import SortIcon from "@mui/icons-material/Sort";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Category, SortEnums } from "../models/App.types";

export const Products = () => {
  const { products, loading, increaseCartQuantity, handleChangeSort, sortString } =
    useShoppingCart();

  const categories: Category[] = ["accessory", "audio", "electronic"];
  const [category, setCategory] = useState<string[]>([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const handleSelect = (event: SelectChangeEvent<typeof category>) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  const handleSortChange = (sort: string) => {
    let orderedProducts = [...products];

    if (category.length) {
      orderedProducts = orderedProducts.filter((product) =>
        (Array.isArray(product.categories)
          ? product.categories
          : [product.categories]
        ).some((productCategory) => category.includes(productCategory))
      );
    }

    switch (sort) {
      case SortEnums.NAME_ASC:
        orderedProducts.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case SortEnums.NAME_DESC:
        orderedProducts.sort((a, b) => (a.name > b.name ? -1 : 1));
        break;
      case SortEnums.PRICE_ASC:
        orderedProducts.sort((a, b) => a.price - b.price);
        break;
      case SortEnums.PRICE_DESC:
        orderedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
    }

    return orderedProducts;
  };

  return (
    <Container
      maxWidth={false}
      style={
        loading ? { display: "flex", flexGrow: "1", alignItems: "center" } : {}
      }
    >
      {products.length > 0 && !loading && (
        <Box display="flex" alignItems="center" marginTop="1rem">
          <FormControl>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortString}
              label="Sort by"
              onChange={handleChangeSort}
              IconComponent={() => <SortIcon sx={{ marginRight: "14px" }} />}
            >
              <MenuItem value={SortEnums.NAME_ASC}>Name (A-Z)</MenuItem>
              <MenuItem value={SortEnums.NAME_DESC}>Name (Z-A)</MenuItem>
              <MenuItem value={SortEnums.PRICE_ASC}>Price (Low - High)</MenuItem>
              <MenuItem value={SortEnums.PRICE_DESC}>Price (High - Low)</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              ...(matches
                ? {
                    width: "-webkit-fill-available",
                    flexBasis: "50%",
                    justifyContent: "space-evenly",
                  }
                : {}),
            }}
          >
            <FormControl
              sx={{ m: 1, ...(matches ? { width: "100%" } : { width: 250 }) }}
            >
              <InputLabel>Filter by</InputLabel>
              <Select
                multiple
                value={category}
                onChange={handleSelect}
                input={<OutlinedInput label="Filter by" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {categories.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={category.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        sx={{
          ...(loading && {
            height: "100%",
            alignItems: "center",
          }),
        }}
      >
        {loading ? (
          <CircularProgress sx={{ marginTop: "1rem" }} />
        ) : (
          handleSortChange(sortString).map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              marginBlockStart={4}
              key={product.id}
              display="flex"
              justifyContent="center"
            >
              <Card
                sx={{ maxWidth: 345 }}
                style={{ padding: "0.5rem", marginBottom: "2rem" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.imageUrl}
                    alt="product"
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {product.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    style={{ marginRight: "auto" }}
                    onClick={() => increaseCartQuantity(product.id)}
                  >
                    Add To Cart
                  </Button>
                  <Typography gutterBottom variant="h5" component="span">
                    Price: ${product.price.toFixed(2)}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};
