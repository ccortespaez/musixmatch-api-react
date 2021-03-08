import React, { createContext, useState, useEffect } from 'react'
import { chartTracksGet, trackSearch } from './../constats';

export const SongsContext = createContext();

//Cuando se trabaja con contexto se necesita destructurar {}
const SongsContextProvider = ({children}) => {
    //State para las cargas, si los datos se cargaron o no
    const [doneFetch, setDoneFetch] = useState();

    //State para la busqueda del track actual
    const [currentQTrack, setCurrentQTrack] = useState('');
    
    const [text, setText] = useState('Top Songs in Us');
    //Arreglo de los tracks
    const [tracks, setTracks] = useState([]);

    //Hook para realizar el render de los datos de la api
    useEffect(() => getTopTracks(), [] )

    const getTopTracks = () => {
        //mediante fetch la funcion que obtiene la url
        fetch(chartTracksGet())
            .then(res => res.json())
            .then(data =>{
                //si la data es correcta la bandera de carga pasa a verdaero
                setDoneFetch(true);
                //le pasamos la estructura de la respuesta del json
                setTracks(data.message.body.track_list)
            })
            .catch(err => console.error(err));
    }

    //funcion para obtener los tracks mediante una query
    const getTracks = q_track => {
        fetch(trackSearch(q_track))
            .then(res => res.json())
            .then(data => {
                //Destructuramos el track list
                const { track_list } = data.message.body;
                setDoneFetch(true);
                setText(track_list.length? 'Results' : 'No Results');
                //el setTracks guarda la lista de canciones
                setTracks(track_list);
            }) 
    }

    //funcion para validar la busqueda, el qtrack sera igual al valor del track escrito en el buscador
    const validateQTrack = (e ,q_track = document.querySelector('#qtrack').value.trim()) => {
        if(e.type == 'keypress' && e.key !== 'Enter') return ;
        //definir las palabras y comparar con el patron regular
        const words = q_track.match(/\w+/g);
        q_track = words && words.join('');
        //Si existe una track y si existe una track diferente al track actual
        //Se actualizara el track con la nueva query
        if(q_track && q_track !== currentQTrack){
            setCurrentQTrack(q_track);
            setDoneFetch(false);
            getTracks(q_track);
        }
    }

    return(
        //Definir proveedor de contexto
        //En value se define las propiedas que seran exportadas a otros componentes como hijos
        <SongsContext.Provider value={{doneFetch, text, tracks, validateQTrack}}>
            { children }
        </SongsContext.Provider>

    );
}

export default SongsContextProvider;