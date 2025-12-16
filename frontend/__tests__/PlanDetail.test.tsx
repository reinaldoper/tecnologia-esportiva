import { render, screen } from "@testing-library/react";
import PlanDetailPage from "@/app/plans/[id]/page";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({ id: "1" }),
}));

jest.mock("@/hooks/usePlans", () => ({
  useFetchPlan: () => ({
    data: {
      id: 1,
      precoMensal: 233,
      beneficios: "Melhores planos do momento.",
    },
    isLoading: false,
    isError: false,
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

describe("PlanDetailPage", () => {
  it("renderiza o preço mensal da page PlanDetailPage", () => {
    renderWithAuth(<PlanDetailPage />);
    expect(screen.getByText(/233/i)).toBeInTheDocument();
  });

  it("renderiza os beneficios do plano", () => {
    renderWithAuth(<PlanDetailPage />);
    expect(screen.getByText(/Melhores planos do momento./i)).toBeInTheDocument();
  });
  it("renderiza o botão de Voltar para planos", () => {
    renderWithAuth(<PlanDetailPage />);
    expect(screen.getByText(/Voltar para planos/i)).toBeInTheDocument();
  });
});
