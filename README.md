# rollup-plugin-extension-order

a rollup plugin for extension order

## Intro

Suppose we have the following `import` defined in a hypothetical file:

```javascript
import { storeData } from "./storage";
```

with function：storage management in it

```javascript
// storage/index.ts
export function storeData(storeKey: string, data: any) {
  try {
    wx.setStorageSync(storeKey, data);
  } catch (e) {
    console.error(e);
  }
}
```

It may run well in wechat, but not in alipay

We can try solve it by giving another file:

```javascript
// storage/index.aliapp.ts
export function storeData(storeKey: string, data: any) {
  try {
    my.setStorageSync({
      key: storeKey,
      data,
    });
  } catch (e) {
    console.error(e);
  }
}
```

This plugin will help resolve import issues and generate files in dist/

if build with plateform `""` or `"weapp"`:

output will use plain import guide

if build with plateform `"aliapp"`:

output will try files which extension name contains `".aliapp.ts"` or `".aliapp.js"`, then try `".ts"` or `".js"`

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v14.17.6+) and Rollup v2.38.5+.

## Install

Using npm:

```console
npm install rollup-plugin-extension-order --save-dev
# or
yarn add -D rollup-plugin-extension-order
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import extensionOrder from "rollup-plugin-extension-order";

module.exports = {
  input: "src/index.js",
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: [extensionOrder([".aliapp.ts", ".aliapp.js", ".ts", ".js"])],
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api). If the build produces any errors, the plugin will write a 'extension-order' character to stderr, which should be audible on most systems.

## Options

### `root`

Type: `string`<br>
Default: `'src'`

The file scope you wish to use this plugin.

### `extensions`

Type: `string[]`<br>
Default: `[]`

Specifies an `Array` of file extensions you would like to try in order.
## Meta

[LICENSE (MIT)](/LICENSE)
