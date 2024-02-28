import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { Products } from '../components/Products';
import { Navbar } from '../components/Navbar';
import { Cart } from '../components/Cart';

jest.mock('../context/ShoppingCartContext');

describe('Products', () => {
  beforeEach(() => {
    useShoppingCart.mockReturnValue({
      products: [],
      loading: true,
      increaseCartQuantity: jest.fn(),
      handleChange: jest.fn(),
      sortString: '',
    });
  });

  it('renders without crashing', () => {
    render(<Products />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays a loading spinner when loading', () => {
    render(<Products />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays a product when there is one', () => {
    useShoppingCart.mockReturnValue({
      products: [
        {
          id: 1,
          name: "Test Product",
          imageUrl:
            "https://images.unsplash.com/photo-1492107376256-4026437926cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80",
          supplierId: 1,
          wholesalePrice: 2,
          price: 4,
          categories: ["accessory"],
        },
      ],
      loading: false,
      increaseCartQuantity: jest.fn(),
      handleChange: jest.fn(),
      sortString: "",
    });
    render(<Products />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('displays a counter when an item is added to the cart', () => {
    const increaseCartQuantity = jest.fn()
    const toggleDrawer = jest.fn();

    useShoppingCart.mockReturnValue({
      products: [{ id: 1,
        name: "Test Product",
        imageUrl:
          "https://images.unsplash.com/photo-1492107376256-4026437926cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80",
        supplierId: 1,
        wholesalePrice: 2,
        price: 4,
        categories: ["accessory"], }],
      loading: false,
      increaseCartQuantity,
      handleChange: jest.fn(),
      toggleDrawer,
      sortString: '',
      cartQuantity:1
    });

    render(<Navbar />);
    render(<Products />);

    const addButton = screen.getByRole('button', { name: 'Add To Cart' });
    fireEvent.click(addButton);

    expect(increaseCartQuantity).toHaveBeenCalledWith(1);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('displays correct product quantity in the cart', () => {
    const increaseCartQuantity = jest.fn()
    const toggleDrawer = jest.fn();

    useShoppingCart.mockReturnValue({
      products: [{ id: 1,
        name: "Test Product",
        imageUrl:
          "https://images.unsplash.com/photo-1492107376256-4026437926cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80",
        supplierId: 1,
        wholesalePrice: 2,
        price: 4,
        categories: ["accessory"], }],
      loading: false,
      increaseCartQuantity,
      handleChange: jest.fn(),
      toggleDrawer,
      sortString: '',
      cartQuantity:1,
      cartItems:[{id:1,quantity:1}]
    });

    render(<Navbar />);
    render(<Products />);
    
    
    const addButton = screen.getByRole('button', { name: 'Add To Cart' });
    fireEvent.click(addButton);
    
    const cartButton = screen.getByTestId('cartBtn');
    fireEvent.click(cartButton)
    render(<Cart />);

    expect(increaseCartQuantity).toHaveBeenCalledWith(1);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Your Cart Is Empty')).toBeInTheDocument();

  });

});