import { Metadata } from "next";
import { notFound } from "next/navigation";
import ContractForm from "@/components/ContractForm";
import { getContract } from "@/lib/services/contractService";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Edit Contract - Orbas",
};

export default async function EditContractPage({
  params,
}: {
  params: { id: string };
}) {
  const contractId = Number(params.id);
  const contract = await getContract(contractId);
  if (!contract) notFound();
  return (
    <div className={styles.container}>
      <ContractForm contract={contract} />
    </div>
  );
}
