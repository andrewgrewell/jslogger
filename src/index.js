import initJsLogging from './initJsLogging';
import initNodeLogging from './initNodeLogging';


export default function initializeLogging(config, levels) {
    if (typeof window == 'undefined') {
        // we are running in node
        return initNodeLogging(config, levels);
    }
    else {
        // TODO set __DEV__ so that the logger will function the same in native and web
        return initJsLogging(config, levels);
    }
}