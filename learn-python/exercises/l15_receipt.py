# Lesson 15 exercise: the dinner receipt
#
# Ana, Ben and Chloe each ordered one dish. Print the receipt with f-strings.
# Your program must print exactly these 4 lines:
#
#   Pasta: $14.50
#   Bean chili: $12.00
#   Rice pudding: $6.75
#   Total: $33.25
#
# Rules:
#   - Use f-strings: an f before the quotes, and the names in {curly braces}.
#   - Every price has exactly 2 decimals. Use :.2f after the name.
#   - Do not type the prices or the dish names by hand. Use the jars below,
#     so the receipt is still right when a price changes.
#   - Work out the total from the three prices.
#
# 1. Change the code between the START and END lines below.
# 2. Save the file.
# 3. Run it. In VS Code, press the Run button at the top right.
#    In a terminal, type:  python3 l15_receipt.py
# 4. Read what the check at the bottom says. Keep going until it says PASS.

ana_dish = "Pasta"
ana_price = 14.5
ben_dish = "Bean chili"
ben_price = 12
chloe_dish = "Rice pudding"
chloe_price = 6.75

# >>> START: write your receipt below this line

print(ana_dish + ": $" + str(ana_price))

# <<< END: write your receipt above this line


# ---------------------------------------------------------------------------
# The check. You do not need to read this part yet. It runs your receipt
# again, quietly, with the real prices and with new prices, and looks at
# what was printed.
# ---------------------------------------------------------------------------
def _check():
    import contextlib
    import io
    import pathlib

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your receipt between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    def run(jars):
        printed = io.StringIO()
        with contextlib.redirect_stdout(printed):
            exec(your_code, dict(jars))
        return printed.getvalue().splitlines()

    real = {"ana_dish": "Pasta", "ana_price": 14.5, "ben_dish": "Bean chili", "ben_price": 12,
            "chloe_dish": "Rice pudding", "chloe_price": 6.75}
    want = ["Pasta: $14.50", "Bean chili: $12.00", "Rice pudding: $6.75", "Total: $33.25"]
    try:
        lines = run(real)
    except Exception as error:
        return "HINT: Your code stopped with " + type(error).__name__ + ": " + str(error) + ". Read the error, fix that line, and run again."

    if 'f"' not in your_code and "f'" not in your_code:
        return 'HINT: Use an f-string: put an f right before the quotes, like f"{ana_dish}: ${ana_price:.2f}".'
    if len(lines) != 4:
        return ("HINT: You printed " + str(len(lines)) + " line" + ("" if len(lines) == 1 else "s")
                + ". The receipt needs exactly 4 lines: three dishes and the total.")
    for got, wanted in zip(lines, want):
        if got == wanted:
            continue
        if "{" in got:
            return "HINT: This line shows curly braces: " + got + "  Did you forget the f before the quotes?"
        if got.rstrip() == wanted:
            return "HINT: This line has extra spaces at the end: '" + got + "'. Remove them."
        if wanted.split("$")[1] not in got:
            return ("HINT: You printed '" + got + "' but the receipt wants '" + wanted
                    + "'. Every price needs exactly 2 decimals: put :.2f after the name, inside the braces.")
        return "HINT: You printed '" + got + "' but the receipt wants '" + wanted + "'. Check the colon, the space and the $ sign."

    # Same code, new prices: the receipt must follow the jars.
    new = dict(real, ana_dish="Lasagne", ana_price=15.25, ben_price=11.4, chloe_price=7)
    new_want = ["Lasagne: $15.25", "Bean chili: $11.40", "Rice pudding: $7.00", "Total: $33.65"]
    if run(new) != new_want:
        return ("HINT: Your receipt is right today, but it does not follow the jars. Put the names in "
                "{curly braces} instead of typing the dishes and prices yourself, and add up the total "
                "from ana_price, ben_price and chloe_price.")
    return "PASS: 4 neat lines, every price with 2 decimals, and the receipt follows the jars. Dinner is paid!"


print()
print("-" * 40)
print(_check())
