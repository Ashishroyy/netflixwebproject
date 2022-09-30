import React from 'react'
import { useEffect} from 'react';
import {Link}from 'react-router-dom'
import '../home/Home.scss';
import axios from 'axios';
import {BiPlay} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'

import { useState } from 'react';


const apikey = "38f10c3c2187806612fa5bcc55ecd2b3";
const url = "https://api.themoviedb.org/3"
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming"
const popular = "popular"
const top_rated = "top_rated"
const now_play = "now_playing"

const Card = ({img}) => (
  <img className='card' src={img} alt="cover" />
)
const Row = ({title , arr=[] }) => (
  <div className='row'>
    <h2>{title}</h2>
    <div>
      {
        arr.map((item ,index) => (
          <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
        ))
      }
    </div>

    
  </div>
);

const Home = () => {

  const [upcomingMovies, setupcomingMovies] = useState([]);
  const [popularmovies, setpopularmovies] = useState([])
  const [top_ratedmovies, setTop_ratedmovies] = useState([])
  const [now_playmovies, setNow_playmovies] = useState([])
  const [genre, setgenre] = useState([])


  useEffect(() => {
  
    const fetupcoming = async()=>{
    const {data: {results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`)
    setupcomingMovies(results)
      };

  const fetpopular = async()=>{
    const {data: {results}} = await axios.get(`${url}/movie/${popular}?api_key=${apikey}&page=5`)
    setpopularmovies(results)
      };

  const fettop_rated = async()=>{
    const {data: {results}} = await axios.get(`${url}/movie/${top_rated}?api_key=${apikey}`)
    setTop_ratedmovies(results)
      };

  const fetnow_play= async()=>{
    const {data: {results}} = await axios.get(`${url}/movie/${now_play}?api_key=${apikey}`)
    setNow_playmovies(results)
      };

      
      const getAllgenre = async()=>{
        const {data: {genres}} = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`)
        setgenre(genres)
          };

          getAllgenre()

  fetupcoming()
  fetpopular()
  fettop_rated()
  fetnow_play()
  }, [])
  

  return (
      <section className="home">
        <div className="banner" style={{
          backgroundImage: popularmovies[0]?`url(${`${imgUrl}/${popularmovies[1].poster_path}`})`:"rgb(15, 12, 12)"
        }} >

          {popularmovies[0] && <h1> {popularmovies[0].original_title}</h1>}
          {popularmovies[0] && <p> {popularmovies[0].overview}</p>}
          <div>
          <button><BiPlay/> Play</button>
          <button> <AiOutlinePlus/> My list</button>
          </div>
        </div>
        <Row title={'upcoming'} arr={upcomingMovies}/>
        <Row title={'Popular Movies'} arr={popularmovies}/>
        <Row title={'Top rateded'} arr={top_ratedmovies}/>
        <Row title={'Now Playing '} arr={now_playmovies}/>
        
        <div className="genreBox">
          {genre.map((item ,index) =>(
            <Link  key={index} to = {`/genre/${item.id}`}>{item.name}</Link>
          ))}
        </div>
      </section>
  )
}

export default Home;