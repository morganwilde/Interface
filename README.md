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

#### How it's implemented in `React`

```javascript
var React = {
    // ...
    createClass: ReactClass.createClass,
    // ...
};

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
        mixSpecIntoComponent(Constructor, spec);
        // ...
        return Constructor;
    },
    // ...
};

function mixSpecIntoComponent(Constructor, spec) {
    // ...
    var proto = Constructor.prototype;
    // ...
    for (var name in spec) {
        // ...
        proto[name] = property;
        // ...
    }
};
```

Basically what `React.createClass(spec)` does is it takes various callback methods from the spec and assigns them to a new `Constructor`, which inherits from `ReactClassComponent`. It then discards the remaining `spec` object. Once the initialisation is complete, it returns the `Constructor`, which is a 2 argument function.

Finally, at the `render` stage, `Constructor(props, context)` is called in `function renderToStaticMarkup(element)`. [The longer form of how it's created on SO](http://stackoverflow.com/questions/30652616/when-is-react-createclass-called).

### React Component life-cycle

#### Creation

1. constructor: Initialization of state. The instance is now retained.
    1. `componentWillMount`
    2. `render`
    3. [children's constructors]
        1. [children's componentWillMount and render]
        2. [children's componentDidMount]
        3. `componentDidMount`
        4. `componentWillUnmount`
        5. [children's componentWillUnmount]
    4. [children destroyed]
2. (destroyed): The instance is now blank, released by React and ready for GC.

#### Update

1. `componentWillReceiveProps` (only called if parent updated)
2. `shouldComponentUpdate`
    1. `componentWillUpdate`
        1. `render`
        2. [children's constructors or receive props phases]
    2. `componentDidUpdate`

### `ReactClass` interface

```javascript
var ReactClassInterface = {
    mixins:                     SpecPolicy.DEFINE_MANY,
    statics:                    SpecPolicy.DEFINE_MANY,
    propTypes:                  SpecPolicy.DEFINE_MANY,
    contextTypes:               SpecPolicy.DEFINE_MANY,
    childContextTypes:          SpecPolicy.DEFINE_MANY,
    getDefaultProps:            SpecPolicy.DEFINE_MANY_MERGED,
    getInitialState:            SpecPolicy.DEFINE_MANY_MERGED,
    getChildContext:            SpecPolicy.DEFINE_MANY_MERGED,
    render:                     SpecPolicy.DEFINE_ONCE,
    componentWillMount:         SpecPolicy.DEFINE_MANY,
    componentDidMount:          SpecPolicy.DEFINE_MANY,
    componentWillReceiveProps:  SpecPolicy.DEFINE_MANY,
    shouldComponentUpdate:      SpecPolicy.DEFINE_ONCE,
    componentWillUpdate:        SpecPolicy.DEFINE_MANY,
    componentDidUpdate:         SpecPolicy.DEFINE_MANY,
    componentWillUnmount:       SpecPolicy.DEFINE_MANY,
    updateComponent:            SpecPolicy.OVERRIDE_BASE
};
```

### `React.createElement()`

To render in React, we need to use `ReactElement.createElement(type, config, children)`, which is a bit like `document.createElement(tag)`. Since javascript doesn't limit the number of arguments passed into a function call, there might be more than one child. The exact number is determined using the `arguments` variable of the function.