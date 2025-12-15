"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCreateMember, useUpdateMember } from "@/hooks/useMembers";
import { useFetchPlansPaginated } from "@/hooks/usePlans";
import { useFetchAffiliates } from "@/hooks/useAffiliate";
import { Member, MemberFormData } from "@/types/members";
import { Plan } from "@/types/plan";


export default function MemberForm({
  editingMember,
  onFinish,
}: {
  editingMember?: Member;
  onFinish?: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MemberFormData>();
  const createMember = useCreateMember();
  const updateMember = useUpdateMember();

  const { data: plans } = useFetchPlansPaginated();
  const { data: affiliates } = useFetchAffiliates();

  useEffect(() => {
    if (editingMember) {
      setValue("nome", editingMember.nome);
      setValue("email", editingMember.email);
      setValue("telefone", editingMember.telefone);
      setValue("planoId", editingMember.planoId);
      if (editingMember.affiliateId) {
        setValue("affiliateId", editingMember.affiliateId);
      }
    }
  }, [editingMember, setValue]);

  const onSubmit = (data: MemberFormData) => {
    if (editingMember?.id) {
      updateMember.mutate(
        { id: editingMember.id, ...data },
        {
          onSuccess: () => {
            reset();
            onFinish?.();
          },
        }
      );
    } else {
      createMember.mutate(data, {
        onSuccess: () => {
          reset();
          onFinish?.();
        },
      });
    }
  };

  return (
    <div className="bg-white shadow rounded p-6 mb-6">
      <h2 className="text-lg font-bold text-green-700 mb-4">
        {editingMember ? "Editar sócio" : "Cadastrar novo sócio"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {editingMember && <input type="hidden" value={editingMember.id} />}

        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            {...register("nome", { required: true, minLength: 5 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
          {errors.nome && (
            <p className="text-red-500 text-sm">Nome deve ter pelo menos 5 caracteres.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Informe um email válido.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone</label>
          <input
            type="tel"
            {...register("telefone", { required: true, minLength: 10 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
          {errors.telefone && (
            <p className="text-red-500 text-sm">Telefone deve ter pelo menos 10 dígitos.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Plano</label>
          {plans?.data?.length ? (
            <select
              {...register("planoId", { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
              <option value="" disabled>Selecione um plano</option>
              {plans.data.map((plano: Plan) => (
                <option key={plano.id} value={plano.id}>
                  {plano.nome}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-red-500 text-sm">Não existem planos cadastrados.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Afiliado</label>
          {affiliates?.data?.length ? (
            <select
              {...register("affiliateId", { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="">Nenhum afiliado</option>
              {affiliates.data.map((af) => (
                <option key={af.id} value={af.id}>
                  {af.nome}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-red-500 text-sm">Não existem afiliados cadastrados.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={createMember.isPending || updateMember.isPending}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {createMember.isPending || updateMember.isPending
            ? "Salvando..."
            : editingMember
            ? "Atualizar"
            : "Salvar"}
        </button>

        {createMember.isError && (
          <p className="text-red-500 mt-2">Erro ao salvar o sócio.</p>
        )}
        {updateMember.isError && (
          <p className="text-red-500 mt-2">Erro ao atualizar o sócio.</p>
        )}
      </form>
    </div>
  );
}
