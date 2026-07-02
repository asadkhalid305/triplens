import { TripDashboard } from "@/components/trip-dashboard";
import { seedTrips } from "@/lib/triplens";

export default function Home() {
  return <TripDashboard initialTrips={seedTrips} />;
}
