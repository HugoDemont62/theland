"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateUserInfo } from "@/actions/auth";
import { useEffect } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Mise à jour..." : "Enregistrer les modifications"}
    </button>
  );
}

interface EditProfileFormProps {
  user: {
    username: string;
    email: string;
  };
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const [state, formAction] = useFormState(updateUserInfo, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (state?.success) {
      // Optionnel : afficher une notification de succès
      alert("Profil mis à jour avec succès !");
    }
  }, [state?.success]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">
        Modifier mon profil
      </h2>

      {state?.error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-700">
          Profil mis à jour avec succès !
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={user.username}
            required
            minLength={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user.email}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
