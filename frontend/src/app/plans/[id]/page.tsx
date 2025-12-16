
"use client";
import { useParams } from "next/navigation";
import { useFetchPlan } from "@/hooks/usePlans";
import Link from "next/link";

export default function PlanDetailsPage() {
  const { id } = useParams();
  const { data: plan, isLoading, isError } = useFetchPlan(Number(id));

  if (isLoading) {
    return <p className="text-blue-500 text-center mt-10">Carregando...</p>;
  }
  if (isError) {
    return <p className="text-red-500 text-center mt-10">Erro ao carregar plano.</p>;
  }
  if (!plan) {
    return <p className="text-gray-500 text-center mt-10">Plano não encontrado.</p>;
  }

  return (
    <div className="min-h-screen wave-bg flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          {plan.nome}
        </h1>

        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Preço mensal:</span>{" "}
            <span className="text-green-600 font-bold">R$ {plan.precoMensal}</span>
          </p>

          <div>
            <span className="font-semibold text-gray-700">Benefícios:</span>
            <p className="mt-2 text-gray-600 whitespace-pre-line">
              {plan.beneficios}
            </p>
          </div>
        </div>

        {plan.members && plan.members.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-green-700 mb-2">
              Sócios cadastrados neste plano:
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {plan.members.map((m) => (
                <li key={m.id}>
                  {m.nome} <span className="text-sm text-gray-500">({m.email})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/plans"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Voltar para planos
          </Link>
        </div>
      </div>
    </div>
  );
}
