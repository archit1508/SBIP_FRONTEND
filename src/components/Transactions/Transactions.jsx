import React,{useEffect,useState} from 'react'
import axios from 'axios'

export default function Transaction(props){

    const[txn,setTxn] = useState([])

    useEffect(()=>{
        const recall = setInterval(() => {
            axios.get('http://localhost:4000/api/getRctTxn/').then(
            
            res=>{
                let data = res.data
                setTxn(data)
            }
        )
        }, 15000);
        return () => clearInterval(recall);
    },[])

    return(
        <>
            <div className="container-fluid" style={{marginTop:"30px",marginBottom:"50px"}}>
                <div className="row ">
                    <div className="col-sm-12 d-flex justify-content-center">
                        <div className="align-self-center" style={{width:"90%"}}>
                            <h3 style={{borderBottom:"3px solid #a2a2a2", width:"fit-content"}}>Recent Transactions</h3>
                            <h6 style={{fontStyle:"italic"}}>*Showing 12 most recent transactions</h6>
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {
                                    txn.splice(0,12).map((t)=>(
                                        <div className="col">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{t.value / 1000000000000000000} ETH</h5>
                                                    <p>{(t.value/1000000000000000000) * props.price} SGD</p>
                                                    <p className="card-text">
                                                        <p>Hash: <span className="spanTx">{t.hash}</span></p>
                                                        <p>Block Num: <span className="spanTx">{t.blockNumber}</span></p>
                                                        <p>Sender: <span className="spanTx">{t.s}</span></p>
                                                        <p>Receiver: <span className="spanTx">{t.r}</span></p>
                                                        <p>Gas: <span className="spanTx">{t.gas} wei</span></p>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                
                            </div>
                        </div>                   
                    </div>
                </div>
            </div>
        </>
    )
}