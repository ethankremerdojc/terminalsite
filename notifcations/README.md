1. Run Gotify (server)

# where to find admin
http://10.0.0.226:8007/#/login

# how it was run:
sudo docker run -d \
  -p 8007:80 \
  -v ~/gotify/gotify-data:/app/data \
  gotify/server


