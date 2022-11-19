import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading/Loading';


export default function ReleaseDate() {
    const navigate = useNavigate()
    const [releaseDate, setReleaseDateGames] = useState([]);
    const [count, setCOunt] = useState(20);

    async function getGames() {
        let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games`, {
            params: { 'sort-by': 'release-date' },
            headers: {
                'X-RapidAPI-Key': 'fc42eedff7msh1176cf883aee197p199b36jsn12e2a3062d67',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        })
        setReleaseDateGames(data)
    }
    useEffect(() => {
        getGames()
    }, [])

    function moreGames() {
        let newCount = count;
        newCount += 20
        setCOunt(newCount);
    }
    function getDetails(id) {
        navigate(`/game-details/${id}`)
    }
    return <>
        <div className="container text-center">
            <div className="row">
                {releaseDate.length > 0 ? releaseDate.slice(0, count).map((game, index) =>
                    <div key={index} className='col-sm-6 col-md-4 col-lg-3 mb-4'>
                        <div onClick={() => { getDetails(game.id) }} title={game.platform === "PC (Windows)" ? 'Avaliable on Windows' : 'Avaliable on Browser'} className='shadow game-card'>
                            <img className='w-100' src={game.thumbnail} loading="lazy" alt={game.title} />
                            <div className="p-3 game-card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className='text-truncate text-white-50'>{game.title}</h4>
                                    <h6 className='text-white free p-2'>FREE</h6>
                                </div>
                                <p className='text-truncate text-muted'>{game.short_description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <i className="fa-solid fa-square-plus text-white-50"></i>
                                    <div>
                                        <span className='category px-2 rounded-3 me-2'>{game.genre}</span>
                                        {game.platform === 'PC (Windows)' ? <i className="fa-brands fa-windows text-secondary"></i> : <i className="fa-brands fa-chrome text-secondary"></i>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <Loading />}
            </div>
            {count > releaseDate.length ? null : <button onClick={moreGames} className='btn btn-outline-secondary'>More Games</button>}
        </div>
    </>
}
