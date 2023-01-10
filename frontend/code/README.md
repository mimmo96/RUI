# RUI frontend

## Introduction

The frontend comes as a nodeJS app, using React and MUI.

## Directory Structure
We want to highlight some of the most important files in the directory structure:

```
/src/
  |---/App.js
  |---/index.js
  |---/components/
           |---/rui_components
                        |---/...
  |---/pages/
           |---/rui
                 |---/...
  |---/routes/
           |---/MainRoutes.js
           |---/...
  |---utils/
        |---/...
/public
/patches
```
## src/

### App.js

The main purpose of this file is to render the application `<Routes />`

### index.js
This is where firebase gets initialized and where lives the main React DOM renderer, which renders `<App />`

### components/

Here are defined components like the cards and the graphs.

### pages/

Here the components are assembled into pages.

### routes/

Here are defined the routes for the frontend.

### utils/
This folder conains scripts such as those used to generate RUI's PDF Reports.

## public/

This folder contains publicly hosted resources, as images and static pages.
