# House Estimates
When you're looking at a house, it's nice to be able to get an estimate of what it would sell for.
Thankfully, there are websites that provide this information.
Less fortunately, if you want to do analysis over a reasonable sample size, looking up those estimates by hand is quite tedious, and those websites don't have convenient APIs to get the information you need.
This script can alleviate that tedium, so you can do something more interesting while it does your work for you.

2 caveats:
- Some websites explicitly say you shouldn't scrape them with any automated tool. So don't do that if you have any respect for terms of service.
- This script is intended for _small_ batches. It takes a few seconds for each to load, depending on your setup. Please don't try to use this for actually nefarious ends. Just use it to save time on something you'd have done anyway.

## How To
```
$ npm -i puppeteer
$ node run get-estimates.js > estimates.csv
```

