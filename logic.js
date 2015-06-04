var TimerDisplay = React.createClass();

TimerDisplay.render = function() {
    return (
        React.createElement("div", null, "TimerDisplay")
    );
};

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

    React.render(React.createElement(TimerDisplay, null), document.querySelector('#content'));

    console.log("Page loading complete!");
}