// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

/**
 * @description Single file context when writing tests
 * @example app/[features/shared]/[receptionist-cabinet/abstractions]/[folder component name]/[component of interest name].component.spec.ts
 *  map the correct context for use case
 * single file testing for writing unit tests
 *
 * */
// const singleFileContext = require.context(
//   './',
//   true,
//   /\/app\/features\/receptionist-cabinet\/views\/receptionist-cabinet\/receptionist-cabinet\.component\.spec\.ts$/
// );

// singleFileContext.keys().map(singleFileContext);
