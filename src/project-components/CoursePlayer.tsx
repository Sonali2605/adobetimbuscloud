import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import ".././styles/CoursePlayer.css";
function CoursePlayer(props: any  ) {
    const navigate = useNavigate();
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { cid, mid, goBackUrl } = props;
    // const token = "Bearer dea088ff9bbdca4e8cbbd5fa7de2d290";
    // const learnerToken = "46eda135e6f14690eb744a422730d0a0";
    const learnerToken = "b09cdf4e0b972e2cc595f17e341f3b3b";
    
    useEffect(() => {
        // const cid = "course:9179792"
        const cid = "course:9180283"
        // if (typeof window !== 'undefined') {
        //     document.body.style.overflowY = 'hidden';
        // }
        const url = `https://learningmanager.adobe.com/app/player?lo_id=${cid}&access_token=${learnerToken}`;
        

       
        // if (mid) {
        //     url = url + `&module_id=${mid}`;
        // }
 
        if (url && iframeRef?.current) {
            iframeRef.current.src = url;
            iframeRef.current.setAttribute('allowTransparency', 'true');
            iframeRef.current.setAttribute('allowFullScreen', 'true');
        }
        const closePlayer = (event: MessageEvent) => {
            // alert("start")
            if (event.data === "status:close") {
                // window.document.body.style.overflowY = 'auto';
                window.removeEventListener("message", closePlayer);
                // history.push(goBackUrl as string);
                navigate(goBackUrl as string);
                props.setShowDateValidationModal(true)
                // window.location.reload();
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