FROM php:8.2.2-fpm
RUN docker-php-ext-install mysqli pdo_mysql
RUN apt-get update \
    && apt-get install -y libzip-dev \
    && apt-get install -y zlib1g-dev \
    && apt-get install -y libicu-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-configure intl \
    && docker-php-ext-install zip \
    && docker-php-ext-install intl
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer