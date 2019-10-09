import {ConnectedRouter, routerMiddleware} from "connected-react-router";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {HashRouter as Router, NavLink, Route, Switch} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import styled from "styled-components";
import {sharedHistory} from "./helper/sharedHistory";
import reducers from "./reducers";

import {Footer} from "./components/footer";
import {Header} from "./components/header";
import {initWebSockets} from "./helper/webSockets";
import GamePage, {GameMap} from "./pages/game_countries";
import {HomePage, Overlay, OverlayContent} from "./pages/home";
import {LobbyCreatePage} from "./pages/lobbyCreate";
import LobbyPage from "./pages/room";

const head = document.querySelector("head");
const socketio = document.createElement("script");
socketio.src = "https://gameserver.geofind.io/socket.io/socket.io.js";
head.appendChild(socketio);
