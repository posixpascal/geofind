import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Switch, Route, NavLink} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import {ConnectedRouter, routerMiddleware} from "connected-react-router";
import {composeWithDevTools} from "redux-devtools-extension";
import styled from "styled-components";
import {sharedHistory} from "./helper/sharedHistory";

import {HomePage, Overlay, OverlayContent} from "./pages/home";
import LobbyPage from "./pages/lobby";
import GamePage, {GameMap} from "./pages/game_countries";
import {Header} from "./components/header";
import {LobbyCreatePage} from "./pages/lobbyCreate";
import {initWebSockets} from "./helper/webSockets";
import {Footer} from "./components/footer";

const head = document.querySelector("head");
const socketio = document.createElement("script");
socketio.src = "https://gameserver.geofind.io/socket.io/socket.io.js";
head.appendChild(socketio);
