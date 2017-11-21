# system-metrics-module

This module collects and report System runtime information to the
[logging module](https://github.com/Rise-Vision/logging-module).

## Development

Install:

```bash
npm install
```

Unit and integration tests:

```bash
npm run test
```

## Manual testing

Clone local-messaging-module, install and run it:

```bash
git clone https://github.com/Rise-Vision/local-messaging-module.git
npm install
node src/index.js
```

Do the same for logging-module in a different terminal window:

```bash
git clone https://github.com/Rise-Vision/logging-module.git
npm install
node src/index.js
```

Then, supposing system-metrics-module is already installed, open another
terminal window and run it. Optionally, you can adjust initial offset to 0
so it performs the first reading immediately, and you can adjust the sampling
interval to 1 minute if you don't want to wait much for additional metric
readings:

```bash
OFFSET=0 INTERVAL=1 node src/index.js
```

Recorded metrics data will then be appended to the predefined BigQuery table.
