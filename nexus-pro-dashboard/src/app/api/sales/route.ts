import { NextResponse } from "next/server";
import { deals, leads, accounts, salesReps, pipelineStages } from "@/data/sales";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const entity = searchParams.get("entity");

  if (entity === "deals") return NextResponse.json({ data: deals });
  if (entity === "leads") return NextResponse.json({ data: leads });
  if (entity === "accounts") return NextResponse.json({ data: accounts });
  if (entity === "reps") return NextResponse.json({ data: salesReps });
  if (entity === "pipeline") return NextResponse.json({ data: pipelineStages });

  return NextResponse.json({
    data: { deals, leads, accounts, salesReps, pipelineStages },
  });
}
