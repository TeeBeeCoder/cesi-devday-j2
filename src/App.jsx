import { useState } from 'react';
import { workshops } from './data.js';
import { filterWorkshops } from './workshops.js';

export default function App() {
  const [query, setQuery] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const visibleWorkshops = filterWorkshops(workshops, query, onlyAvailable);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-10">
      <a
        className="sr-only focus:not-sr-only focus:block focus:p-3"
        href="#programme"
      >
        Aller au programme
      </a>
      <header className="flex flex-wrap items-center justify-between gap-5 border-b border-stone-900/20 py-6">
        <a
          href="#accueil"
          aria-label="DevDay, accueil"
          className="text-2xl font-black tracking-tighter"
        >
          DevDay<span className="text-orange-600">.</span>
        </a>
        <nav
          aria-label="Navigation principale"
          className="flex gap-6 text-sm font-semibold"
        >
          <a className="hover:underline" href="#programme">
            Programme
          </a>
          <a className="hover:underline" href="#infos">
            Infos pratiques
          </a>
        </nav>
        <span className="text-xs uppercase tracking-widest">
          18 juin 2027 · Campus
        </span>
      </header>
      <main id="accueil">
        <section
          className="grid gap-10 py-12 sm:py-20 lg:grid-cols-[1fr_19rem] lg:items-end"
          aria-labelledby="event-title"
        >
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-blue-800">
              La rencontre des développeurs curieux
            </p>
            <h1
              id="event-title"
              className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tighter sm:text-7xl"
            >
              Une journée pour créer, tester et publier.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-700">
              Trois ateliers pour passer d’une idée à une page en ligne.
              Choisissez votre sujet, vérifiez les places et préparez votre
              journée.
            </p>
            <a
              href="#programme"
              className="mt-7 inline-flex items-center gap-5 bg-blue-800 px-6 py-4 font-semibold text-white hover:bg-blue-950"
            >
              Explorer le programme <span aria-hidden="true">↘</span>
            </a>
          </div>
          <div
            className="event-ticket relative overflow-hidden border border-stone-900 bg-orange-400 p-7"
            aria-label="18 juin 2027, 3 ateliers sur le campus"
          >
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
              <span>Édition 2027</span>
              <span aria-hidden="true">✳</span>
            </div>
            <p
              className="my-6 text-8xl font-black leading-none tracking-tighter"
              aria-hidden="true"
            >
              18<span className="block text-5xl">JUIN</span>
            </p>
            <p className="border-t border-stone-900 pt-4 text-sm font-semibold">
              3 ateliers · 1 journée
              <br />
              React / Qualité / DevOps
            </p>
          </div>
        </section>
        <section
          id="programme"
          aria-labelledby="program-title"
          className="border-t border-stone-900 py-10 sm:py-14"
        >
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-blue-800">
                À vous de choisir
              </p>
              <h2
                id="program-title"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Le programme.
              </h2>
            </div>
            <p className="text-sm text-stone-600">
              Toutes les séances se déroulent sur le campus.
            </p>
          </div>
          <div className="grid gap-5 border-y border-stone-900/20 bg-white px-5 py-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-semibold"
              >
                Rechercher un atelier
              </label>
              <input
                id="search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Un titre ou un thème : React, qualité…"
                className="w-full border border-stone-400 bg-stone-50 px-4 py-3"
              />
            </div>
            <label className="flex cursor-pointer items-center gap-3 py-3 text-sm font-semibold">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(event) => setOnlyAvailable(event.target.checked)}
                className="h-5 w-5 accent-blue-800"
              />
              Afficher seulement les ateliers avec des places
            </label>
          </div>
          <div className="my-5 flex flex-wrap items-center justify-between gap-3 text-sm">
            <p role="status">
              <span className="font-bold">
                {visibleWorkshops.length} atelier
                {visibleWorkshops.length === 1 ? '' : 's'}
              </span>{' '}
              · Recherche : <span>{query.trim() || 'tout le programme'}</span>
            </p>
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="font-semibold text-blue-800 underline underline-offset-4"
              >
                Effacer la recherche
              </button>
            )}
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {visibleWorkshops.map((item, index) => (
              <article
                key={item.id}
                className="flex min-w-0 flex-col border border-stone-900/25 bg-white p-6 sm:p-7"
              >
                <div className="mb-7 flex items-center justify-between gap-3">
                  <span className="border border-blue-800 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-blue-800">
                    {item.topic}
                  </span>
                  <span className="font-mono text-xs text-stone-500">
                    0{index + 1}
                  </span>
                </div>
                <p className="mb-2 text-sm font-semibold">
                  {item.time}{' '}
                  <span className="font-normal text-stone-500">
                    / {item.duration}
                  </span>
                </p>
                <h3 className="mb-4 text-2xl font-bold leading-tight tracking-tight">
                  {item.title}
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-stone-600">
                  {item.description}
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-5 text-sm">
                  <span>{item.room}</span>
                  <span
                    className={
                      item.seats > 0
                        ? 'font-semibold text-blue-800'
                        : 'font-semibold text-stone-500'
                    }
                  >
                    {item.seats > 0 ? `${item.seats} places` : 'Complet'}
                  </span>
                </div>
              </article>
            ))}
          </div>
          {visibleWorkshops.length === 0 && (
            <div className="border border-dashed border-stone-400 p-10 text-center">
              <p className="text-lg font-semibold">
                Aucun atelier ne correspond à votre recherche.
              </p>
              <p className="mt-2 text-sm text-stone-600">
                Essayez un autre mot ou désactivez le filtre des places.
              </p>
            </div>
          )}
        </section>
        <section
          id="infos"
          aria-labelledby="info-title"
          className="grid gap-6 border-t border-stone-900 py-10 sm:grid-cols-2"
        >
          <h2 id="info-title" className="text-2xl font-bold tracking-tight">
            On se retrouve au campus.
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-stone-600">
            <p>Accueil à 9 h · studios 1 et 2 · venez avec votre ordinateur.</p>
            <p>
              DevDay est un événement fictif pour le laboratoire J2. Les places
              sont des données de démonstration ; aucune inscription n’est
              enregistrée.
            </p>
          </div>
        </section>
      </main>
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-stone-900/20 py-6 text-xs text-stone-600">
        <span>DevDay · Le site se construit en équipe.</span>
        <a
          href="#accueil"
          className="font-semibold underline underline-offset-4"
        >
          Retour en haut ↑
        </a>
      </footer>
    </div>
  );
}
