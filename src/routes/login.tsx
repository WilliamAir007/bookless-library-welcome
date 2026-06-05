import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, BookOpen, Eye, EyeOff, Lock, User } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Masuk — Bookless Library" },
      { name: "description", content: "Masuk ke akun Bookless Library Anda." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const justRegistered = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("registered") === "1";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("bookless_account") : null;
      if (!raw) {
        setError("Akun belum terdaftar. Silakan daftar terlebih dahulu.");
        return;
      }
      const acc = JSON.parse(raw) as { username: string; password: string };
      if (acc.username !== username.trim() || acc.password !== password) {
        setError("Username atau password salah.");
        return;
      }
      window.location.href = "https://www.google.com";
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-accent/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 gap-6 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-2 lg:gap-10">
        {/* Brand panel */}
        <aside className="relative hidden overflow-hidden rounded-3xl border border-border/70 p-10 shadow-[var(--shadow-soft)] lg:flex lg:flex-col lg:justify-between">
          <div
            className="absolute inset-0 -z-10"
            style={{ background: "var(--gradient-deep)" }}
          />
          <div className="absolute inset-0 -z-10 opacity-20" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }} />

          <div className="flex items-center gap-2.5 text-primary-foreground">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
              <BookOpen className="h-4 w-4" strokeWidth={2.25} />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Bookless<span className="text-primary-foreground/60">.library</span>
            </span>
          </div>

          <div className="text-primary-foreground">
            <p
              dir="rtl"
              lang="ar"
              className="text-4xl leading-tight"
              style={{ fontFamily: "var(--font-arabic)" }}
            >
              ‏السَّلَامُ عَلَيْكُمْ
            </p>
            <h2 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight">
              Selamat<br />
              <span className="italic text-accent">datang kembali.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-primary-foreground/70">
              Lanjutkan perjalanan membaca Anda di ruang yang tenang dan tanpa batas.
            </p>
          </div>

          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary-foreground/50">
            © {new Date().getFullYear()} · Bookless Library
          </p>
        </aside>

        {/* Form panel */}
        <section className="flex flex-col justify-between">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali
          </Link>

          <div className="mx-auto w-full max-w-md py-10">
            <div className="lg:hidden">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
                  <BookOpen className="h-4 w-4" strokeWidth={2.25} />
                </div>
                <span className="text-sm font-semibold tracking-tight">
                  Bookless<span className="text-muted-foreground">.library</span>
                </span>
              </div>
            </div>

            <h1 className="mt-8 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
              Masuk ke<br />
              <span className="italic text-primary">akun Anda.</span>
            </h1>
            <p className="mt-4 text-[15px] text-muted-foreground">
              Gunakan kredensial Bookless Library Anda untuk melanjutkan.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
                >
                  Username
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-13 w-full rounded-2xl border border-border bg-card pl-11 pr-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="nama_pengguna"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-13 w-full rounded-2xl border border-border bg-card pl-11 pr-12 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-4 inline-flex h-13 w-full items-center justify-center rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lifted)] disabled:opacity-60 disabled:hover:translate-y-0"
                style={{ background: "var(--gradient-deep)" }}
              >
                {submitting ? "Memproses…" : "Masuk ke Bookless"}
              </button>

              <p className="pt-2 text-center text-xs text-muted-foreground">
                Belum punya akun?{" "}
                <a
                  href="https://bookless.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Daftar di bookless.id
                </a>
              </p>
            </form>
          </div>

          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground lg:hidden">
            © {new Date().getFullYear()} · Bookless Library
          </p>
        </section>
      </div>
    </main>
  );
}
