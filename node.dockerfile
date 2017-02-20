FROM node:argon

MAINTAINER timberbain@gmail.com

# Copy init script
ADD init/web/start.sh /init/start.sh
RUN chmod 0755 /init/start.sh

# Copy application code
ADD web /web

WORKDIR /web

# Install npm modules
#RUN npm install

CMD ["sh", "/init/start.sh"]
