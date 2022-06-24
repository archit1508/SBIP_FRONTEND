import React from 'react'
import moment from 'moment'
import './style.css'

export default function BlockModal(props){
    console.log('$$$$',props.tx)
    return(
        <div className="modal modal-lg fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" style={{color:"#000"}} id="exampleModalLabel">Block Details</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body"  style={{color:"#000"}}>
                    {props &&
                            <>
                                {<p>Parent Block Hash : {props.ph}</p>}
                                {<p>Miner Address : {props.mh}</p>}
                                {<p>Total Gas : {props.gu}</p>}
                                {<p>Time Stamp : {moment.unix(props.time).format("DD/MM/YYYY")}</p>}
                                {
                                    <>
                                        <h6>Total Transactions: {props.length}</h6>
                                        <h6>All Transaction Hashes:</h6>
                                        {   
                                            <div className="blockTxns">
                                            {    props.tx.map(
                                                    (t)=>(
                                                        <p>
                                                            {t}
                                                        </p>
                                                    )
                                                )
                                            }
                                            </div>  
                                        }
                                    </>
                                }
                            </>
                    }
                            
                </div>
            </div>
            </div>
        </div>
    )
}