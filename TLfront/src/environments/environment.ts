// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://127.0.0.1:8000/api-auth/',
  loginUrl: 'https://gymkhana.iitb.ac.in/profiles/oauth/authorize/?client_id=J3M80WCuOwpUGtX1KgBMLYwYls1aZxk9LfO0KMSp&response_type=code&scope=basic profile phone picture insti_address secondary_emails ldap program'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
