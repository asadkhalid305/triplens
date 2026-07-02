"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  CircleDollarSign,
  Compass,
  MapPinned,
  PlaneTakeoff,
  Plus,
  Sparkles,
  WalletCards,
} from "lucide-react";
import {
  buildTripInsightSummary,
  formatMoney,
  getTripDailyCents,
  getTripDurationDays,
  getTripTotalCents,
  type Trip,
} from "@/lib/triplens";

type TripDashboardProps = {
  initialTrips: Trip[];
};

export function TripDashboard({ initialTrips }: TripDashboardProps) {
  const [trips] = useState(initialTrips);
  const [selectedTripId, setSelectedTripId] = useState(initialTrips[0]?.id);

  const summary = useMemo(
    () => buildTripInsightSummary(trips, selectedTripId),
    [trips, selectedTripId],
  );
  const currentTrip = summary.currentTrip;
  const currentTotal = getTripTotalCents(currentTrip);
  const currentDaily = getTripDailyCents(currentTrip);

  return (
    <main className="app-shell min-h-screen px-4 py-5 sm:px-6 lg:px-10">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <TopNav />

        <section className="floating-panel rounded-lg p-4 sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="flex flex-col justify-between gap-6">
              <HeroCopy />
              <div className="grid gap-3 sm:grid-cols-3">
                <MetricCard
                  icon={<CalendarDays className="size-5" aria-hidden="true" />}
                  label="Trips logged"
                  value={summary.totalTrips.toString()}
                  helper={`${summary.totalTravelDays} travel days`}
                  tone="text-primary"
                />
                <MetricCard
                  icon={<CircleDollarSign className="size-5" aria-hidden="true" />}
                  label="Total spend"
                  value={formatMoney(summary.totalSpentCents)}
                  helper="Across all logged trips"
                  tone="text-secondary"
                />
                <MetricCard
                  icon={<PlaneTakeoff className="size-5" aria-hidden="true" />}
                  label="Avg per day"
                  value={formatMoney(summary.averageDailyCents)}
                  helper="Your travel baseline"
                  tone="text-info"
                />
              </div>
            </div>

            <CurrentTripPanel trip={currentTrip} total={currentTotal} daily={currentDaily} />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <CategoryBreakdown trips={trips} />
          <YearlyTravel summary={summary} />
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <InsightPanel summary={summary} />
          <TripList
            trips={trips}
            selectedTripId={selectedTripId}
            onSelectTrip={setSelectedTripId}
          />
        </section>
      </section>
    </main>
  );
}

function TopNav() {
  return (
    <nav className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-lg bg-primary text-primary-content shadow-sm">
          <Compass className="size-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-lg font-semibold leading-tight">TripLens</p>
          <p className="text-sm text-base-content/60">Post-trip travel insights</p>
        </div>
      </div>
      <button className="btn btn-primary btn-sm rounded-lg">
        <Plus className="size-4" aria-hidden="true" />
        New trip
      </button>
    </nav>
  );
}

function HeroCopy() {
  return (
    <div className="space-y-5">
      <div className="badge badge-accent badge-outline rounded-lg px-3 py-3">
        Built for the end of the trip
      </div>
      <div className="space-y-3">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
          See what your trips actually cost after the suitcase is back.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-base-content/68 sm:text-lg">
          TripLens turns post-trip category totals into personal travel patterns:
          cost per day, category mix, yearly totals, and comparisons that help
          the next trip feel less like guesswork.
        </p>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  helper,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  helper: string;
  tone: string;
}) {
  return (
    <div className="floating-card rounded-lg p-4">
      <div className={tone}>{icon}</div>
      <p className="metric-label mt-3">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-base-content/58">{helper}</p>
    </div>
  );
}

function CurrentTripPanel({
  trip,
  total,
  daily,
}: {
  trip: Trip;
  total: number;
  daily: number;
}) {
  return (
    <article className="floating-card flex h-full flex-col justify-between rounded-lg p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="metric-label">Selected trip</p>
          <h2 className="mt-1 text-2xl font-semibold">
            {trip.destination}, {trip.country}
          </h2>
          <p className="mt-2 text-sm leading-6 text-base-content/62">
            {trip.summary}
          </p>
        </div>
        <MapPinned className="size-6 shrink-0 text-primary" aria-hidden="true" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-base-200/70 p-3">
          <p className="metric-label">Total</p>
          <p className="mt-1 text-2xl font-semibold">{formatMoney(total)}</p>
        </div>
        <div className="rounded-lg bg-base-200/70 p-3">
          <p className="metric-label">Per day</p>
          <p className="mt-1 text-2xl font-semibold">{formatMoney(daily)}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="badge badge-primary badge-outline rounded-lg">
          {getTripDurationDays(trip)} days
        </span>
        <span className="badge badge-secondary badge-outline rounded-lg">
          {trip.travelStyle.replace("-", " ")}
        </span>
        <span className="badge badge-ghost rounded-lg">{trip.currency}</span>
      </div>
    </article>
  );
}

