import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ".././styles/CoursePlayer.css";
import { apis } from '.././apiServices/apis'

interface CoursePlayerProps {
    cid: string;
    mid: string;
    goBackUrl: string;
    setShowDateValidationModal: React.Dispatch<React.SetStateAction<boolean>>;
    setProgressPercentage: React.Dispatch<React.SetStateAction<number>>;
    setIsPlayCourse: React.Dispatch<React.SetStateAction<boolean>>;
}

function CoursePlayer(props: CoursePlayerProps ) {
    const navigate = useNavigate();
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { cid, mid, goBackUrl } = props;
    const[learnerToken , setlearnerToken]=useState()
    const courseplayerapi = async () =>{
    const response = await apis.getRefreshToken()
    setlearnerToken(response.access_token)
    }

    useEffect(() => {
        // if (typeof window !== 'undefined') {
        //     document.body.style.overflowY = 'hidden';
        // }
        courseplayerapi()
        const url = `https://learningmanager.adobe.com/app/player?lo_id=${props.cid}&access_token=${learnerToken}`;
 
        if (url && iframeRef?.current) {
            iframeRef.current.src = url;
            iframeRef.current.setAttribute('allowTransparency', 'true');
            iframeRef.current.setAttribute('allowFullScreen', 'true');
        }
        const closePlayer = (event: MessageEvent) => {
            if (event.data === "status:close") {
                // window.document.body.style.overflowY = 'auto';
                window.removeEventListener("message", closePlayer);
                navigate(goBackUrl as string);
                props.setShowDateValidationModal(true)
                props.setProgressPercentage(100)
                props.setIsPlayCourse(false)
            }
        };
        window.addEventListener("message", closePlayer);
        return () => {
            window.document.body.style.overflowY = 'auto';
            window.removeEventListener("message", closePlayer);
        };
    }, [navigate, learnerToken, cid, mid, goBackUrl]);
 
    return (
        <div 
        className={'course-player-container'}
        >
            <div 
            className={'course-player-wrapper'}
            >
                <iframe
                    ref={iframeRef}
                    id="pplayer_iframe"
                    name="pfplayer_frame"
                    title="Player"
                    className={'course-player-iframe'}
                />
            </div>
        </div>
    );
}
 
export default CoursePlayer;