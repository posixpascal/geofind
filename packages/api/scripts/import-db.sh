pg_restore --dbname $DB_DATABASE -h $DB_HOST -p $DB_PORT -U $DB_USER -W $DB_PASSWORD ../../config/dumps/db.dump
