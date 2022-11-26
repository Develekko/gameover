/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading';
import './Home.css'
import {onTop} from '../../Redux/CounterSlice';
import { useDispatch } from 'react-redux';

export default function Home() {
  let dispatch = useDispatch();
  const [allgames, setAllGames] = useState([]);
  let navigate = useNavigate()
  async function getGames() {
    let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games`, {
      params: { 'sort-by': 'popularity' },
      headers: {
        'X-RapidAPI-Key': 'fc42eedff7msh1176cf883aee197p199b36jsn12e2a3062d67',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    })
    setAllGames(data)
  }
  useEffect(() => {
    dispatch(onTop())
    getGames()
  }, [])
  function getDetails(id) {
    navigate(`/game-details/${id}`)
  }
  return <>
    <main>
      <div className="text-center Home">
        <h1 className='text-white-50'>Find & track the best <span>free-to-play</span> games!</h1>
        <p className='text-muted'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
        <Link to={'/all/games'}><button className='btn btn-outline-secondary'>Browse Games</button></Link>
      </div>
    </main>

    <section>
      <div className="container my-5">
        <div className="row">
          <h3 className='text-white-50 mb-4'><i className="fa-solid fa-robot"></i> Personalized Recommendations</h3>
          {allgames.length > 0 ? allgames.slice(0, 3).map((game, index) =>
            <div key={index} className='col-md-4 mb-4'>
              <div onClick={() => { getDetails(game.id) }} title={game.platform === "PC (Windows)" ? 'Avaliable on Windows' : 'Avaliable on Browser'} className='shadow game-card'>
                <img className='w-100' src={game.thumbnail} alt={game.title} />
                <div className="p-3 game-card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className='text-truncate text-white-50'>{game.title}</h4>
                    <h6 className='text-white free p-2'>FREE</h6>
                  </div>
                </div>
              </div>
            </div>
          ) : <Loading />}
        </div>
      </div>
    </section>
  </>
}