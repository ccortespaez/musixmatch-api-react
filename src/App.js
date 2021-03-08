import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SongsContextProvider from './context/SongsContext';
import LyricsContextProvider from './context/LyricsContext';
import Header from './components/Common/Header';
import Songs from './components/Songs';
import Lyrics from './components/Lyrics';
import NotFound from './components/NotFound';
import './assets/css/styles.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/'>
        <SongsContextProvider>
          <Songs/>
        </SongsContextProvider>
      </Route>
      <Route exact path='/lyrics/track/:commontrack_id'>
        <LyricsContextProvider>
          <Lyrics/>
        </LyricsContextProvider>
      </Route>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
)

export default App;
