import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "#/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
	return (
		<div
			className={cn(
				"rounded-lg bg-tg-section-bg p-4 text-tg-text shadow-sm",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
