
"use client";
import { useParams } from "next/navigation";
import { useFetchMember } from "@/hooks/useMembers";
import Link from "next/link";

export default function MemberDetailsPage() {
  const { id } = useParams();
  const { data: member, isLoading, isError } = useFetchMember(Number(id));

  if (isLoading) {
    return <p className="text-blue-500 text-center mt-10">Carregando...</p>;
  }
  if (isError) {
    return <p className="text-red-500 text-center mt-10">Erro ao carregar sócio.</p>;
  }
  if (!member) {
    return <p className="text-gray-500 text-center mt-10">Sócio não encontrado.</p>;
  }

  return (
    <div className="min-h-screen wave-bg flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          {member.nome}
        </h1>

        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            <span className="text-green-600">{member.email}</span>
          </p>

          <p className="text-lg">
            <span className="font-semibold text-gray-700">Telefone:</span>{" "}
            <span className="text-green-600">{member.telefone}</span>
          </p>

          <p className="text-lg">
            <span className="font-semibold text-gray-700">Plano-ID:</span>{" "}
            <span className="text-green-600">{member.planoId}</span>
          </p>

          {member.affiliateId && (
            <p className="text-lg">
              <span className="font-semibold text-gray-700">Afiliado-ID:</span>{" "}
              <span className="text-green-600">{member.affiliateId}</span>
            </p>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/members"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Voltar para sócios
          </Link>
        </div>
      </div>
    </div>
  );
}
