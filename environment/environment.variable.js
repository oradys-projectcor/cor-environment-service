import { devVariables } from './env/development';
import { localVariables } from './env/local';
/*import { prodVariables } from './production';
import { sandboxVariables } from "./sandbox";
import { stagingVariables } from "./staging";
import { producto_envVariables } from "./producto_env";
import { staging1Variables } from "./staging1";
import { staging2Variables } from "./staging2";
import { staging3Variables } from "./staging3";
import { staging4Variables } from "./staging4";
import { staging5Variables } from "./staging5";
import { staging6Variables } from "./staging6";*/

export function environmentFactory(env) {
    const environment = env || 'local';

    const variables = {
        development: devVariables,
        local: localVariables,
        /*production: prodVariables,
        staging: stagingVariables,
        producto_env: producto_envVariables,
        sandbox: sandboxVariables,
        staging1: staging1Variables,
        staging2: staging2Variables,
        staging3: staging3Variables,
        staging4: staging4Variables,
        staging5: staging5Variables,
        staging6: staging6Variables,*/
    }

    return variables[environment] || localVariables;
}
