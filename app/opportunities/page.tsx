import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import OpportunityCard from "@/components/OpportunityCard";
import { opportunities } from "@/lib/opportunities";

export const metadata = {
  title: "Opportunities | Orbas",
};

export default function OpportunitiesPage() {
  return (
    <Container maxW="6xl" py={8}>
      <Heading mb={6}>Opportunities</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {opportunities.map((op) => (
          <OpportunityCard key={op.id} opportunity={op} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
