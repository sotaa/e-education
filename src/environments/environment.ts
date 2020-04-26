// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const IDENTITY_SERVER_URL = "http://localhost:3000";

export const environment = {
  production: false,
  identityUrls: {
    login: IDENTITY_SERVER_URL.concat("/auth/login"),
    register: IDENTITY_SERVER_URL.concat("/auth/register"),
    // resetPassword: IDENTITY_SERVER_URL.concat('/auth/reset-password'),

    createCourse: IDENTITY_SERVER_URL.concat("/courses"),
    readCourses: IDENTITY_SERVER_URL.concat("/Courses"),
    readCourse: IDENTITY_SERVER_URL.concat("/Courses/"),
    deleteCourse: IDENTITY_SERVER_URL.concat("/Courses/"),

    // createPaymentPlan: IDENTITY_SERVER_URL.concat('/payment-plans'),
    // readPaymentPlans: IDENTITY_SERVER_URL.concat('/payment-plans'),
    // readPaymentPlan: IDENTITY_SERVER_URL.concat('/payment-plans/'),
    // deletePaymentPlan: IDENTITY_SERVER_URL.concat('/payment-plans/'),

    // buyPlan: IDENTITY_SERVER_URL.concat('/payment/buy/'),

    // createRole: IDENTITY_SERVER_URL.concat('/roles'),
    // readRoles: IDENTITY_SERVER_URL.concat('/roles'),
    // readRole: IDENTITY_SERVER_URL.concat('/roles/'),
    // deleteRole: IDENTITY_SERVER_URL.concat('/roles/'),

    // updateUserInfo: IDENTITY_SERVER_URL.concat('/users/'),
    // readUsers: IDENTITY_SERVER_URL.concat('/users'),
    // readUser: IDENTITY_SERVER_URL.concat('/users/'),
    // deleteUser: IDENTITY_SERVER_URL.concat('/users/'),
  },
  authenticationPageUrl: "/auth",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
