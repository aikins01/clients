// Copyright Daytona Platforms Inc.
// SPDX-License-Identifier: Apache-2.0

package daytona

import (
	"fmt"
	"io"
	"os"
	"sync"
)

var (
	rootNamespaceWarningOnce sync.Once
	targetWarningOnce        sync.Once

	deprecationWarningWriterMu sync.Mutex
	deprecationWarningWriter   io.Writer = os.Stderr
)

func warnDeprecatedRootMember(member string) {
	rootNamespaceWarningOnce.Do(func() {
		writeDeprecationWarning(
			fmt.Sprintf(
				"DeprecationWarning: daytona.Client.%s is deprecated. Use client.V1().%s instead. The root form is removed in SDK 2.x.",
				member,
				member,
			),
		)
	})
}

func warnDeprecatedTargetUsage() {
	targetWarningOnce.Do(func() {
		writeDeprecationWarning("DeprecationWarning: DaytonaConfig.Target (and DAYTONA_TARGET) is deprecated and will be removed in a future version. Pass SandboxBaseParams.Target per sandbox create or CreateSnapshotParams.RegionID per snapshot create instead.")
	})
}

func writeDeprecationWarning(message string) {
	deprecationWarningWriterMu.Lock()
	writer := deprecationWarningWriter
	deprecationWarningWriterMu.Unlock()

	_, _ = fmt.Fprintln(writer, message)
}

func setDeprecationWarningWriter(writer io.Writer) {
	deprecationWarningWriterMu.Lock()
	defer deprecationWarningWriterMu.Unlock()

	if writer == nil {
		deprecationWarningWriter = io.Discard
		return
	}

	deprecationWarningWriter = writer
}

func resetDeprecationWarningsForTests() {
	rootNamespaceWarningOnce = sync.Once{}
	targetWarningOnce = sync.Once{}
	setDeprecationWarningWriter(os.Stderr)
}
