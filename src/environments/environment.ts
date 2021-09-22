// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'https://www.flickr.com/services/rest/?method=flickr.photos.search&',
  key: '3dc048ec502c7ab65ec70b90d2442d73',
  dataBase: 'https://searchimages-ac3c9-default-rtdb.europe-west1.firebasedatabase.app/photos'
  // secret: '40c50bde815bc6ac'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
