# Contributing

We value every kind of contribution. Be it an issue or a pull request. Feel free to open issues at any time, even if you think your question might be stupid.

## Programming Patterns

To streamline the development style across multiple developers

### Debug

We use the [debug package](https://www.npmjs.com/package/debug) for debug messages. It's far better than just use `console.log`.

#### Usage

##### Logging

At the top of the file, set the `debug` var like this:

```js
const debug = require('debug')('melon-lab:PACKAGE_NAME:MODULE');
```

Replace `PACKAGE_NAME:MODULE` with your module-path. For example the `electron` module inside the `manager-interface` package imports it like this:

```js
const debug = require('debug')('melon-lab:manager-interface:electron');
```

Then simply call `debug` as you would `console.log`:

```js
debug(all, the, vars, you, want, to, log);
```

##### Reading/Filtering

You can set which log-messages you want to see in the `.env` file. The recommended setting - like in `.env.example` is:

```env
DEBUG=melon-lab:*
```

To see the debug messages of everything inside `melon-lab`

##### Cleanup

Usually you need more debug info during development than when a feature is finished. Remove some statements that aren't of any value for the future developers (including) you, but leave enough in so that unexpected errors can easily be traced down.
