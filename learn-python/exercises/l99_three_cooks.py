# Lesson 99 exercise: Three cooks
#
# Three orders come in: pasta for Ana, chili for Ben, pudding for Chloe.
# Each one WAITS half a second in the oven (time.sleep(0.5)). While it
# waits, the cook does nothing. That is waiting work, and threads are
# great at it: three cooks can wait at the same time.
#
# Your job has two parts, both between START and END:
#
#   1. THREE COOKS. three_cooks() still cooks one order after another,
#      exactly like one_cook(). Change it so a ThreadPoolExecutor with
#      3 workers cooks all the orders, using pool.map(cook, orders).
#      Return the results as a list, in the same order as the orders.
#
#   2. ONE PEN FOR THE WHITEBOARD. serve() adds 1 to the shared
#      whiteboard for every plate. The check runs it in 3 threads at once,
#      10000 plates each, so the board must end at 30000. Two cooks must
#      never read and write the board at the same moment: put the update
#      inside  with board_lock:
#
# How to run it: save, then press the Run button at the top right of
# VS Code, or type  python3 l99_three_cooks.py  in a terminal.
# It takes about 3 seconds, because the orders really wait.
# This file was checked with Python 3.14 and 3.15.

import threading
import time
from concurrent.futures import ThreadPoolExecutor

ORDERS = ["pasta", "chili", "pudding"]
board = {"served": 0}
board_lock = threading.Lock()


def cook(order):
    """Wait half a second for the oven, then the dish is ready."""
    time.sleep(0.5)
    return f"{order} ready"


def one_cook(orders):
    """One cook, one order after another."""
    return [cook(order) for order in orders]


# >>> START: change the lines below this line
def three_cooks(orders):
    """Three cooks (threads) wait for the oven at the same time."""
    return [cook(order) for order in orders]


def serve(plates):
    """Add 1 plate to the whiteboard, plates times."""
    for plate in range(plates):
        board["served"] += 1
# <<< END: change the lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It times both kitchens, then
# lets 3 threads serve 10000 plates each, and counts how often the lock
# was used.
class _CountingLock:
    """A real lock that also counts how many times it was taken."""

    def __init__(self):
        self.real = threading.Lock()
        self.taken = 0

    def __enter__(self):
        self.real.acquire()
        self.taken += 1
        return self

    def __exit__(self, *details):
        self.real.release()
        return False


def _check():
    global board_lock

    print("STEP 1: one cook, then three cooks")
    start = time.perf_counter()
    alone = one_cook(ORDERS)
    one_time = time.perf_counter() - start
    print(f"  one cook:    {alone}  took {one_time:.1f} s")

    start = time.perf_counter()
    try:
        together = three_cooks(ORDERS)
    except Exception as error:  # noqa: BLE001  any error becomes a hint
        return f"HINT: three_cooks() stopped with {type(error).__name__}: {error}"
    three_time = time.perf_counter() - start
    print(f"  three cooks: {together}  took {three_time:.1f} s")

    if together is None or not isinstance(together, list):
        return (
            f"HINT: three_cooks() should return a list, but it returned {together!r}. "
            "pool.map() hands back the results one by one: wrap it in list(...)."
        )
    if together != alone:
        return (
            f"HINT: three_cooks() returned {together}, but it should be {alone}: "
            "every order, ready, in the same order. pool.map(cook, orders) keeps the order."
        )
    if three_time > one_time / 2:
        return (
            f"HINT: three cooks took {three_time:.1f} s, about the same as one cook "
            f"({one_time:.1f} s). They are still waiting one after another. Use "
            "with ThreadPoolExecutor(max_workers=3) as pool:  and  pool.map(cook, orders)."
        )

    print("STEP 2: 3 threads serve 10000 plates each")
    spy = _CountingLock()
    board_lock = spy
    board["served"] = 0
    with ThreadPoolExecutor(max_workers=3) as pool:
        list(pool.map(serve, [10000, 10000, 10000]))
    print(f"  whiteboard: {board['served']}, lock taken {spy.taken} times")

    if board["served"] != 30000:
        return (
            f"HINT: the whiteboard says {board['served']}, but 3 x 10000 plates is 30000. "
            "Add exactly 1 for every plate."
        )
    if spy.taken != 30000:
        return (
            f"HINT: the board is right this time ({board['served']}), but the lock was taken "
            f"{spy.taken} times, not 30000. Without it, two cooks can read the same number "
            "and one plate is lost. Put  board[\"served\"] += 1  inside  with board_lock:  "
            "(one level deeper, inside the for loop)."
        )
    return (
        f"PASS: three cooks took {three_time:.1f} s instead of {one_time:.1f} s, the dishes "
        "came back in order, and 3 threads served exactly 30000 plates, one cook at a "
        "time at the whiteboard."
    )


if __name__ == "__main__":
    print(_check())
