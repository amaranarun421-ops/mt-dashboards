"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

const AiTableBuilderPage = () => {
  const [prompt, setPrompt] = useState("Create a table of top 5 SaaS companies with their ARR, founded year, and CEO");
  const [generated, setGenerated] = useState(false);

  const sampleRows = [
    { company: "Salesforce", arr: "$34.9B", founded: 1999, ceo: "Marc Benioff" },
    { company: "Microsoft", arr: "$211.9B", founded: 1975, ceo: "Satya Nadella" },
    { company: "Adobe", arr: "$19.4B", founded: 1982, ceo: "Shantanu Narayen" },
    { company: "ServiceNow", arr: "$8.5B", founded: 2004, ceo: "Bill McDermott" },
    { company: "HubSpot", arr: "$2.2B", founded: 2006, ceo: "Yamini Rangan" },
  ];

  return (
    <PageContainer title="AI Table Builder" description="Describe the data you need in plain English. AI generates a structured table for you.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DemoBlock title="Prompt" className="lg:col-span-1">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            placeholder="Describe the table you want to build..."
          />
          <div className="flex gap-2 mt-3">
            <Button className="flex-1 gap-1.5" onClick={() => setGenerated(true)}>
              <Icon icon="solar:magic-stick-3-bold-duotone" width={16} /> Generate
            </Button>
            <Button variant="outline" onClick={() => { setPrompt(""); setGenerated(false); }}>Clear</Button>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold opacity-70 uppercase mb-2">Quick Prompts</p>
            <div className="space-y-2">
              {[
                "Top 10 countries by GDP",
                "List of US presidents since 1990",
                "Programming languages by popularity",
                "World's tallest buildings",
              ].map((p) => (
                <button key={p} onClick={() => setPrompt(p)} className="block w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-lightprimary hover:text-primary border border-defaultBorder">
                  {p}
                </button>
              ))}
            </div>
          </div>
        </DemoBlock>

        <div className="lg:col-span-2">
          {!generated ? (
            <DemoBlock title="Output" >
              <div className="text-center py-16 opacity-60">
                <Icon icon="solar:database-bold-duotone" width={56} className="mx-auto mb-3" />
                <p className="text-sm">Your generated table will appear here</p>
                <p className="text-xs mt-1">Enter a prompt and click Generate</p>
              </div>
            </DemoBlock>
          ) : (
            <DemoBlock title="Generated Table" description={prompt}>
              <div className="rounded-lg border border-defaultBorder overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-lightprimary/50">
                      <TableHead className="text-primary">Company</TableHead>
                      <TableHead className="text-primary">ARR</TableHead>
                      <TableHead className="text-primary">Founded</TableHead>
                      <TableHead className="text-primary">CEO</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleRows.map((r) => (
                      <TableRow key={r.company}>
                        <TableCell className="font-medium">{r.company}</TableCell>
                        <TableCell><Badge variant="lightSuccess">{r.arr}</Badge></TableCell>
                        <TableCell>{r.founded}</TableCell>
                        <TableCell>{r.ceo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="gap-1.5"><Icon icon="solar:download-minimalistic-bold" width={14} /> Export CSV</Button>
                <Button variant="outline" size="sm" className="gap-1.5"><Icon icon="solar:document-add-bold-duotone" width={14} /> Save as Page</Button>
                <Button variant="outline" size="sm" className="gap-1.5 ml-auto"><Icon icon="solar:refresh-bold" width={14} /> Regenerate</Button>
              </div>
            </DemoBlock>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default AiTableBuilderPage;
