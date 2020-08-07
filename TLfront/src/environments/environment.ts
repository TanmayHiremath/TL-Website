// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  technician_mails:"['tanmay.v.hiremath@gmail.com','gakshat2207@gmail.com']",
  production: false,
  serverUrl: 'http://127.0.0.1:8000/',
  loginUrl: 'https://gymkhana.iitb.ac.in/profiles/oauth/authorize/?client_id=SURfRGPqH2W4dKtnWnE3hX249Tk1XXEZpUhRaX4P&response_type=code&scope=basic profile picture secondary_emails ldap program',
  jdataKey:'Kb8VUT3E9q7vshw21',
  technicians:['tanmay','Technician2','Technician3']//store the username of django use(which in turn should be the roll number of a customer in customers model)
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
