# SheetMetal

SheetMetal is useful if you want to use google sheets as a drop-in replacement for a database, without having to deploy your own server to communicate with it. SheetMetal connects to any Google Sheet via OAuth and provides an easy-to-use Restful API.

- Landing page - https://sheetmetal.io
- Documentation - https://sheetmetal.io/docs

## Motivation

In the past I have used [Sheetsu](https://sheetsu.com/) and I am a big fan.
However they significantly increased their prices and have started adding a lot of functionality which I just don't need.
I respect that they are trying to build an enterprise around their product, but for the small amount of functionality I need I can't justify paying \$33 / month.
So I developed SheetMetal to provide the same functionality and I pledge to keep the following promises:

1. It will always be opensource so you can self-host.
2. After I have built a robust number of features and the product is stable, I will stop. No additional bloat, just the core functionality that is useful.
3. I will not raise the price above \$5 / month to make it widely accessible (unless I find that the hosting/API is costing more).
4. I will not provide personalised customer support, even if you are paying \$5 - I can't justify the time at that price. However if there are any bugs or serious problems then I will definitely fix them.

## Running locally

1. Fork this repo
1. Clone it to your computer
1. Run `mv .env.example .env`
1. Open `.env` and fill it with your relevant details
1. Run `npm install`
1. Run `npm run dev`
