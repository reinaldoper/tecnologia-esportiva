import { render, screen } from "@testing-library/react";
import MemberDetailPage from "@/app/members/[id]/page";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({ id: "1" }),
}));

jest.mock("@/hooks/useMembers", () => ({
  useFetchMember: () => ({
    data: {
      id: 1,
      nome: "John Doe",
      telefone: "123456789",
      email: "H2X1w@example.com",
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

describe("MemberDetailPage", () => {
  it("renderiza o email do membro", () => {
    renderWithAuth(<MemberDetailPage />);
    expect(screen.getByText(/H2X1w@example.com/i)).toBeInTheDocument();
  });

  it("renderiza o telefone do membro", () => {
    renderWithAuth(<MemberDetailPage />);
    expect(screen.getByText(/123456789/i)).toBeInTheDocument();
  });
  it("renderiza o nome do membro", () => {
    renderWithAuth(<MemberDetailPage />);
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });
});
