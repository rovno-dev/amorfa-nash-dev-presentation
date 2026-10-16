"""aiogram test harness: mocked Bot, real Dispatcher."""
import os

import pytest
from unittest.mock import AsyncMock

# bot.py reads TELEGRAM_BOT_TOKEN at import time. Give it a dummy.
os.environ.setdefault("TELEGRAM_BOT_TOKEN", "123456:TEST")


@pytest.fixture()
def bot() -> AsyncMock:
    b = AsyncMock()
    b.send_message = AsyncMock()
    b.set_my_commands = AsyncMock()
    return b


@pytest.fixture()
def dp():
    from app.bot import dp as dispatcher
    return dispatcher
