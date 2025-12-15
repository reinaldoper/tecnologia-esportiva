import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => ({
    get: jest.fn(),
  }),
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ isAuthenticated: true }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));



jest.mock("@/hooks/usePlans", () => ({
  useFetchPlans: () => ({ data: { data: [{ id: 1, nome: "Plano Teste" }] } }),
}));

jest.mock("@/hooks/useMembers", () => ({
  useFetchMembers: () => ({
    data: { data: [{ id: 1, nome: "Membro Teste" }] },
  }),
}));

jest.mock("@/hooks/useAffiliate", () => ({
  useFetchAffiliateRanking: () => ({
    data: [{ id: 1, nome: "Afiliado Top", codigo: "123", totalIndicados: 5 }],
  }),
}));

function renderWithAuth(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{ui}</AuthProvider>
    </QueryClientProvider>
  );
}

describe("HomePage", () => {
  it("renderiza o título de Planos ativos", () => {
    renderWithAuth(<HomePage />);
    expect(screen.getByText(/Planos ativos/i)).toBeInTheDocument();
  });

  it("renderiza a mensagem de Sócios-torcedores", () => {
    renderWithAuth(<HomePage />);
    expect(screen.getByText(/Sócios-torcedores/i)).toBeInTheDocument();
  });

  it("renderiza o título de Top Afiliado", () => {
    renderWithAuth(<HomePage />);
    expect(screen.getByText(/Top Afiliado/i)).toBeInTheDocument();
  });
  it("mostra o número de planos ativos", () => {
    renderWithAuth(<HomePage />);
    expect(screen.getAllByText("1")).toHaveLength(2);

  });

  it("mostra o nome do top afiliado", () => {
    renderWithAuth(<HomePage />);
    expect(screen.getByText("Afiliado Top")).toBeInTheDocument();
  });
});
