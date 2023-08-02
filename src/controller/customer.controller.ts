import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createCustomer } from '../service/customer.service';
import { CreateCustomerInput } from '../schema/customer.schema';
import logger from '../utils/logger';

export async function createCustomerHandler(
  req: Request<{}, {}, CreateCustomerInput['body']>,
  res: Response
) {
  try {
    const customer = await createCustomer(req.body);
    return res.send(omit(customer.toJSON(), 'password'));
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
