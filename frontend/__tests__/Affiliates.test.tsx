import { render, screen } from "@testing-library/react";
import AffiliatesPage from "@/app/affiliates/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => ({
    get: jest.fn(),
  }),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ isAuthenticated: true }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("@/hooks/useAffiliate", () => ({
  useFetchAffiliates: () => ({
    useFetchAffiliates: () => ({
      data: {
        data: [
          {
            id: 1,
            nome: "Afiliado Teste",
            codigo: "ABC123",
            totalIndicados: 5,
          },
        ],
        total: 1,
        page: 1,
        pageSize: 10,
      },
    }),
  }),
  useCreateAffiliate: () => ({ mutate: jest.fn(), isPending: false }),
  useUpdateAffiliate: () => ({ mutate: jest.fn(), isPending: false }),
  useDeleteAffiliate: () => ({ mutate: jest.fn(), isPending: false }),
}));

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("AffiliatesPage", () => {
  it("renderiza o título Afiliados", () => {
    renderWithProviders(<AffiliatesPage />);
    const title = screen.getByRole("heading", { name: /Afiliados/i });
    expect(title).toBeInTheDocument();
  });

  it("renderiza o formulário de afiliados", () => {
    renderWithProviders(<AffiliatesPage />);
    expect(screen.getByText(/Cadastrar novo afiliado/i)).toBeInTheDocument();
  });

  it("renderiza a opção para cadastrar um novo afiliado", () => {
    renderWithProviders(<AffiliatesPage />);
    expect(screen.getByText("Cadastrar novo afiliado")).toBeInTheDocument();
  });
});
