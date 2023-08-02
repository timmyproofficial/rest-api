import { Express, Request, Response } from 'express';
import { createCustomerHandler } from './controller/customer.controller';
import validateResource from './middleware/validateResource';
import { createCustomerSchema } from './schema/customer.schema';
import {
  createCustomerSessionHandler,
  getCustomerSessionsHandler,
} from './controller/session.controller';
import createSessionSchema from './schema/session.schema';
import requireCustomer from './middleware/requireCustomer';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post(
    '/api/customers',
    validateResource(createCustomerSchema),
    createCustomerHandler
  );

  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createCustomerSessionHandler
  );

  app.get('/api/sessions', requireCustomer, getCustomerSessionsHandler);
}

export default routes;
