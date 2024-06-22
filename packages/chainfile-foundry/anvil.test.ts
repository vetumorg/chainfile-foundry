import { CFTestcontainers } from '@chainfile/testcontainers';
import { afterAll, beforeAll, describe, expect, it } from '@workspace/jest/globals';

import anvil from './anvil.json';

describe('anvil', () => {
  const testcontainers = new CFTestcontainers(anvil);

  beforeAll(async () => {
    await testcontainers.start();
  });

  afterAll(async () => {
    await testcontainers.stop();
  });

  it('should rpc(eth_blockNumber)', async () => {
    const response = await testcontainers.get('anvil').rpc({
      method: 'eth_blockNumber',
    });

    expect(response.status).toStrictEqual(200);
    expect(await response.json()).toMatchObject({
      result: '0x0',
    });
  });
});

// TODO(fuxingloh): specific a different version
describe('v2.22.3', () => {
  const testcontainers = new CFTestcontainers(anvil, {
    version: '2.22.3',
  });

  beforeAll(async () => {
    await testcontainers.start();
  });

  afterAll(async () => {
    await testcontainers.stop();
  });

  it('should rpc(eth_blockNumber)', async () => {
    const response = await testcontainers.get('anvil').rpc({
      method: 'eth_blockNumber',
    });

    expect(response.status).toStrictEqual(200);
    expect(await response.json()).toMatchObject({
      result: '0x0',
    });
  });
});
