import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, Sparkles, User, IdCard } from "lucide-react";
import { AuthShell, FieldShell, OrnamentDivider } from "./login";

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
    <AuthShell
      backTo="/login"
      backLabel="Kembali ke Login"
      arabicGreeting="أَهْلًا وَسَهْلًا"
      heading={
        <>
          Buat<br />
          <span className="italic text-primary">akun baru.</span>
        </>
      }
      subheading="Lengkapi data berikut untuk mendaftar di Bookless Library."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FieldShell id="fullName" label="Nama Lengkap" icon={<IdCard className="h-4 w-4" />}>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-13 w-full rounded-2xl border border-border bg-background/70 pl-11 pr-4 py-3.5 text-center text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            placeholder="Nama lengkap Anda"
          />
        </FieldShell>

        <FieldShell id="username" label="Username" icon={<User className="h-4 w-4" />}>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-13 w-full rounded-2xl border border-border bg-background/70 pl-11 pr-4 py-3.5 text-center text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            placeholder="nama_pengguna"
          />
        </FieldShell>

        <div className="space-y-2">
          <div className="relative flex items-center justify-center">
            <label
              htmlFor="password"
              className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
            >
              Password
            </label>
            <button
              type="button"
              onClick={handleSuggest}
              className="absolute right-0 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary transition hover:opacity-80"
            >
              <Sparkles className="h-3 w-3" /> Sarankan
            </button>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="password"
              type={showPw ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-13 w-full rounded-2xl border border-border bg-background/70 pl-11 pr-12 py-3.5 text-center text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
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

        <FieldShell id="confirm" label="Konfirmasi Password" icon={<Lock className="h-4 w-4" />}>
          <input
            id="confirm"
            type={showPw ? "text" : "password"}
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="h-13 w-full rounded-2xl border border-border bg-background/70 pl-11 pr-4 py-3.5 text-center text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            placeholder="Ulangi password"
          />
        </FieldShell>

        {error && <p className="text-xs font-medium text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex h-13 w-full items-center justify-center rounded-2xl py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lifted)] disabled:opacity-60 disabled:hover:translate-y-0"
          style={{ background: "var(--gradient-deep)" }}
        >
          {submitting ? "Memproses…" : "Daftar Sekarang"}
        </button>

        <OrnamentDivider />

        <p className="text-center text-xs text-muted-foreground">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      </form>
    </AuthShell>
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
