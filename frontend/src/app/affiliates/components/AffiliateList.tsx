"use client";
import { useDeleteAffiliate, useFetchAffiliates } from "@/hooks/useAffiliate";
import { useState } from "react";
import AffiliateForm from "./AffiliateForm";
import { Affiliate } from "@/types/affiliate";

export default function AffiliateList() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: affiliates, isLoading, isError } = useFetchAffiliates(page, limit);
  const deleteAffiliate = useDeleteAffiliate();
  const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | null>(null);

  if (isLoading) return <p className="mb-4 text-blue-100">Carregando afiliados...</p>;
  if (isError) return <p className="text-red-500">Erro ao carregar afiliados.</p>;

  return (
    <div>
      {editingAffiliate && (
        <AffiliateForm
          editingAffiliate={editingAffiliate}
          onFinish={() => setEditingAffiliate(null)}
        />
      )}

      <div className="bg-white shadow rounded p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Nome</th>
                <th className="p-2 text-left">Código</th>
                <th className="p-2 text-left">Indicados</th>
                <th className="p-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {affiliates?.data.map((affiliate) => (
                <tr key={affiliate.id} className="border-t">
                  <td className="p-2">{affiliate.nome}</td>
                  <td className="p-2">{affiliate.codigo}</td>
                  <td className="p-2">{affiliate.totalIndicados?.length}</td>
                  <td className="p-2 text-center flex gap-2 justify-center">
                    <button
                      onClick={() => setEditingAffiliate(affiliate)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteAffiliate.mutate(affiliate.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {affiliates?.data.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    Nenhum afiliado cadastrado.
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
            Página {affiliates?.page} de {affiliates?.totalPages}
          </span>
          <button
            disabled={affiliates?.page === affiliates?.totalPages}
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
