import { Request, Response } from 'express';
import config from 'config';
import { validatePassword } from '../service/customer.service';
import { createSession, findSessions } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';

export async function createCustomerSessionHandler(
  req: Request,
  res: Response
) {
  // Validate the customer's password
  const customer = await validatePassword(req.body);

  if (!customer) {
    return res.status(401).send('Invalid email or password');
  }

  //   console.log(customer);

  // Create a session
  const session = await createSession(
    customer._id,
    req.get('user-agent') || ''
  );

  // Create an access token
  const accessToken = signJwt(
    { ...customer, session: session._id },
    { expiresIn: config.get('accessTokenTtl') }
  );

  // Create a refresh token
  const refreshToken = signJwt(
    { ...customer, session: session._id },
    { expiresIn: config.get('refreshTokenTtl') }
  );

  // Return access & refresh tokens
  return res.send({ accessToken, refreshToken });
}

export async function getCustomerSessionsHandler(req: Request, res: Response) {
  const customerId = res.locals.customer._id;
  //   console.log(`**************${customerId}******************`);

  const sessions = await findSessions({ customer: customerId, valid: true });

  //   console.log(sessions);

  return res.send(sessions);
}
