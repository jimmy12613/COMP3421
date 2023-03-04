FROM php:8.2.2-fpm
RUN docker-php-ext-install mysqli pdo_mysql
RUN apt-get update && apt-get upgrade -y\
    && apt-get install -y libzip-dev \
    && apt-get install -y zlib1g-dev \
    && apt-get install -y libicu-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-configure intl \
    && docker-php-ext-install zip \
    && docker-php-ext-install intl
RUN apt-get install -y curl gnupg; \
    curl -sL https://deb.nodesource.com/setup_8.x | bash -; \
    apt-get install -y npm nodejs; \
    rm -rf /var/lib/apt/lists/*
RUN npm install -g n \
    && n 16.16.0
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer