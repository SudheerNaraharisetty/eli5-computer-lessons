# Lesson 86 exercise: The safe menu card
#
# Kitchen Coach prints the menu card as a small web page, and the guests type
# their own notes. Ben typed  <b>extra cheese  and the whole card turned bold.
# Write render(template) between START and END, so a guest's note can never
# change the page again.
#
# render(template) gets a t-string (a Template). Go through it part by part:
#   - fixed text (a str): keep it exactly as it is, tags and all.
#   - a filled-in value (an Interpolation):
#       1. turn it into text with its look:  format(part.value, part.format_spec)
#          (so t"{price:.2f}" still shows 6.50)
#       2. make it harmless with  escape(...)  from the html module.
# Then join all the pieces into one str and return it.
#
# Example:  note = "<b>extra cheese"
#           render(t"<li>Ben: {note}</li>")
#           gives  <li>Ben: &lt;b&gt;extra cheese</li>
#
# You need Python 3.14 or newer. t-strings are new in Python 3.14.
# On a Mac, plain python3 may be an older Python (3.9). In VS Code, click the
# Python version at the bottom right and pick 3.14 or newer, or type in a
# terminal:  python3.15 l86_safe_menu.py
#
# How to run it:
# - Save the file, then press the Run button at the top right of VS Code.
#
# What happens when you run it, in two steps:
# - STEP 1. The menu card for Ana, Ben and Chloe is printed with your render().
# - STEP 2, THE CHECK. It tests render() with tricky guest names. It says PASS,
#   or gives you one hint.

# Leave these lines as they are. They check your Python version first, then
# start the check at the bottom of this file, so an error in your lines shows
# up as a hint, not a crash.
#
# Why no t"..." anywhere in this file: Python reads the WHOLE file before it
# runs line 1. An older Python does not know t-strings, so one t"..." anywhere
# would stop it with a SyntaxError before it could print the friendly version
# message below. So the check keeps its t-strings inside quotes and builds them
# only after the version check. (Your render() does not need a t"..." either:
# it only receives one.)
import sys
if sys.version_info < (3, 14):
    print("This exercise needs Python 3.14 or newer, because t-strings are new in 3.14.")
    print("You are running Python " + sys.version.split()[0] + ".")
    print("Pick Python 3.14 or newer in VS Code (bottom right), or run:  python3.15 l86_safe_menu.py")
    raise SystemExit
import pathlib
exec(pathlib.Path(__file__).read_text(encoding="utf-8").split("# ===== THE CHECK =====\n")[-1])
raise SystemExit

# >>> START: write your lines below this line
from html import escape
from string.templatelib import Interpolation


def render(template):
    pieces = []
    # Go through the template, one part at a time.
    # Fixed text: add it to pieces as it is.
    # A value (an Interpolation): format it, escape it, then add it.
    return "".join(pieces)

# <<< END: write your lines above this line


