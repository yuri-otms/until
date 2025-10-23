FROM mysql:8.4

RUN microdnf update
RUN microdnf install -y glibc-langpack-ja && \
    microdnf clean all

ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8

COPY my.cnf /etc/my.cnf