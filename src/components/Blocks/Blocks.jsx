import React,{useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import BlockModal from './BlockModal'

export default function Blocks(){
    
    const[blocks,setBlocks] = useState([])
    const[l1,setL1] = useState(true)
    
    useEffect(()=>{
        const recall = setInterval(() => {
            axios.get('http://localhost:4000/api/getRctBlk/').then(
            
            res=>{
                let data = res.data
                setBlocks(data)
                setL1(false)
            }
        )
        }, 15000);
        return () => clearInterval(recall);
    },[l1])

    return(
        <>
            <div className="container-fluid" style={{marginTop:"30px"}}>
                <div className="row ">
                    <div className="col-sm-12 col-md-7 d-flex justify-content-center">
                        <div className="align-self-center" style={{width:"90%"}}>
                            <h3 style={{borderBottom:"3px solid #a2a2a2", width:"fit-content"}}>Recent Blocks</h3>
                            <ol className="list-group blockList">
                            {l1 ? (<>Loading</>) : 
                            
                            ( blocks &&  blocks.map((block)=>(
                                    
                                        <li data-bs-toggle="modal" data-bs-target="#exampleModal2" className="list-group-item d-flex justify-content-between align-items-start list-group-item-secondary">
                                            <div className="ms-2 me-auto">
                                                <div><span style={{fontWeight:"bold"}}>Block Number: </span>{block && block.number}</div>
                                                <span style={{fontWeight:"bold"}}>Date of Mining: </span>{block && moment.unix(block.timestamp).format("DD/MM/YYYY")}
                                            </div>
                                            <span className="badge bg-secondary rounded-pill">Transactions : {block && block.transactions.length}</span>
                                            <BlockModal 
                                                length={block.transactions.length} 
                                                ph={block.parentHash} 
                                                tx={block.transactions} 
                                                time={block.timestamp}
                                                mh={block.miner}
                                                gu={block.gasUsed}
                                             />
                                        </li>
                                        
                                    
                                ))
                            )
                              
                            }
                            </ol>
                        </div>                   
                    </div>
                    <div className="col-sm-12 col-md-5 d-flex justify-content-center">
                        <div className="align-self-center">
                            <h3 style={{borderBottom:"3px solid #a2a2a2", width:"fit-content"}}>What are blocks ?</h3>
                            <p className="blocksP">
                                Blocks are batches of transactions with a hash of the previous block in the chain. 
                                This links blocks together (in a chain) because hashes are cryptographically derived 
                                from the block data. This prevents fraud, because one change in any block in history 
                                would invalidate all the following blocks as all subsequent 
                                hashes would change and everyone running the blockchain would notice.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}