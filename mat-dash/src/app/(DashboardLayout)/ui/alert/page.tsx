"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Icon } from "@iconify/react";

const AlertPage = () => {
  return (
    <PageContainer
      title="Alert"
      description="Contextual feedback messages for typical user actions. Four severity levels with optional titles, descriptions, and icons."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Simple Alerts" description="Inline alerts with severity colors">
          <div className="space-y-3">
            <Alert variant="default"><Icon icon="solar:info-circle-bold" /> This is a primary alert — check it out!</Alert>
            <Alert variant="success"><Icon icon="solar:check-circle-bold" /> Successfully saved your changes.</Alert>
            <Alert variant="warning"><Icon icon="solar:danger-triangle-bold" /> Warning: your trial expires in 3 days.</Alert>
            <Alert variant="destructive"><Icon icon="solar:danger-bold" /> Error: unable to process payment.</Alert>
            <Alert variant="info"><Icon icon="solar:bell-bing-bold" /> A new version is available for download.</Alert>
          </div>
        </DemoBlock>

        <DemoBlock title="With Title & Description" description="Rich alerts with structured content">
          <div className="space-y-3">
            <Alert variant="success">
              <Icon icon="solar:check-circle-bold" />
              <AlertTitle>Payment Received</AlertTitle>
              <AlertDescription>
                Your subscription is now active. A receipt has been sent to your email.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Icon icon="solar:server-bold-duotone" />
              <AlertTitle>Connection Failed</AlertTitle>
              <AlertDescription>
                Could not reach the API server. Check your network and try again.
              </AlertDescription>
            </Alert>
            <Alert variant="warning">
              <Icon icon="solar:danger-triangle-bold" />
              <AlertTitle>Storage 90% Full</AlertTitle>
              <AlertDescription>
                Consider archiving old files to free up space.
              </AlertDescription>
            </Alert>
          </div>
        </DemoBlock>

        <DemoBlock title="Outline Alerts" description="Bordered style for less visual weight">
          <div className="space-y-3">
            <Alert variant="default" className="border-primary text-primary bg-transparent">
              <Icon icon="solar:info-circle-bold" /> Primary outline alert
            </Alert>
            <Alert variant="success" className="bg-transparent">
              <Icon icon="solar:check-circle-bold" /> Success outline alert
            </Alert>
            <Alert variant="warning" className="bg-transparent">
              <Icon icon="solar:danger-triangle-bold" /> Warning outline alert
            </Alert>
          </div>
        </DemoBlock>

        <DemoBlock title="Soft Background Alerts" description="Tinted backgrounds for inline notices">
          <div className="space-y-3">
            <Alert className="bg-lightprimary text-primary border-none">
              <Icon icon="solar:lightbulb-bolt-bold-duotone" /> Pro tip: use keyboard shortcuts to navigate faster.
            </Alert>
            <Alert className="bg-lightsuccess text-success border-none">
              <Icon icon="solar:gift-bold" /> You earned the Early Bird badge!
            </Alert>
            <Alert className="bg-lightwarning text-warning border-none">
              <Icon icon="solar:clock-circle-bold" /> Your session expires in 5 minutes.
            </Alert>
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default AlertPage;
