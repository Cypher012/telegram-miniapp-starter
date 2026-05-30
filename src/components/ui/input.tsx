import type { InputHTMLAttributes } from "react";
import { cn } from "#/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
};

export function Input({ className, id, label, ...props }: InputProps) {
	const inputId = id ?? props.name;

	return (
		<label className="block space-y-2" htmlFor={inputId}>
			{label ? (
				<span className="text-sm font-medium text-tg-section-header-text">
					{label}
				</span>
			) : null}
			<input
				className={cn(
					"min-h-11 w-full rounded-md border border-tg-section-header-text/20 bg-tg-secondary-bg px-3 text-tg-text outline-none transition placeholder:text-tg-hint focus:border-tg-link",
					className,
				)}
				id={inputId}
				{...props}
			/>
		</label>
	);
}
