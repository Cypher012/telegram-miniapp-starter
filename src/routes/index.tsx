import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Card } from "#/components/ui/card";
import { Page } from "#/components/ui/page";
import { Section } from "#/components/ui/section";
import { EmptyState } from "#/components/ui/state";
import { useTelegram } from "#/hooks/useTelegram";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const telegram = useTelegram();
  const displayName = telegram.user?.firstName ?? "Developer";

  return (
    <Page>
      <section className="space-y-3">
        <p className="text-sm font-medium text-tg-accent-text">CryptoWatch</p>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Telegram Mini App starter</h1>
          <p className="text-tg-subtitle-text">
            Build from this screen during your hackathon instead of scaffolding
            a new project.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/theme">
            <Button>View theme colors</Button>
          </Link>
          <Button variant="secondary">Secondary action</Button>
        </div>
      </section>

      <Section title={`Hello, ${displayName}`}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card>
            <p className="text-sm text-tg-hint">Environment</p>
            <p className="mt-1 font-semibold">
              {telegram.isTelegram ? "Telegram" : "Browser dev mode"}
            </p>
          </Card>
          <Card>
            <p className="text-sm text-tg-hint">Platform</p>
            <p className="mt-1 font-semibold">{telegram.platform}</p>
          </Card>
        </div>
      </Section>

      <Section
        description="Replace this empty state with your first real feature."
        title="Starter surface"
      >
        <EmptyState
          action={<Button variant="ghost">Create first feature</Button>}
          description="Use the UI components in src/components/ui and Telegram data from src/hooks/useTelegram."
          title="Ready for your app idea"
        />
      </Section>
    </Page>
  );
}
