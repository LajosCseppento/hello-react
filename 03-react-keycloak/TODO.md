# TODO

## Keycloak

TODO Redo again to learn more

Start
Edit
Stop container
Commit
Run with --entrypoint
Export

New with import

Import dir: /opt/keycloak/data/import

$ docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin -v ./import:/opt/keycloak/data/import quay.io/keycloak/keycloak:20.0.3 start-dev --import-realm

/opt/keycloak/bin/kc.sh export --dir /tmp/export --users realm_file

## Frontend

Backdrop -> for loading / or progress? / Skeleton
Dialog?
React query for loading?

TODO navigation while loading, what to do

TODO AppBar with responsive menu

Snackbar = notification