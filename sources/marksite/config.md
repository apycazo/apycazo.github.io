# Configuring marksite
---
## Base config
Marksite requires a json configuration file. By default it will try to find it on `./config.json`, but a parameter can be passed with
the actual path, for example: `node marksite.js test-config.js`.

## Config file structure
An example for a config file looks like this:
```javascript
{
    "target": "./index.html",
    "title": "Andres Picazo -- GitHub site",
    "favicon": "https://icons.better-idea.org/icon?size=80..120..200&url=github.com",
    "brand": "Apycazo",
    "index": "index.md",
    "scripts": [
        "https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js",
        "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js"
    ],
    "styles": [
        "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/slate/bootstrap.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/zenburn.min.css"
    ],
    "menu": [
        {
            "title": "Home 2",
            "pages": [
                { "title": "Test", "src": "pages/test.md" },
                { "title": "Stub 1", "src": "pages/stub-1.md" }
            ]
        },
        {
            "title": "About",
            "pages": [
                { "title": "Stub 1", "src": "pages/stub-1.md" },
                { "title": "Stub 2", "src": "pages/stub-2.md" }
            ]
        }
    ]
}
```

## Config file parameters
* **target**: this is where do you want the ``index.html`` file to be generated.
* **title**: the page title.
* **favicon**: If set, use this as a favicon source.
* **brand**: page navigation bar brand text. This will be linked to the 'index' page.
* **index**: what markdown page to use for the landing page (brand will link to this page).
* **scripts**: this will be added in the 'scripts' section for the page. Note that angular is actually mandatory.
* **styles**: same, but for text/css files.
* **menu**: this describes the site pages, and allows for some organization. Each entry is considered a 'chapter', and a menu will be generated for each. If a chapter contains more than one page, a page selector will be added to the view.
