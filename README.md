# Telegram Mini App Starter

A Vite, React, TanStack Router, Tailwind CSS, and Telegram SDK starter for building Telegram Mini Apps quickly.

## Stack

- Vite + React
- TanStack Router file routes
- Tailwind CSS v4
- Telegram Mini Apps SDK
- Biome formatting and linting
- Vitest test runner

## Quick Start

```bash
bun install
bun run dev
```

Open:

```text
http://localhost:3000
```

The app runs outside Telegram in development using a mocked Telegram environment, so you can build in your browser first and test inside Telegram later.

## Environment

Copy `.env.example` to `.env` and fill what your app needs:

```bash
VITE_API_URL=
VITE_BOT_USERNAME=
VITE_APP_BASE_URL=https://miniapp.cipher-dev.cv
```

Only variables that start with `VITE_` are available in the browser.

## Useful Commands

```bash
bun run dev
bun run build
bun run preview
bun run check
bun run test
```

## Project Structure

```text
src/
  components/ui/      Reusable starter UI components
  hooks/              App hooks, including useTelegram()
  lib/                Shared helpers for API, env, and class names
  providers/          Telegram SDK startup and browser dev mock
  routes/             TanStack Router file routes
  styles.css          Tailwind import and Telegram theme tokens
```

## Telegram Helpers

Telegram setup lives in `src/providers/telegram.ts`.

It does these starter tasks:

- initializes the Telegram SDK
- mocks Telegram launch params in browser development
- binds Telegram theme CSS variables
- mounts mini app and viewport helpers
- expands the viewport
- calls `miniAppReady()`

Use `src/hooks/useTelegram.ts` when you need Telegram data:

```tsx
import { useTelegram } from "#/hooks/useTelegram";

function Profile() {
	const telegram = useTelegram();

	return <p>Hello, {telegram.user?.firstName ?? "friend"}</p>;
}
```

For backend requests, use `src/lib/api.ts`. It automatically sends the Telegram init data as:

```text
Authorization: tma <init-data>
```

Your backend should validate this init data before trusting the user.

## Server Data

Axios handles HTTP requests in `src/lib/api.ts`. TanStack Query handles loading, caching, errors, and refetching.

Use `apiFetch` directly when you need a one-off request:

```tsx
import { apiFetch } from "#/lib/api";

const profile = await apiFetch("/profile");
```

Use `useApiQuery` for page data:

```tsx
import { useApiQuery } from "#/hooks/useApiQuery";

function Prices() {
	const prices = useApiQuery({
		path: "https://api.example.com/prices",
		queryKey: ["prices"],
		refetchInterval: 10_000,
		telegramAuth: false,
	});

	if (prices.isLoading) return <p>Loading...</p>;
	if (prices.error) return <p>Could not load prices.</p>;

	return <pre>{JSON.stringify(prices.data, null, 2)}</pre>;
}
```

Use `useApiMutation` for create, update, delete, and submit actions:

```tsx
import { useApiMutation } from "#/hooks/useApiMutation";

type CreateTaskInput = {
	title: string;
};

type Task = {
	id: string;
	title: string;
};

function CreateTaskButton() {
	const createTask = useApiMutation<Task, CreateTaskInput>({
		path: "/tasks",
		invalidateQueries: [["tasks"]],
	});

	return (
		<button
			disabled={createTask.isPending}
			onClick={() => createTask.mutate({ title: "New task" })}
		>
			Create task
		</button>
	);
}
```

## Theme Classes

Telegram theme colors are available as Tailwind classes:

```tsx
<div className="bg-tg-bg text-tg-text">
	<button className="bg-tg-button text-tg-button-text">Continue</button>
</div>
```

Open `/theme` to preview the palette.

## Before Using

1. Add your bot username to `.env`.
2. Add your API URL to `.env`.
3. Configure your deployed app URL in BotFather.
4. Keep `/theme` while designing, then delete it if you do not need it.
5. Build your first real page from `src/routes/index.tsx`.
