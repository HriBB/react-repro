# Install

Install and run
```bash
yarn
yarn dev
```

# Problem #1: useContext()

If we useContext() inside custom renderer component, the default value is returned, that is the value passed to React.createContext function.

Expected result is the value from the Provider.

# Problem #2: react-devtools
Custom renderer components show up on the root level in react-devtools.

Expected result is to see custom renderer show under the right node in the component tree.
