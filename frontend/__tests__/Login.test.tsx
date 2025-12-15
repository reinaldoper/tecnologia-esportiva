import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "@/app/login/page";


const mutateMock = jest.fn();

jest.mock("@/hooks/useAuth", () => ({
  useAuthActions: () => ({
    loginMutation: {
      mutate: mutateMock,
      isPending: false,
      isError: false,
    },
  }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    mutateMock.mockClear();
  });

  it("renderiza o título de login", () => {
    render(<LoginPage />);
    expect(
      screen.getByRole("heading", { name: /Login - Tecnologia Esportiva/i })
    ).toBeInTheDocument();
  });

  it("renderiza o link de registro", () => {
    render(<LoginPage />);
    expect(
      screen.getByRole("link", { name: /Não possui uma conta\? Registre-se/i })
    ).toBeInTheDocument();
  });

  it("chama loginMutation.mutate ao enviar o formulário", () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Senha");
    const submitButton = screen.getByRole("button", { name: "Entrar" });

    fireEvent.change(emailInput, { target: { value: "q4M0a@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);
  });
});
