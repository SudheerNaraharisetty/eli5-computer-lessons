# Lesson 5 exercise: my practice plan
#
# Before module 1 starts, make a small plan for yourself.
# Fill in three things below:
#
#   my_name          your name, for example  "Sam"
#   minutes_per_day  how many minutes a day you will practise,
#                    just the number, for example  "20"
#                    (pick something you can really keep up: 5 to 180)
#   first_friend     whose meal Kitchen Coach should plan first:
#                    "Ana", "Ben" or "Chloe"
#
# Only type BETWEEN the two quote marks on each line. Keep the quote marks.
# What these lines really are is lesson 11 (Variables). For now they are
# just three blanks to fill in.
#
# 1. Fill in the three blanks between the START and END lines below.
# 2. Save the file.
# 3. Run it. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l05_my_plan.py
# 4. Read what the check at the bottom says. Keep going until it says PASS.

# >>> START: fill in between the quote marks below this line

my_name = ""
minutes_per_day = ""
first_friend = ""

# <<< END: fill in between the quote marks above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It looks at the three
# blanks above and tells you PASS, or one thing to change.
# ---------------------------------------------------------------------------
def _check():
    answers = globals()
    for blank in ["my_name", "minutes_per_day", "first_friend"]:
        if blank not in answers:
            return ("HINT: The line that starts with " + blank + " is missing. "
                    "Keep all three lines between START and END.")

    name = str(answers["my_name"]).strip()
    minutes = str(answers["minutes_per_day"]).strip()
    friend = str(answers["first_friend"]).strip()

    if name == "":
        return 'HINT: Your name is still empty. Type it between the quote marks, like  my_name = "Sam"'

    if minutes == "":
        return 'HINT: minutes_per_day is still empty. Type a number between the quote marks, like  "20"'
    if not minutes.isdigit():
        return ('HINT: minutes_per_day should be just a number, like "20". '
                'You wrote "' + minutes + '". Take out any words or dots.')
    minutes = int(minutes)
    if minutes < 5:
        return "HINT: " + str(minutes) + " minutes is very short. Pick at least 5 minutes a day."
    if minutes > 180:
        return ("HINT: " + str(minutes) + " minutes is more than 3 hours a day. That is hard to keep up. "
                "Pick a number from 5 to 180. Small and daily wins.")

    if friend == "":
        return 'HINT: first_friend is still empty. Type "Ana", "Ben" or "Chloe" between the quote marks.'
    friends = {"ana": "Ana", "ben": "Ben", "chloe": "Chloe"}
    if friend.lower() not in friends:
        return ('HINT: first_friend should be one of your three friends: "Ana", "Ben" or "Chloe". '
                'You wrote "' + friend + '".')
    friend = friends[friend.lower()]

    return ("PASS: " + name + " will practise " + str(minutes) + " minutes a day ("
            + str(minutes * 7) + " minutes a week). Kitchen Coach will plan "
            + friend + "'s meal first. See you in module 1!")


print()
print("-" * 40)
print(_check())
