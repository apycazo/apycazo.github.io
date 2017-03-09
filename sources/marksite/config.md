# Configuring marksite
---
## Base config
Marksite requires a json configuration file. By default it will try to find it on `./config.json`, but a parameter can be passed with
the actual path, for example: `node marksite.js test-config.js`.

## Config file structure
An example for a config file looks like this:
```javascript
{
    "title": "GitHub site [Andres Picazo]",
    "target": "index.html",
    "brand": "Andrew's GitHub",
    "home": "https://github.com/apycazo?tab=repositories",
    "favicon": "https://icons.better-idea.org/icon?size=80..120..200&url=github.com",
    "source": "./sources/",
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
    "chapters": {
        "Home": ["landing.md"],
        "Marksite": [
            "marksite/config.md",
            "marksite/demo.md"
        ],
        "Java | Spring": [
            "java/java-8-snippets.md",
            "java/network.md",
            "java/optional.md",
            "java/spring-boot-context.md",
            "java/configuration-properties.md",
            "java/resource-handling.md",
            "java/jackson-parser.md",
            "java/rest-gateway.md"
        ],
        "Maven": [
            "maven/settings-example.md",
            "maven/external-properties.md",
            "maven/repository-configuration.md"
        ],
        "Applications": [
            "apps/amazon-AWS.md",
            "apps/intellij-IDEA.md",
            "apps/git.md",
            "apps/linux.md"
        ]
    }
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
* **source**: This path will be used to prefix all chapter page entries.
* **chapters**: this describes the site pages, and allows for some organization. Each entry will generate a menu.
If a chapter contains more than one page, a page selector will be added to the view.
