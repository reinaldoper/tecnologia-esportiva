import { render, screen } from "@testing-library/react";
import AffiliateDetail from "@/app/affiliates/[id]/page";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({ id: "1" }),
}));

jest.mock("@/hooks/useAffiliate", () => ({
  useFetchAffiliate: () => ({
    data: {
      id: 1,
      codigo: "ABCDEF",
      membersIndicados: [{ id: 1, nome: "John Doe", email: "H2X1w@example.com" }],
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

describe("AffiliateDetail", () => {
  it("renderiza o codigo do afiliado", () => {
    renderWithAuth(<AffiliateDetail />);
    expect(screen.getByText(/ABCDEF/i)).toBeInTheDocument();
  });

  it("renderiza o email do indicado", () => {
    renderWithAuth(<AffiliateDetail />);
    expect(screen.getByText(/H2X1w@example.com/i)).toBeInTheDocument();
  });
  it("renderiza o nome do indicado", () => {
    renderWithAuth(<AffiliateDetail />);
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });
});
