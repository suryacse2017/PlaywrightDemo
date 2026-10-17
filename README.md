# Login Start Script

Startup script using [project dependencies](https://playwright.dev/docs/next/test-projects#dependencies) in Playwright to login and save credentials in storage state.

## Set Environment Variables

To load enviroment variables for a test file, add the enviroment file to the `env` folder and use the `loadEnv` function at the top of the file with the extention of the `env` file. \
To load dynamically, have the `loadEnv` function at the top of your file and run either...

*To run all tests in a file*
```
npx playwright test <file name> <enviroment name> (add --headed if you want it to show the browser for non API tests)
```
*To run a certain test in a file*
```
npx playwright test <file name> -g <test name> <enviroment name> (")
```
#### NOTES:
`setLogin` will override any values of `CREDENTIAL` **and/or** `PASSWORD` in an environment file\
If you try loading multiple enviroments with the same variables, the duplicate variables will be from the enviroment loaded first. All unique variables will be loaded properly\
Running from the terminal with an environment will take precedence over the value hardcoded in the file

## Login credentials

To configure login credentials, change the `CREDENTIAL & PASSWORD` values in the `env/.env.base_login` file *or* use the `setLogin` function at the **top of the file**

## Report naming

To name report files, import and use the `setReport` function as the **first line** of your test **or**, if you have multiple tests in a `test.describe`, add it to the `test.afterAll` or `test.afterEach`

## Configuration

Name any file {filename}.tests.ts to use the login script, name other files {filename}.spec.ts to run without the login script

## Playwright BDD

Run the Demo1Copilot scenarios with:

```
npm run test:demo1copilot
```

To run both Demo1 and Demo1Copilot scenarios, use:

```
npm run test:both
```

Both suites use `playwright-bdd` with the Playwright Test runner. Generated tests are kept in separate subfolders under `.features-gen` and run in headed Chrome. To generate both suites without running them, use `npm run bddgen:both`.

To discover and run individual scenarios in VS Code's Testing view, install the recommended **Playwright Test for VS Code** extension. Run `npm run bddgen:both` after changing either suite's feature or step definitions, then refresh test discovery.

# Dependencies

Make sure you install all dependencies.

```
npm install
```

Install necessary browsers

```
npx playwright install 
```
