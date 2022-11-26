/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative, Keyboard } from "swiper"
import 'swiper/css';
import 'swiper/css/bundle'
import './GameDetails.css'
import Notfound from '../Notfound/Notfound';
import {onTop} from '../../Redux/CounterSlice';
import { useDispatch } from 'react-redux';


export default function GameDetails() {
  let dispatch = useDispatch()
  const [gameDetails, setGameDetails] = useState([]);
  const [idError, setIdError] = useState('');
  let { id } = useParams();
  async function getGames() {
    let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game`, {
      params: { id: id },
      headers: {
        'X-RapidAPI-Key': 'fc42eedff7msh1176cf883aee197p199b36jsn12e2a3062d67',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    }).catch(error=>
        {
          setIdError(error.response.status)
        })
    setGameDetails(data)
  }
  useEffect(() => {
    dispatch(onTop())
    getGames()
  }, [])
  return <>
    {idError === 404 ? <Notfound />:gameDetails.length !== 0 ?<div className="container">
      <div className="row">
        <div className="col-md-5 col-lg-4">
          <div className="game-detail-cover">
            <img src={gameDetails.thumbnail} className="w-100" alt={gameDetails.title} />
            <div className='d-flex justify-content-between p-2'>
              <span className='free text-white-50 py-2 px-3 rounded-2'>FREE</span>
              <a className='w-75 ' target={'_blank'} href={gameDetails.game_url} rel="noreferrer"><button className='btn text-white fw-bolder w-100'>PLAY NOW <i className="fa-solid fa-right-to-bracket"></i></button></a>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-lg-8 text-white-50">
          <h1 className=' mb-3'>{gameDetails.title}</h1>
          <h5>About {gameDetails.title}</h5>
          <p>{gameDetails.description}</p>
          {gameDetails.minimum_system_requirements ?
            <><h5>Minimum System Requirements</h5><ul className='p-0 text-white-50'>
              <li><span className='fw-bold'>Graphics : </span>{gameDetails.minimum_system_requirements.graphics}</li>
              <li><span className='fw-bold'>Memory : </span>{gameDetails.minimum_system_requirements.memory}</li>
              <li><span className='fw-bold'>Os : </span>{gameDetails.minimum_system_requirements.os}</li>
              <li><span className='fw-bold'>Processor : </span>{gameDetails.minimum_system_requirements.processor}</li>
              <li><span className='fw-bold'>Storage : </span>{gameDetails.minimum_system_requirements.storage}</li>
            </ul></>
            : null}
          {gameDetails.screenshots.length>0 ?
            <><h3>{gameDetails.title} Screenshots</h3><Swiper
              effect={"creative"}
              spaceBetween={10}
              slidesPerView={"auto"}
              centeredSlides={true}
              grabCursor={true}
              loop={true}
              loopFillGroupWithBlank={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              keyboard={{
                enabled: true,
              }}
              creativeEffect={{
                prev: {
                  shadow: true,
                  translate: [0, 0, -400],
                },
                next: {
                  translate: ["100%", 0, 0],
                },
              }}
              modules={[Autoplay, EffectCreative, Keyboard]}
              className="mySwiper"
            >
              {gameDetails.screenshots.map((img, index) => <SwiperSlide key={index}><img className='img-fluid' src={img.image} alt="" /></SwiperSlide>)}
            </Swiper></> : null}
          <h3 className='mt-5 mb-3'>Additional Information</h3>
          <div className="container-fluid game-add-info">
            <div className="row">
              <div className="col-6 col-md-6 col-lg-4 ps-0">
                <span className='text-secondary'>Title</span>
                <p>{gameDetails.title}</p>
              </div>
              <div className="col-6 col-md-6 col-lg-4 ps-0">
              <span className='text-secondary'>Developer</span>
                <p>{gameDetails.developer}</p>
              </div>
              <div className="col-6 col-md-6 col-lg-4 ps-0">
              <span className='text-secondary'>Publisher</span>
                <p>{gameDetails.publisher}</p>
              </div>
              <div className="col-6 col-md-6 col-lg-4 ps-0">
              <span className='text-secondary'>Release Date</span>
                <p>{gameDetails.release_date}</p>
              </div>
              <div className="col-6 col-md-6 col-lg-4 ps-0">
              <span className='text-secondary'>Genre</span>
                <p>{gameDetails.genre}</p>
              </div>
              <div className="col-6 col-md-6 col-lg-4 ps-0">
              <span className='text-secondary'>Platform</span>
                <p>{gameDetails.platform === 'Windows' ? <><i className="fa-brands fa-windows text-secondary"></i><span> Windows</span></> : <><i className="fa-brands fa-chrome text-secondary"></i><span> Web Browser</span></>}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div> :<Loading />}
  </>
}
