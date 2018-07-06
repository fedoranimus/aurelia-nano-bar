# aurelia-nano-bar

A nanoloading plugin for Aurelia

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

`<div nano-bar.bind="isShown">`

Custom Progress, autoincrement will be disabled

`<div nano-bar="show.bind: isShown; progress.bind: loadingProgress"></div>`

## Development & Testing

`// TODO`
