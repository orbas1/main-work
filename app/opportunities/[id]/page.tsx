import { notFound } from "next/navigation";
import {
  Avatar,
  Badge,
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { getOpportunityById } from "@/lib/opportunities";

interface Props {
  params: { id: string };
}

export default function OpportunityDetail({ params }: Props) {
  const id = Number(params.id);
  const opportunity = getOpportunityById(id);

  if (!opportunity) return notFound();

  return (
    <Container maxW="3xl" py={8}>
      <Stack spacing={4}>
        <Heading>{opportunity.title}</Heading>
        <Text>{opportunity.description}</Text>
        {typeof opportunity.compensation === "number" && (
          <Text fontWeight="bold">
            ${opportunity.compensation.toLocaleString()}
          </Text>
        )}
        <Stack direction="row" spacing={2}>
          <Badge colorScheme="green">{opportunity.status}</Badge>
          {opportunity.category && <Badge>{opportunity.category}</Badge>}
        </Stack>
        {opportunity.provider && (
          <Stack direction="row" align="center" mt={4}>
            {opportunity.provider.image && (
              <Avatar
                src={opportunity.provider.image}
                name={opportunity.provider.name}
              />
            )}
            <Text fontWeight="medium">{opportunity.provider.name}</Text>
          </Stack>
        )}
        <Button as={Link} href={`/applications/new?opportunity=${opportunity.id}`} mt={4}>
          Apply Now
        </Button>
      </Stack>
    </Container>
  );
}
