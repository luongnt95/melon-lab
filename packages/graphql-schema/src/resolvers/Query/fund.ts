import funds from './funds';

async function fund(parent, args, context, info) {
  const { address } = args;
  const result =
    (await funds(parent, { addresses: [address] }, context, info)) || [];
  return result.shift();
}

export default fund;
