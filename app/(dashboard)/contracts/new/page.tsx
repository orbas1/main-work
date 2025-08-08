import { Metadata } from "next";
import ContractForm from "@/components/ContractForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "New Contract - Orbas",
};

export default function NewContractPage() {
  return (
    <div className={styles.container}>
      <ContractForm />
    </div>
  );
}
