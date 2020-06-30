'use strict';

const AWS = require('aws-sdk');

/**
 * Get the secret value for a key
 */
module.exports.getSecretValues = async (secret_value) => {

    console.log("Alternative secret: ", process.env.SECRETS);

    console.log("secret_value: ", secret_value);

    // Create a Secrets Manager client
    let client = new AWS.SecretsManager({
        region: process.env.AWS_REGION || 'us-east-1'
    });

    const secretName = process.env.SECRET_NAME;
    return new Promise(async (resolve, reject) => {
        var secret, decodedBinarySecret;
        client.getSecretValue({ SecretId: secretName }, function (err, data) {
            if (err) {
                if (err.code === 'DecryptionFailureException')
                // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === 'InternalServiceErrorException')
                // An error occurred on the server side.
                // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === 'InvalidParameterException')
                // You provided an invalid value for a parameter.
                // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === 'InvalidRequestException')
                // You provided a parameter value that is not valid for the current state of the resource.
                // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === 'ResourceNotFoundException')
                // We can't find the resource that you asked for.
                // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;

                reject(err);
            }
            else {
                // Decrypts secret using the associated KMS CMK.
                // Depending on whether the secret is a string or binary, one of these fields will be populated.
                if ('SecretString' in data) {
                    secret = JSON.parse(data.SecretString);
                } else {
                    let buff = new Buffer(data.SecretBinary, 'base64');
                    decodedBinarySecret = buff.toString('ascii');
                }
            }

            // Your code goes here.
            if (secret_value){
                resolve(secret[secret_value]);
            }
            else {
                resolve(secret);
            }
        });
    })

}
