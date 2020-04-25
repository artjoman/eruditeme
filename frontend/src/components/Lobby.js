// Game.js

import React, { Component } from "react";
import { connect } from "react-redux";

class Lobby extends Component {

    state = {
        gameId: "",
        code: "",
        sessionId: "",
        name: "",
        loading: false,
        errors: []
    };

    handleCreate = e => {
        e.preventDefault();
        // Join game API: https://us-central1-erudite-me.cloudfunctions.net/joinGame?code=5U6U8K&name=nameofplayer
        // const url = `http://www.mocky.io/v2/5ea44e983000005900ce2cbd`;
        const url = `https://us-central1-erudite-me.cloudfunctions.net/startGame?name=nameofplayer`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // credentials: 'include',
            // mode: "no-cors"
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    loading: false,
                    gameId: data.gameId,
                    code: data.code,
                    sessionId: data.sesionId
                });
                const gameData = {
                    code: data.code,
                    sessionId: data.sesionId,
                    gameId: data.gameId
                }
                this.props.history.push({ pathname: '/lobby', data: gameData });
            }
            ).catch(err => {
                console.log(err);
                this.setState({
                    errors: err,
                    loading: false
                });
            });
    };

    handleJoin = e => {
        e.preventDefault();
        // Join game API: https://us-central1-erudite-me.cloudfunctions.net/joinGame?code=5U6U8K&name=nameofplayer
        const url = `http://www.mocky.io/v2/5ea44e983000005900ce2cbd`;
        // const url = `https://us-central1-erudite-me.cloudfunctions.net/joinGame?code=5U6U8K&name=nameofplayer`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // credentials: 'include',
            // mode: "no-cors"
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    loading: false,
                    gameId: data.gameId,
                    code: data.code,
                    sessionId: data.sesionId
                });
            }
            ).catch(err => {
                console.log(err);
                this.setState({
                    errors: err,
                    loading: false
                });
            });
    };


    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.setState({ loading: true });
    //     const data = {
    //         code: this.state.code,
    //         name: this.state.name,
    //     };
    //     axios
    //         .post('/joinGame', data)
    //         .then((response) => {
    //             localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
    //             this.setState({
    //                 loading: false,
    //                 gameId: response.data.gameId,
    //                 sessionId: response.data.sesionId
    //             });
    //             this.props.history.push('/');
    //         })
    //         .catch((error) => {
    //             this.setState({
    //                 errors: error.response.data,
    //                 loading: false
    //             });
    //         });
    // };

    render() {
        const { gameId, code, sessionId } = this.state;
        const { data } = this.props.location
        const { errors, loading } = this.state;
        return (
            <div>
                <div>Name: {data?.username}</div>
                <div>Game ID: {gameId}</div>
                <div>Game Code: {code}</div>
                <div>Session ID: {sessionId}</div>
                <button className="button" onClick={this.handleCreate}>Create Game</button>
                <button className="button" onClick={this.handleJoin}>Join Game</button>
            </div>
        );
    }
}

export default connect()(Lobby);