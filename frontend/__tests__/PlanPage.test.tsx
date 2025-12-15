import { render, screen } from "@testing-library/react";
import PlansPage from "@/app/plans/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => ({
    get: jest.fn(),
  }),
}));


jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ isAuthenticated: true }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));


jest.mock("@/hooks/usePlans", () => ({
  useFetchPlans: () => ({
    data: { data: [{ id: 1, nome: "Plano Teste", precoMensal: 99, beneficios: "Benefício X" }] },
  }),
  useCreatePlan: () => ({ mutate: jest.fn(), isPending: false }),
  useUpdatePlan: () => ({ mutate: jest.fn(), isPending: false }),
  useDeletePlan: () => ({ mutate: jest.fn(), isPending: false }),
  useFetchPlansPaginated: () => ({
    data: {
      data: [{ id: 1, nome: "Plano Teste", precoMensal: 99, beneficios: "Benefício X" }],
      total: 1,
      page: 1,
      pageSize: 10,
    },
  }),
}));

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("PlansPage", () => {
  it("renderiza o título Planos", () => {
    renderWithProviders(<PlansPage />);
    const title = screen.getByRole("heading", { name: /Planos/i });
    expect(title).toBeInTheDocument();
  });

  it("renderiza o formulário de planos", () => {
    renderWithProviders(<PlansPage />);
    expect(screen.getByText(/Cadastrar novo plano/i)).toBeInTheDocument();
  });

  it("renderiza a lista de planos", () => {
    renderWithProviders(<PlansPage />);
    expect(screen.getAllByText("Planos")).toHaveLength(2);
  });
});
