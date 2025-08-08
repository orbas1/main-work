import { Heading } from "@chakra-ui/react";
import NotificationList from "@/components/NotificationList";
import styles from "./page.module.css";

export default function NotificationsPage() {
  return (
    <div className={styles.container}>
      <Heading mb={4}>Notifications</Heading>
      <NotificationList />
    </div>
  );
}
