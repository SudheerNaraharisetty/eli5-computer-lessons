# Fills the pancake stack (44 divs) into compositions/story.html between the CAKES markers.
import re, pathlib
p = pathlib.Path(__file__).parent / "compositions/story.html"
s = p.read_text()
cakes = "\n".join(f'          <div class="cake" id="c{j}" style="top:{880 - j * 13}px"></div>' for j in range(44))
s = re.sub(r"<!-- CAKES:BEGIN -->.*?<!-- CAKES:END -->", lambda m: "<!-- CAKES:BEGIN -->\n" + cakes + "\n<!-- CAKES:END -->", s, flags=re.S)
p.write_text(s)
