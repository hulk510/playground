import { Flex, Heading, Text, VStack } from '@kuma-ui/core';

export function ShowCase({
  title,
  description,
  tags = [],
  children,
}: {
  title: string;
  description: string;
  tags: { id: number; name: string }[];
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Flex
      alignItems='flex-start'
      flexWrap='wrap'
      gap={32}
      justify='space-between'
      maxHeight='400px'
      my={80}
    >
      <VStack gap={8} maxW='240px' wordBreak='break-word'>
        <Heading as='h2' fontSize='16px' fontWeight='bold' m='0'>
          {title}
        </Heading>
        <Text fontSize='14px' m='0'>
          {description}
        </Text>
        <Flex gap={8} mt={4}>
          {tags.map((tag) => (
            <Text
              border='1px solid'
              borderRadius={4}
              fontSize='12px'
              key={tag.id}
              m='0'
              px={8}
              py={4}
            >
              {tag.name}
            </Text>
          ))}
        </Flex>
      </VStack>
      <Flex
        alignItems='center'
        border='1px solid rgba(211, 211, 211, 0.3)'
        borderRadius={32}
        height='320px'
        justify='center'
        p={8}
        width='400px'
      >
        {children}
      </Flex>
    </Flex>
  );
}
