FROM phusion/baseimage:focal-1.2.0

CMD [ "/sbin/my_init" ]

RUN mkdir -p /etc/my_init.d
COPY vncserver.sh /etc/my_init.d/vncserver.sh
RUN chmod +x /etc/my_init.d/vncserver.sh
RUN chmod 755 /etc/container_environment 
RUN chmod 644 /etc/container_environment.sh /etc/container_environment.json
# Give children processes 5 minutes to timeout
ENV KILL_PROCESS_TIMEOUT=300
# Give all other processes (such as those which have been forked) 5 minutes to timeout
ENV KILL_ALL_PROCESSES_TIMEOUT=300

#install xfce desktop environment
RUN apt-get update 
RUN apt-get install -yqq sudo wget curl netcat aria2 nano whois figlet p7zip p7zip-full zip unzip rar unrar
RUN apt-get install -yqq xfce4 && \
    apt-get install -yqq tightvncserver && \
    apt-get install -yqq bash bash-completion lsb-base lsb-release lshw tilix && \
    apt-get autoremove -y && \
    ln -fs /etc/profile.d/vte-2.91.sh /etc/profile.d/vte.sh
RUN ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN echo 'myubuntu ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers && \
    echo '%myubuntu ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers

RUN useradd --create-home --home-dir /home/myubuntu --shell /bin/bash myubuntu && \
  	mkdir /home/myubuntu/.vnc/
    
RUN usermod -aG root myubuntu

COPY vnc.sh /home/myubuntu/.vnc/
COPY xstartup /home/myubuntu/.vnc

RUN chmod 760 /home/myubuntu/.vnc/vnc.sh /home/myubuntu/.vnc/xstartup && \
  	chown -fR myubuntu:myubuntu /home/myubuntu

####Setup a VNC password####
RUN echo vncpasswd | vncpasswd -f > /home/myubuntu/.vnc/passwd && \
    chmod 600 /home/myubuntu/.vnc/passwd && \
    chown -fR myubuntu:myubuntu /home/myubuntu

#testfile
RUN touch /home/myubuntu/testfile

#firefox repo
RUN add-apt-repository ppa:mozillateam/firefox-next && \
    apt update 
RUN apt install firefox

#testing tightvnc shareapp with ppid of firefox
# ps -e | grep "firefox" | awk '{print $1}'
# ps -e | grep "brave" | awk 'NR==1 {print $1}'

EXPOSE 5901

HEALTHCHECK --interval=60s --timeout=30s\
     CMD netstat -lntp | grep -q '0\.0\.0\.0:5901'