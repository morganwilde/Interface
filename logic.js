var WelcomeDisplay = React.createClass({
    render: function() {
        return React.createElement("div", null, "Welcome!");
    },
    bobby: function() {
        return "bobby";
    }
});

var WelcomeWagon = React.createClass({
    render: function() {
        return React.createElement("div", null, 
            React.createElement(WelcomeDisplay, null),
            React.createElement(WelcomeDisplay, null),
            React.createElement(WelcomeDisplay, null)
        );
    }
});

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

var QuestionsTable = React.createClass({
    getInitialState: function() {
        return {questionNames: []};
    },
    componentDidMount: function() {
      this.firebaseRef = new Firebase('https://flickering-torch-5178.firebaseio.com/comments');
      this.firebaseRef.on('value', function(childSnapshot, previousChildName) {
        var questionNames = this.state.questionNames;
        questionNames.push(childSnapshot.val())
        this.setState({questionNames: questionNames});
      }.bind(this));
    },
    componentWillUnmount: function() {
      this.firebaseRef.off();
    },
    render: function() {
        var questionRows = [];
        this.state.questionNames.forEach(function(questionName) {
            console.log(questionName);
            questionRows.push(React.createElement(QuestionRow, {questionName: questionName.val()}));
        });
        return (
            React.createElement('table', {className: 'questions-table'}, questionRows)
        );
    }
});

window.onload = function()
{
    var Timer = React.createClass({
        getInitialState: function() {
            return {secondsElapsed: 0};
        },
        tick: function() {
            this.setState({secondsElapsed: this.state.secondsElapsed + 1});
        },
        componentDidMount: function() {
            this.interval = setInterval(this.tick, 1000);
        },
        componentWillMount: function() {
            clearInterval(this.interval);
        },
        render: function() {
            return (
                React.createElement("div", null, "Seconds elapsed: " + this.state.secondsElapsed)
            );
        }
    });

    // React.render(React.createElement(Timer, null), document.querySelector('#content'));

    React.render(React.createElement(QuestionsTable, null), document.querySelector('#content'));

    console.log(new WelcomeDisplay);
    console.log("Page loading complete!");
}