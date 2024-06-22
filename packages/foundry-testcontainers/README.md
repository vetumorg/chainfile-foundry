This project is part of the [Chainfile](https://chainfile.org) ecosystem;
it provides a Docker image for running Anvil in a container for toolchain isolation.

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
