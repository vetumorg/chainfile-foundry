# Chainfile Foundry

Part of the [Chainfile](https://chainfile.org) ecosystem.

## `foundry-testcontainers`

This is a standalone testcontainers-node package for running foundry in a container for testing purposes.
You don't need to use the Chainfile ecosystem to use this package.

```shell
npm i -D foundry-testcontainers viem
```

```typescript
import { AnvilContainer, StartedAnvilContainer } from 'foundry-testcontainers';
import { createPublicClient, http, PublicClient } from 'viem';
import { anvil } from 'viem/chains';

let container: StartedAnvilContainer;

beforeAll(async () => {
  container = await new AnvilContainer().start();
});

afterAll(async () => {
  await container.stop();
});

it('should rpc(eth_blockNumber) via viem', async () => {
  const client = createPublicClient({ chain: anvil, transport: http(container.getHostRpcEndpoint()) });

  const blockNumber = await client.getBlockNumber();
  expect(blockNumber).toStrictEqual(BigInt(0));
});
```

## License

MPL-2.0
