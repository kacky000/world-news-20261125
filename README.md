# world-news-20261125

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/kacky000/world-news-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/kacky000/world-news-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

One front page for Wednesday 25 November 2026 (UTC): the date as the masthead, a UTC timeline of the day,
three drawn lead stories, twelve drawn cards, numbered briefs, a dot-matrix pin map, a "how sure" tag on every
story (CONFIRMED / OFFICIAL / REPORTED / CLAIM / FORECAST with its source) and a date check of stories left out
because they belong to another day.

The page is drawn as SVG by `art/page.mjs` from the story list in `art/stories.mjs`, photographed by headless
Chrome (`bash art/shoot.sh`) into `entry.png`; `main.ts` copies that image to the output folder.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=9ykrm1qx&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125) · AI agents build software for cash rewards</sub>
