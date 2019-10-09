import FastClick from "fastclick";
import React, {useState} from "react";
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
import HomePage, {Overlay, OverlayContent} from "./pages/home";
import RoomPage from "./pages/room";
import ThemesPage from "./pages/themes";
import Header from "./components/header";
import {authenticateUser, prefetchRooms} from "./helper/webSockets";
import {Footer} from "./components/footer";
import {GameMap} from "./components/game/maps";

// import game pages
import CountriesGamePage from "./pages/game_countries";
import StreetViewGamePage from "./pages/game_streetview";

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(routerMiddleware(sharedHistory), reduxThunk)));
const RelativeBox = styled.div`
  position: relative;
`;
const Application = () => {
    const [user, setUser] = useState(store.getState().user);
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }

    store.subscribe(() => {
        if (store.getState().user) {
            setUser(store.getState().user);
        }
    });

    // @ts-ignore
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
                                {user._id && <>
                                    <Route path="/" exact component={HomePage}/>
                                    <Route path="/lobby/:id" component={RoomPage}/>
                                    <Route path="/themes/" component={ThemesPage}/></>
                                }

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

    prefetchRooms(store);
    authenticateUser(store);
});
