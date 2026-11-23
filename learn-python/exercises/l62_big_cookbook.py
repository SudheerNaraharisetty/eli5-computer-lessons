# Lesson 62 exercise: Leave the big cookbook on the shelf (file 2 of 2)
#
# This is the BIG cookbook. It is slow to open: when Python loads it, it
# prints a line and then waits 1 second, as if it were reading 400 recipes.
#
# You do NOT change this file. Your work is in l62_coach.py, next to it.
# Run l62_coach.py to check your work.

import time

print("loading big cookbook...")
time.sleep(1)  # pretend: reading 400 recipes takes 1 second


def plan(guest):
    """A week of meals for one guest."""
    return f"Meal plan for {guest}: 7 days, 21 meals"
