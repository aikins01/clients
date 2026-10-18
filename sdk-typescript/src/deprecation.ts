/*
 * Copyright Daytona Platforms Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

const ROOT_NAMESPACE_WARNING_CODE = 'DAYTONA_ROOT_NAMESPACE'
const TARGET_WARNING_CODE = 'DAYTONA_CONFIG_TARGET'

// Shared through globalThis so the ESM and CJS builds (both can load in one process) warn once in total.
type WarningState = { rootNamespace: boolean; targetConfig: boolean }
const STATE_KEY = Symbol.for('@daytona/sdk/deprecation-warnings')

function warningState(): WarningState {
  const holder = globalThis as typeof globalThis & { [STATE_KEY]?: WarningState }
  holder[STATE_KEY] ??= { rootNamespace: false, targetConfig: false }
  return holder[STATE_KEY]
}

function emitDeprecationWarning(message: string, code: string): void {
  const nodeProcess = typeof process === 'undefined' ? undefined : process
  if (nodeProcess && typeof nodeProcess.emitWarning === 'function') {
    nodeProcess.emitWarning(message, {
      type: 'DeprecationWarning',
      code,
    })
    return
  }

  console.warn(`DeprecationWarning: ${message}`)
}

export function warnRootNamespaceDeprecation(member: string, replacement = `daytona.v1.${member}`): void {
  const state = warningState()
  if (state.rootNamespace) {
    return
  }

  state.rootNamespace = true
  emitDeprecationWarning(
    `Use \`${replacement}\` instead. The root form is removed in SDK 2.x.`,
    ROOT_NAMESPACE_WARNING_CODE,
  )
}

export function warnTargetDeprecation(): void {
  const state = warningState()
  if (state.targetConfig) {
    return
  }

  state.targetConfig = true
  emitDeprecationWarning(
    'DaytonaConfig.target (and DAYTONA_TARGET) is deprecated and will be removed in a future version. Pass target per sandbox create call or regionId per snapshot create call instead.',
    TARGET_WARNING_CODE,
  )
}

export function resetRootNamespaceDeprecationWarningForTests(): void {
  warningState().rootNamespace = false
}

export function resetTargetDeprecationWarningForTests(): void {
  warningState().targetConfig = false
}
