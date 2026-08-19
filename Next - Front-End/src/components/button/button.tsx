import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "default" | "icon";
};

export default function Botoes({
  className,
  variant = "default",
  children,
  ...props
}: ButtonProps) {
  const combinedClasses =
    `${variant === "default" ? "btn" : ""} ${className || ""}`.trim();

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
