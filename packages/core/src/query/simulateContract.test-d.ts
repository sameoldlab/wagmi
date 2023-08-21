import { abi } from '@wagmi/test'
import { type Address, http } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../config.js'
import {
  type SimulateContractOptions,
  simulateContractQueryOptions,
} from './simulateContract.js'

test('chain formatters', () => {
  const config = createConfig({
    chains: [mainnet, celo],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })

  type Result = SimulateContractOptions<
    typeof config,
    typeof config['chains'][number]['id'],
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint]
  >
  expectTypeOf<Result>().toMatchTypeOf<{
    chainId?: typeof celo.id | typeof mainnet.id | undefined
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()
  simulateContractQueryOptions(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    feeCurrency: '0x',
    gatewayFee: 100n,
    gatewayFeeRecipient: '0x',
  })

  type Result2 = SimulateContractOptions<
    typeof config,
    typeof celo.id,
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint]
  >
  expectTypeOf<Result2>().toMatchTypeOf<{
    functionName?: 'approve' | 'transfer' | 'transferFrom' | undefined
    args?: readonly [Address, Address, bigint] | undefined
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()
  simulateContractQueryOptions(config, {
    chainId: celo.id,
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    feeCurrency: '0x',
    gatewayFee: 100n,
    gatewayFeeRecipient: '0x',
  })

  type Result3 = SimulateContractOptions<
    typeof config,
    typeof mainnet.id,
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint]
  >
  expectTypeOf<Result3>().toMatchTypeOf<{
    functionName?: 'approve' | 'transfer' | 'transferFrom' | undefined
    args?: readonly [Address, Address, bigint] | undefined
  }>()
  expectTypeOf<Result3>().not.toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()
  simulateContractQueryOptions(config, {
    chainId: mainnet.id,
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 100n,
    gatewayFeeRecipient: '0x',
  })
})
