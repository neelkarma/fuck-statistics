import { NextPage } from "next";
import {
  Button,
  Center,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  useCallback,
  useState,
} from "react";
import { Dataset } from "../lib/dataset";
import { useRouter } from "next/router";
import Head from "next/head";
import { FadeProvider } from "../components/FadeProvider";

const Index: NextPage = () => {
  const router = useRouter();
  const [invalid, setInvalid] = useState(false);
  const [input, setInput] = useState("");

  const onSubmit = useCallback(() => {
    // Validate Input
    const dataset = Dataset.fromInput(input);
    if (!dataset.isValid()) return setInvalid(true);

    // Push results url to router
    router.push(`/result?input=${encodeURIComponent(input)}`);
  }, [input, router]);

  const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => setInput(e.target.value),
    []
  );

  const onInputFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
    () => setInvalid(false),
    []
  );

  const onInputKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.key == "Enter") onSubmit();
    },
    [onSubmit]
  );

  return (
    <FadeProvider>
      <Center h="100vh">
        <Head>
          <title>Fuck Statistics</title>
        </Head>
        <VStack w="lg" gap={2}>
          <Heading>Fuck Statistics</Heading>
          <HStack w="full">
            <Input
              isInvalid={invalid}
              onChange={onInputChange}
              onFocus={onInputFocus}
              onKeyDown={onInputKeyDown}
              placeholder="Dataset, separated by commas and/or spaces"
            />
            <Button onClick={onSubmit} colorScheme="blue">
              Compute
            </Button>
          </HStack>
        </VStack>
      </Center>
    </FadeProvider>
  );
};

export default Index;
