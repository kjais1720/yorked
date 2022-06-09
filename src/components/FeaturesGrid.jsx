import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcTodoList, FcClock, FcInTransit } from 'react-icons/fc';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack align="center" shadow="2xl" padding={4} borderRadius={4}>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text textAlign="center" fontWeight={600}>{title}</Text>
      <Text textAlign="center" color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export function FeaturesGrid() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Feature
          icon={<Icon as={FcTodoList} w={10} h={10} />}
          title={'Kanban Boards'}
          text={
            "Plan & work on your tasks efficiently using the proven method of Kanban boards."
          }
        />
        <Feature
          icon={<Icon as={FcClock} w={10} h={10} />}
          title={'Pomodoro Timer'}
          text={
            "Don't just plan, act. Start working on any task with a Pomodoro timer to maximise your productivity."
          }
        />
      </SimpleGrid>
    </Box>
  );
}