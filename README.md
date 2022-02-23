# jest-hud-reporter

[![Tests](https://github.com/fnando/jest-hud-reporter/workflows/js-tests/badge.svg)](https://github.com/fnando/jest-hud-reporter)
[![NPM](https://img.shields.io/npm/v/jest-hud-reporter.svg)](https://npmjs.org/package/jest-hud-reporter)
[![NPM](https://img.shields.io/npm/dt/jest-hud-reporter.svg)](https://npmjs.org/package/jest-hud-reporter)
[![MIT License](https://img.shields.io/:License-MIT-blue.svg)](https://tldrlegal.com/license/mit-license)

A jest reporter that shows test running stats using the
[HUD](https://fnando.gumroad.com/l/hud-macos) macOS app.

https://user-images.githubusercontent.com/3009/155413212-106ae418-4948-40c1-83e4-dab0da512bc5.mp4

## Installation

This package is available as a NPM package. To install it, use the following
command:

```bash
npm install --save-dev jest-hud-reporter --save
```

If you're using Yarn (and you should):

```bash
yarn add -D jest-hud-reporter
```

## Usage

```js
// jest.config.js
module.exports = {
  reporters: ["default", ["jest-hud-reporter", {}]],
};
```

By default, the reporter will look up for the binary at the following paths:

- `/Applications/hud.app/Contents/MacOS/cli`
- `~/Applications/hud.app/Contents/MacOS/cli`

You can pass other binary paths by using the `bin` options:

```js
// jest.config.js
const os = require("os");
const path = require("path");

module.exports = {
  reporters: [
    "default",
    [
      "jest-hud-reporter",
      {
        bin: [path.join(os.homedir(), "Downloads/hud.app/Contents/MacOS/cli")],
      },
    ],
  ],
};
```

Notice that the report will not fail if the bin cannot be found, allowing you to
add this as a dependency even for teams that don't use HUD.

## Maintainer

- [Nando Vieira](https://github.com/fnando)

## Contributors

- https://github.com/fnando/jest-hud-reporter/contributors

## Contributing

For more details about how to contribute, please read
https://github.com/fnando/jest-hud-reporter/blob/main/CONTRIBUTING.md.

## License

The gem is available as open source under the terms of the
[MIT License](https://opensource.org/licenses/MIT). A copy of the license can be
found at https://github.com/fnando/jest-hud-reporter/blob/main/LICENSE.md.

## Code of Conduct

Everyone interacting in the jest-hud-reporter project's codebases, issue
trackers, chat rooms and mailing lists is expected to follow the
[code of conduct](https://github.com/fnando/jest-hud-reporter/blob/main/CODE_OF_CONDUCT.md).
