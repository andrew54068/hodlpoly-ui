import { Button, Card, Flex, TabPanel } from "@chakra-ui/react";

const normalButtonStyle = {
  color: "white",
  padding: "10px",
  width: "100%",
  hight: "100%",
  borderRadius: "8px",
  background: "linear-gradient(270deg, #FFF -26.8%, #000 30.45%)",
  boxShadow: "0px 2px 6px 0px rgba(16, 24, 40, 0.06)",
};

const hoverButtonStyle = {
  borderRadius: "8px",
  background: "linear-gradient(270deg, #FFF -26.8%, #000 30.45%)",
  boxShadow: "0px 0px 9px 0px #504D4D",
};

const pressButtonStyle = {
  borderRadius: "8px",
  background: "linear-gradient(270deg, #FFF -26.8%, #000 30.45%)",
  boxShadow:
    "0px 2px 6px 0px rgba(16, 24, 40, 0.06), -3px 1px 0px 0px rgba(0, 0, 0, 0.40) inset",
};

export const SettingPanel = () => {
  return (
    <TabPanel p="24px" bg="#FFFFFF" h="180px">
      <Flex
        height="100%"
        direction="column"
        alignItems="stretch"
        justifyContent="space-between"
      >
        <Card
          color="white"
          bg="unset"
          height="36px"
          align="center"
          boxShadow="none"
        >
          <Button
            {...normalButtonStyle}
            _hover={hoverButtonStyle}
            _pressed={pressButtonStyle}
          >
            Twitter
          </Button>
        </Card>
        <Card
          color="white"
          bg="unset"
          height="36px"
          align="center"
          boxShadow="none"
        >
          <Button
            {...normalButtonStyle}
            _hover={hoverButtonStyle}
            _pressed={pressButtonStyle}
          >
            How to Play
          </Button>
        </Card>
        <Card
          color="white"
          bg="unset"
          height="36px"
          align="center"
          boxShadow="none"
        >
          <Button
            {...normalButtonStyle}
            _hover={hoverButtonStyle}
            _pressed={pressButtonStyle}
          >
            Logout
          </Button>
        </Card>
      </Flex>
    </TabPanel>
  );
};
