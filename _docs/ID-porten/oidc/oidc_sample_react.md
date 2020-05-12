---
title: OIDC-client using React and code flow
description: OIDC-client using React and code flow
summary: "This is short how-to on using the code flow from a React-based javascript OIDC-client."
permalink: oidc_sample_react.html
sidebar: oidc
product: ID-porten
---


This is short how-to on building an OIDC single-page application in React towards   ID-portens OIDC service. We are using the OIDC Client library from [https://github.com/IdentityModel/oidc-client-js/wiki](https://github.com/IdentityModel/oidc-client-js/wiki).

Please note that the client uses the **code flow** as per [updated security recommendations from the IETF](https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps-00#section-4).


The general process of authentication is:
1.	Initialize OIDC client library
2.	Redirect the browser to ID-porten OIDC provider through a library callback
3.	< User performs authentication >
4.	ID-porten redirects back to the browser (with query parameters – no access token)
5.	Complete authentication through library callback (fetches access token)

The process of logging out is analogous to logging in. Important to remember that you have two sessions – one client side, and one server side – and you need to close both sessions on logout.

## code samples


**auth/Login.jsx**: The authentication process is started by executing the login()-method in the authStore (which executes the signinRedirect()-method in the oidc client library that performs the redirect).

```js
@inject("authStore")
@observer
class Login extends Component {

   componentWillMount() {
      this.props.authStore.login();
   }

   render() {
      return (
         <span> Login in process – please wait...</span>
      );
   }
}
```


**auth/LoginResponse.jsx**: The authentication process is completed by executing the completeLogin()-method in the authStore (which executes the signinRedirectCallback()-method in the oidc client library that fetches the access token among other housekeeping). Errors from ID-porten oidc provider are given as query parameters – handle them appropriately. Important: The route for this component must match the redirect_uri setting of your client configuration at Digitaliseringsdirektoratet (eg http://yourhost:8080/login/response).
```js
@inject("authStore")
@observer
class LoginResponse extends Component {

    componentWillMount() {
       this.props.authStore.completeLogin();
    }

    render() {
       return(
          <span>You are now logged in </span>
       );
    }

}
```

**stores/AuthenticationStore.js**: NB – the isLoggedIn()-method checks if there is an access token that hasn’t expired – use that to determine if the user needs to request a fresh access token (and possibly sign in). The loadUser()-method can be called when loading the React app to have the manager load the user object from session store to prevent unnecessary access token requests.

```js
class AuthenticationStore {
   @observable manager = null;
   @observable user = null;

   constructor() {
      let config =  {
         authority: "https://eid-systest-web01.dmz.local/idporten-oidc-provider",
         client_id: "your_client_configuration_id",
         redirect_uri: "http://localhost:3000/login/response",
         post_logout_redirect_uri: "http://localhost:3000/logout/response",
         response_type: "code",
         scope: "openid profile ",
         acr_values: "Level3",
         ui_locales: "nb",
         loadUserInfo: false,
         revokeAccessTokenOnSignout: true
      };
      this.manager = new UserManager(config);
   }

   @computed
   get isLoggedIn() {
      return this.user != null && this.user.access_token && !this.user.expired;
   }

   @action.bound
   loadUser() {
      this.manager.getUser()
         .then( (user) => this.user = user);
   }

   @action.bound
   login() {
      this.manager.signinRedirect()
         .catch((error) => this.handleError(error));
   }

   @action.bound
   completeLogin() {
      this.manager.signinRedirectCallback()
         .then(user => this.user = user)
         .catch((error) => this.handleError(error));
   }

   @action.bound
   logout() {
      this.manager.signoutRedirect()
         .catch((error) => this.handleError(error));
   }

   @action.bound
   completeLogout() {
      this.manager.signoutRedirectCallback()
         .then(() => {this.manager.removeUser()})
         .then(() => {this.user = null;})
         .catch((error) => this.handleError(error));
   }

   @action.bound
   handleError(error) {
      console.error("Problem with authentication endpoint: ", error);
   }

}
```
