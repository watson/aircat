# aircat

Transfer photos from your iDevice to your computer in the terminal.

[![Build status](https://travis-ci.org/watson/aircat.svg?branch=master)](https://travis-ci.org/watson/aircat)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install -g aircat
```

## Usage

1. Start aircat and pipe the output to a new file:
   ```
   aircat > my-photo.jpg
   ```

1. In the Photos app, find the photo you'd like to transfer and click
   the share icon (your phone should be on the same network as the
   computer)

1. Select AirPlay and choose aircat

The picture should now be written to `my-photo.jpg`. Aircat will exit
when finished.

## License

MIT
