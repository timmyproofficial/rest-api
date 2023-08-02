import pino from 'pino';
import pinoPretty from 'pino-pretty';

// Create a Pino logger instance
const logger = pino();

// If you want to pretty-print the logs, you can use pino-pretty as a log stream
// const prettyStream = pinoPretty();
// logger.pipe(prettyStream).pipe(process.stdout);

export default logger;
