import React,{useState} from "react";
import { Fade } from "react-awesome-reveal";
import { Tag } from "../../Utils/tools";
import Card from './Card';

let tagDefault = {
    bck:'#0e1731',
    size: '100px',
    color:'#ffffff'
}

const MeetPlayers = ()=>{

    const [cardShow, setCardShow] = useState(false);

    const showTag = (text)=>{
        return(
        <Tag {...tagDefault} add={{
            display:'inline-block',
            marginBottom:'20px'
        }}>
            {text}
        </Tag>

    )}

    return(
        <Fade onVisibilityChange={(inView)=>{
            if(inView){
                setCardShow(true)}else{
                    setCardShow(false)
                }
            }}>
            <div className="home_meetplayers">
                <div className="container">
                    <div className="home_meetplayers_wrapper">
                        <div className="home_card_wrapper">
                            <Card show={cardShow}/>
                        </div>
                        <div className="home_text_wrapper">
                            <div>
                                {showTag("Meet")}
                            </div>
                            <div>{showTag("The")}</div>
                            <div>
                                 {showTag("Players")}
                            </div>
                            <div>
                                <Tag bck="#ffffff" size="27px" color= "#0e1731" link={true} 
                                        linkto='/team' add={{
                                            display:'inline-block',
                                            marginBottom:'27px',
                                            border:'1px solid #0e1731' 
                                        }}>
                                    Meet them here
                                </Tag>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fade>
    )
}
export default MeetPlayers;