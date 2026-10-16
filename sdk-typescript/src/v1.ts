/*
 * Copyright Daytona Platforms Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

export * from './index'

export { Daytona, V1_API_URL } from './Daytona'
export { Daytona as DaytonaV1 } from './Daytona'
export { Image, Image as ImageV1 } from './Image'
export { Sandbox, Sandbox as SandboxV1 } from './Sandbox'
export type {
  DaytonaConfig as DaytonaConfigV1,
  Resources as ResourcesV1,
  VolumeMount as VolumeMountV1,
} from './Daytona'
export type { ListSandboxesQuery as ListSandboxesQueryV1 } from './Sandbox'
export {
  DaytonaAuthenticationError,
  DaytonaAuthenticationError as DaytonaAuthenticationErrorV1,
  DaytonaAuthorizationError,
  DaytonaAuthorizationError as DaytonaAuthorizationErrorV1,
  DaytonaBadRequestError,
  DaytonaForbiddenError,
  DaytonaGoneError,
  DaytonaInternalServerError,
  DaytonaServiceUnavailableError,
  DaytonaUnprocessableEntityError,
  DaytonaConflictError,
  DaytonaConflictError as DaytonaConflictErrorV1,
  DaytonaConnectionError,
  DaytonaConnectionError as DaytonaConnectionErrorV1,
  DaytonaError,
  DaytonaError as DaytonaErrorV1,
  DaytonaNotFoundError,
  DaytonaNotFoundError as DaytonaNotFoundErrorV1,
  DaytonaRateLimitError,
  DaytonaRateLimitError as DaytonaRateLimitErrorV1,
  DaytonaTimeoutError,
  DaytonaTimeoutError as DaytonaTimeoutErrorV1,
  DaytonaValidationError,
  DaytonaValidationError as DaytonaValidationErrorV1,
} from './errors/DaytonaError'
