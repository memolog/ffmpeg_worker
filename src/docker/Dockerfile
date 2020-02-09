FROM ubuntu:latest

RUN apt-get update
RUN apt-get -y install wget python git automake libtool build-essential cmake libglib2.0-dev closure-compiler

RUN cd /root && \
git clone https://github.com/emscripten-core/emsdk.git && \
cd /root/emsdk && \
./emsdk install latest && \
./emsdk activate latest && \
. ./emsdk_env.sh && \
cd /root && \
git clone -b gif-support https://github.com/memolog/ffmpeg.js.git && \
cd /root/ffmpeg.js && \
git submodule init && git submodule update --recursive && \
make all
