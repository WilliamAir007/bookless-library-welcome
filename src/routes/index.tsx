import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bookless Library — Ahlan Wa Sahlan" },
      { name: "description", content: "Selamat datang di Bookless Library. Assalamualaikum & Ahlan Wa Sahlan." },
      { property: "og:title", content: "Bookless Library" },
      { property: "og:description", content: "Selamat datang di Bookless Library." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ornamental backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/30 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Bookless Library
        </div>

        <p
          dir="rtl"
          lang="ar"
          className="font-serif text-5xl leading-tight text-foreground sm:text-6xl"
          style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
        >
          ‏السَّلَامُ عَلَيْكُمْ
        </p>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Assalamualaikum Warahmatullahi Wabarakatuh
        </p>

        <h1 className="mt-10 text-4xl font-semibold tracking-tight sm:text-5xl">
          Ahlan Wa Sahlan
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Selamat datang di Bookless Library — ruang membaca tanpa batas.
          Mari menjelajah, belajar, dan tumbuh bersama.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="https://bookless.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 min-w-[12rem] items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Kunjungi Bookless.id
          </a>
          <Link
            to="/login"
            className="inline-flex h-12 min-w-[12rem] items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Masuk ke Akun
          </Link>
        </div>

        <footer className="mt-16 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bookless Library
        </footer>
      </section>
    </main>
  );
}
