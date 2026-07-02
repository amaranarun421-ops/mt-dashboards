import { NextResponse } from "next/server";
import { salesOverview } from "@/data/sales";
import { ecommerceKpis } from "@/data/ecommerce";

// Aggregated dashboard metrics endpoint — realistic mock data layer.
// In production this would hit a real database / warehouse; here we expose
// curated mock data so the kit is fully functional out of the box.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope") ?? "all";

  const data = {
    scope,
    generatedAt: new Date().toISOString(),
    ecommerce: ecommerceKpis,
    sales: salesOverview,
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
