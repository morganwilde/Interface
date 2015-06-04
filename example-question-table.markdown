# Question table example

## Version #1

The most basic, static example of a table filled with question names.

```javascript
var QuestionRow = React.createClass({
    render: function() {
        return (
            React.createElement('tr', null, 
                React.createElement('td', null, "Question name")
            )
        );
    }
});

var QuestionsTable = React.createClass({
    render: function() {
        var questionRows = [
            React.createElement(QuestionRow),
            React.createElement(QuestionRow),
            React.createElement(QuestionRow)
        ];
        return (
            React.createElement('table', {className: 'questions-table'}, questionRows)
        );
    }
});
```

The end result is a table filled with one string.

```html
<table class="questions-table" data-reactid=".0">
    <tbody>
        <tr data-reactid=".0.0"><td data-reactid=".0.0.0">Question name</td></tr>
        <tr data-reactid=".0.1"><td data-reactid=".0.1.0">Question name</td></tr>
        <tr data-reactid=".0.2"><td data-reactid=".0.2.0">Question name</td></tr>
    </tbody>
</table>
```

## Version #2

To add variable question names, we need to modify `QuestionRow`.

```javascript
var QuestionRow = React.createClass({
    render: function() {
        var questionName = typeof this.props.questionName === 'undefined' ? '' : this.props.questionName;
        return (
            React.createElement('tr', null, 
                React.createElement('td', null, questionName)
            )
        );
    }
});
```

Now when we create our table, we can specify different names to each cell.

```javascript
var QuestionsTable = React.createClass({
    render: function() {
        var questionRows = [
            React.createElement(QuestionRow, {questionName: 'What?'}),
            React.createElement(QuestionRow, {questionName: 'Why?'}),
            React.createElement(QuestionRow, {questionName: 'Where?'})
        ];
        return (
            React.createElement('table', {className: 'questions-table'}, questionRows)
        );
    }
});
```

## Version #3

The questions are now different, but still static. That's because they're created manually and with `questionName` as part of the `props`. To have then be dynamic, `questionName`s needs to be part of the table `state`.

A good [resource](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md) on the difference between `props` and `state`.

```javascript
var QuestionsTable = React.createClass({
    getInitialState: function() {
        return {questionNames: ['a', 'b', 'c']};
    },
    render: function() {
        var questionRows = this.state.questionNames.map(function(questionName) {
            return React.createElement(QuestionRow, {questionName: questionName});
        });
        return (
            React.createElement('table', {className: 'questions-table'}, questionRows)
        );
    }
});
```

## Version #4

Everything is still static, but now question row creation has been abstracted away. All that's left is to fetch some dynamic data and update the state when there's a need.

[How to change `state`](https://facebook.github.io/react/docs/component-api.html).