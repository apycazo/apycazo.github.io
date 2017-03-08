# IntelliJ IDEA notes
---
## Shortcuts

| Operation                  | Shortcut                |  
|----------------------------| ------------------------|  
| Auto format code           | Ctrl + Alt + L          |  
| Comment code               | Ctrl + /                |  
| Open 'find everywhere' tab | Shift x2                |  
| New line (begin)           | Shift + Enter           |  
| Duplicate line             | Ctrl + D                |  
| Remove line                | Ctrl + Y                |  
| Move line UP               | Ctrl + Shift + UP       |  
| Move line DOWN             | Ctrl + Shift + DOWN     |  
| Select custom fold (fcom)  | Ctrl + Alt + .          |  
| Create test                | Alt + Enter             |  
| Override/Implement method  | Ctrl + O                |  
| Custom fold                | (select) Ctrl + Alt + T |  
| Insert live template       | Ctrl + J                |  
| Wrap with live template    | Ctrl + Alt + J          |  

## Plugins

* DBNavigator
* Awesome console
* Lombok
* Grep console
* VisualVM Launcher (if https://visualvm.github.io/download.html is installed)
* Quick notes

## Settings

Editor ->Code style -> Java
- Braces placement: next line (class and method declaration)

Editor -> Code style -> YAML
- Indent: 4

Editor -> General -> Auto import (Java)
- Check 'optimize imports on the fly'
- Check 'Add unambiguous imports on the fly'

## Live templates
Editor -> Live templates
Create a new group (for example, 'custom')

Sample live template (abbreviation: 't-rest-echo', applicable in 'Java declaration')
```java
@RequestMapping(value = "", method = RequestMethod.GET)
public ResponseEntity<Map<String,Object>> echo ()
{
    Map<String,Object> map = new LinkedHashMap<>();
    map.put("success", true);
    map.put("method", "echo");
    map.put("ts", System.currentTimeMillis());
    return new ResponseEntity<>(map, HttpStatus.OK);
}
```
