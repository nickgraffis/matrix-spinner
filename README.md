# MatrixSpinner

MatrixSpinner is a Node.js module for creating a spinner that transforms into a message. It's highly customizable, allowing you to specify the characters used in the spinner, the length of the spinner, the message displayed, and a function to format the spinner string.

## Installation

```bash
npm install matrix-spinner
```

## Usage

```javascript
const { matrixSpinner } = require("matrix-spinner");
const gradient = require("gradient-string");
const tinycolor = require("tinycolor2");

const spinner = matrixSpinner("Loading...", {
  fmt: (s) => gradient(tinycolor("#FFBB65"), tinycolor("gold"))(s),
});

spinner.start();

setTimeout(() => {
  spinner.stop("Done!");
}, 5000);
```

In this example, we're using the `gradient-string` and `tinycolor2` libraries to create a gradient for the spinner string.

## API

### `matrixSpinner(message?: string, options?: MatrixOptions)`

Creates a new spinner.

- `message`: The message to display after the spinner.
- `options`: An object with the following properties:
  - `alphabet`: The characters to use for the spinner.
  - `length`: The length of the spinner.
  - `fmt`: A function to format the spinner string.
  - `intervalRate`: The rate at which the spinner updates.

### `start(message?: string, options?: MatrixOptions)`

Starts the spinner.

### `update(message?: string, options?: MatrixOptions)`

Updates the spinner.

### `stop(message?: string, options?: MatrixOptions)`

Stops the spinner and transforms it into a message.

```

```
