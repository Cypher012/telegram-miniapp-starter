import type { ReactNode } from "react";
import { cn } from "#/lib/cn";

type SectionProps = {
	children: ReactNode;
	className?: string;
	description?: string;
	title?: string;
};

export function Section({
	children,
	className,
	description,
	title,
}: SectionProps) {
	return (
		<section className={cn("space-y-3", className)}>
			{title || description ? (
				<div className="space-y-1">
					{title ? <h2 className="font-semibold">{title}</h2> : null}
					{description ? (
						<p className="text-sm text-tg-subtitle-text">{description}</p>
					) : null}
				</div>
			) : null}
			{children}
		</section>
	);
}
