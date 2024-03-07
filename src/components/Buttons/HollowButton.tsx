import { Button, ButtonProps } from "@chakra-ui/react";

const normalHollowedButtonStyle = {
  color: "primary",
  padding: "10px 16px",
  width: "100%",
  hight: "100%",
  borderRadius: "8px",
  background: "none",
  border: "1px solid #FCFC54",
};

const hoverHollowedButtonStyle = {
  boxShadow: "0px 0px 8px 0px #FCFC54",
};

const activeHollowedButtonStyle = {
  color: "text.white",
  border: "1px solid #FCFCFC",
};

const disableHollowedButtonStyle = {
  color: "gray.oliver",
  border: "1px solid #9EA889",
};

export const HollowButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      {...normalHollowedButtonStyle}
      _hover={hoverHollowedButtonStyle}
      _active={activeHollowedButtonStyle}
      _disabled={disableHollowedButtonStyle}
    >
      {children}
    </Button>
  );
};
