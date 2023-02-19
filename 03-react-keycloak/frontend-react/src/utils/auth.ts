import Keycloak, { KeycloakConfig, KeycloakProfile } from "keycloak-js";
import { createContext } from "react";

const KEYCLOAK_CONFIG: KeycloakConfig = {
  url: "http://localhost:10301/",
  realm: "Demo",
  clientId: "frontend",
};

const KEYCLOAK_UPDATE_TOKEN_MIN_VALIDITY = 30;

export type User = Pick<
  KeycloakProfile,
  "id" | "username" | "email" | "firstName" | "lastName"
>;

const UNKNOWN_USER: User = {
  id: "<unknown>",
  username: "<unknown>",
  email: "<unknown>",
  firstName: "<unknown>",
  lastName: "<unknown>",
};

export class AuthenticationProvider {
  private _keycloak: Keycloak;
  private _user: User | null;

  public constructor() {
    this._keycloak = new Keycloak(KEYCLOAK_CONFIG);
    this._user = null;
  }

  get authenticated(): boolean {
    return this._keycloak.authenticated ? !!this._user : false;
  }

  get currentUser(): User {
    if (!this._user) {
      alert("Something went wrong, try to log out and log in again");
    }

    return this._user || UNKNOWN_USER;
  }

  public init() {
    this._keycloak.onTokenExpired = () => {
      this._keycloak
        .updateToken(KEYCLOAK_UPDATE_TOKEN_MIN_VALIDITY)
        .then((refreshed) => {
          if (refreshed) {
            console.debug("[auth] Token was successfully refreshed");
          } else {
            console.debug("[auth] Token is still valid");
          }
        })
        .catch(() => {
          console.info(
            "[auth] Failed to refresh the token or the session has expired"
          );
          this.logout();
        });
    };

    return this._keycloak
      .init({ onLoad: "login-required" })
      .then((authenticated) => {
        if (authenticated) {
          console.debug("[auth] Authenticated: ", authenticated);
          console.debug("[auth] Subject: ", this._keycloak.subject);

          return this._keycloak
            .loadUserProfile()
            .then((profile) => {
              this._user = profile;
              console.debug("[auth] User", this._user);
            })
            .catch(() => {
              console.error("[auth] Failed to load user profile");
              this._user = null;
            });
        }
      })
      .catch(() => console.error("Authentication failed"));
  }

  public logout = () => {
    console.debug("[auth] Logging out");
    this._keycloak.logout();
  };
}

export const auth = new AuthenticationProvider();
const AuthenticationContext = createContext<AuthenticationProvider>(auth);
export default AuthenticationContext;
