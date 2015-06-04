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