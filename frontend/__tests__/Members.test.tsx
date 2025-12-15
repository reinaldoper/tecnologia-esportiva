import { render, screen } from "@testing-library/react";
import MembersPage from "@/app/members/page";

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ isAuthenticated: true }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/components/Navbar", () => {
  const MockNavbar = () => <div>Navbar</div>;
  MockNavbar.displayName = "Navbar";
  return MockNavbar;
});


jest.mock("@/app/members/components/MemberForm", () => {
  const MockMemberForm = () => <div>MemberForm</div>;
  MockMemberForm.displayName = "MemberForm";
  return MockMemberForm;
});

jest.mock("@/app/members/components/MemberList", () => {
  const MockMemberList = () => <div>MemberList</div>;
  MockMemberList.displayName = "MemberList";
  return MockMemberList;
});

describe("MembersPage", () => {
  it("renderiza título e componentes", () => {
    render(<MembersPage />);
    expect(screen.getByText(/Sócios-torcedores/i)).toBeInTheDocument();
    expect(screen.getByText("Navbar")).toBeInTheDocument();
    expect(screen.getByText("MemberForm")).toBeInTheDocument();
    expect(screen.getByText("MemberList")).toBeInTheDocument();
  });
});
