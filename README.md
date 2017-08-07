# @local/logger
a logger to be used in node or web environments


## Usage
```javascript
/* logger.js */
import initLogging from '@local/logger';

const defaultLevels = [
    { name: 'trace', color: 'lightgray', icon: 'pencil2', consoleMethod: 'debug' },
    { name: 'debug', color: 'green', icon: 'frog', consoleMethod: 'debug' },
    { name: 'info', color: 'blue', icon: 'large_blue_circle', consoleMethod: 'debug' },
    { name: 'warn', color: 'orange', icon: 'warning', consoleMethod: 'warn' },
    { name: 'error', color: 'red', icon: 'bangbang', consoleMethod: 'warn' }
];

const defaultConfig = {
    general: 'info'
};

const logger = initLogging(defaultConfig, defaultLevels);

export default logger
```

```javascript
import logger from 'util/logger';

const log = logger('moduleName');

log.debug('Hello World');
```