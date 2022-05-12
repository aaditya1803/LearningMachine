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

function Reactvnc() {

  //const vncScreenRef = useRef<React.ElementRef<typeof VncScreen>>(RFBOptions);

  return (
    <div>
           <VncScreen
              url='ws://127.0.0.1:6080/vnc.html'
              scaleViewport
              background="#000000"
              
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