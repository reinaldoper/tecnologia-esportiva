"use client";
import { useForm } from "react-hook-form";
import { useCreatePlan, useUpdatePlan } from "@/hooks/usePlans";
import { useEffect } from "react";
import { Plan, PlanFormData } from "@/types/plan";

export default function PlanForm({
  editingPlan,
  onFinish,
}: {
  editingPlan?: Plan;
  onFinish?: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PlanFormData>();
  const createPlan = useCreatePlan();
  const updatePlan = useUpdatePlan();

  useEffect(() => {
    if (editingPlan) {
      setValue("nome", editingPlan.nome);
      setValue("precoMensal", editingPlan.precoMensal);
      setValue("beneficios", editingPlan.beneficios);
    }
  }, [editingPlan, setValue]);

  const onSubmit = (data: PlanFormData) => {
    if (editingPlan?.id) {
      updatePlan.mutate(
        { id: editingPlan.id, ...data },
        {
          onSuccess: () => {
            reset();
            onFinish?.();
          },
        }
      );
    } else {
      createPlan.mutate(data, {
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
        {editingPlan ? "Editar plano" : "Cadastrar novo plano"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {editingPlan && <input type="hidden" value={editingPlan.id} />}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            {...register("nome", { required: true, minLength: 5 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
          {errors.nome && (
            <p className="text-red-500 text-sm">
              Nome deve ter pelo menos 5 caracteres.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Preço
          </label>
          <input
            type="number"
            step="0.01"
            {...register("precoMensal", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Benefícios
          </label>
          <textarea
            {...register("beneficios", { required: true, minLength: 10 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
          {errors.beneficios && (
            <p className="text-red-500 text-sm">
              Benefícios devem ter pelo menos 10 caracteres.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={createPlan.isPending || updatePlan.isPending}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {createPlan.isPending || updatePlan.isPending
            ? "Salvando..."
            : editingPlan
            ? "Atualizar"
            : "Salvar"}
        </button>

        {createPlan.isError && (
          <p className="text-red-500 mt-2">Erro ao salvar o plano.</p>
        )}
        {updatePlan.isError && (
          <p className="text-red-500 mt-2">Erro ao atualizar o plano.</p>
        )}
      </form>
    </div>
  );
}
