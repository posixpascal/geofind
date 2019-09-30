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
import GamePage, {GameMap} from "./pages/game";
import {Header} from "./components/header";
import {LobbyCreatePage} from "./pages/lobbyCreate";
import {initWebSockets} from "./helper/webSockets";
import {Footer} from "./components/footer";

const store = createStore(reducers, composeWithDevTools(applyMiddleware(routerMiddleware(sharedHistory), reduxThunk)));
const RelativeBox = styled.div`
  position: relative;
`;
const Application = () => {
    initWebSockets(store);

    // @ts-ignore
    return (
        <Provider store={store}>
            <ConnectedRouter history={sharedHistory}>
                <Header/>

                    <Switch>
                        <Route path="/game_:id" component={GamePage}/>
                        <Route>
                        <RelativeBox>

                        <Overlay/>
                        <GameMap isMarkerShown={false}
                                 markerMoved={() => {
                                 }}
                                 showAllMarker={true}
                                 player={{color: "#ff7a00"}}
                                 game={false}
                                 lastMarkerPosition={{lat: 32.5389916, lng: 28.7972057}}
                                 onMarkerClick={() => {
                                 }}/>
                        <OverlayContent>
                            <Route path="/" exact component={HomePage}/>
                            <Route path="/lobbies/new" exact component={LobbyCreatePage}/>
                            <Route path="/lobby_:id" component={LobbyPage}/>
                            <Footer/>
                        </OverlayContent>
                        </RelativeBox>
                        </Route>
                    </Switch>
            </ConnectedRouter>
        </Provider>
    )
};

document.addEventListener("DOMContentLoaded", async () => {
    const init = () => {
        if (typeof (window as any).io === "undefined"){ return setTimeout(init, 100);  }
        ReactDOM.render(<Application/>, document.querySelector("#app"));
    };
    init();
});
