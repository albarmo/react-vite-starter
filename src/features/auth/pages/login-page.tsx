import { LoginForm } from "../components/login-form";

export function LoginPage() {
  return (
    <div className="from-slate-50 to-slate-100 relative flex h-svh w-screen items-center justify-center overflow-hidden bg-linear-to-br via-white px-4">
      {/* Background decorative blur */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="bg-indigo-500/10 absolute -right-40 -bottom-40 h-96 w-96 rounded-full blur-3xl" />

      <div className="rounded-2xl border bg-background/95 p-8 shadow-xl backdrop-blur">
        {/* Header */}
        <div className="mb-8 space-y-2 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <div className="h-6 w-6 rounded bg-primary" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">Library Admin</h1>

          <p className="text-base text-muted-foreground">
            Masuk ke sistem manajemen perpustakaan
          </p>
        </div>

        <LoginForm />

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Library Management System
        </div>
      </div>
    </div>
  );
}
