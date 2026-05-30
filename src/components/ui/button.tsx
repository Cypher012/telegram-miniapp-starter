import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "#/lib/cn";

type ButtonVariant = "danger" | "ghost" | "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
	danger: "bg-transparent text-tg-destructive-text",
	ghost: "bg-transparent text-tg-link",
	primary: "bg-tg-button text-tg-button-text",
	secondary: "bg-tg-secondary-bg text-tg-text",
};

export function Button({
	children,
	className,
	type = "button",
	variant = "primary",
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(
				"inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 font-medium transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
				variants[variant],
				className,
			)}
			type={type}
			{...props}
		>
			{children}
		</button>
	);
}
