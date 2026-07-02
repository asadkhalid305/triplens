import {
  buildTripInsightSummary,
  normalizeTripCategoryTotals,
  seedTrips,
} from "@/lib/triplens";

export const dynamic = "force-dynamic";

export async function GET() {
  const normalizedTrips = seedTrips.map((trip) => ({
    ...trip,
    categoryTotals: normalizeTripCategoryTotals(trip),
  }));

  return Response.json({
    trips: normalizedTrips,
    summary: buildTripInsightSummary(normalizedTrips),
  });
}

export async function POST(request: Request) {
  const trip = await request.json();
  const normalizedTrip = {
    ...trip,
    categoryTotals: normalizeTripCategoryTotals(trip),
  };
  const trips = [normalizedTrip, ...seedTrips];

  return Response.json(
    {
      trip: normalizedTrip,
      trips,
      summary: buildTripInsightSummary(trips, normalizedTrip.id),
    },
    { status: 201 },
  );
}
