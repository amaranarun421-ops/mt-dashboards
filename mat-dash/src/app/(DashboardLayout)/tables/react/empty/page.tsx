"use client";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const EmptyTablePage = () => (
  <PageContainer title="React Table — Empty" description="Beautiful empty states for when there's no data to show.">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DemoBlock title="No Data">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-16 w-16 rounded-2xl bg-lightgray dark:bg-dark flex items-center justify-center mb-4">
            <Icon icon="solar:inbox-line-duotone" width={32} className="text-muted-foreground" />
          </div>
          <h6 className="font-semibold text-sm">No records found</h6>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">There are no items to display. Try adjusting your filters or add a new record.</p>
          <Button size="sm" className="mt-4 gap-1.5"><Icon icon="solar:add-circle-bold" width={14} /> Add Record</Button>
        </div>
      </DemoBlock>

      <DemoBlock title="No Search Results">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-16 w-16 rounded-2xl bg-lightgray dark:bg-dark flex items-center justify-center mb-4">
            <Icon icon="solar:magnifer-bug-bold-duotone" width={32} className="text-muted-foreground" />
          </div>
          <h6 className="font-semibold text-sm">No matching results</h6>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">No records match your search criteria. Try different keywords.</p>
          <Button size="sm" variant="outline" className="mt-4 gap-1.5"><Icon icon="solar:refresh-bold" width={14} /> Clear Filters</Button>
        </div>
      </DemoBlock>

      <DemoBlock title="Error State" className="lg:col-span-2">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-16 w-16 rounded-2xl bg-lighterror flex items-center justify-center mb-4">
            <Icon icon="solar:danger-bold-duotone" width={32} className="text-error" />
          </div>
          <h6 className="font-semibold text-sm">Failed to load data</h6>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">An error occurred while fetching records. Please try again.</p>
          <Button size="sm" variant="outline" className="mt-4 gap-1.5"><Icon icon="solar:refresh-bold" width={14} /> Retry</Button>
        </div>
      </DemoBlock>
    </div>
  </PageContainer>
);

export default EmptyTablePage;
