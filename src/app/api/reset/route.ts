import { buildTripInsightSummary, seedTrips } from "@/lib/triplens";

export const dynamic = "force-dynamic";

export async function POST() {
  return Response.json({
    trips: seedTrips,
    summary: buildTripInsightSummary(seedTrips),
  });
}
