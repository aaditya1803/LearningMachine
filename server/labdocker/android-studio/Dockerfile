FROM ubuntu:18.04
RUN apt-get update; \
    apt-get -y upgrade; \
    apt-get install -y vnc4server git python vim wmctrl curl apt-transport-https libasound2

#required for android studio to work on ubuntu
RUN dpkg --add-architecture i386

RUN apt-get clean
RUN apt-get update
RUN dpkg --configure -a
RUN apt-get -f install 
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get install -y build-essential git neovim wget unzip sudo \
        libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386 \
        libxrender1 libxtst6 libxi6 libfreetype6 libxft2 \
        qemu qemu-kvm libvirt-bin ubuntu-vm-builder bridge-utils libnotify4 libglu1 libqt5widgets5 openjdk-8-jdk xvfb \
        && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#code to install android-studio from the downloaded package
#COPY ./android-studio /android-studio
#RUN chmod +x /android-studio/bin/studio.sh
#RUN /android-studio/bin/studio.sh

#more packages
RUN apt-get update && apt-get -y upgrade && \
    apt-get install -y iputils-ping git python vim gedit wmctrl curl wget apt-transport-https libasound2 sudo openssh-client openssh-server && \
    apt-get install -y xfce4 xfce4-terminal xfce4-goodies vnc4server
# Install Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get -y install google-chrome-stable
# Clone noVNC repository
RUN git clone https://github.com/novnc/noVNC.git /noVNC && \
    git clone https://github.com/novnc/websockify.git /noVNC/utils/websockify


COPY ./android-studio /opt/android-studio
COPY ./install-script.sh install-script.sh
RUN chmod +x install-script.sh
RUN ./install-script.sh

# Copy the Chrome launcher    
COPY Google_Chrome.desktop /root/Desktop/Chrome.desktop
# Copy the entrypoint script
COPY run.sh /opt/run.sh
# Copy the xstartup script
COPY xstartup /root/.vnc/xstartup
# Set few configuration for xfce4 and ssh
RUN mkdir /var/run/sshd && \
    sed -ri 's/^#?PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config && \
    sed -ri 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config && \
    chmod 777 /opt/run.sh && \
    chmod 777 /root/Desktop/Chrome.desktop && \
    chmod 755 /root/.vnc/xstartup && \
    cp /etc/xdg/xfce4/panel/default.xml /etc/xdg/xfce4/xfconf/xfce-perchannel-xml/xfce4-panel.xml
# Defined the entrypoint script
ENTRYPOINT /opt/run.sh
