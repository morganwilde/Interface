# June 4th

## React

### `React.createClass()`

This method create a new component. Components are atomic units for React, sort of like an alternative DOM node. Components can be displayed by themselves or aggregated. In the end, the entire interface of the app needs to be aggregated into a single component, which will be rendered inside a DOM node.

```JavaScript
var React = {
    // ...
    createClass: ReactClass.createClass,
    // ...
}

var ReactClass = {
    /*
    * @param {object} spec Class specification (which must define `render`).
    * @return {function} Component constructor function.
    * @public
    */
    createClass: function(spec) {
        // ...
    },
    // ...
}
```