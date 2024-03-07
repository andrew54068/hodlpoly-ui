import { TabPanel, TabPanelProps } from "@chakra-ui/react";

export const FMPanel = ({ children, ...props }: TabPanelProps) => {
  return (
    <TabPanel
      {...props}
      p="24px"
      borderRight="2px solid #9EA889"
      borderBottom="2px solid #9EA889"
      borderLeft="2px solid #9EA889"
      bg="background.dark"
    >
      {children}
    </TabPanel>
  );
};
