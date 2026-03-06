import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/use-login";
import { loginSchema, type LoginSchema } from "../schemas/login.schema";
import { appToast } from "@/shared/lib/toast";

export function LoginForm() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLogin();

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Username</label>
        <input
          {...form.register("username")}
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Masukkan username"
        />
        {form.formState.errors.username && (
          <p className="mt-1 text-sm text-red-500">
            {form.formState.errors.username.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          {...form.register("password")}
          type="password"
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Masukkan password"
        />
        {form.formState.errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground"
      >
        {isPending ? "Loading..." : "Login"}
      </button>
    </form>
  );
}