import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "@/app/(auth)/register/page";
import { registerUser } from "@/app/(auth)/register/register";
import { toast } from "react-toastify";

// 🔹 mock router
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// 🔹 mock register API
jest.mock("@/app/(auth)/register/register", () => ({
  registerUser: jest.fn(),
}));

// 🔹 mock toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders register form", () => {
    render(<RegisterForm />);

    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("submits register successfully", async () => {
    const user = userEvent.setup();

    (registerUser as jest.Mock).mockResolvedValueOnce({});

    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@test.com");
    await user.type(screen.getByLabelText(/password/i), "123456");

    await user.click(
      screen.getByRole("button", { name: /create account/i })
    );

    expect(registerUser).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@test.com",
      password: "123456",
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Account created successfully"
    );

    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("shows error when registration fails", async () => {
    const user = userEvent.setup();

    (registerUser as jest.Mock).mockRejectedValueOnce({
      response: {
        data: {
          message: "Email already exists",
        },
      },
    });

    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@test.com");
    await user.type(screen.getByLabelText(/password/i), "123456");

    await user.click(
      screen.getByRole("button", { name: /create account/i })
    );

    expect(toast.error).toHaveBeenCalledWith("Email already exists");
  });
});