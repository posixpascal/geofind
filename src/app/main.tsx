import FastClick from "fastclick";
import React from "react";
import ReactDOM from "react-dom";
import reduxThunk from "redux-thunk";
import styled from "styled-components";
import Header from "./components/header";
import CountriesGamePage from "./pages/game_countries";
import StreetViewGamePage from "./pages/game_streetview";
import HomePage, {Overlay, OverlayContent} from "./pages/home";
import RoomPage from "./pages/room";
import ThemesPage from "./pages/themes";
import reducers from "./reducers";

import {ConnectedRouter, routerMiddleware} from "connected-react-router";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Footer} from "./components/footer";
import {sharedHistory} from "./helper/sharedHistory";
import {authenticateUser, prefetchRooms} from "./helper/webSockets";

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
    );
};

document.addEventListener("DOMContentLoaded", async () => {
    ReactDOM.render(<Application/>, document.querySelector("#app"));

    // Removes mobile click delay of 300ms from buttons and other clickable links
    if ("addEventListener" in document) {
        document.addEventListener("DOMContentLoaded", function() {
            FastClick.attach(document.body);
        }, false);
    }

    await authenticateUser(store);
    await prefetchRooms(store);
});
