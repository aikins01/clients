# Copyright Daytona Platforms Inc.
# SPDX-License-Identifier: Apache-2.0

# pyright: reportUnusedImport=false, reportUnsupportedDunderAll=false

from __future__ import annotations

import importlib
from typing import TYPE_CHECKING

_root = importlib.import_module(__name__.rpartition(".")[0])

_ALIASES: dict[str, str] = {
    "AsyncDaytonaV1": "AsyncDaytona",
    "AsyncSandboxV1": "AsyncSandbox",
    "DaytonaV1": "Daytona",
    "DaytonaAuthenticationErrorV1": "DaytonaAuthenticationError",
    "DaytonaAuthorizationErrorV1": "DaytonaAuthorizationError",
    "DaytonaConfigV1": "DaytonaConfig",
    "DaytonaConflictErrorV1": "DaytonaConflictError",
    "DaytonaConnectionErrorV1": "DaytonaConnectionError",
    "DaytonaErrorV1": "DaytonaError",
    "DaytonaNotFoundErrorV1": "DaytonaNotFoundError",
    "DaytonaRateLimitErrorV1": "DaytonaRateLimitError",
    "DaytonaTimeoutErrorV1": "DaytonaTimeoutError",
    "DaytonaValidationErrorV1": "DaytonaValidationError",
    "ImageV1": "Image",
    "ListSandboxesQueryV1": "ListSandboxesQuery",
    "ResourcesV1": "Resources",
    "SandboxV1": "Sandbox",
    "VolumeMountV1": "VolumeMount",
}

if TYPE_CHECKING:
    from . import *  # noqa: F403  # pylint: disable=wildcard-import,unused-wildcard-import
    from ._async.daytona import AsyncDaytona
    from ._async.daytona import AsyncDaytona as AsyncDaytonaV1
    from ._async.sandbox import AsyncSandbox as AsyncSandboxV1
    from ._sync.daytona import Daytona
    from ._sync.daytona import Daytona as DaytonaV1
    from ._sync.sandbox import Sandbox as SandboxV1
    from .common.daytona import DaytonaConfig as DaytonaConfigV1
    from .common.errors import DaytonaAuthenticationError as DaytonaAuthenticationErrorV1
    from .common.errors import DaytonaAuthorizationError as DaytonaAuthorizationErrorV1
    from .common.errors import DaytonaConflictError as DaytonaConflictErrorV1
    from .common.errors import DaytonaConnectionError as DaytonaConnectionErrorV1
    from .common.errors import DaytonaError as DaytonaErrorV1
    from .common.errors import DaytonaNotFoundError as DaytonaNotFoundErrorV1
    from .common.errors import DaytonaRateLimitError as DaytonaRateLimitErrorV1
    from .common.errors import DaytonaTimeoutError as DaytonaTimeoutErrorV1
    from .common.errors import DaytonaValidationError as DaytonaValidationErrorV1
    from .common.image import Image as ImageV1
    from .common.sandbox import ListSandboxesQuery as ListSandboxesQueryV1
    from .common.sandbox import Resources as ResourcesV1
    from .common.volume import VolumeMount as VolumeMountV1

__all__ = [*_root.__all__, *_ALIASES]


def __getattr__(attr_name: str) -> object:
    if attr_name == "Daytona":
        value = getattr(importlib.import_module("._sync.daytona", __package__), attr_name)
        globals()[attr_name] = value
        return value

    if attr_name == "AsyncDaytona":
        value = getattr(importlib.import_module("._async.daytona", __package__), attr_name)
        globals()[attr_name] = value
        return value

    canonical_name = _ALIASES.get(attr_name)
    if canonical_name is not None:
        value = getattr(importlib.import_module(__name__), canonical_name)
        globals()[attr_name] = value
        return value

    if attr_name in _root.__all__:
        value = getattr(_root, attr_name)
        globals()[attr_name] = value
        return value

    raise AttributeError(f"module {__name__!r} has no attribute {attr_name!r}")


def __dir__() -> list[str]:
    return list(__all__)
