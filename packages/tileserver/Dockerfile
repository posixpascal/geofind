FROM node:8.15

RUN apt-get update -y
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:ubuntu-toolchain-r/test
RUN apt-get update -y
RUN apt-get install -y gcc-6 g++-6 clang-3.8 git
RUN export CXX="clang++-3.8" && export CC="clang-3.8"

RUN apt-get  install -y python3-mapnik gir1.2-pango-1.0 gir1.2-rsvg-2.0 python3-gi-cairo

#WORKDIR /mapnik
#RUN git clone https://github.com/mapnik/mapnik /mapnik --depth 10
#RUN apt-get install -y python zlib1g-dev clang make pkg-config curl libpng-dev
#COPY ./bootstrap.sh bootstrap-fix.sh
#RUN bash bootstrap-fix.sh
#RUN /mapnik/configure CUSTOM_CXXFLAGS="-D_GLIBCXX_USE_CXX11_ABI=0" CXX=${CXX} CC=${CC}
#RUN make
#RUN make test
#RUN make install

RUN add-apt-repository ppa:ubuntu-toolchain-r/test
RUN apt-get update -y
RUN apt-get install -y libstdc++-6-dev

WORKDIR /tilemill
RUN git clone https://github.com/tilemill-project/tilemill.git /tilemill

# Install mapnik
RUN npm install

ENTRYPOINT /tilemill/index.js --server=true --listenHost=0.0.0.0

EXPOSE 20008
EXPOSE 20009
