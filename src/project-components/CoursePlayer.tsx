import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
// import { useRouter } from 'next/router';
// import { getToken } from 'services/Auth';
// import styles from './CoursePlayer.module.scss';
import ".././styles/CoursePlayer.css";
// import { coursePlayerProps } from 'types/coursePlayer';
function CoursePlayer(props: any) {
    const navigate = useNavigate();
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { cid, mid, goBackUrl } = props;
    const token = "Bearer dea088ff9bbdca4e8cbbd5fa7de2d290";
    // let history = useHistory()
    
    useEffect(() => {
        // if (typeof window !== 'undefined') {
        //     document.body.style.overflowY = 'hidden';
        // }
        let url = `https://learningmanager.adobe.com/app/player?lo_id=${cid}&access_token=${token}`;

       
        if (mid) {
            url = url + `&module_id=${mid}`;
        }
 
        if (url && iframeRef?.current) {
            iframeRef.current.src = url;
            iframeRef.current.setAttribute('allowTransparency', 'true');
            iframeRef.current.setAttribute('allowFullScreen', 'true');
        }
        const closePlayer = (event: MessageEvent) => {
            if (event.data === "status:close") {
                // window.document.body.style.overflowY = 'auto';
                window.removeEventListener("message", closePlayer);
                // history.push(goBackUrl as string);
                navigate(goBackUrl as string);
            }
        };
        window.addEventListener("message", closePlayer);
        return () => {
            window.document.body.style.overflowY = 'auto';
            window.removeEventListener("message", closePlayer);
        };
    }, [navigate, token, cid, mid, goBackUrl]);
 
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