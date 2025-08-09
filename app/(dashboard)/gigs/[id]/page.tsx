import GigDetail from "@/components/GigDetail";
import api from "@/lib/api";
import { GigDetails } from "@/lib/types/gig";
import styles from "./page.module.css";

export default async function GigPage({ params }: { params: { id: string } }) {
  const gig = await api.get<GigDetails>(`/gigs/${params.id}`);
  return (
    <div className={styles.container}>
      <GigDetail gig={gig} />
    </div>
  );
}
