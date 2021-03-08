import React, { createContext, useState, useEffect } from 'react';
import { trackLyricsGet, trackGet } from './../contants';


export const LyricsContext = createContext(); 

const LyricsContextProvider = ({children}) => {
    //para obtener el id, se busca el pathname de locacion de window
    const commontrack_id = window.location.pathname.split('/');
    const [doneFetchTrack, setDoneFetchTrack] = useState(false);
    const [doneFetchLyrics, setDoneFetchLyrics] = useState(false);
    const [track, setTrack] = useState([]);
    const [lyrics, setLyrics] = useState([]);

    //El useEffect se volvera a renderizar cuando haya
    useEffect(() => getTrack(commontrack_id), [commontrack_id]);
    useEffect(() => getLyrics(commontrack_id), [commontrack_id]);

    const getTrack = commontrack_id => {
        fetch(trackGet(commontrack_id))
            .then(res => res.json())
            .then(data => {
                //destructuramos el body del json
                const { body } = data.message;
                setDoneFetchTrack(true);
                //verificamos si el body no es un array y tomamos el objeto y se lo damos a setTrack
                !Array.isArray(body) && setTrack(body.track);
            })
            .catch(err => console.error(err));
    }

    const getLyrics = commontrack_id => {
        fetch(trackLyricsGet(commontrack_id))
            .then(res => res.json())
            .then(data => {
                const { body } = data.message;
                setDoneFetchLyrics(true);
                !Array.isArray(body) && setLyrics(body.lyrics.lyrics_body);
            })
            .catch(err => console.error(err));
    }

    return(
        <LyricsContext.Provider value={{doneFetchTrack, doneFetchLyrics, track, lyrics}}>
            { children }
        </LyricsContext.Provider>
    )
}

export default LyricsContextProvider;
