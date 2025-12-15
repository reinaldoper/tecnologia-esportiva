"use client";
import { useState } from "react";
import { useFetchMembers, useDeleteMember } from "@/hooks/useMembers";
import MemberForm from "./MemberForm";
import { Member } from "@/types/members";

export default function MemberList() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: members, isLoading, isError } = useFetchMembers(page, limit);
  const deleteMember = useDeleteMember();
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  if (isLoading)
    return <p className="mb-4 text-blue-100">Carregando sócios...</p>;
  if (isError) return <p className="text-red-500">Erro ao carregar sócios.</p>;

  return (
    <div>
      {editingMember && (
        <MemberForm
          editingMember={editingMember}
          onFinish={() => setEditingMember(null)}
        />
      )}

      <div className="bg-white shadow rounded p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Nome</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {members?.data.map((member: Member) => (
                <tr key={member.id} className="border-t">
                  <td className="p-2">{member.nome}</td>
                  <td className="p-2">{member.email}</td>
                  <td className="p-2 text-center flex gap-2 justify-center">
                    <button
                      onClick={() => setEditingMember(member)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteMember.mutate(member.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {members?.data.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    Nenhum sócio cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>
              Página {members?.page} de {Math.ceil(members?.total / limit)}
            </span>
            <button
              disabled={members?.data.length < limit}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
