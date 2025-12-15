"use client";
import { useForm } from "react-hook-form";
import { useCreateAffiliate, useUpdateAffiliate } from "@/hooks/useAffiliate";
import { useEffect } from "react";
import { Affiliate } from "@/types/affiliate";
import { AffiliateFormData } from "@/types/affiliate";

export default function AffiliateForm({
  editingAffiliate,
  onFinish,
}: {
  editingAffiliate?: Affiliate;
  onFinish?: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AffiliateFormData>();
  const createAffiliate = useCreateAffiliate();
  const updateAffiliate = useUpdateAffiliate();

  useEffect(() => {
    if (editingAffiliate) {
      setValue("nome", editingAffiliate.nome);
      setValue("codigo", editingAffiliate.codigo);
    }
  }, [editingAffiliate, setValue]);

  const onSubmit = (data: AffiliateFormData) => {
    if (editingAffiliate?.id) {
      updateAffiliate.mutate(
        { id: editingAffiliate.id, ...data },
        {
          onSuccess: () => {
            reset();
            onFinish?.();
          },
        }
      );
    } else {
      createAffiliate.mutate(data, {
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
        {editingAffiliate ? "Editar afiliado" : "Cadastrar novo afiliado"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            Código
          </label>
          <input
            {...register("codigo")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={createAffiliate.isPending || updateAffiliate.isPending}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {createAffiliate.isPending || updateAffiliate.isPending
            ? "Salvando..."
            : editingAffiliate
            ? "Atualizar"
            : "Salvar"}
        </button>
      </form>
    </div>
  );
}