function CategoryBreakdown({ trips }: { trips: Trip[] }) {
  const summary = buildTripInsightSummary(trips);
  const visibleCategories = summary.categoryBreakdown
    .filter((category) => category.amountCents > 0)
    .sort((a, b) => b.amountCents - a.amountCents);

  return (
    <section className="floating-card rounded-lg p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="metric-label">Category mix</p>
          <h2 className="mt-1 text-2xl font-semibold">Where the travel money goes</h2>
        </div>
        <WalletCards className="size-5 text-primary" aria-hidden="true" />
      </div>
      <div className="mt-5 space-y-4">
        {visibleCategories.map((category) => (
          <div key={category.categoryId}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium">{category.label}</span>
              <span className="text-base-content/65">
                {formatMoney(category.amountCents)} · {category.percentage}%
              </span>
            </div>
            <div className="h-3 rounded-lg bg-base-200">
              <div
                className="h-3 rounded-lg"
                style={{
                  width: `${Math.max(category.percentage, 2)}%`,
                  backgroundColor: category.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function YearlyTravel({ summary }: { summary: ReturnType<typeof buildTripInsightSummary> }) {
  const maxYear = Math.max(...summary.yearlyTotals.map((year) => year.amountCents));

  return (
    <section className="floating-card rounded-lg p-5">
      <p className="metric-label">Year view</p>
      <h2 className="mt-1 text-2xl font-semibold">Travel spend by year</h2>
      <div className="mt-5 space-y-4">
        {summary.yearlyTotals.map((year) => (
          <div key={year.year} className="rounded-lg bg-base-200/65 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="font-semibold">{year.year}</p>
                <p className="text-sm text-base-content/58">
                  {year.tripCount} logged trips
                </p>
              </div>
              <p className="text-xl font-semibold">{formatMoney(year.amountCents)}</p>
            </div>
            <div className="h-2 rounded-lg bg-base-300">
              <div
                className="h-2 rounded-lg bg-primary"
                style={{
                  width: `${Math.max(10, Math.round((year.amountCents / maxYear) * 100))}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InsightPanel({ summary }: { summary: ReturnType<typeof buildTripInsightSummary> }) {
  return (
    <aside className="floating-card rounded-lg p-5">
      <Sparkles className="size-5 text-secondary" aria-hidden="true" />
      <p className="metric-label mt-4">Pattern notes</p>
      <div className="mt-3 space-y-4">
        <p className="text-xl font-semibold">
          {summary.bestValueTrip.destination} is your best cost-per-day trip so far.
        </p>
        <p className="text-sm leading-6 text-base-content/62">
          {summary.mostExpensiveTrip.destination} is the highest total spend. Use
          comparison mode to see whether lodging, transport, or activities created
          the gap.
        </p>
      </div>
    </aside>
  );
}

function TripList({
  trips,
  selectedTripId,
  onSelectTrip,
}: {
  trips: Trip[];
  selectedTripId?: string;
  onSelectTrip: (tripId: string) => void;
}) {
  return (
    <section className="floating-card rounded-lg p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="metric-label">Trips</p>
          <h2 className="mt-1 text-2xl font-semibold">Your travel ledger</h2>
        </div>
        <p className="text-sm text-base-content/58">
          Select a trip to update the dashboard.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {trips.map((trip) => {
          const isSelected = trip.id === selectedTripId;

          return (
            <button
              className={`rounded-lg border p-4 text-left transition ${
                isSelected
                  ? "border-primary bg-primary/8 shadow-sm"
                  : "border-base-300 bg-white/70 hover:border-primary/45"
              }`}
              key={trip.id}
              onClick={() => onSelectTrip(trip.id)}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="metric-label">{trip.name}</p>
                  <h3 className="mt-1 text-xl font-semibold">{trip.destination}</h3>
                </div>
                <span className="badge badge-ghost rounded-lg">
                  {getTripDurationDays(trip)}d
                </span>
              </div>
              <div className="mt-4 flex items-end justify-between gap-3">
                <p className="text-2xl font-semibold">
                  {formatMoney(getTripTotalCents(trip), trip.currency)}
                </p>
                <p className="text-sm text-base-content/58">
                  {formatMoney(getTripDailyCents(trip), trip.currency)}/day
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
