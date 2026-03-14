import { SpinnerIcon } from "./spinner-icon";


export function Spinner({ children, visible }: React.PropsWithChildren<{
  visible?: boolean;
}>) {
  return (
    <div className="relative">
      {children}
      {visible && (
        <div className="absolute top-0 left-0 w-full h-full grid place-items-center bg-white/40">
          <SpinnerIcon className="animate-spin" />
        </div>
      )}
    </div>
  )
}