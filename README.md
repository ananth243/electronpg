
## Run Locally

Clone the project

```bash
  git clone https://github.com/ananth243/electronpg.git my-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm i
```

Create configuration variables:

``` bash
touch /src/utilities/config.ts
```

```
// config.ts
import { Dialect } from 'sequelize/types';

export const USERNAME = YOUR_SQL_USERNAME;
export const PASSWORD = YOUR_SQL_PASSWORD;
export const DB = YOUR_DB_NAME;
export const DIALECT: Dialect = 'postgres' | 'msql';
```

Start the server

```bash
  npm run start
```
