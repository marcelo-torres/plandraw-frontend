FROM httpd:2.4
COPY ./public/ /usr/local/apache2/htdocs/
EXPOSE 80 
#CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]