import SearchBar from '../../components/SearchBar/SearchBar'
import React, {useEffect, useState} from 'react'
import './style.css'
import Navbar from '../Navbar.jsx/Navbar'
import {Outlet} from 'react-router-dom'
import axios from 'axios'
import Blocks from '../../components/Blocks/Blocks'
import Transactions from '../../components/Transactions/Transactions'
import Stats from '../../components/Stats/Stats'

function Landing(){
    const [price,setPrice] = useState(0)
    const [gas,setGas] = useState(0)
    useEffect(() => {
        const recall = setInterval(() => {
            axios.get('http://localhost:4000/api/getEthPrice/ethPrice').then(
            p=>{
                setPrice(p.data.ethPrice)
            }
        )
        axios.get('http://localhost:4000/api/getEthPrice/ethGas').then(
            g=>{
                console.log(g)
                setGas(g.data.ehtGas)
            }
        )
        }, 15000);
        return () => clearInterval(recall);
    }, [])

    return(
        <>
            <div className="container-fluid con1">
                <div className="row">
                    <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                        <div className="search align-self-center ">
                            <h1>Ether Now</h1>
                            <h6>The one stop ethereum mainnet activity tracker</h6>
                            <SearchBar />
                            <div className="params">
                                <i className="icon fa-brands fa-ethereum"></i>{price} SGD
                                <i style={{marginLeft:"20px"}} className="icon fa-solid fa-gas-pump"></i>{gas} WEI
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-0 d-flex justify-content-center">
                        <img className="i1 align-self-center" src="img/i1.png" />
                    </div>
                </div>
            </div>
            <Blocks />
            <Transactions price={price} />
            <Stats />
            <Outlet />
        </>
    )
}

export default Landing