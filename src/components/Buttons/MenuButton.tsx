import { Button, ButtonProps } from "@chakra-ui/react";
import { MenuButtonSize } from "../MainPage";

interface MenuButtonProps extends ButtonProps {
  normalImage: string;
  hoverImage: string;
  activeImage: string;
}

export const MenuButton = ({
  normalImage,
  hoverImage,
  activeImage,
  children,
  ...rest
}: MenuButtonProps) => {
  return (
    <Button
      width={MenuButtonSize.map((value) => `${value}px`)}
      height={MenuButtonSize.map((value) => `${value}px`)}
      p="0px"
      background="none"
      backgroundSize={MenuButtonSize.map((value) => `${value}px`)}
      backgroundImage={normalImage}
      _hover={{
        backgroundImage: hoverImage,
      }}
      _active={{
        backgroundImage: activeImage,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
