import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Sparkles, Moon, LogIn } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bookless Library — Ahlan Wa Sahlan" },
      {
        name: "description",
        content:
          "Selamat datang di Bookless Library. Assalamualaikum & Ahlan Wa Sahlan.",
      },
      { property: "og:title", content: "Bookless Library" },
      {
        property: "og:description",
        content: "Ruang membaca tanpa batas — Ahlan Wa Sahlan.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-accent/40 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-primary/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8 sm:px-8 sm:py-12">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
              <BookOpen className="h-4 w-4" strokeWidth={2.25} />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Bookless<span className="text-muted-foreground">.library</span>
            </span>
          </div>
          <span className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground backdrop-blur sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Edisi 1447 H
          </span>
        </header>

        {/* Bento grid */}
        <section className="mt-8 grid flex-1 grid-cols-1 gap-3 sm:gap-4 md:grid-cols-6 md:grid-rows-[auto_auto_auto] lg:mt-12">
          {/* Hero greeting card */}
          <article className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-7 shadow-[var(--shadow-soft)] sm:p-10 md:col-span-4 md:row-span-2">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{ background: "var(--gradient-warm)" }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
                <Moon className="h-3 w-3" />
                Salam Pembuka
              </div>

              <p
                dir="rtl"
                lang="ar"
                className="mt-7 text-[2.75rem] leading-[1.15] text-foreground sm:text-6xl"
                style={{ fontFamily: "var(--font-arabic)" }}
              >
                ‏السَّلَامُ عَلَيْكُمْ
              </p>
              <p className="mt-3 text-sm font-medium tracking-wide text-muted-foreground sm:text-base">
                Assalamualaikum Warahmatullahi Wabarakatuh
              </p>

              <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-7xl">
                Ahlan Wa
                <br />
                <span className="italic text-primary/90">Sahlan.</span>
              </h1>

              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                Selamat datang di Bookless Library — ruang membaca tanpa batas.
                Mari menjelajah, belajar, dan tumbuh bersama dalam ketenangan.
              </p>
            </div>
          </article>

          {/* CTA — Bookless.id */}
          <a
            href="https://bookless.id"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-lifted)] hover:-translate-y-0.5 md:col-span-2"
            style={{ background: "var(--gradient-deep)" }}
          >
            <div className="flex items-start justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur">
                <Sparkles className="h-3 w-3" />
                Eksternal
              </span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <div className="mt-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary-foreground/60">
                Kunjungi Situs
              </p>
              <p className="mt-2 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                bookless<span className="text-accent">.id</span>
              </p>
              <p className="mt-3 text-sm text-primary-foreground/70">
                Jelajahi katalog utama dan komunitas pembaca.
              </p>
            </div>
          </a>

          {/* CTA — Login */}
          <Link
            to="/login"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lifted)] md:col-span-2"
          >
            <div className="flex items-start justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-secondary-foreground">
                <LogIn className="h-3 w-3" />
                Akun
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground" />
            </div>
            <div className="mt-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Sudah Punya Akun?
              </p>
              <p className="mt-2 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                Masuk ke<br />
                <span className="italic text-primary">Akun Anda</span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Lanjutkan perjalanan membaca Anda.
              </p>
            </div>
          </Link>

          {/* Quote / quiet card */}
          <article className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-6 backdrop-blur md:col-span-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent/60 text-foreground">
                  <BookOpen className="h-4 w-4" />
                </div>
                <p className="text-[15px] leading-relaxed text-foreground">
                  <span className="italic text-muted-foreground">
                    “Bacalah, dengan nama Tuhanmu yang menciptakan.”
                  </span>{" "}
                  <span className="text-xs text-muted-foreground">— QS. Al-‘Alaq: 1</span>
                </p>
              </div>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                © {new Date().getFullYear()} · Bookless Library
              </span>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
