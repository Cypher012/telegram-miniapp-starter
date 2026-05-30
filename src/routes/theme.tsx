import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Card } from "#/components/ui/card";
import { Page } from "#/components/ui/page";
import { Section } from "#/components/ui/section";

export const Route = createFileRoute("/theme")({ component: ThemePreview });

const colors = [
	{
		name: "Background",
		className: "bg-tg-bg",
		textClassName: "text-tg-text",
		value: "#212121",
	},
	{
		name: "Text",
		className: "bg-tg-text",
		textClassName: "text-tg-bg",
		value: "#ffffff",
	},
	{
		name: "Hint",
		className: "bg-tg-hint",
		textClassName: "text-tg-bg",
		value: "#aaaaaa",
	},
	{
		name: "Link",
		className: "bg-tg-link",
		textClassName: "text-tg-button-text",
		value: "#8774e1",
	},
	{
		name: "Button",
		className: "bg-tg-button",
		textClassName: "text-tg-button-text",
		value: "#8774e1",
	},
	{
		name: "Button Text",
		className: "bg-tg-button-text",
		textClassName: "text-tg-bg",
		value: "#ffffff",
	},
	{
		name: "Secondary Background",
		className: "bg-tg-secondary-bg",
		textClassName: "text-tg-text",
		value: "#0f0f0f",
	},
	{
		name: "Header Background",
		className: "bg-tg-header-bg",
		textClassName: "text-tg-text",
		value: "#212121",
	},
	{
		name: "Accent Text",
		className: "bg-tg-accent-text",
		textClassName: "text-tg-button-text",
		value: "#8774e1",
	},
	{
		name: "Section Background",
		className: "bg-tg-section-bg",
		textClassName: "text-tg-text",
		value: "#212121",
	},
	{
		name: "Section Header Text",
		className: "bg-tg-section-header-text",
		textClassName: "text-tg-bg",
		value: "#aaaaaa",
	},
	{
		name: "Subtitle Text",
		className: "bg-tg-subtitle-text",
		textClassName: "text-tg-bg",
		value: "#aaaaaa",
	},
	{
		name: "Destructive Text",
		className: "bg-tg-destructive-text",
		textClassName: "text-tg-button-text",
		value: "#e53935",
	},
];

function ThemePreview() {
	return (
		<Page className="max-w-5xl">
			<header className="flex items-center justify-between gap-4">
				<div>
					<p className="text-sm font-medium text-tg-section-header-text">
						Telegram Theme
					</p>
					<h1 className="text-2xl font-bold">Color classes</h1>
				</div>
				<Link to="/">
					<Button>Home</Button>
				</Link>
			</header>

			<Card>
				<h2 className="text-lg font-semibold">Sample UI</h2>
				<p className="mt-2 max-w-2xl text-tg-subtitle-text">
					This section uses the same Tailwind classes your app can use for
					Telegram surfaces, buttons, links, hints, and destructive actions.
				</p>
				<div className="mt-4 flex flex-wrap gap-3">
					<Button>Primary button</Button>
					<a className="px-1 py-2 font-medium text-tg-link" href="#palette">
						Link color
					</a>
					<span className="px-1 py-2 text-tg-destructive-text">
						Destructive text
					</span>
				</div>
			</Card>

			<Section title="Palette">
				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{colors.map((color) => (
						<article
							className="overflow-hidden rounded-lg bg-tg-secondary-bg"
							id={color.name === "Background" ? "palette" : undefined}
							key={color.name}
						>
							<div
								className={`${color.className} ${color.textClassName} flex h-28 flex-col justify-end p-4`}
							>
								<span className="text-lg font-semibold">{color.name}</span>
								<span className="text-sm">{color.value}</span>
							</div>
							<div className="space-y-2 p-4 text-sm">
								<div>
									<p className="text-tg-hint">Use as background</p>
									<p className="font-medium text-tg-text">{color.className}</p>
								</div>
								<div>
									<p className="text-tg-hint">Readable text on top</p>
									<p className="font-medium text-tg-text">
										{color.textClassName}
									</p>
								</div>
							</div>
						</article>
					))}
				</div>
			</Section>
		</Page>
	);
}
