import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react';
import { FeaturesGrid } from 'components';
import { Link } from "react-router-dom";
import { useDocumentTitle } from 'utilities';
export function Home() {
  useDocumentTitle("Yorked")
  return (
    <Container maxW={'5xl'}>

      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Task Planning{' '}
          <Text as={'span'} color={'primary.light'}>
            made easy
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Bowl out your tasks with Yorked.
          Yorked is a simple, intuitive, productivity tool that helps keep your tasks aligned with the end Goal.
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Link to="/boards">
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'blue'}
              bg={'primary.light'}
              _hover={{ bg: 'primary.light' }}>
              Get started
            </Button>
          </Link>
        </Stack>
        
      </Stack>
      <FeaturesGrid/>
    </Container>
  );
}