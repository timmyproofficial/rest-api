import { FilterQuery } from 'mongoose';
import SessionModel, { SessionDocument } from '../model/session.model';

export async function createSession(customerId: string, userAgent: string) {
  const session = await SessionModel.create({
    customer: customerId,
    userAgent,
  });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
}
