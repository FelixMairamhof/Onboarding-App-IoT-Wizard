# SQL STATEMENTS

## Existing Tables

### Admins
```sql
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### SensorData

```sql
CREATE TABLE sensor_data (
    id SERIAL PRIMARY KEY,
    serial_number VARCHAR(255) UNIQUE NOT NULL,
    dev_eui VARCHAR(255)  NOT NULL,
    app_eui VARCHAR(255)  NOT NULL,
    app_key VARCHAR(255)  NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### SensorProfile

```sql
CREATE TABLE sensor_profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    guide TEXT,
    qr_result TEXT,
    video_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
## New Ideas

### SensorProfile

```sql
CREATE TABLE sensor_profiles (
    id SERIAL PRIMARY KEY,
    producer VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    img TEXT,
    qr_result TEXT,
    guide_name TEXT[],
    guide_img TEXT[],
    chirpstack_profile TEXT,
    chirpstack_template TEXT
);
```

### Users

```sql
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_admin BOOLEAN NOT NULL,
    api_key VARCHAR(255) NOT NULL
);
```