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
  const justRegistered =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("registered") === "1";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem("bookless_account") : null;
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
    <AuthShell
      backTo="/"
      backLabel="Kembali"
      arabicGreeting="السَّلَامُ عَلَيْكُمْ"
      heading={
        <>
          Masuk ke<br />
          <span className="italic text-primary">akun Anda.</span>
        </>
      }
      subheading="Gunakan kredensial Bookless Library Anda untuk melanjutkan."
      banner={
        justRegistered ? (
          <p className="mb-6 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-center text-xs font-medium text-primary">
            Akun berhasil dibuat. Silakan masuk dengan kredensial Anda.
          </p>
        ) : null
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FieldShell id="username" label="Username" icon={<User className="h-4 w-4" />}>
          <input
            id="username"
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-13 w-full rounded-2xl border border-border bg-background/70 pl-11 pr-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            placeholder="nama_pengguna"
          />
        </FieldShell>

        <FieldShell id="password" label="Password" icon={<Lock className="h-4 w-4" />}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-13 w-full rounded-2xl border border-border bg-background/70 pl-11 pr-12 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
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
        </FieldShell>

        {error && <p className="text-xs font-medium text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex h-13 w-full items-center justify-center rounded-2xl py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lifted)] disabled:opacity-60 disabled:hover:translate-y-0"
          style={{ background: "var(--gradient-deep)" }}
        >
          {submitting ? "Memproses…" : "Masuk ke Bookless"}
        </button>

        <OrnamentDivider />

        <p className="text-center text-xs text-muted-foreground">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Daftar / Register
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

/* ---------- Shared Islamic-themed shell ---------- */

export function AuthShell({
  backTo,
  backLabel,
  arabicGreeting,
  heading,
  subheading,
  banner,
  children,
}: {
  backTo: string;
  backLabel: string;
  arabicGreeting: string;
  heading: React.ReactNode;
  subheading: string;
  banner?: React.ReactNode;
  children: React.ReactNode;
}) {
  const hijri = formatHijri(new Date());

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Subtle Islamic geometric pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><path d='M30 0l5.878 18.09h19.022l-15.39 11.18 5.878 18.09L30 36.18l-15.388 11.18 5.878-18.09L5.1 18.09h19.022L30 0z' fill='%234A3728' fill-rule='evenodd'/></svg>\")",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-7 sm:max-w-lg sm:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            to={backTo}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {backLabel}
          </Link>
          <span className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
            {hijri}
          </span>
        </div>

        {/* Brand + Arabic greeting */}
        <div className="mt-8 flex flex-col items-center text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
            <BookOpen className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <span className="mt-3 text-sm font-semibold tracking-tight">
            Bookless<span className="text-muted-foreground">.library</span>
          </span>

          <p
            dir="rtl"
            lang="ar"
            className="mt-5 text-3xl leading-tight text-primary"
            style={{ fontFamily: "var(--font-arabic)" }}
          >
            {arabicGreeting}
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {heading}
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {subheading}
          </p>
        </div>

        {/* Arched form panel — masjid door silhouette */}
        <div className="relative mt-10">
          {/* Crescent + star finial — perched at the very top of the outer arch */}
          <MasjidFinial className="absolute left-1/2 top-0 z-10 h-16 w-16 -translate-x-1/2 -translate-y-full text-primary" />

          <div
            className="relative overflow-hidden border border-border/80 bg-card/80 px-5 pb-7 pt-10 shadow-[var(--shadow-soft)] backdrop-blur-sm sm:px-7"
            style={{
              borderTopLeftRadius: "9999px",
              borderTopRightRadius: "9999px",
              borderBottomLeftRadius: "1.75rem",
              borderBottomRightRadius: "1.75rem",
            }}
          >
            {/* Inner arch outline */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-4 top-4 bottom-4 border border-primary/15"
              style={{
                borderTopLeftRadius: "9999px",
                borderTopRightRadius: "9999px",
                borderBottomLeftRadius: "1.25rem",
                borderBottomRightRadius: "1.25rem",
              }}
            />

            {banner}
            <div className="relative">{children}</div>
          </div>
        </div>

        <p className="mt-auto pt-10 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          © {new Date().getFullYear()} · Bookless Library
        </p>
      </div>
    </main>
  );
}

export function FieldShell({
  id,
  label,
  icon,
  children,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}

export function OrnamentDivider() {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-primary/40" fill="currentColor">
        <path d="M12 0l3 9h9l-7 5 3 10-8-6-8 6 3-10-7-5h9z" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
    </div>
  );
}

/** Crescent moon + 5-pointed star finial — sits atop the arch */
export function MasjidFinial({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      {/* vertical stem */}
      <line x1="24" y1="32" x2="24" y2="46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* base bead */}
      <circle cx="24" cy="34" r="2.2" fill="currentColor" />
      {/* crescent: outer circle minus inner offset circle */}
      <mask id="finial-crescent">
        <rect width="48" height="48" fill="black" />
        <circle cx="24" cy="18" r="9" fill="white" />
        <circle cx="28" cy="16" r="8" fill="black" />
      </mask>
      <rect width="48" height="48" fill="currentColor" mask="url(#finial-crescent)" />
      {/* star */}
      <path
        d="M34 8.5l1.2 2.7 2.9.3-2.2 2 .7 2.9L34 14.9l-2.6 1.5.7-2.9-2.2-2 2.9-.3z"
        fill="currentColor"
      />
    </svg>
  );
}

function formatHijri(date: Date): string {
  try {
    return new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
      .format(date)
      .replace("AH", "H");
  } catch {
    return "1447 H";
  }
}
