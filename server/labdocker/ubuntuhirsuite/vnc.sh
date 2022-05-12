#!/bin/bash

#remove vnc lock (if process already killed)
rm -rf /tmp/.X1-lock /tmp/.X11-unix/X1

#run vnc server
#TRY SETTING DYNAMIC RESOLUTION using tigervnc later

#using vncserver shareapp thing (might use xvnc instead)
#vncserver :1 -geometry 1920x1080 && tail -F ~/.vnc/*.log


vncserver :1 -geometry 1920x1080 && tail -F ~/.vnc/*.log
