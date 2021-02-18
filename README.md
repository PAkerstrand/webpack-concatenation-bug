# Introduction

This repo demonstrates a module concatenation bug we have run into when building our React app that
also have SSR. The server reads the stats output from the client build generated through
`@loadable/webpack-plugin`. Additionally, the app allows configuration through YAML, which is
converted into a module and exported as an object _(we can't export it as JSON, because it allows
custom tags and have custom loaders for working with some of the configuration options)_.

In the main entrypoint, we look at one of the properties from the configuration to decide which path
to serve assets from.

We've narrowed down the bug to this part in `lib/optimize/ConcatenatedModule.js`:

```js
for (const identifier of allIdentifiers) {
  const r = identifier.range;
  const path = getPathInAst(info.ast, identifier);
  if (
    path &&
    path.length > 1 &&
    path[1].type === "Property" &&
    path[1].shorthand
  ) {
    source.insert(r[1], `: ${newName}`);
  } else {
    source.replace(r[0], r[1] - 1, newName);
  }
}
```

For the code in our example, the path taken is the `else`-branch, which replaces the name with a new
one, rather than aliasing the variable name like

```js
const { src_testProp: testProp = 'defaultValue' } = config;
```

# Building

Bundle `dist/main.js` created by:

```sh
npm i

npx webpack --mode production
```
