import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "41be780b-fccd-4f2d-8c67-15d41b2d6d18",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["a61e4d01-d2ae-4e35-aace-2c00ccc3b92a/.default"],
};