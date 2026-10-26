import type { ButtonHTMLAttributes, ReactNode } from "react";

type ThemedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  size?: "sm" | "md";
};

const SIZES = {
  sm: "h-[36px] w-[146px] px-4",
  md: "h-[44px] min-w-[146px] px-6",
};

export default function ThemedButton({
  icon,
  size = "sm",
  children,
  className = "",
  type = "button",
  ...rest
}: ThemedButtonProps) {
  return (
    <button
      type={type}
      {...rest}
      className={`themed-btn flex ${SIZES[size]} cursor-pointer flex-row items-center justify-center gap-1 whitespace-nowrap py-0 text-sm box-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}