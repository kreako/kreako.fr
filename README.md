# kreako.fr

## Development

### Strapi

```
cd kreako-strapi
npm run develop
```

### Webhook

Redis :

```
podman run --rm --name kreako-redis -p 6379:6379 redis
```

Webhook fastapi :

```
cd webhook
. env/bin/activate
cd src
uvicorn main:app --reload --port 1338
```

Rq worker :

```
cd webhook
. env/bin/activate
cd src
rq worker --with-scheduler
```

Meilisearch :

```
podman run -it --rm -p 7700:7700 -v ./meilisearch/:/data.ms:z --name kreako-meilisearch getmeili/meilisearch
```

Strapi :

```
cd kreako-strapi
npm run develop
```

Astro dev :

```
cd astro
npm run dev
```
