
"use client";
import { useParams } from "next/navigation";
import { useFetchAffiliate } from "@/hooks/useAffiliate";
import Link from "next/link"; 

export default function AffiliateDetailsPage() {
  const { id } = useParams();
  const { data: affiliate, isLoading, isError } = useFetchAffiliate(Number(id));

  if (isLoading) {
    return <p className="text-blue-500 text-center mt-10">Carregando...</p>;
  }
  if (isError) {
    return <p className="text-red-500 text-center mt-10">Erro ao carregar afiliado.</p>;
  }
  if (!affiliate) {
    return <p className="text-gray-500 text-center mt-10">Afiliado não encontrado.</p>;
  }

  return (
    <div className="min-h-screen wave-bg flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          {affiliate.nome}
        </h1>

        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Código:</span>{" "}
            <span className="text-green-600 font-bold">{affiliate.codigo}</span>
          </p>

          <p className="text-lg">
            <span className="font-semibold text-gray-700">Total de indicados:</span>{" "}
            <span className="text-green-600 font-bold">
              {affiliate.membersIndicados.length ?? 0}
            </span>
          </p>
        </div>

        {affiliate.membersIndicados && affiliate.membersIndicados.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-green-700 mb-2">
              Sócios indicados:
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {affiliate.membersIndicados.map((m) => (
                <li key={m.id}>
                  {m.nome} <span className="text-sm text-gray-500">({m.email})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/affiliates"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Voltar para afiliados
          </Link>
        </div>
      </div>
    </div>
  );
}
