import {ConnectedRouter, routerMiddleware} from "connected-react-router";
import React from "react";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import styled, {keyframes} from "styled-components";
import {Footer} from "./components/footer";
import Header from "./components/header";
import {sharedHistory} from "./helper/sharedHistory";
import {authenticateUser} from "./helper/webSockets";
import CountriesGamePage from "./pages/game_countries";
import StreetViewGamePage from "./pages/game_streetview";
import HomePage from "./pages/home";
import RoomPage from "./pages/room";
import ThemesPage from "./pages/themes";
import SingleplayerPage from "./pages/game_singleplayer";
import FriendsPage from "./pages/friends";
import RoomsPage from "./pages/rooms";
import ProfilePage from "./pages/profile"
import reducers from "./reducers";
import * as FastClick from "fastclick";
import geofindBackground from "./assets/background.png";

const middleWares = composeWithDevTools(applyMiddleware(routerMiddleware(sharedHistory), reduxThunk));
export const store = createStore(reducers, middleWares);
const zoom = keyframes`
  0% {
    transform: scale(4) translateX(0) translateY(0);
  }
  
  50% {
    transform: scale(4) translateX(-200px) translateY(90px);
  }
`;
export const Background = styled.div`
  display: flex;
  width:100%;
  overflow: hidden;
  justify-content: center;
  .animated-image {
    position: absolute;
    width: 100%;
    transform: rotate(5deg) scale(4);
    animation: 40s ${zoom} infinite linear;
  }
  
  transition: background 0.3s linear, color 0.3s linear;
  
    @media (prefers-color-scheme: dark) {
      background:  #222; color: white;
    }
`;

export const BackgroundContent = styled.div`
  display: flex;
  z-index:2;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
`;

export const Application = () => {
    authenticateUser(store);
    return (
        <Provider store={store}>
            <ConnectedRouter history={sharedHistory}>
                <Header/>
                <Switch>
                    <Route path="/game/game_countries/:id" component={CountriesGamePage}/>
                    <Route path="/game/game_streetview/:id" component={StreetViewGamePage}/>

                    <Route>
                        <Background>
                            <BackgroundContent>
                                <Route path="/" exact={true} component={HomePage}/>
                                <Route path="/lobby/:id" component={RoomPage}/>
                                <Route path="/multiplayer" component={RoomsPage}/>
                                <Route path="/profile" component={ProfilePage}/>
                                <Route path="/singleplayer" component={SingleplayerPage}/>
                                <Route path="/friends" component={FriendsPage}/>
                                <Route path="/themes/" component={ThemesPage}/>
                                <Footer/>
                            </BackgroundContent>
                        </Background>
                    </Route>
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
};

document.body.addEventListener("DOMContentReady", () => {
    FastClick.attach(document.body);
});
