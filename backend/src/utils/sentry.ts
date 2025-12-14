import * as Sentry from '@sentry/node';
import { config } from '../config';

if (config.NODE_ENV === 'production' && config.SENTRY_DSN) {
  Sentry.init({
    dsn: config.SENTRY_DSN,
    environment: config.NODE_ENV,
    tracesSampleRate: 1.0,
  });
}

export default Sentry;