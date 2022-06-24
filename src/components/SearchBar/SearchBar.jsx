import React, {useState} from 'react'
import axios from 'axios'
import moment from 'moment'

export default function SearchBar(){
    const[hash,setHash] = useState('')
    const[txn,setTxn] = useState({blockNumber:0,r:"",s:"",gas:0,gass:0})
    const[block,setBlock] = useState({ph:'',mh:'',diff:0,gu:0,time:0,tx:[]})
    const[isTxn,setIsTxn] = useState(false)
    const[loading,setLoading] = useState(true)
    const handleSubmit= (e) => {
        e.preventDefault()
        if(hash.charAt(1)==='x'){
            axios.get('http://localhost:4000/api/getTxnHash/Hash',{params:{
                "hash":hash
            }}).then(res=>{
                setIsTxn(true)
                setLoading(false)
                let data = res.data
                setTxn({
                    blockNumber:data.blockNumber,
                    r:data.r,
                    s:data.s,
                    gas:data.gas,
                    gass:data.gasPrice
                })
            })
        }else{
            axios.get('http://localhost:4000/api/getBlock/Hash',{params:{
                "blockNum":hash
            }}).then(res=>{
                let data = res.data
                setBlock({ph:data.parentHash,mh:data.miner,diff:data.difficulty,gu:data.gasUsed,time:data.timestamp,tx:[...data.transactions]})
                setLoading(false)
            })
        }
    }
    return(
        <>
            <form>
                <div className="input-group input-group-lg">
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleSubmit} className="input-group-text" style={{backgroundColor:"#fff"}} id="inputGroup-sizing-lg"><i style={{color:"#4a4a4a"}} className="fa-solid fa-magnifying-glass"></i></button>
                    <input onChange={(e) => setHash(e.target.value)} type="text" placeholder="Search by Block Number or Transaction Hash" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                </div>
            </form>

            
            <div className="modal modal-lg fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                 <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" style={{color:"#000"}} id="exampleModalLabel">Search Result</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body"  style={{color:"#000"}}>
                            {
                                loading ? (<h1>Loading...</h1>):
                                (
                                    <>
                                        {isTxn ? (<p>Transaction Block Number : {txn.blockNumber }</p>):(<p>Parent Block Hash : {block.ph}</p>)}
                                        {isTxn ? (<p>Transaction From : {txn.s }</p>):(<p>Miner Address : {block.mh}</p>)}
                                        {isTxn ? (<p>Transaction To : {txn.r }</p>):(<p>Difficulty : {block.diff}</p>)}
                                        {isTxn ? (<p>Transaction Gas in wei : {txn.gas }</p>):(<p>Total Gas : {block.gu}</p>)}
                                        {isTxn ? (<p>Gas From Sender: {txn.gass }</p>):(<p>Time Stamp : {moment.unix(block.time).format("DD/MM/YYYY")}</p>)}
                                        {
                                            isTxn ? 
                                            (<></>) :
                                            (
                                                <>
                                                <h6>Total Transactions: {block.tx.length}</h6>
                                                <h6>Recent Transaction Hashes:</h6>
                                                {
                                                    block.tx.splice(0,4).map((t)=>(<p>{t.hash}</p>))
                                                }
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }
                            
                           
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}