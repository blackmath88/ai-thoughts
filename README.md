# AI Thoughts

Essays on AI system architecture: semantic computation instead of agent-centrism, memory as reconstructable knowledge, and control over AI. Each essay tells its story with history first and interactive figures second, and ends with an open question.

```
index.html                              landing page
essays/
  01-the-box-and-the-gauge/
    index.html                          the essay, with four interactive figures
    essay.md                            the same essay as plain text
    css/style.css
    js/data.js                          figure data (illustrative, deterministic)
    js/figures.js                       figure rendering
sources/
  semantic-computation-not-agent-centrism.md                  Miro, 19 October 2026
  semantic-memory-repositories-and-causal-history-addendum.md Miro, 19 October 2026
.nojekyll                               serve files as-is on GitHub Pages
```

## Opening the pages

Open `index.html` directly in a browser. Everything works from disk: no build, no server, no dependencies besides Google Fonts (with system fallbacks). The landing page needs no JavaScript; the essay's figures use plain JavaScript and the text reads fine without it.

## GitHub Pages

Settings → Pages → Deploy from a branch → `main`, folder `/ (root)`. The site is then at `https://blackmath88.github.io/ai-thoughts/`. All links are relative, so the same files work on disk and on Pages. `.nojekyll` stops Jekyll from processing the files. The Markdown sources are served as raw text on Pages; read them on GitHub for rendered Markdown.

## Adding an essay

Create `essays/NN-slug/` with `index.html` and `essay.md`, give the essay page a `← AI Thoughts` link to `../../index.html`, and add a card to the Essays section of the landing page.
