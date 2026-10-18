// Copyright Daytona Platforms Inc.
// SPDX-License-Identifier: Apache-2.0

import { Daytona } from '@daytona/sdk'
import { Daytona as DaytonaV1, Image } from '@daytona/sdk/v1'

const image = Image.base('alpine').env({ FOO: 'bar' })
if (!image.dockerfile.includes('FROM alpine')) throw new Error('Image.base failed')
if (!image.dockerfile.includes('ENV FOO')) throw new Error('Image.env failed')

if (DaytonaV1 === Daytona) throw new Error('@daytona/sdk/v1 Daytona should be the v1 client, not the root')
const daytona = new Daytona()
const iter = daytona.v1.list()
if (typeof (iter as any)[Symbol.asyncIterator] !== 'function') {
  throw new Error('v1.list() did not return an async iterator')
}
const first = await iter.next()
if (typeof first !== 'object' || !('done' in first)) {
  throw new Error('list() iterator did not yield a valid result')
}
console.log('PASS')
