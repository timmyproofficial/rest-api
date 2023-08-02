import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface CustomerDocument extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updateAt: Date;
  comparePassword: (candidatePassword: string) => Promise<Boolean>;
}

const customerSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

customerSchema.pre('save', async function (next) {
  let customer = this as CustomerDocument;

  if (!customer.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactory'));

  const hash = await bcrypt.hashSync(customer.password, salt);

  customer.password = hash;

  return next();
});

customerSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const customer = this as CustomerDocument;

  return bcrypt
    .compare(candidatePassword, customer.password)
    .catch((e) => false);
};

const CustomerModel = mongoose.model<CustomerDocument>(
  'Customer',
  customerSchema
);

export default CustomerModel;
