# TheEtherButton

> An [Ethereum](https://www.ethereum.org/)-based version of Reddit's [r/TheButton](https://www.reddit.com/r/thebutton/) game. The button counts down from 20 blocks. You will be awarded an [ERC-721](http://erc721.org/) token flair when you click the button, but you may only do so once. Choose wisely...

## Overview

[The Button was an online meta-game and social experiment that featured an online button and 60 second countdown timer that would reset each time the button was pressed](https://en.wikipedia.org/wiki/The_Button_(Reddit)). We thought it would be fun to create the same concept but on the Ethereum blockchain.

## Install

This project requires both [npm](https://www.npmjs.com/) and [truffle](https://github.com/trufflesuite/truffle). Once you have the former, you can install the latter via:

```
$ npm install -g truffle
```

Next, you'll need to launch truffle:

```
$ truffle develop
```

To compile and deploy the Smart Contract:

```
$ truffle(develop)> compile
$ truffle(develop)> migrate
```

Once complete, you can start `npm` as usual to test your development work:

```
$ npm run start
```

## License

```
MIT License

Copyright (c) 2018 Will Baumann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```