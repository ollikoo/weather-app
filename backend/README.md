# Node.js Backend

Provides the server-side functionality for the weather sensor app.

The application assumes that there is a SQLite database called `iot_db.sqlite` with `datas` table already created at the project root. Application generates a new `summary` table to speedup loading times and uses the `datas` table as backup.

## How to run the application

1. Execute python script `create_iot_db` from the root directory.

2. In the project directory, you can run: `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.
The page will reload if you make edits.

`npm run build` Builds the app for production to the `build` folder.

`npm run start` Runs the production build from the `build` folder.

## API

### HTTP GET `/summary`

Get all data from `summary` table.

### HTTP GET `/count`

Get the data point count and average temperature from all sensors.

### HTTP GET `/recent`

Get all data fetched after the server bootup.

### HTTP GET `/diff/:id`

Get the selected sensor temperature difference compared to Helsinki

## Contact

olli.i.karkkainen@gmail.com
