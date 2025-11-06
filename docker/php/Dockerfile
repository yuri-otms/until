FROM php:8.4-apache

# 基本コマンド
RUN apt-get update
RUN apt-get install -y vim git zip unzip

# MySQLドライバ
RUN docker-php-ext-install pdo_mysql

# Composerのインストール
COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

# Apacheの設定(Document Root)
COPY ./000-default.conf /etc/apache2/sites-available

# Laravelのルーティング機能
RUN a2enmod rewrite

# Laravelプロジェクトの場所
WORKDIR /var/www/

