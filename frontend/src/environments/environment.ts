// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  create: 'http://127.0.0.1:5001/character-manager-825d7/us-central1/app/api/create',
  readId: 'http://127.0.0.1:5001/character-manager-825d7/us-central1/app/api/read/',
  readAll: 'http://127.0.0.1:5001/character-manager-825d7/us-central1/app/api/read',
  update: 'http://127.0.0.1:5001/character-manager-825d7/us-central1/app/api/update/',
  delete: 'http://127.0.0.1:5001/character-manager-825d7/us-central1/app/api/delete/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
