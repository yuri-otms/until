FROM php:8.3-fpm

# 基本コマンド
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libonig-dev \
    libzip-dev \
    tzdata \
    zip \
    && docker-php-ext-install pdo pdo_mysql zip

# Composerのインストール
COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

# php.ini
COPY php.ini /usr/local/etc/php/php.ini

WORKDIR /var/www/html

CMD ["php-fpm"]

