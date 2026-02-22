import Link from "next/link";

const TIMELINE = [
  {
    year: "2020",
    title: "Le debut de la folie",
    description:
      "Deux passionnes completement fadas se rencontrent lors d'un voyage au Japon et decident de partager leur amour du the.",
  },
  {
    year: "2021",
    title: "Les premiers imports",
    description:
      "Premiere selection directe aupres de producteurs en Chine, au Japon et en Inde. Le debut d'une aventure folle.",
  },
  {
    year: "2023",
    title: "La boutique en ligne",
    description:
      "Lancement de The Fada pour rendre nos thes accessibles a tous les fadas du monde entier.",
  },
  {
    year: "2024",
    title: "La communaute grandit",
    description:
      "Plus de 1000 fadas rejoignent notre communaute de passionnes.",
  },
];

const TEAM = [
  {
    name: "Marie Dupont",
    role: "Fondatrice & Tea Master",
    description:
      "Formee au Japon pendant 3 ans, Marie est la plus fada de nous tous. Certifiee Tea Master.",
  },
  {
    name: "Thomas Laurent",
    role: "Co-fondateur & Sourcing",
    description:
      "Thomas parcourt les jardins de the du monde entier. Un vrai globe-trotter fada.",
  },
  {
    name: "Sophie Chen",
    role: "Experte The Chinois",
    description:
      "Originaire du Fujian, Sophie apporte son expertise unique des thes chinois traditionnels.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-73px)] bg-cream">
      {/* Hero */}
      <section className="border-b border-tea-200/60 bg-parchment">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-tea-500">
              Notre Histoire
            </p>
            <h1 className="font-heading text-5xl font-bold text-tea-900">
              On est fadas du the, et on assume !
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-tea-600">
              The Fada est ne de la conviction que chaque tasse de the peut etre
              un moment d'exception. Et qu'il faut etre un peu fada pour
              chercher la perfection dans une feuille.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-tea-500">
              Notre Mission
            </p>
            <h2 className="font-heading text-4xl font-bold text-tea-900">
              Rendre le the d'exception accessible a tous les fadas
            </h2>
            <p className="mt-6 leading-relaxed text-tea-600">
              On croit que le the de qualite ne devrait pas etre reserve a une
              elite. C'est pourquoi on travaille directement avec les
              producteurs pour proposer des thes exceptionnels a des prix
              justes.
            </p>
            <p className="mt-4 leading-relaxed text-tea-600">
              Chaque the de notre collection est goute, approuve et selectionne
              par notre equipe de fadas. On privilegia les petits producteurs
              qui partagent notre exigence de qualite.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-tea-100 p-8 text-center">
              <p className="font-heading text-4xl font-bold text-tea-800">40+</p>
              <p className="mt-1 text-sm text-tea-600">References</p>
            </div>
            <div className="rounded-2xl bg-sage-100 p-8 text-center">
              <p className="font-heading text-4xl font-bold text-sage-800">12</p>
              <p className="mt-1 text-sm text-sage-600">Pays d'origine</p>
            </div>
            <div className="rounded-2xl bg-matcha-100 p-8 text-center">
              <p className="font-heading text-4xl font-bold text-matcha-800">25+</p>
              <p className="mt-1 text-sm text-matcha-600">Producteurs</p>
            </div>
            <div className="rounded-2xl bg-tea-50 p-8 text-center">
              <p className="font-heading text-4xl font-bold text-tea-700">1000+</p>
              <p className="mt-1 text-sm text-tea-500">Fadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-tea-200/60 bg-parchment">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-tea-500">
              Parcours
            </p>
            <h2 className="font-heading text-4xl font-bold text-tea-900">
              L'histoire d'une belle folie
            </h2>
          </div>

          <div className="mx-auto max-w-2xl space-y-8">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tea-600 text-sm font-bold text-cream">
                    {item.year.slice(2)}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="mt-2 h-full w-px bg-tea-300" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-xs font-medium uppercase tracking-wider text-tea-400">
                    {item.year}
                  </p>
                  <h3 className="mt-1 font-heading text-xl font-semibold text-tea-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tea-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-tea-500">
            L'equipe
          </p>
          <h2 className="font-heading text-4xl font-bold text-tea-900">
            Les fadas derriere The Fada
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-tea-200/60 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-tea-100 font-heading text-2xl font-bold text-tea-600">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="font-heading text-xl font-semibold text-tea-900">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-tea-500">
                {member.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-tea-600">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-tea-200/60 bg-tea-800">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="font-heading text-3xl font-bold text-cream">
            Pret a devenir fada ?
          </h2>
          <p className="mt-4 text-tea-300">
            Explore notre collection et trouve ton prochain coup de coeur.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 rounded-lg bg-cream px-8 py-3.5 text-sm font-semibold text-tea-800 transition-all duration-200 hover:bg-white hover:shadow-lg"
            >
              Voir la Collection
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg border border-tea-600 px-8 py-3.5 text-sm font-semibold text-tea-200 transition-all duration-200 hover:bg-tea-700"
            >
              Devenir un fada
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
