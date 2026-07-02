import { describe, expect, it } from "vitest";
import {
  buildTripComparison,
  buildTripInsightSummary,
  buildYearlyTotals,
  getTripDailyCents,
  getTripDurationDays,
  getTripTotalCents,
} from "./calculations";
import { seedTrips } from "./seed";

const lisbon = seedTrips.find((trip) => trip.id === "trip-lisbon-2026")!;
const tbilisi = seedTrips.find((trip) => trip.id === "trip-tbilisi-2026")!;

describe("TripLens calculations", () => {
  it("calculates trip duration inclusively", () => {
    expect(getTripDurationDays(lisbon)).toBe(5);
    expect(getTripDurationDays(tbilisi)).toBe(4);
  });

  it("sums category totals into trip totals", () => {
    expect(getTripTotalCents(lisbon)).toBe(139000);
    expect(getTripTotalCents(tbilisi)).toBe(95000);
  });

  it("calculates per-day travel cost from the total and duration", () => {
    expect(getTripDailyCents(lisbon)).toBe(27800);
    expect(getTripDailyCents(tbilisi)).toBe(23750);
  });

  it("groups spending into yearly totals", () => {
    expect(buildYearlyTotals(seedTrips)).toEqual([
      { year: 2025, tripCount: 3, amountCents: 451000 },
      { year: 2026, tripCount: 3, amountCents: 435500 },
    ]);
  });

  it("builds summary metrics across all trips", () => {
    const summary = buildTripInsightSummary(seedTrips, lisbon.id);

    expect(summary.currentTrip.id).toBe(lisbon.id);
    expect(summary.totalTrips).toBe(6);
    expect(summary.totalSpentCents).toBe(886500);
    expect(summary.categoryBreakdown).toHaveLength(7);
    expect(summary.bestValueTrip.id).toBe("trip-valencia-2025");
    expect(summary.mostExpensiveTrip.id).toBe("trip-copenhagen-2025");
  });

  it("compares selected trips by total, daily, and category delta", () => {
    const comparison = buildTripComparison(seedTrips, lisbon.id, tbilisi.id);
    const lodgingDelta = comparison.categoryDeltas.find(
      (delta) => delta.categoryId === "lodging",
    );

    expect(comparison.totalDeltaCents).toBe(44000);
    expect(comparison.dailyDeltaCents).toBe(4050);
    expect(lodgingDelta?.deltaCents).toBe(34000);
  });
});
