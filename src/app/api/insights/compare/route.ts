import { buildTripComparison, seedTrips } from "@/lib/triplens";

export const dynamic = "force-dynamic";

type CompareRequest = {
  baseTripId?: string;
  compareTripId?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as CompareRequest;

  if (!body.baseTripId || !body.compareTripId) {
    return Response.json(
      { error: "baseTripId and compareTripId are required." },
      { status: 400 },
    );
  }

  try {
    return Response.json({
      comparison: buildTripComparison(
        seedTrips,
        body.baseTripId,
        body.compareTripId,
      ),
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not build trip comparison.",
      },
      { status: 404 },
    );
  }
}
