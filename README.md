# aurelia-nano-bar

A nanoloading plugin for Aurelia

## Demo

View a [sample project here](https://github.com/fedoranimus/aurelia-nano-bar-samples).

## Installation

Install via npm

`npm install aurelia-nano-bar`

Load the plugin

```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-nano-bar'); // Add this line to load the plugin

  aurelia.start().then(a => a.setRoot());
}
```

## Usage

Simply use the `nano-bar` custom attribute

Simple usage, the progress bar will autoincrement as time goes on

`<nano-bar is-loading.bind="isLoading"></nano-bar>`

Custom Progress, autoincrement will be disabled

`<nano-bar is-loading.bind="isLoading" progress.bind="progress"></nano-bar>`

## Development & Testing

Simply run

`npm run test`
