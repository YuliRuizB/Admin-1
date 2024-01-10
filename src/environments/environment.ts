// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapbox: {
    accessToken: 'pk.eyJ1IjoiZXZhbGxnYXIiLCJhIjoiY2l1cnc2aDRxMDBiYzJ1cHZqdWFlODdseiJ9._lOalqIZflhz0YQosjx-zw'
  },
  firebaseConfig: {
   // QA - Nuevo
   apiKey: "AIzaSyBvnxnTL4RPkTe0g5cbZFeTleYTArW-PXw",
   authDomain: "bus2u-qa-391716.firebaseapp.com",
   databaseURL: "https://bus2u-qa-391716-default-rtdb.firebaseio.com",
   projectId: "bus2u-qa-391716",
   storageBucket: "bus2u-qa-391716.appspot.com",
   messagingSenderId: "8012546509",
   appId: "1:8012546509:web:28caab96b2fb6e4f078484",
   measurementId: "G-GHYKGGQK9N"

    //Prod
 /*  
 
 apiKey: "AIzaSyAOjaBXSmdEGU3cav9CLc6We4CZhwr89cM",
    authDomain: "bus2u-dev.firebaseapp.com",
    databaseURL: "https://bus2u-dev.firebaseio.com",
    projectId: "bus2u-dev",
    storageBucket: "bus2u-dev.appspot.com",
    messagingSenderId: "716902039021",
    appId: "1:716902039021:web:54f3dbd02d9bc1a89fbbe4",
    measurementId: "G-88Y68T9LZP",
    github: '3xspkvs2bzw7tpdnr3l3oda54pfkhjy7g5e4zgolo7xdxexupqnq' 
    
    QA
       // QA
  apiKey: "AIzaSyDS86sWnoFe2FdI5_jsGDvG2BxbHmvU36k",
  authDomain: "bus2u-qa.firebaseapp.com",
  projectId: "bus2u-qa",
  storageBucket: "bus2u-qa.appspot.com",
  messagingSenderId: "893080857357",
  appId: "1:893080857357:web:5c44c159efb05cec5c1e44", 
  measurementId: "G-584PYMFYV1"
  */
    
    // apiKey: 'AIzaSyAZGkb8xn1XfcSJWeC-gSpOji2vlBrToLw',
    // authDomain: 'bus2u-834e8.firebaseapp.com',
    // databaseURL: 'https://bus2u-834e8.firebaseio.com',
    // projectId: 'bus2u-834e8',
    // storageBucket: 'bus2u-834e8.appspot.com',
    // messagingSenderId: '93998955183',
    // appId: '1:93998955183:web:d336bc01c0973e95'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
