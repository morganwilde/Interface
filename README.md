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

```javascript
/**
 * ------------------ The Life-Cycle of a Composite Component ------------------
 *
 * - constructor: Initialization of state. The instance is now retained.
 *   - componentWillMount
 *   - render
 *   - [children's constructors]
 *     - [children's componentWillMount and render]
 *     - [children's componentDidMount]
 *     - componentDidMount
 *
 *       Update Phases:
 *       - componentWillReceiveProps (only called if parent updated)
 *       - shouldComponentUpdate
 *         - componentWillUpdate
 *           - render
 *           - [children's constructors or receive props phases]
 *         - componentDidUpdate
 *
 *     - componentWillUnmount
 *     - [children's componentWillUnmount]
 *   - [children destroyed]
 * - (destroyed): The instance is now blank, released by React and ready for GC.
 *
 * -----------------------------------------------------------------------------
 */
 ```

 ### `ReactClass` interface

 ```javascript
 var ReactClassInterface = {
    mixins: SpecPolicy.DEFINE_MANY,
    statics: SpecPolicy.DEFINE_MANY,
    propTypes: SpecPolicy.DEFINE_MANY,
    contextTypes: SpecPolicy.DEFINE_MANY,
    childContextTypes: SpecPolicy.DEFINE_MANY,
    getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,
    getInitialState: SpecPolicy.DEFINE_MANY_MERGED,
    getChildContext: SpecPolicy.DEFINE_MANY_MERGED,
    render: SpecPolicy.DEFINE_ONCE,
    componentWillMount: SpecPolicy.DEFINE_MANY,
    componentDidMount: SpecPolicy.DEFINE_MANY,
    componentWillReceiveProps: SpecPolicy.DEFINE_MANY,
    shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,
    componentWillUpdate: SpecPolicy.DEFINE_MANY,
    componentDidUpdate: SpecPolicy.DEFINE_MANY,
    componentWillUnmount: SpecPolicy.DEFINE_MANY,
    updateComponent: SpecPolicy.OVERRIDE_BASE
 };
 ```