"use client";
import { useDeletePlan, useFetchPlansPaginated } from "@/hooks/usePlans";
import { Plan } from "@/types/plan";
import PlanForm from "./PlanForm";
import { useState } from "react";

export default function PlanList() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: plans, isLoading, isError } = useFetchPlansPaginated(page, limit);
  const deletePlan = useDeletePlan();
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  if (isLoading) {
    return <p className="mb-4 text-blue-100">Carregando planos...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Erro ao carregar planos.</p>;
  }

  return (
    <div>
      {editingPlan && (
        <div className="mb-6">
          <PlanForm
            editingPlan={editingPlan}
            onFinish={() => setEditingPlan(null)}
          />
        </div>
      )}

      <div className="bg-white shadow rounded p-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Nome</th>
                <th className="p-2 text-left">Preço</th>
                <th className="p-2 text-left">Benefícios</th>
                <th className="p-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {plans?.data.map((plan : Plan) => (
                <tr key={plan.id} className="border-t">
                  <td className="p-2">{plan.nome}</td>
                  <td className="p-2">R$ {plan.precoMensal}</td>
                  <td className="p-2">{plan.beneficios}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => setEditingPlan(plan)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deletePlan.mutate(plan.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {plans?.data.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    Nenhum plano cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {plans?.page} de {plans?.totalPages}
          </span>
          <button
            disabled={plans?.page === plans?.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
