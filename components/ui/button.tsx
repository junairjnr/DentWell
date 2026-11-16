import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gold: "bg-gold text-ink hover:bg-[#d4b36a]",
        slate: "bg-slate text-wall hover:bg-[#3b4c58]",
        ghost: "border border-ink/15 bg-transparent text-ink hover:bg-ink/5",
        light: "border border-wall/30 bg-wall text-ink hover:bg-paper",
      },
      size: {
        md: "h-11 px-5",
        lg: "h-12 px-6 text-[15px]",
        block: "h-12 w-full px-6",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
