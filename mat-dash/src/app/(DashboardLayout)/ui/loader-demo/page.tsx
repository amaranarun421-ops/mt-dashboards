"use client";

import { useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/layout/shared/page-container/PageContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PremiumSpinner from "@/app/components/loaders/PremiumSpinner";
import { useRouter } from "next/navigation";

const LoaderDemo = () => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState<string | null>(null);

  const loaderVariants = [
    { id: "default", name: "Default Gradient", variant: "default" as const },
    { id: "dots", name: "Bouncing Dots", variant: "dots" as const },
    { id: "pulse", name: "Pulse Effect", variant: "pulse" as const },
    { id: "orbit", name: "Orbital Spinner", variant: "orbit" as const },
  ];

  const sizes = [
    { id: "sm", name: "Small" },
    { id: "md", name: "Medium" },
    { id: "lg", name: "Large" },
    { id: "xl", name: "Extra Large" },
  ];

  return (
    <PageContainer
      title="Loader & Spinner Demo"
      description="Modern premium loaders and spinners with multiple variants and sizes"
    >
      <div className="space-y-6">
        {/* Navigation Loader Test */}
        <Card>
          <CardHeader>
            <CardTitle>Navigation Loader Test</CardTitle>
            <CardDescription>
              Test the content-area loader that appears during page navigation.
              The loader will only appear in the content area, not over the header or sidebar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => router.push("/")}>
                Navigate to Dashboard
              </Button>
              <Button onClick={() => router.push("/sample-page")} variant="outline">
                Navigate to Sample Page
              </Button>
              <Button onClick={() => router.refresh()} variant="secondary">
                Refresh Page
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Click any button above to see the navigation loader in action.
              Notice how it only covers the content area, leaving the header and sidebar visible.
            </p>
          </CardContent>
        </Card>

        {/* Loader Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Loader Variants</CardTitle>
            <CardDescription>
              Four premium loader variants with smooth animations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loaderVariants.map((loader) => (
                <div
                  key={loader.id}
                  className="flex flex-col items-center gap-4 p-6 rounded-lg border border-defaultBorder bg-lightgray dark:bg-dark"
                >
                  <h3 className="text-sm font-semibold">{loader.name}</h3>
                  <div className="h-32 flex items-center justify-center">
                    <PremiumSpinner
                      size="md"
                      variant={loader.variant}
                      showText={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Size Variations */}
        <Card>
          <CardHeader>
            <CardTitle>Size Variations</CardTitle>
            <CardDescription>
              Default variant in different sizes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sizes.map((size) => (
                <div
                  key={size.id}
                  className="flex flex-col items-center gap-4 p-6 rounded-lg border border-defaultBorder bg-lightgray dark:bg-dark"
                >
                  <h3 className="text-sm font-semibold">{size.name}</h3>
                  <div className="h-32 flex items-center justify-center">
                    <PremiumSpinner
                      size={size.id as "sm" | "md" | "lg" | "xl"}
                      variant="default"
                      showText={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* With Text */}
        <Card>
          <CardHeader>
            <CardTitle>Loaders with Text</CardTitle>
            <CardDescription>
              All variants with loading text
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loaderVariants.map((loader) => (
                <div
                  key={loader.id}
                  className="flex flex-col items-center gap-4 p-8 rounded-lg border border-defaultBorder bg-lightgray dark:bg-dark"
                >
                  <PremiumSpinner
                    size="md"
                    variant={loader.variant}
                    showText={true}
                    text={`Loading ${loader.name}...`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Loader Demo</CardTitle>
            <CardDescription>
              Click buttons to show/hide loaders with different configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                {loaderVariants.map((loader) => (
                  <Button
                    key={loader.id}
                    onClick={() => {
                      setShowLoader(loader.id);
                      setTimeout(() => setShowLoader(null), 3000);
                    }}
                    variant={showLoader === loader.id ? "default" : "outline"}
                  >
                    Show {loader.name}
                  </Button>
                ))}
              </div>

              {showLoader && (
                <div className="relative min-h-[200px] rounded-lg border border-defaultBorder bg-lightgray dark:bg-dark flex items-center justify-center">
                  <PremiumSpinner
                    size="lg"
                    variant={
                      loaderVariants.find((l) => l.id === showLoader)?.variant ||
                      "default"
                    }
                    showText={true}
                    text="Loading content..."
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Mobile Responsiveness Note */}
        <Card className="border-primary/50 bg-lightprimary dark:bg-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📱</span> Mobile Responsive
            </CardTitle>
            <CardDescription>
              All loaders are fully responsive and work perfectly on mobile devices.
              The navigation loader is positioned to only cover the content area on all screen sizes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Navigation loader stays within content boundaries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Header and sidebar remain visible during loading</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Site loader covers entire viewport on initial load</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Smooth animations optimized for all devices</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default LoaderDemo;

// Made with Bob
