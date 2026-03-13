import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { useLogin } from "../hooks/use-login";
import { loginSchema, type LoginSchema } from "../schemas/login.schema";
import { appToast } from "@/shared/lib/toast";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

export function LoginForm() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    try {
      await mutateAsync(values);
      appToast.success("Login berhasil");
      navigate("/", { replace: true });
    } catch (error) {
      appToast.error(error, "Login gagal");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Email
        </label>

        <Input
          {...form.register("username")}
          type="email"
          placeholder="Masukkan email"
          autoComplete="email"
        />

        {form.formState.errors.username && (
          <p className="text-xs text-red-500">
            {form.formState.errors.username.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Password
        </label>

        <div className="relative">
          <Input
            {...form.register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password"
            autoComplete="current-password"
          />

          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute bg-transparent inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {form.formState.errors.password && (
          <p className="text-xs text-red-500">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Button */}
      <Button
        type="submit"
        disabled={isPending}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:brightness-110 disabled:pointer-events-none disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Memproses...
          </>
        ) : (
          "Masuk"
        )}
      </Button>
    </form>
  );
}