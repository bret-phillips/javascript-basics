var Hello = React.createClass({
    render: function () {
        return (
            <h2>Hello</h2>
        );
    }
});

React.render(<Hello/>, document.getElementById("root"));