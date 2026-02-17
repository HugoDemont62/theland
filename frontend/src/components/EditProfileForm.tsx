"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { updateUserInfo } from "@/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-tea-700 px-6 py-2.5 text-sm font-semibold text-cream transition-all duration-200 hover:bg-tea-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Mise a jour..." : "Enregistrer"}
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
  const [state, formAction] = useActionState(updateUserInfo, {
    error: "",
    success: false,
  });

  useEffect(() => {
    if (state?.success) {
      alert("Profil mis a jour avec succes !");
    }
  }, [state?.success]);

  return (
    <div className="rounded-2xl border border-tea-200/60 bg-white p-8 shadow-sm">
      <h2 className="mb-6 font-heading text-xl font-semibold text-tea-900">
        Modifier mon profil
      </h2>

      {state?.error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-700">{state.error}</p>
        </div>
      )}

      {state?.success && (
        <div className="mb-4 rounded-lg border border-sage-200 bg-sage-50 px-4 py-3">
          <p className="text-sm font-medium text-sage-700">
            Profil mis a jour avec succes !
          </p>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="edit-username"
            className="mb-1.5 block text-sm font-medium text-tea-700"
          >
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="edit-username"
            name="username"
            defaultValue={user.username}
            required
            minLength={3}
            className="w-full rounded-lg border border-tea-200 bg-cream/50 px-4 py-2.5 text-sm text-tea-900 outline-none transition-all duration-200 placeholder:text-tea-400 focus:border-tea-400 focus:ring-2 focus:ring-tea-200"
          />
        </div>

        <div>
          <label
            htmlFor="edit-email"
            className="mb-1.5 block text-sm font-medium text-tea-700"
          >
            Email
          </label>
          <input
            type="email"
            id="edit-email"
            name="email"
            defaultValue={user.email}
            required
            className="w-full rounded-lg border border-tea-200 bg-cream/50 px-4 py-2.5 text-sm text-tea-900 outline-none transition-all duration-200 placeholder:text-tea-400 focus:border-tea-400 focus:ring-2 focus:ring-tea-200"
          />
        </div>

        <div className="flex justify-end pt-2">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
