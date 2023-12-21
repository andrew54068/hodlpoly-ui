import { Flex, Box, ButtonProps, Button as ChakraButton, Image, Spinner } from "@chakra-ui/react";
import { MouseEventHandler, forwardRef } from "react";

import RingImg from "src/assets/ring_circle.png";

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean;
  showRing?: boolean;
}

const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ children, showRing, isLoading, onClick, ...rest }, ref) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      if (!isLoading && onClick) {
        onClick(event);
      }
    };

    return (
      <ChakraButton
        ref={ref}
        variant="primary"
        onClick={handleClick}
        cursor={isLoading ? "not-allowed" : "pointer"}
        boxShadow="0px 0px 20px 0px rgba(35, 37, 40, 0.05)"
        {...rest}
      >
        <Flex px="space.s" alignItems="center" justifyContent="space-between" width="100%">
          <Box as="span">{isLoading ? <Spinner size="sm" /> : children}</Box>
          {showRing && (
            <Box
              {...(rest.isDisabled && {
                bgColor: "#B3B3B3",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
              })}
            >
              {!rest.isDisabled && <Image src={RingImg} width="32px" height="32px" />}
            </Box>
          )}
        </Flex>
      </ChakraButton>
    );
  }
);

export default Button;
