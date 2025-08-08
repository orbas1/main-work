"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Gig } from "./GigCard";
import { formatCurrency } from "@/lib/utils/format";
import styles from "./GigQuickViewModal.module.css";

export default function GigQuickViewModal({
  gig,
  isOpen,
  onClose,
}: {
  gig: Gig;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent className={styles.modalContent}>
        <ModalHeader>{gig.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {gig.thumbnail && (
            <Image src={gig.thumbnail} alt={gig.title} mb={4} />
          )}
          <VStack align="start" spacing={2}>
            <Text>{gig.description}</Text>
            {gig.category && <Text>Category: {gig.category}</Text>}
            {gig.rating && <Text>Rating: {gig.rating.toFixed(1)}</Text>}
            {gig.deliveryTime && <Text>Delivery: {gig.deliveryTime} days</Text>}
            {gig.location && <Text>Location: {gig.location}</Text>}
            <Text>Price: {formatCurrency(gig.price)}</Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
