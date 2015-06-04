# June 4th

## React

### `React.createClass()`

This method create a new component. Components are atomic units for React, sort of like an alternative DOM node. Components can be displayed by themselves or aggregated. In the end, the entire interface of the app needs to be aggregated into a single component, which will be rendered inside a DOM node.

#### Single `ReactClass`

Here's an example of how to create a new ReactClass.

```javascript
var WelcomeDisplay = React.createClass({
    render: function() {
        return React.createElement("div", null, "Welcome!");
    }
});
```

When this component is finally rendered, this is the result.

```html
<div data-reactid=".0">Welcome!</div>
```

#### Composition of `ReactClass` objects

```javascript
var WelcomeWagon = React.createClass({
    render: function() {
        return React.createElement("div", null, 
            React.createElement(WelcomeDisplay, null),
            React.createElement(WelcomeDisplay, null),
            React.createElement(WelcomeDisplay, null)
        );
    }
});
```

This is rendered as...

```html
<div data-reactid=".0.0">Welcome!</div>
<div data-reactid=".0.1">Welcome!</div>
<div data-reactid=".0.2">Welcome!</div>
```

```javascript
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
        var Constructor = function(props, context) {
            // ...
            this.props = props;
            this.context = context;
            this.state = null;

            // ReactClasses doesn't have constructors. Instead, they use the
            // getInitialState and componentWillMount methods for initialization.
            var initialState = this.getInitialState ? this.getInitialState() : null;

            // ...

            this.state = initialState;
        };

        Constructor.prototype = new ReactClassComponent();
        Constructor.prototype.constructor = Constructor;

        // ...

        return Constructor;
    },
    // ...
}
```