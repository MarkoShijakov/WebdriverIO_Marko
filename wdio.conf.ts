import type { Options } from '@wdio/types';
import { join } from 'path';
import * as fs from 'fs';
import winston from 'winston';

// Configure the logger
const logger = winston.createLogger({
    level: 'debug', // Using debug mode for better logs
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/test.log' })
    ],
});

// Ensure the screenshots and logs directories exist
const screenshotsDir = join(__dirname, 'screenshots');
const logsDir = join(__dirname, 'logs');
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
}
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Define browser capabilities. Type of browser, mode and parallel run
const browserType = process.env.BROWSER || 'chrome';
const isHeadless = process.env.HEADLESS === 'true';
const maxInstances = process.env.MAX_INSTANCES ? parseInt(process.env.MAX_INSTANCES, 10) : 1;  //set the number for max parallel tests and default is 1

const capabilities: Record<string, any> = {
    chrome: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: isHeadless ? ['--headless', '--disable-gpu'] : []
        }
    },
    firefox: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: isHeadless ? ['-headless'] : []
        }
    }
};

export const config: Options.Testrunner & Options.WebdriverIO = {
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],

    maxInstances: maxInstances, // Set the number of parallel instances

    capabilities: [capabilities[browserType]],

    logLevel: 'debug', // Using debug mode for better logs

    bail: 0,

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    framework: 'mocha',

    reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    suites: {
        regression: [   //Adding test suite for regression testing
            './test/specs/test1.spec.js',
            './test/specs/test2.spec.js',
            './test/specs/test3.spec.js'
        ],
       
    },
        //adding universal messages for each test
    before: () => {
        logger.info('Test suite is starting...');
    },

    beforeTest: async () => {
        const url = await browser.getUrl();
        logger.info(`Navigating to ${url}`);
    },

    after: () => {
        logger.info('Test suite has completed.');
    },

 //adding log details for after the test
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            const screenshotPath = join(process.cwd(), 'screenshots', `${test.title}.png`);
            await browser.saveScreenshot(screenshotPath);

            const logPath = join(process.cwd(), 'logs', `${test.title}.log`);
            const logData = `
                Test: ${test.title}
                Context: ${JSON.stringify(context)}
                Result: ${JSON.stringify(result)}
                Error: ${error ? error.message : 'N/A'}
                Duration: ${duration} ms
                Retries: ${retries.attempts}
            `;
            fs.writeFileSync(logPath, logData);

            // Using winston for additional logs (found that on net)
            logger.error(`Test failed: ${test.title}`);
            logger.debug(`Context: ${JSON.stringify(context)}`);
            logger.debug(`Result: ${JSON.stringify(result)}`);
            logger.error(`Error: ${error ? error.message : 'N/A'}`);
            logger.debug(`Duration: ${duration} ms`);
            logger.debug(`Retries: ${retries.attempts}`);
        }
    },
};
