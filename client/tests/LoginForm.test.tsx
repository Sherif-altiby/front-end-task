import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/app/(auth)/login/page";
import { login } from "@/app/(auth)/login/login";
import { toast } from "react-toastify";

// 🔹 mock router
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// 🔹 mock redux
const dispatchMock = jest.fn();
jest.mock("@/store/hooks", () => ({
  useAppDispatch: () => dispatchMock,
}));

// 🔹 mock login API
jest.mock("@/app/(auth)/login/login", () => ({
  login: jest.fn(),
}));

// 🔹 mock toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form", () => {
    render(<LoginForm />);

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("submits login successfully", async () => {
    const user = userEvent.setup();

    (login as jest.Mock).mockResolvedValue({
      user: { id: 1, email: "test@test.com" },
    });

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "test@test.com");
    await user.type(screen.getByLabelText(/password/i), "123456");

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(login).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Login successful");
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("shows error on failed login", async () => {
    const user = userEvent.setup();

    (login as jest.Mock).mockRejectedValue({
      response: {
        data: {
          message: "Invalid credentials",
        },
      },
    });

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "wrong@test.com");
    await user.type(screen.getByLabelText(/password/i), "123");

    await user.click(screen.getByRole("button", { name: /sign in/i }));

  });
});