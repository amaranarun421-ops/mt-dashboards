"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Icon } from "@iconify/react";

const DatepickerPage = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [range, setRange] = useState<Date | undefined>(undefined);

  return (
    <PageContainer title="Datepicker" description="Calendar-based date and date-range pickers.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Single Date">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between font-normal">
                {date ? date.toLocaleDateString() : "Select date"}
                <Icon icon="solar:calendar-minimalistic-linear" width={18} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} /></PopoverContent>
          </Popover>
          {date && <p className="text-sm mt-3">Selected: <span className="font-medium text-primary">{date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span></p>}
        </DemoBlock>

        <DemoBlock title="Inline Calendar">
          <Calendar mode="single" selected={range} onSelect={setRange} className="rounded-lg border border-defaultBorder" />
        </DemoBlock>

        <DemoBlock title="Quick Presets" className="lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            {["Today", "Yesterday", "Last 7 days", "Last 30 days", "This month", "Last month", "This quarter", "This year"].map((p) => (
              <Button key={p} variant="outline" size="sm">{p}</Button>
            ))}
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default DatepickerPage;
