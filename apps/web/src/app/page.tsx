import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-10 px-6 py-24">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-600">Skooly</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Built for Islamic schools, parent-first.
        </h1>
        <p className="max-w-prose text-base leading-relaxed text-slate-600">
          A modern platform for weekend Islamic schools, full-time academies, and Quran tutors —
          replacing WhatsApp + spreadsheets + Zelle with a daily window into your child&apos;s
          Islamic education.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <Link
          href="/parent"
          className="rounded-lg border border-slate-200 p-5 transition-colors hover:border-emerald-500 hover:bg-emerald-50"
        >
          <h2 className="text-base font-semibold text-slate-900">Parent</h2>
          <p className="mt-1 text-sm text-slate-600">Daily highlights, hifz audio, tuition.</p>
        </Link>
        <Link
          href="/teacher"
          className="rounded-lg border border-slate-200 p-5 transition-colors hover:border-emerald-500 hover:bg-emerald-50"
        >
          <h2 className="text-base font-semibold text-slate-900">Teacher</h2>
          <p className="mt-1 text-sm text-slate-600">60-second class wrap, hifz, audio.</p>
        </Link>
        <Link
          href="/admin"
          className="rounded-lg border border-slate-200 p-5 transition-colors hover:border-emerald-500 hover:bg-emerald-50"
        >
          <h2 className="text-base font-semibold text-slate-900">Principal</h2>
          <p className="mt-1 text-sm text-slate-600">Dashboard, enrollment, board reports.</p>
        </Link>
      </section>
    </main>
  );
}
