import ReactMarkdown from "react-markdown";
import { Box, Heading } from "@chakra-ui/react";
import remarkGfm from "remark-gfm";

export function Markdown({ markdownText, clickHandler }) {
  return (
    <Box
      onClick={clickHandler && clickHandler}
      border="solid"
      borderWidth="1px"
      padding={2}
      paddingLeft={8}
      borderColor="gray.400"
      minHeight="100px"
    >
      <ReactMarkdown children={markdownText} remarkPlugin={[remarkGfm]} />
    </Box>
  );
}
