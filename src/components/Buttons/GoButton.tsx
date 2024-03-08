import { Button, ButtonProps } from "@chakra-ui/react";
import { GoButtonSize } from "../MainPage";

const normalGoButtonStyle = {
  color: "background.dark",
  padding: "16px",
  borderRadius: "20px",
  background: "primary",
  boxShadow:
    "0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12)",
};

const hoverGoButtonStyle = {
  background: "primary",
  boxShadow: "0px 0px 19px 0px #FCFC54",
};

const activeGoButtonStyle = {
  background: "primary",
  boxShadow: "0px 5px 12px 0px rgba(0, 0, 0, 0.40) inset"
};

const disableGoButtonStyle = {
  color: "neutral.700",
  background: "gray.oliver",
  boxShadow: "0px 2px 6px 0px rgba(16, 24, 40, 0.06)",
};

export const GoButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button
      width={GoButtonSize.map(value => `${value}px`)}
      height={GoButtonSize.map(value => `${value}px`)}
      {...rest}
      {...normalGoButtonStyle}
      _hover={hoverGoButtonStyle}
      _active={activeGoButtonStyle}
      _disabled={disableGoButtonStyle}
    >
      {children}
    </Button>
  );
};
