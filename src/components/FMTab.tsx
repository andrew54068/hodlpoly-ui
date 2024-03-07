import { Tab, TabProps } from "@chakra-ui/react";

const normalTabTextStyle = {
  background: "none",
  color: "gray.oliver",
  fontFamily: "Inter",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  borderBottom: "none",
};

const focuseTabTextStyle = {
  color: "primary",
  background: "background.dark",
  borderTop: "2px solid #9EA889",
  borderRight: "2px solid #9EA889",
  borderLeft: "2px solid #9EA889",
  borderBottom: "none",
  fontSize: "18px",
  fontWeight: "600",
};

export const FMTab = ({ children, ...rest }: TabProps) => {
  return (
    <Tab
      isFocusable
      borderRadius="0px"
      {...normalTabTextStyle}
      _focus={focuseTabTextStyle}
      _selected={focuseTabTextStyle}
      _active={focuseTabTextStyle}
      {...rest}
    >
      {children}
    </Tab>
  );
};
