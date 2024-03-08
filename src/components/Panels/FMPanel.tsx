import { TabPanel, TabPanelProps } from "@chakra-ui/react";
import { PropPanelPadding } from "../MainPage";

export const FMPanel = ({ children, ...props }: TabPanelProps) => {
  return (
    <TabPanel
      {...props}
      p={PropPanelPadding.map((value) => `${value}px`)}
      borderRight="2px solid #9EA889"
      borderBottom="2px solid #9EA889"
      borderLeft="2px solid #9EA889"
      bg="background.dark"
    >
      {children}
    </TabPanel>
  );
};
