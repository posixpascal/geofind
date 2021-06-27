FROM node:6.17

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

# Core Dependencies
RUN apt-get update --fix-missing
RUN apt-get -y upgrade
RUN apt-get -y install ca-certificates gnupg curl unzip
RUN apt-get -y install tar wget bzip2 build-essential clang git
#RUN apt-get -y install python3-requests postgresql-client protobuf-c-compiler libtiff5-dev
# Mount a swap file
# RUN fallocate -l 2G /swapfile
# RUN chmod 600 /swapfile
# RUN mkswap /swapfile
# RUN swapon /swapfile


# Tilemill Setup
WORKDIR /tilemill
RUN git clone https://github.com/tilemill-project/tilemill.git .

RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:ubuntu-toolchain-r/test
RUN apt-get update -y
RUN apt-get install -y libstdc++-6-dev libmapnik-dev
RUN apt-get install -y mapnik-utils node-mapnik

RUN npm install
EXPOSE 20009
EXPOSE 20008
CMD ./index.js --server=true --listenHost=0.0.0.0 --coreUrl=0.0.0.0:20009 --tileUrl=0.0.0.0:20008