# ===== THE CHECK =====
# You do not need to read this part yet. It takes render() from between START
# and END, then gives it templates with tricky guest names and notes.
def _check():
    import html

    source = pathlib.Path(__file__).read_text(encoding="utf-8")
    start, end = "# >>> START", "# <<< END"
    if start not in source or end not in source:
        return "HINT: Keep the START and END lines. Write your lines between them."
    your_code = source.split(start, 1)[1].split("\n", 1)[1].split(end, 1)[0]

    ns = {"__name__": "__main__"}
    try:
        exec(compile(your_code, "your lines", "exec"), ns)
    except SyntaxError as error:
        return "HINT: Python could not read your lines: " + str(error)
    except Exception as error:
        return "HINT: Python stopped with an error: " + type(error).__name__ + ": " + str(error)
    render = ns.get("render")
    if not callable(render):
        return "HINT: Keep the line  def render(template):  The check calls that function."

    def tpl(text, **names):
        # Builds t"<text>" with these names filled in. eval() reads the text as
        # Python code, so this file has no t"..." of its own (see the top).
        return eval("t'''" + text + "'''", {}, names)

    def run(text, **names):
        try:
            return render(tpl(text, **names)), None
        except Exception as error:
            return None, "render stopped with " + type(error).__name__ + ": " + str(error)

    print("STEP 1: the menu card")
    print("-" * 50)
    notes = {"Ana": "pasta, no onions", "Ben": "<b>extra cheese", "Chloe": "gluten-free brownie"}
    print("<ul>")
    for name, note in notes.items():
        got, err = run("<li>{name}: {note}</li>", name=name, note=note)
        if err:
            return "HINT: " + err
        print(got)
    print("</ul>")
    print("-" * 50)
    print("STEP 2, THE CHECK")

    got, err = run("<li>Ben: {note}</li>", note="<b>extra cheese")
    if err:
        return "HINT: " + err
    if not isinstance(got, str):
        return "HINT: render should return one str. It returned " + type(got).__name__ + ". Finish with  return \"\".join(pieces)"
    if got == "":
        return ("HINT: render returned empty text. Loop over the template:  for part in template:  "
                "and add every part to pieces.")
    want = "<li>Ben: &lt;b&gt;extra cheese</li>"
    if got == "<li>Ben: <b>extra cheese</li>":
        return ("HINT: Ben's <b> is still a real tag, so the card turns bold. "
                "Escape each value:  escape(format(part.value, part.format_spec))")
    if "&lt;li&gt;" in got:
        return ("HINT: You escaped the fixed text too, so <li> became &lt;li&gt; and the browser shows the tag. "
                "Only escape the values (the Interpolation parts). Keep fixed text as it is.")
    if "<li>" not in got or "</li>" not in got:
        return ("HINT: The fixed text is missing. It gave " + got + ". "
                "Add the str parts to pieces too, not only the values.")
    if "Interpolation(" in got:
        return ("HINT: A whole Interpolation ended up in the text. Use its value:  part.value")
    if got != want:
        return "HINT: render(t\"<li>Ben: {note}</li>\") should give  " + want + "  It gave  " + got

    tricky = [
        ("<p>{name} is here</p>", {"name": "Chloe <script>"}),
        ("<p>{name} &amp; {friend}</p>", {"name": "Ana & Ben", "friend": "O'Brien"}),
        ('<img alt="{dish}">', {"dish": 'say "cheese"'}),
        ("{note}", {"note": "</ul><h1>FREE DESSERT</h1>"}),
        ("<p>no blanks at all</p>", {}),
        ("<td>{grams}</td><td>{kcal}</td>", {"grams": 250, "kcal": 410}),
    ]
    for text, names in tricky:
        got, err = run(text, **names)
        if err:
            if "must be str" in err or "expected str" in err or "has no attribute 'replace'" in err:
                return ("HINT: A number (250 grams) cannot go straight into escape() or join(). "
                        "Turn the value into text first:  format(part.value, part.format_spec)")
            return "HINT: With " + repr(names) + " " + err
        want = text.format(**{k: html.escape(str(v)) for k, v in names.items()})
        if got != want:
            return ("HINT: render(t'" + text + "') with " + repr(names)
                    + " should give  " + want + "  It gave  " + str(got))

    got, err = run("<p>{dish}: ${price:.2f}</p>", dish="Mac & cheese", price=6.5)
    if err:
        return "HINT: " + err
    if got == "<p>Mac &amp; cheese: $6.5</p>":
        return ("HINT: Almost there. The price shows 6.5, not 6.50: the :.2f look is kept in part.format_spec. "
                "Use  format(part.value, part.format_spec)  before you escape.")
    if got != "<p>Mac &amp; cheese: $6.50</p>":
        return "HINT: render(t\"<p>{dish}: ${price:.2f}</p>\") should give  <p>Mac &amp; cheese: $6.50</p>  It gave  " + str(got)

    return ("PASS: Every guest's note is shown as plain text, the fixed HTML stays as it is, "
            "and prices keep their look. Nobody can turn your menu bold again.")


verdict = _check()
print(verdict)
