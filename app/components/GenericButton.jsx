"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChevronsLeft,
  ChevronsRight,
  Save,
  X,
  Pencil,
  Plus,
} from "lucide-react";

const ACTION_ICONS = {
  back: ArrowLeft,
  forward: ArrowRight,
  first: ChevronsLeft,
  last: ChevronsRight,
  push: ArrowRight,
  edit: Pencil,
  save: Save,
  cancel: X,
  add: Plus,
};

export default function GenericButton({
  label,
  action = "custom",
  to,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  iconOnly = false,
  showIcon = true,
  className = "",
}) {
  const router = useRouter();
  const Icon = ACTION_ICONS[action];

  const handleClick = () => {
    if (disabled) return;

    switch (action) {
      case "back":
        router.back();
        break;

      case "forward":
        router.forward();
        break;

      case "first":
        onClick?.(1);
        break;

      case "last":
        onClick?.();
        break;

      case "push":
        if (to) router.push(to);
        break;

      case "replace":
        if (to) router.replace(to);
        break;

      default:
        onClick?.();
    }
  };

  const base =
    "rounded-xl font-semibold transition-all flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-blue-200 hover:bg-blue-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "bg-transparent hover:bg-gray-200",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
    icon: "p-2",
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      title={label}
      className={`
        ${base}
        ${variants[variant]}
        ${iconOnly ? sizes.icon : sizes[size]}
        ${disabled ? "opacity-40 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {showIcon && Icon && <Icon size={18} />}
      {!iconOnly && label}
    </button>
  );
}
