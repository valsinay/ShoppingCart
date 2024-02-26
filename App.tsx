import "./App.css";
import { Navbar } from "./components/Navbar";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

export const App = () => {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Products />
      <Cart />
    </ShoppingCartProvider>
  );
};

export default App;
