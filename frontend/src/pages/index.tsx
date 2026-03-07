import { Calendar } from "@/components/ui/calendar";

export default function Index() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      <header className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <div className="text-xl font-semibold tracking-tight">
          Agendai<span className="text-blue-600">.</span>
        </div>
        <a
          href="/app"
          className="rounded-xl bg-blue-600 px-4 py-2 text-white font-medium shadow hover:bg-blue-700 transition"
        >
          Ouvrir l’application
        </a>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-6 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Un agenda, simple et clair
          </h1>
          <p className="mt-4 text-slate-600 max-w-xl">
            Ajoutez des tâches à un jour donné, organisez vos priorités et gardez
            une vue organisée.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a
              href="/app"
              className="rounded-2xl bg-blue-600 px-5 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-blue-700 transition"
            >
              Commencer
            </a>
            <span className="text-slate-500 text-sm">
              Accédez directement à votre calendrier
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-blue-200/40 blur-2xl" />
          <div className="relative rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-xl flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4 text-slate-700">
              Aperçu du calendrier
            </h2>
            <Calendar
              mode="single"
              className="rounded-md border bg-white"
            />
            <div className="mt-6">
              <a
                href="/app"
                className="text-sm text-blue-600 hover:underline"
              >
                Aller à l’application →
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-sm text-slate-500 text-center">
        Réalisé par <span className="font-medium text-slate-700">Mathis HEDER</span> — React App
      </footer>
    </main>
  );
}
