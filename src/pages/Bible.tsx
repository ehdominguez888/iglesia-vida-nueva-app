import { BookOpen, Download } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";

const BibleApps = () => {
  usePageTitle("Biblia");

  const apps = [
    {
      name: "YouVersion Bible App",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.sirma.mobile.bible.android",
      appStoreUrl: "https://apps.apple.com/us/app/bible/id282935706",
    },
    {
      name: "Blue Letter Bible (BLB)",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.blb.android",
      appStoreUrl: "https://apps.apple.com/us/app/blue-letter-bible/id1441003128",
    },
    {
      name: "AndBible: Bible Study",
      playStoreUrl: "https://play.google.com/store/apps/details?id=net.bible.android.activity",
      appStoreUrl: "https://apps.apple.com/us/app/andbible/id1524292004",
    },
  ];

  return (
    <div className="animate-rise">
      <div className="flex items-center justify-between">
        <PageHeader
          eyebrow="Palabra de Dios"
          title="Biblia"
        />
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
          <BookOpen className="h-8 w-8" />
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/30 p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            ¿Sin tu Biblia física?
          </h2>
          <p className="text-muted-foreground">
            No te preocupes, estas aplicaciones gratuitas te permiten llevar la Palabra de Dios contigo en todo momento. Todas incluyen múltiples versiones en español de la Biblia.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {apps.map((app) => (
          <div key={app.name} className="rounded-3xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              {app.name}
            </h3>
            <div className="flex gap-3">
              <Button
                onClick={() => window.open(app.playStoreUrl, "_blank")}
                className="flex-1 h-12 rounded-2xl"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Google Play
              </Button>
              <Button
                onClick={() => window.open(app.appStoreUrl, "_blank")}
                className="flex-1 h-12 rounded-2xl"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                App Store
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BibleApps;