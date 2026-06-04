import ProductCard from "@/features/products/components/ProductCard";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
 
// 🔹 mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// 🔹 mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

const mockProduct = {
  _id: "1",
  title: "iPhone 15",
  price: 999.99,
  description: "Latest Apple phone",
  image: "/test.jpg",
  category: "electronics",
};

describe("ProductCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(/iphone 15/i)).toBeInTheDocument();
    expect(screen.getByText("$999.99")).toBeInTheDocument();
    expect(screen.getByText(/latest apple phone/i)).toBeInTheDocument();
  });

  it("renders category badge when category exists", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(/electronics/i)).toBeInTheDocument();
  });

  it("renders link to product details", () => {
    render(<ProductCard product={mockProduct} />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/products/1");
  });

  it("handles add to cart click without navigation", async () => {
    const user = userEvent.setup();

    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(<ProductCard product={mockProduct} />);

    const button = screen.getByRole("button", { name: /add to cart/i });

    await user.click(button);

    expect(logSpy).toHaveBeenCalledWith("Add to cart:", "1");

    logSpy.mockRestore();
  });
});