import type { Account, Address } from 'viem'
import type { Config, Connector } from '../createConfig.js'

export type AccountParameter = {
  account?: Address | Account | undefined
}

export type ChainIdParameter<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
> = {
  chainId?:
    | (chainId extends config['chains'][number]['id'] ? chainId : undefined)
    | config['chains'][number]['id']
    | undefined
}

export type ConnectorParameter = {
  connector?: Connector | undefined
}
