# Storymaker

Deplyed [here](https://story-maker.surge.sh/#/)

---

### Start in development:
Server + DB:
```sh
cd server
docker-compose up
```
Client:
```sh
cd client
npm run dev
```
---

### Start in production:
Server:
```sh
cd server
docker-compose -f docker-compose.prod.yaml up --build
```
Client:
```sh
cd client
npm run build
# Then serve the dist folder on any static file server
```
