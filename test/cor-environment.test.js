'use strict';

import { environmentFactory } from "../environment/environment.variable";
//We are using ES5 since aws lambda does not support import statement outside a module
const secretManager = require('../providers/SecretManager');
describe('CheckService', () => {

    test('Check for environment', () => {
        const environment = environmentFactory('development');
        console.log(environment);
        expect(environment).toEqual(
            expect.objectContaining({
                API_URL: expect.any(String),
                ENV_NAME: expect.any(String),
                ENV_DESCRIPTION: expect.any(String),
                AWS_API_SECRET_NAME: expect.any(String),
                AWS_API_REGION: expect.any(String),
                AWS_WEB_SECRET_NAME: expect.any(String),
                AWS_WEB_REGION: expect.any(String),
            }),
        );
    });

    //Testing to get secret keys
    test('get secrets from AWS Secret Manager ALL', async () => {

        // set the variables
      /*  process.env.SECRET_NAME = 'api.local.keysecret@projectcor.com';
        process.env.AWS_REGION = 'us-east-1';*/

        const environment = environmentFactory('development');
        process.env.SECRET_NAME = environment.AWS_API_SECRET_NAME;
        process.env.AWS_REGION = environment.AWS_API_REGION;


        let secrets = await secretManager.getSecretValues();

        expect(typeof secrets).toBe('object')
    })
    //Testing to get secret keys
    test('get secrets from AWS Secret Manager ONLY secret name', async () => {

        // set the variables
        process.env.SECRET_NAME = 'api.local.keysecret@projectcor.com';
        process.env.AWS_REGION = 'us-east-1';
        process.env.SECRETS = 'us-east-1';

        let secret = await secretManager.getSecretValues("DB_HOST");

        expect(typeof secret).toBe('string')
    })
});