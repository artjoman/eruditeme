// Game.js

class Game extends Component {

    state = {
        gameId: "",
        code: "",
        name: "",
        loading: false,
        errors: []
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const data = {
            code: this.state.code,
            name: this.state.name,
        };
        axios
            .post('/joinGame', data)
            .then((response) => {
                localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
                this.setState({
                    loading: false,
                    gameId: response.data.gameId,
                    sessionId: response.data.sesionId
                });
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data,
                    loading: false
                });
            });
    };

    render() {
        const { gameId, code } = this.props;
        const { errors, loading } = this.state;
        return (
            <div>
                <div>Game ID: {gameId}</div>
                <div>Game Code: {code}</div>
                <button onClick={this.handleSubmit()}></button>
            </div>
        );
    }
}