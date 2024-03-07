import { Button, ButtonProps } from "@chakra-ui/react";

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
      width="60px"
      height="60px"
      p="0px"
      background="none"
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
