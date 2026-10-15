# Copyright Daytona Platforms Inc.
# SPDX-License-Identifier: Apache-2.0

# frozen_string_literal: true

module Daytona
  module Sdk
    # One-time runtime warnings for the deprecated root client members and
    # Config#target. Has no dependencies, so any file can require it.
    module Deprecation
      ROOT_NAMESPACE_MESSAGE = 'Use `daytona.v1.%<member>s` instead. The root form is removed in SDK 2.x.'
      TARGET_MESSAGE =
        'Daytona::Config#target (and DAYTONA_TARGET) is deprecated and will be removed in a future version. ' \
        'Pass `target:` per sandbox create (`Daytona::CreateSandboxFromSnapshotParams` / ' \
        '`Daytona::CreateSandboxFromImageParams`) or `region_id:` per snapshot create ' \
        '(`Daytona::CreateSnapshotParams`) instead.'

      LOCK = Mutex.new
      private_constant :LOCK

      module_function

      def warn_root_namespace_once(member, uplevel: 2)
        return unless first_warning?(:@root_namespace_warned)

        message = [
          "[DEPRECATION] Daytona::Daytona##{member} is deprecated.",
          format(ROOT_NAMESPACE_MESSAGE, member: member)
        ].join(' ')
        warn(message, uplevel:)
      end

      def warn_target_once(uplevel: 2)
        return unless first_warning?(:@target_warned)

        warn("[DEPRECATION] #{TARGET_MESSAGE}", uplevel:)
      end

      def reset_for_tests!
        LOCK.synchronize do
          @root_namespace_warned = false
          @target_warned = false
        end
      end

      # Atomically checks and sets the flag, so concurrent first uses warn once.
      def first_warning?(flag)
        LOCK.synchronize do
          next false if instance_variable_get(flag)

          instance_variable_set(flag, true)
        end
      end
    end
  end
end
