/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getGames } from '../../Redux/ApiSlice';
import { increamnetByAmount, resetCount, onTop } from '../../Redux/CounterSlice';
import Loading from '../Loading/Loading';


export default function AllGames() {
    let { path, cat } = useParams();
    let { allgames, loading } = useSelector((state) => state.game)
    let { counter } = useSelector((state) => state.counter)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    function getDetails(id) {
        navigate(`/game-details/${id}`)
    }
    useEffect(() => {
        dispatch(getGames({ path, cat }))
        dispatch(resetCount())
        dispatch(onTop())
    }, [path, cat])

    return <>
        <div className="container text-center">
            <div className="row">
                {loading ? allgames.slice(0, counter).map((game, index) =>
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
            {counter > allgames.length ? null : <button onClick={() => dispatch(increamnetByAmount(20))} className='btn btn-outline-secondary'>More Games</button>}
        </div>
    </>
}