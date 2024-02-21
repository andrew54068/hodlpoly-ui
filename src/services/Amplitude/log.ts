import { getInstance } from "./index";

const IS_LOCAL = import.meta.env.VITE_ENV === "local" || !import.meta.env.VITE_ENV;

const logCore = (name: string, rawProperties: { [key: string]: unknown } = {}) => {
  // strip undefined fields
  const properties = Object.assign({}, rawProperties);
  Object.keys(properties).forEach((key) => properties[key] === undefined && delete properties[key]);

  if (IS_LOCAL) {
    console.debug(`[Amplitude] Event: ${name}, properties:`, properties);
  } else {
    getInstance().track(name, {
      ...properties,
      environment: process.env.REACT_APP_ENV,
    });
  }
};

export const logPageView = (page: string) => {
  if (page) {
    logCore("web_view_page", {
      page,
    });
  }
};


export const logClickConnectButton = () => {
  logCore("click_connect_button");
};

export const logConnectSuccessfully = () => {
  logCore("connect_successfully");
};

export const logClickRollTheDice = () => {
  logCore("click_roll_the_dice");
};

export const logClickBuyLand = () => {
  logCore("click_buy_land");
};

export const logClickBuyProps = () => {
  logCore("click_buy_props");
}

export const logClickUseProps = ({ numberType }: { numberType: number }) => {
  logCore("click_use_props", { numberType });
}
