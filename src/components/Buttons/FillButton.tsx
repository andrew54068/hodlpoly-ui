import { Button, ButtonProps } from "@chakra-ui/react";

const normalFilledButtonStyle = {
  color: "generic.black",
  padding: "10px 16px",
  borderRadius: "8px",
  background: "primary",
};

const hoverFilledButtonStyle = {
  background: "primary",
  boxShadow: "0px 0px 9px 0px #FCFC54",
};

const activeFilledButtonStyle = {
  background: "white",
  boxShadow:
    "0px 2px 6px 0px rgba(16, 24, 40, 0.06), -3px 1px 0px 0px rgba(0, 0, 0, 0.40) inset",
};

const disableFilledButtonStyle = {
  color: "neutral.700",
  background: "gray.oliver",
  boxShadow: "0px 2px 6px 0px rgba(16, 24, 40, 0.06)",
};

export const FillButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      {...normalFilledButtonStyle}
      _hover={hoverFilledButtonStyle}
      _active={activeFilledButtonStyle}
      _disabled={disableFilledButtonStyle}
    >
      {children}
    </Button>
  );
};
