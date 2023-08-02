import { omit } from 'lodash';
import { DocumentDefinition } from 'mongoose';
import CustomerModel, { CustomerDocument } from '../model/customer.model';

export async function createCustomer(
  input: DocumentDefinition<
    Omit<CustomerDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
  >
) {
  try {
    const customer = await CustomerModel.create(input);

    return omit(customer.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const customer = await CustomerModel.findOne({ email });

  if (!customer) {
    return false;
  }

  const isValid = await customer.comparePassword(password);

  if (!isValid) return false;

  return omit(customer.toJSON(), 'password');
}
