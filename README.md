# Time Tracking Webapp

Currently under development

-------------

## Requisites:
* Node 8.x.x
* MongoDB 3.4.x

## How To start the application:

* Copy backend/config.json.dist to backend/config.json and give desired values
* npm install
* npm start
## Frontend
* npm run ng-start

## NPM scripts

* npm start - starts de server
* npm run create-user -- \<email\> \<password\> - creates an user
* npm run change-password -- \<email\> \<password\> - changes the password of a given user
* ng - list all ng option (angular-cli)
* npm run ng-start - Navigate to `http://localhost:4200/`. The app (frontend) will automatically reload if you change any of the source files.
* npm run ng-build - to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
* npm run ng-test - to execute the unit tests via [Karma](https://karma-runner.github.io).
* npm run ng-lint - to execute lint.
* npm run ng-e2e - to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). Before running the tests make sure you are serving the app via `ng serve`.
