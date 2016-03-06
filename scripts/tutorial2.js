
var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function () {
        return {author: "", text: ""};
    },
    handleAuthorChanged: function (e) {
        this.setState({author: e.target.value});
    },
    handleTextChanged: function (e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    },
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" value={this.state.author}
                       onChange={this.handleAuthorChanged}/>
                <input type="text" placeholder="Say something" value={this.state.text}
                       onChange={this.handleTextChanged}/>
                <input type="submit" value="Post"/>
            </form>
        );
    }
});


var Comment = React.createClass({
    rawMarkup: function () {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return {__html: rawMarkup};
    },

    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
            </div>
        );
    }
});
