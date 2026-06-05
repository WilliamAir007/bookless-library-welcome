import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, BookOpen, Eye, EyeOff, Lock, Sparkles, User, IdCard } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Daftar — Bookless Library" },
      { name: "description", content: "Buat akun Bookless Library Anda." },
    ],
  }),
  component: RegisterPage,
});

const SYMBOLS = "!@#$%^&*?";

function validatePassword(pw: string) {
  return {
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    number: /[0-9]/.test(pw),
    symbol: /[!@#$%^&*?_\-+=<>./]/.test(pw),
    length: pw.length >= 8,
  };
}

function suggestPassword(username: string) {
  const base = (username || "Bookless").replace(/[^a-zA-Z0-9]/g, "").slice(0, 8) || "Bookless";
  const cap = base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();
  const sym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  const num = Math.floor(100 + Math.random() * 900);
  return `${cap}${sym}${num}`;
}

function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const checks = useMemo(() => validatePassword(password), [password]);
  const pwValid = Object.values(checks).every(Boolean);

  const handleSuggest = () => {
    const s = suggestPassword(username);
    setPassword(s);
    setConfirm(s);
    setShowPw(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!fullName.trim() || !username.trim()) {
      setError("Nama lengkap dan username wajib diisi.");
      return;
    }
    if (!pwValid) {
      setError("Password belum memenuhi semua ketentuan.");
      return;
    }
    if (password !== confirm) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    setSubmitting(true);
    try {
      const account = { fullName: fullName.trim(), username: username.trim(), password };
      localStorage.setItem("bookless_account", JSON.stringify(account));
      navigate({ to: "/login", search: { registered: "1" } as never });
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
        <aside className="relative hidden overflow-hidden rounded-3xl border border-border/70 p-10 shadow-[var(--shadow-soft)] lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-deep)" }} />
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
            <p dir="rtl" lang="ar" className="text-4xl leading-tight" style={{ fontFamily: "var(--font-arabic)" }}>
              ‏أَهْلًا وَسَهْلًا
            </p>
            <h2 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight">
              Bergabung<br />
              <span className="italic text-accent">bersama kami.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-primary-foreground/70">
              Daftarkan akun Anda untuk membuka akses penuh ke Bookless Library.
            </p>
          </div>

          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary-foreground/50">
            © {new Date().getFullYear()} · Bookless Library
          </p>
        </aside>

        <section className="flex flex-col justify-between">
          <Link to="/login" className="inline-flex w-fit items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke Login
          </Link>

          <div className="mx-auto w-full max-w-md py-10">
            <h1 className="mt-2 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
              Buat<br />
              <span className="italic text-primary">akun baru.</span>
            </h1>
            <p className="mt-4 text-[15px] text-muted-foreground">
              Lengkapi data berikut untuk mendaftar di Bookless Library.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <Field id="fullName" label="Nama Lengkap" icon={<IdCard className="h-4 w-4" />}>
                <input id="fullName" type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="h-13 w-full rounded-2xl border border-border bg-card pl-11 pr-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="Nama lengkap Anda" />
              </Field>

              <Field id="username" label="Username" icon={<User className="h-4 w-4" />}>
                <input id="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                  className="h-13 w-full rounded-2xl border border-border bg-card pl-11 pr-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="nama_pengguna" />
              </Field>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Password
                  </label>
                  <button type="button" onClick={handleSuggest}
                    className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.15em] text-primary transition hover:opacity-80">
                    <Sparkles className="h-3 w-3" /> Sarankan
                  </button>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input id="password" type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="h-13 w-full rounded-2xl border border-border bg-card pl-11 pr-12 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                  <Rule ok={checks.length}>Min. 8 karakter</Rule>
                  <Rule ok={checks.upper}>1 huruf kapital</Rule>
                  <Rule ok={checks.lower}>1 huruf kecil</Rule>
                  <Rule ok={checks.number}>1 angka</Rule>
                  <Rule ok={checks.symbol}>1 simbol</Rule>
                </ul>
              </div>

              <Field id="confirm" label="Konfirmasi Password" icon={<Lock className="h-4 w-4" />}>
                <input id="confirm" type={showPw ? "text" : "password"} required value={confirm} onChange={(e) => setConfirm(e.target.value)}
                  className="h-13 w-full rounded-2xl border border-border bg-card pl-11 pr-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="Ulangi password" />
              </Field>

              {error && <p className="text-xs font-medium text-destructive">{error}</p>}

              <button type="submit" disabled={submitting}
                className="mt-4 inline-flex h-13 w-full items-center justify-center rounded-2xl py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lifted)] disabled:opacity-60 disabled:hover:translate-y-0"
                style={{ background: "var(--gradient-deep)" }}>
                {submitting ? "Memproses…" : "Daftar Sekarang"}
              </button>

              <p className="pt-2 text-center text-xs text-muted-foreground">
                Sudah punya akun?{" "}
                <Link to="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
                  Masuk di sini
                </Link>
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

function Field({ id, label, icon, children }: { id: string; label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        {children}
      </div>
    </div>
  );
}

function Rule({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className={ok ? "text-primary" : ""}>
      <span className="mr-1">{ok ? "✓" : "○"}</span>
      {children}
    </li>
  );
}
