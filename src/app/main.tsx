import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import FastClick from "fastclick";
import HomePage, {Overlay, OverlayContent} from "./pages/home";
import RoomPage from "./pages/room";
import ThemesPage from "./pages/themes";
import CountriesGamePage from "./pages/game_countries";
import StreetViewGamePage from "./pages/game_streetview";
import Header from "./components/header";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";

import {Switch, Route} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {ConnectedRouter, routerMiddleware} from "connected-react-router";
import {composeWithDevTools} from "redux-devtools-extension";
import {sharedHistory} from "./helper/sharedHistory";
import {authenticateUser, prefetchRooms} from "./helper/webSockets";
import {Footer} from "./components/footer";


export const store = createStore(reducers, composeWithDevTools(applyMiddleware(routerMiddleware(sharedHistory), reduxThunk)));

const RelativeBox = styled.div`
  position: relative;
`;

const Application = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={sharedHistory}>
                <Header/>
                <Switch>
                    <Route path="/game/game_countries/:id" component={CountriesGamePage}/>
                    <Route path="/game/game_streetview/:id" component={StreetViewGamePage}/>

                    <Route>
                        <RelativeBox>

                            <Overlay/>
                            <img style={{width: "100%", objectFit: "cover"}} src={require("../assets/background.png")}/>
                            <OverlayContent>
                                <Route path="/" exact component={HomePage}/>
                                <Route path="/lobby/:id" component={RoomPage}/>
                                <Route path="/themes/" component={ThemesPage}/>
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
    ReactDOM.render(<Application/>, document.querySelector("#app"));

    // Removes mobile click delay of 300ms from buttons and other clickable links
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }

    await authenticateUser(store);
    await prefetchRooms(store);
});
