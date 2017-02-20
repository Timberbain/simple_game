FROM mongo

MAINTAINER timberbain@gmail.com

# Copy init script
ADD init/db/start.sh /init/start.sh
RUN chmod 0755 /init/start.sh

CMD ["sh", "/init/start.sh"]
