# Frontend app

The frontend app is a server rendered app with rehydration. It is built from scratch using

- ReactJs
- Express

## Credit

Thanks to this [playlist](https://www.youtube.com/watch?v=X0SFO2LEB2M&list=PLMhLdUN2ZKJ2f-QDFBP1iphsmPd81MQOO), I was able to setup server rendering for the frontend app while making a few tweaks. Please watch the video, it gives you an overview of how the frontend app works under the hood.

Additionally, the frontend app is code splitted and built with TS. File an issue if you feel some improvements can be made.

<br />

## Quick Start

To run the app, you need to run the following command:

1. Run `git clone https://github.com/gbenga504/music-port.git`
2. Run `cd packages/frontend-app`
3. Run `yarn install`
4. Run `yarn dev` to start the dev server

PS: You also need to start the api server. Check the api [README](../api/README.md) on how this can be done.

<br />

## Architecture

This image explains the architecture of the frontend app. It explains how various component play and work with each other

<div align="center">
  <figure>
 <img src="./files/architecture.png" alt="architecture" />
    <figcaption>
      <p align="center">
        Frontend Architectural Diagram
      </p>
    </figcaption>
  </figure>
</div>

<br />

## Major technologies

- Typescript
- ReactJs
- Express
- ReactRouter
- TailwindCSS
- Scss
- Babel (Build tool)
- Webpack (Build tool)
- Jest (Testing tool)
- Playwright (Testing tool)
