import React, {useState,useEffect} from 'react'
import axios from 'axios'

export default function Stats(){
    const[tps,setTps] = useState(0)
    const[l1,setL1] = useState(true)
    useEffect(()=>{
        const recall = setInterval(() => {
            axios.get('http://localhost:4000/api/getStats/currTPS').then(
            res=>{
                let data = res.data
                setTps(data.TPS)
                setL1(false)
            }
        )
        }, 15000);
        return () => clearInterval(recall);
    },[l1])

    return(
            <>
                <h2 className="statsHeading">Statistics</h2>
                <div className="container-fluid con-stats">
                    <div className="row"> 
                        <div className="col-sm-12 col-md-6 d-flex justify-content-center">
                            <div className="align-self-center">
                                <h5>Current Transactions Per Second : {l1 ? (<>Loading</>):(tps)}</h5>
                                <p style={{fontStyle:"italic"}}>*based on 2 latest block, refreshed every 15 seconds</p>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <iframe width="100%" height="420" frameBorder="0" src="https://embed.theblockcrypto.com/data/on-chain-metrics/ethereum/transactions-on-the-ethereum-network-daily/embed" title="Transactions on the Ethereum Network (Daily, 7DMA)"></iframe>
                        </div>
                    </div>
                </div>
            </>
        )
}
    