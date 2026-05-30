import type { ReactNode } from "react";
import { cn } from "#/lib/cn";

type PageProps = {
	children: ReactNode;
	className?: string;
	title?: string;
};

export function Page({ children, className, title }: PageProps) {
	return (
		<main
			className={cn(
				"mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-5 px-4 py-5 text-tg-text",
				"pb-[calc(1.25rem+var(--tg-viewport-safe-area-inset-bottom,0px))]",
				className,
			)}
		>
			{title ? <h1 className="text-2xl font-bold">{title}</h1> : null}
			{children}
		</main>
	);
}
