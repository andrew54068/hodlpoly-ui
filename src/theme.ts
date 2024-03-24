import boTheme from "@blocto/web-chakra-theme";
import { extendTheme } from "@chakra-ui/react";
import merge from "lodash.merge";

import { tagAnatomy, switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import switchThumbOff from "/switchThumbOff.svg";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);
const {
  definePartsStyle: defineSwitchPartsStyle,
  defineMultiStyleConfig: defineSwitchMultiStyleConfig,
} = createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    bg: "background.secondary",
    color: "font.highlight",
    py: "4px",
    px: "10px",
  },
});

const tagTheme = defineMultiStyleConfig({
  baseStyle,
});

const switchBaseStyle = defineSwitchPartsStyle({
  container: {},
  thumb: {
    backgroundImage: switchThumbOff,
    backgroundSize: "cover",
    _checked: {
      backgroundImage: switchThumbOff,
    },
  },
  track: {
    bg: "neutral.100",
    _checked: {
      bg: "gray.oliver",
    },
  },
});

const switchTheme = defineSwitchMultiStyleConfig({
  baseStyle: switchBaseStyle,
  variants: {
    zircuit: {
      track: {
        bg: "neutral.100",
        _checked: {
          bg: "zircuitPrimary",
        },
      },
    },
    polygon: {
      track: {
        bg: "neutral.100",
        _checked: {
          bg: "polygonPrimary",
        },
      },
    },
  },
});

const IS_PROD = import.meta.env.VITE_APP_ENV === "production";

const theme = extendTheme(
  merge(boTheme, {
    semanticTokens: {
      colors: {
        zircuitPrimary: "#437C30",
        polygonPrimary: "#8247e5",
        primary: "#FCFC54",
        "background.dark": "#11140C",
        "background.gray": "#C1CCAB",
        "background.hover.dark": "#464646",
        "background.disable.gray": "#898C84",
        "text.black": "#23271A",
        "text.white": "#FCFCFC",
        "gray.oliver": "#9EA889",
        "gray.oliver.dark": "#25291B",
        "generic.black": "#000000",
        "neutral.700": "#374151",
        "neutral.100": "#F3F4F6",
        "network.hint": IS_PROD ? "transparent" : "status.warning.light",
        "network.hint.text": IS_PROD ? "transparent" : "status.warning.dark",
      },
    },
    styles: {
      global: {
        html: {
          fontSize: "16px",
        },
        "html body": {
          minHeight: "100%",
          width: "100%",
        },
        body: {
          fontFamily: "boFontFamily.base",
          fontSize: "size.body.3",
          lineHeight: "line.height.body.3",
          color: "font.primary",
          textRendering: "geometricPrecision",
          bg: "white",
        },
        "body.fontLoaded": {
          fontFamily: "boFontFamily.base",
        },
        button: {
          textRendering: "geometricPrecision",
          WebkitTapHighlightColor: "transparent",
        },
        "[role=button]": {
          WebkitTapHighlightColor: "transparent",
        },
      },
    },
    components: {
      Tag: tagTheme,
      Button: {
        fontSize: "size.heading.5",
        fontWeight: "weight.l",
        lineHeight: "line.height.heading.4",
        baseStyle: {
          _hover: {
            transform: "scale(0.98)",
            _disabled: { transform: "none" },
          },
          _active: {
            transform: "scale(0.96)",
            _disabled: { transform: "none" },
          },
          _disabled: {
            cursor: "not-allowed",
          },
        },
        variants: {
          primary: {
            width: "full",
            height: "36px",
            paddingY: "10px",
            paddingX: "16px",
            marginTop: "24px",
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "16px",
            backgroundColor: "primary",
            borderRadius: "8px",
            color: "#2A1136",
            _hover: {
              bg: { md: "primary" },
              _disabled: { bg: "#DBDBDB" },
            },
            _active: {
              bg: "yourActiveColor", // replace with your theme color variable
            },
            _disabled: {
              bg: "#DBDBDB",
              opacity: 1,
              color: "rgba(42, 17, 54, 0.5)",
            },
          },
          secondary: {
            width: "100%",
            py: "space.m",
            bg: "background.dark",
            color: "primary",
            border: "2px solid #FCFC54",
            borderRadius: "12px",
            _hover: {
              bg: { md: "background.dark" },
            },
            _active: {
              bg: "background.dark",
            },
            _disabled: {
              bg: "background.dark",
            },
          },
          support: {
            height: "46px",
            py: "space.s",
            px: "space.m",
            bg: "#76D68A",
            color: "font.inverse",
            borderRadius: "100px",
            _hover: {
              bg: { md: "interaction.primary.hovered" },
              _disabled: { bg: "interaction.primary.disabled" },
            },
            _active: {
              bg: "#76D68A",
            },
            _disabled: {
              bg: "interaction.primary.disabled",
            },
          },
          plain: {
            padding: 0,
            fontSize: "size.body.3",
            fontWeight: "weight.s",
            lineHeight: "line.height.body.3",
            _active: {
              color: "font.primary.pressed",
              svg: { fill: "icon.secondary" },
              _disabled: { color: "inherit", svg: { fill: "icon.primary" } },
            },
          },
        },
      },
      Switch: switchTheme,
    },
  })
);

export default theme;
