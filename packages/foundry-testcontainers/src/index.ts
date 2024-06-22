import { AbstractStartedContainer, GenericContainer, StartedTestContainer, Wait } from 'testcontainers';
import {
  type Client,
  createClient,
  http,
  type HttpTransport,
  type PublicActions,
  publicActions,
  type TestActions,
  testActions,
  type WalletActions,
  walletActions,
} from 'viem';
import { anvil } from 'viem/chains';

export class AnvilContainer extends GenericContainer {
  constructor(image: string = `ghcr.io/foundry-rs/foundry:nightly`) {
    super(image);

    this.withWaitStrategy(Wait.forLogMessage('Started HTTP and WebSocket JSON-RPC server at'));
    this.withExposedPorts(8545);
  }

  async start(): Promise<StartedAnvilContainer> {
    return new StartedAnvilContainer(await super.start());
  }
}

type AnvilChain = typeof anvil;

export type AnvilClient = Client<HttpTransport, AnvilChain> &
  TestActions &
  PublicActions<HttpTransport, AnvilChain> &
  WalletActions<AnvilChain>;

export class StartedAnvilContainer extends AbstractStartedContainer {
  public readonly client: AnvilClient;

  constructor(startedTestContainer: StartedTestContainer) {
    super(startedTestContainer);
    this.client = this.createClient();
  }

  getHostRpcEndpoint(host: string = this.getHost()): string {
    return `http://${host}:${this.getMappedPort(8545)}`;
  }

  createClient(host: string = this.getHost()): AnvilClient {
    return createClient({
      cacheTime: 0,
      chain: anvil,
      transport: http(this.getHostRpcEndpoint(host)),
      name: 'Anvil Client',
      key: 'anvil',
      type: 'anvil',
    })
      .extend(testActions({ mode: 'anvil' }))
      .extend(publicActions)
      .extend(walletActions);
  }
}
