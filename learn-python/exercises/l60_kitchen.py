# Lesson 60 exercise: Share the cookbook (file 1 of 2)
#
# This file is a COOKBOOK: a module. It holds Kitchen Coach's recipe cards,
# so that other programs can import them instead of copy-pasting them.
# The other file, l60_coach.py, sits next to this one and does:
#
#     import l60_kitchen
#
# Your job, between START and END, in two steps:
#
# 1. Finish the card kcal_in(grams, per_100g). It should give back the
#    calories (kcal) in that many grams of food, ROUNDED to a whole number.
#    per_100g is the kcal in 100 g, like protein_in does for protein.
#    Example: 150 g of rice, with 130 kcal per 100 g, is 195 kcal.
#
# 2. The three test lines at the bottom print every time another file
#    imports this cookbook. Put them under
#
#        if __name__ == "__main__":
#
#    each pushed in by 4 spaces, so they run ONLY when you run this file
#    on its own.
#
# How to run it:
# - Run THIS file on its own: the test lines print. That is fine.
# - Then run l60_coach.py (in the same folder). It imports this cookbook,
#   and its check says PASS, or gives you one hint.

def protein_in(grams, per_100g):
    """Grams of protein in this much food."""
    return grams * per_100g / 100


# >>> START: change the lines below this line

def kcal_in(grams, per_100g):
    """Calories (kcal) in this much food, rounded to a whole number."""
    return 0


print("Testing the cookbook")
print("tofu, 150 g:", protein_in(150, 17), "g protein")
print("rice, 150 g:", kcal_in(150, 130), "kcal")

# <<< END: change the lines above this line
