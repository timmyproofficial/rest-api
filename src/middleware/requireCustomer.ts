import { Request, Response, NextFunction } from 'express';

const requireCustomer = (req: Request, res: Response, next: NextFunction) => {
  const customer = res.locals.customer;
  console.log(`****************${customer}********************`);

  if (!customer) {
    return res.sendStatus(403);
  }

  return next();
};

export default requireCustomer;
