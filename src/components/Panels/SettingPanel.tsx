import { Flex, Link } from "@chakra-ui/react";
import { wagmiConfig } from "src/config";
import { disconnect } from "@wagmi/core";
import { FMPanel } from "./FMPanel";
import { FillButton } from "../Buttons/FillButton";

export const SettingPanel = ({ onClose }) => {
  return (
    <FMPanel>
      <Flex
        height="100%"
        direction="column"
        alignItems="stretch"
        justifyContent="space-between"
        gap="12px"
      >
        <FillButton>
          <Link
            href="https://twitter.com/FreeFlowonFlow"
            _hover={{}}
            width="100%"
            height="100%"
            isExternal
          >
            Twitter
          </Link>
        </FillButton>
        <FillButton>
          <Link
            href="https://freeflow.gitbook.io/freeflow/projects/fomopoly/game-mechanism"
            _hover={{}}
            width="100%"
            height="100%"
            isExternal
          >
            How to Play
          </Link>
        </FillButton>
        <FillButton
          onClick={() => {
            disconnect(wagmiConfig);
            onClose();
          }}
        >
          Logout
        </FillButton>
      </Flex>
    </FMPanel>
  );
};
