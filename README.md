# Outboard

Three tools that keep things outside your head, because some heads do not hold them.

Each is a single HTML file with no build step, no account and no install. Open it and it
works. Everything you enter stays in your own browser.

---

## Why these are shaped like this

Most software assumes two things about the person using it: that they can picture what they
are being told about, and that they can re-live what they did last week. Those assumptions
are usually invisible, because for most people they hold.

With **aphantasia** there is no mental image — *picture a box holding a value* lands on
nothing. With **SDAM** there is no re-livable past — *remember when we covered loops* is not
a retrievable occasion, only a fact you might know. With **ADHD** the working-memory slot
that everything else assumes is available is often already full.

When those assumptions fail, the usual result is not "this tool was built for someone else."
It is "I must be stupid." These three are attempts at the other design: nothing to picture,
nothing to recall, nothing held in the head.

The mechanisms matter more than the label. A tool can be built this way for anyone.

## The tools

### `ledger.html` — The Ledger
Python from `print` to writing a class, in sixteen lessons. Real CPython, compiled to
WebAssembly, running in the tab — not a simulation of running code.

What makes it different is the scaffolding, not the material:

- **The names table.** After every run, every name that exists, what it is bound to, and its
  type — read straight out of the interpreter. Not a metaphor about boxes. The actual state.
- **The structure readout.** Your own indentation, redrawn with the nesting marked and
  misaligned lines flagged, so block structure is something you can look at rather than hold.
- **Nothing refers backwards.** Each lesson restates its prerequisites in full. Lesson nine
  works cold, months later, with no memory of lesson eight.
- **Everything is written down.** Every run, timestamped, with its code and its output —
  because *did I do this, and what did I write* should be answered by looking, not by
  reconstructing an occasion.
- **No arithmetic anywhere.** No streaks, no timers, no scores, nothing locked behind
  anything else.

Progress, code, notes and the review schedule live in `localStorage` and export to plain
JSON. Python is fetched from a CDN on the first run and cached after; everything else works
offline.

### `anchor.html` — Anchor
An outboard memory for a day. Now/next working-memory slots, a nagger that escalates rather
than firing once and giving up, a task shredder for things too big to start, body-double
sessions, a people file, a money lens, and a work-wins log — so that being asked what you
achieved this year is answered from a list rather than from recall.

Everything stays in the browser.

### `pantry.html` — Pantry Pal
Point a camera at a shelf, a fridge or a shopping haul; the items are identified and filed
into a virtual cupboard with use-by dates, sorted so that what needs eating first is
impossible to miss. Relative dates ("3 days left", "added yesterday") rather than raw ones,
large text, one action per screen.

Manual entry works with no server and no key. Only the photo recognition needs either.

## Running them

The Ledger and Anchor need nothing at all — download the file, open it, done. They work
from `file://` with no internet connection (the Ledger fetches Python itself on first run).

Pantry Pal's camera needs a local server, for two reasons: browsers will not grant camera
access to a `file://` page, and an API key must never sit in a page anyone can view-source.

```bash
npm install
cp .env.example .env     # then set ANTHROPIC_API_KEY
npm start                # → http://localhost:3001/pantry
```

The key stays in the server process and is never sent to the browser.

## What these are not

- **Not medical anything.** No diagnosis, no treatment, no assessment. They are conveniences
  built around a few design constraints, and the constraints are described above so you can
  judge whether they fit you.
- **Not a substitute for support that actually helps you.** An app that remembers your tasks
  is not the same as having less to do.
- **Not evidence about anyone but their author.** These were built to fit one person's
  constraints. If they fit yours, good — but they were not validated on anybody.
- **Not private by transmission — private by not transmitting.** Everything lives in your
  browser's `localStorage`. That means it is not encrypted, not backed up, and gone if you
  clear site data. Export anything you would miss.

## License

**PolyForm Noncommercial License 1.0.0** — the full text is in [`LICENSE`](LICENSE), copied
verbatim from [polyformproject/polyform-licenses](https://github.com/polyformproject/polyform-licenses).

Any noncommercial purpose is permitted, and the licence says so broadly: personal study,
hobby projects, research and experiment, plus use by charities, schools, universities,
public research bodies, health and public-safety organisations, and government — regardless
of how those are funded.

So: a student learning Python from The Ledger, a teacher handing it round a class, a charity
using Anchor with the people it supports, or anyone forking it to fit their own head — all
fine, no permission needed. Selling it, or building it into something you sell, is not.

Unlike a Creative Commons licence, this one is written for software: it grants a patent
licence alongside the copyright one, and it has a cure period — a first violation can be
fixed within 32 days rather than terminating immediately.

For commercial use, ask.
