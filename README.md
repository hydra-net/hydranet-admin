# Hydranet admini

This is hydranet admin app intended to help create `DAI` and `WETH` bonds for hydranet protocol

## Setup

Install NodeJS and yarn.

## Environment Variables

Copy `env.example` in `.env` and populate missing variables.

## Start app

- use commands:
  - `yarn start` for launching app

## Folder Structure

### /

Root folder contains:

- `.env.example` which is file example of `.env` file
- `.gitignore` contains all files and folders to ignore
- `package.json` npm configuration file
- `tsconfig.json` file that configures typescript for project
- `yarn.lock` file is main source of information about the current versions of dependencies in project

### /public

- `index.html` app entry point
- `manifest.json` is a simple JSON file in our website that tells the browser about your website on user's mobile device or desktop.
- `robots.txt` tells search engine crawlers which URLs the crawler can access on our site

### /src

- `App.tsx` that's component that contains main routes of app
- `index.css` that's basic css file for app entry point `index.tsx`
- `index.tsx` it's app entry point
- `react-app-env.d.ts` typescipt definition for react-scripts
- `reportWebVitals.ts` web vitals performance function
- `routes.ts` file that contains app routes
- `setupTests.ts` file where tests can be written

### /src/assets

- folder contains all app assets

### /src/common

- folder contains common components and files that can be reused

### /src/helpers/

- folder that contains all helpers that app uses like `bondDepositoryHelper.ts`, `walletHelper.ts` etc.

### /src/modules/

- folder that contains app modules like `Bonds` and `Page404`

### /src/shell/

- folder that contains `theme` folder, `Fallback.tsx` file and `Shell.tsx` where all routes are initialised and child components are passed to `Layout` component along with `Suspense` component for fallback

### Networks supported

- Arbitrum
- Arbitrum rinkeby
- Rinkeby

### How to create bond

- good practice is to first create bond on testnet so use rinkeby and check if price is correct on `https://app.hydranet.ai` connect to `rinkeby` network.
- mint DAI here or rinkeby https://rinkeby.etherscan.io/address/0xb2180448f8945c8cc8ae9809e67d6bd27d8b2f2c#writeContract
- WETH address on Rinkeby `0xc778417E063141139Fce010982780140Aa0cD5Ab` you can get ETH on one of faucets:

  - https://rinkebyfaucet.com/
  - https://faucets.chain.link/rinkeby
  - https://rinkeby-faucet.com/
  - https://faucet.rinkeby.io/
  - https://faucet.paradigm.xyz

  and change it to WETH on Uniswap.

- go to app url + `/bonds`
- Select `bond token` either `DAI` or `WETH`
- Add bond capacity:

  - `DAI` - write numbers without decimals so `300` for `300` DAI
  - `WETH` - you can here use max to 3 decimals so `0.555`for `0.555` wETH or whole numbers like `1`

- Bond price:(check here https://dexscreener.com/arbitrum/0x1ca2a964cf3846bf53bcdbd7a1467b8ac6975d3a)

  - `DAI` - after checking price add 10% discount so let's say `$0.01647` is price, `10%` = `%0,001647`, price is `%0,014823`.
    Use all numbers from start except zeros so `14823` if price is less than `$1`, otherwise use all numbers and add zeros eg. `14823000` we have 8 zeros because price is less than `$1`.
    If `price` is higher than `$1` than you have to have combined `9` digits, if price is `0.0016544` you have to have `7` digits etc.

  - `WETH` - got to uniswap and check how price of `1` HDX stands against ETH. Let's say `1` HDX is `0.00000478437` ETH.
    Use first 4 numbers that are not `0`, so `4784` add `10%` discount to that, so `478,4` and you get bond price `4305,6` remove decimals `4305` is your price.

- Bond ending days:
  - eg. use `5` or `10` days and that's how long bond will be open

### How to close bond

- if something goes wrong
- go to https://arbiscan.io/address/0xE71d46c6B1ecD2812c11E52Cfb28a4AE3AEa6580#writeContract and use method close, you can get id of bond when clicking on bond on `app.hydranet.ai` in url last number is bond id,
  eg. `https://app.hydranet.ai/#/bonds/11`, bond id is `11`
