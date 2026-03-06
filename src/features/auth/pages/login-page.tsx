import { LoginForm } from "../components/login-form";

export function LoginPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-sm text-muted-foreground">
          Masuk ke sistem admin perpustakaan
        </p>
      </div>

      <LoginForm />
    </div>
  );
}