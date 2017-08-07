import emoji from 'node-emoji';
import map from 'lodash.map';
import isString from 'lodash.isstring';
import upperFirst from 'lodash.upperfirst';
import noop from 'lodash.noop';
import union from 'lodash.union';
import chalk from 'chalk';


// Icons at: https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
const defaultLevels = [
    { name: 'trace', color: 'gray', icon: 'pencil2', consoleMethod: 'log' },
    { name: 'debug', color: 'green', icon: 'frog', consoleMethod: 'log' },
    { name: 'info', color: 'cyan', icon: 'large_blue_circle', consoleMethod: 'log' },
    { name: 'warn', color: 'yellow', icon: 'warning', consoleMethod: 'warn' },
    { name: 'error', color: 'red', icon: 'bangbang', consoleMethod: 'warn' }
];

const defaultConfig = {
    general: 'info'
};


export default function initNodeLogging(config, levels = []) {
    config = config || defaultConfig;
    levels = union(defaultLevels, levels);

    return function createLogger(name, icon) {
        name = name || 'general';
        let logger = {};
        let suppress = true;
        let loggerLevel = config[name] || config.general;

        levels.forEach((level) => {
            if (process.env.NODE_ENV === 'production' && level !== 'error') {
                suppress = true;
            }
            else if (level.name == loggerLevel) {
                suppress = false;
            }

            logger['is' + upperFirst(level.name)] = !suppress; // isTrace, isDebug, ...
            logger[level.name] = suppress
                ? noop
                : (...args) => console[level.consoleMethod](...consoleArgs(level, name, icon, args))
        });

        return logger;
    }
}

function consoleArgs(level, name, icon, args) {
    let prefix = buildPrefix(level, name, icon, args);

    return [emoji.emojify(prefix)].concat(parseConsoleArgs(level, args));
}

function parseConsoleArgs(level, args) {
    return map(args, arg => checkParseStringArg(level.color, arg));
}

function checkParseStringArg(color, arg) {
    return isString(arg) ? chalk[color](emoji.emojify(arg)) : arg;
}

function buildPrefix(level, name, icon, args) {

    let firstArg = args[0];
    let messagePart = isString(firstArg) ? args.shift() : '';
    let levelIconPart = `:${level.icon}:  `;
    let levelNamePart = `[${level.name.toUpperCase()}] `;
    let namePart = chalk.bold(`[${name}]` + (icon ? ` :${icon}: ` : ' '));

    return levelIconPart + chalk[level.color](levelNamePart + namePart + messagePart);
}