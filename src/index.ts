import * as readline from "readline";

type MatrixOptions = {
  alphabet?: string;
  length?: number;
  message?: string;
  fmt?: (s: string) => string;
  intervalRate?: number;
};

class MatrixSpinner {
  alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
  length = 10;
  message: string = "";
  fmt: (s: string) => string = (s) => s;
  intervalRate = 4;
  private intervalId: NodeJS.Timeout | null = null;
  private spinnerString: string = new Array(this.length).fill(" ").join("");
  private stillPositions: number[] = [];

  constructor(message?: string, options?: MatrixOptions) {
    this.message = message || "";
    this.alphabet = options?.alphabet || this.alphabet;
    this.length = options?.length || this.length;
    this.fmt = options?.fmt || this.fmt;
    this.intervalRate = options?.intervalRate || this.intervalRate;
  }

  start(message?: string, options?: MatrixOptions): void {
    this.message = message || this.message;
    this.alphabet = options?.alphabet || this.alphabet;
    this.length = options?.length || this.length;
    this.fmt = options?.fmt || this.fmt;
    this.intervalRate = options?.intervalRate || this.intervalRate;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      readline.cursorTo(process.stdout, 0);
      const position: number = Math.floor(Math.random() * this.length);
      if (!this.stillPositions.includes(position)) {
        const char: string =
          this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
        this.spinnerString =
          this.spinnerString.substr(0, position) +
          char +
          this.spinnerString.substr(position + 1);
      }
      process.stdout.write(this.fmt(this.spinnerString + " " + this.message)); // Append the message to the spinner string
    }, this.intervalRate);
  }

  update(message?: string, options?: MatrixOptions): void {
    this.message = message || this.message;
    this.alphabet = options?.alphabet || this.alphabet;
    this.length = options?.length || this.length;
    this.fmt = options?.fmt || this.fmt;
    this.intervalRate = options?.intervalRate || this.intervalRate;
  }

  stop(message?: string, options?: MatrixOptions): void {
    if (message) {
      this.update(message, options);
      this.message = "";
      // if the message is longer than the length, we should update the length
      if (message.length > this.length) {
        this.length = message.length;
      }
      readline.cursorTo(process.stdout, 0);
      let revealedChars: string[] = [];
      const revealInterval = setInterval(() => {
        // pick a random position
        const position: number = Math.floor(Math.random() * this.length);
        // if the position is not already revealed
        if (!this.stillPositions.includes(position)) {
          // reveal the character at that position, if the character doesn't exist, use a space
          const char: string = message[position] || " ";
          this.spinnerString =
            this.spinnerString.substr(0, position) +
            char +
            this.spinnerString.substr(position + 1);

          // add the position to the list of revealed positions
          this.stillPositions.push(position);
          revealedChars[position] = char;
        }

        // if all the characters have been revealed, stop the interval
        if (
          message.split("").every((char, i) => {
            return char === revealedChars[i];
          })
        ) {
          clearInterval(revealInterval);
          if (this.intervalId) clearInterval(this.intervalId);
          // clear the line and write the message and move cursor to beginning
          readline.clearLine(process.stdout, 0);
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(this.fmt(message));
          process.stdout.write("\n");
        }
      }, 10);
    }
  }
}

export const matrixSpinner = (message?: string, options?: MatrixOptions) => {
  return new MatrixSpinner(message, options);
};
