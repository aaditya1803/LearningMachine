import React, { useRef, useState}from 'react'
import { VncScreen } from 'react-vnc';


interface RFBOptions {
//  shared: boolean;
  credentials: {
      username?: 'developer';
      password?: 'vncpasswd';
     // target?: string;
  };
//  repeaterID: string;
//  wsProtocols: string;
}

function Reactvnc(props) {

  //const vncScreenRef = useRef<React.ElementRef<typeof VncScreen>>(RFBOptions);
  const url = 'ws://10.0.3.12:' + props.portassigned + '/vnc.html'

  return (
    <div>
           <VncScreen
              url={url}
              scaleViewport
              background="#000000"
              scaleViewport='true'
              //viewOnly='true'
              //resizeSession= 'true'
              style={{
               width: '75vw',
               height: '75vh', 
              }}
              RFBOptions= {{
                username: 'developer',
                password: 'vncpasswd',
                wsProtocols: ['binary', 'base64']
              }}
              //ref={vncScreenRef}
            />
    </div>
  )
}

export default Reactvnc