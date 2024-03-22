import { Button, ButtonProps } from "@chakra-ui/react";


const normalRoundedButtonStyle = {
  color: "primary",
  padding: "10px 16px",
  borderRadius: "48px",
  background: "background.dark",
  border: "1px solid #FCFC54",
  fontFamily: "Inter",
  fontSize: ["10px", "14px", "20px"],
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "16px",
};

const hoverRoundedButtonStyle = {
  borderRadius: "48px",
  boxShadow: "0px 0px 9px 0px #FCFC54",
  border: "1px solid #FCFC54",
  background: "background.hover.dark",
};

const activeRoundedButtonStyle = {
  color: "primary",
  borderRadius: "48px",
  border: "1px solid #FCFC54",
  background: "background.dark",
  boxShadow: "0px 2px 2px 0px #000 inset",
};

const disableRoundedButtonStyle = {
  color: "primary",
  borderRadius: "48px",
  border: "1px solid #FCFC54",
  background: "background.disable.gray",
};

export const RoundButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      {...normalRoundedButtonStyle}
      _hover={hoverRoundedButtonStyle}
      _active={activeRoundedButtonStyle}
      _disabled={disableRoundedButtonStyle}
    >
      {children}
    </Button>
  );
};