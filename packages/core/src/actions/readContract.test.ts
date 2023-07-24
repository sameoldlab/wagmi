import { abi, address, config, testChains } from '@wagmi/test'
import { describe, expect, test } from 'vitest'

import { readContract } from './readContract.js'

describe('readContract', () => {
  test('default', async () => {
    await expect(
      readContract(config, {
        address: address.wagmiMintExample,
        abi: abi.wagmiMintExample,
        functionName: 'balanceOf',
        args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
      }),
    ).resolves.toMatchInlineSnapshot('3n')
  })

  test('parameters: chainId', async () => {
    await expect(
      readContract(config, {
        address: address.wagmiMintExample,
        abi: abi.wagmiMintExample,
        functionName: 'balanceOf',
        args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
        chainId: testChains.mainnet2.id,
      }),
    ).resolves.toMatchInlineSnapshot('3n')
  })
})

describe.todo('watchReadContract')