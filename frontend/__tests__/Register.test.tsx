import { render, screen, fireEvent } from "@testing-library/react";
import RegisterPage from "@/app/register/page";

const mutateMock = jest.fn();

jest.mock("@/hooks/useAuth", () => ({
  useAuthActions: () => ({
    registerUser: {
      mutate: mutateMock,
      isPending: false,
      isError: false,
    },
  }),
}));

describe("RegisterPage", () => {
  beforeEach(() => {
    mutateMock.mockClear();
  });

  it("renderiza o título de registro", () => {
    render(<RegisterPage />);
    expect(
      screen.getByRole("heading", { name: /Registro - Tecnologia Esportiva/i })
    ).toBeInTheDocument();
  });

  it("renderiza o link de login", () => {
    render(<RegisterPage />);
    expect(
      screen.getByRole("link", { name: /possui uma conta/i })
    ).toBeInTheDocument();
  });

  it("chama registerUser.mutate ao enviar o formulário", () => {
    render(<RegisterPage />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Senha");
    const submitButton = screen.getByRole("button", { name: "Registrar" });

    fireEvent.change(emailInput, { target: { value: "q4M0a@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);
  });
});
