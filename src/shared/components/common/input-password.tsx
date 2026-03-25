import IconEyeDisable from "@/assets/icons/eye-disable.svg";
import IconEye from "@/assets/icons/eye.svg";
import { cn } from "@/shared/lib/cn";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Input } from "../ui/input";

export function InputPassword(props: ComponentProps<typeof Input>) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        placeholder="Masukkan Kata Sandi"
        className={cn(
          "pr-10",
          !show && props?.value && "text-sm tracking-[2px]",
        )}
        {...props}
      />
      <button
        type="button"
        className="text-gray-500 hover:text-gray-700 absolute top-1/2 right-2 -translate-y-1/2 p-1"
        tabIndex={-1}
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
      >
        {show ? <IconEyeDisable /> : <IconEye />}
      </button>
    </div>
  );
}
