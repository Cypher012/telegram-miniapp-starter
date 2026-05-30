import type { ReactNode } from "react";
import { cn } from "#/lib/cn";

type StateProps = {
	action?: ReactNode;
	className?: string;
	description?: string;
	title: string;
};

export function EmptyState({
	action,
	className,
	description,
	title,
}: StateProps) {
	return (
		<div
			className={cn(
				"flex min-h-40 flex-col items-center justify-center rounded-lg bg-tg-section-bg p-6 text-center",
				className,
			)}
		>
			<h2 className="font-semibold">{title}</h2>
			{description ? (
				<p className="mt-1 max-w-sm text-sm text-tg-subtitle-text">
					{description}
				</p>
			) : null}
			{action ? <div className="mt-4">{action}</div> : null}
		</div>
	);
}

export function LoadingState({
	className,
	title,
}: Pick<StateProps, "className" | "title">) {
	return (
		<div
			className={cn(
				"flex min-h-32 items-center justify-center rounded-lg bg-tg-section-bg p-6 text-sm text-tg-subtitle-text",
				className,
			)}
		>
			{title}
		</div>
	);
}
