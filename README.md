# web-components-typescript

`Just a experiment`

`<type-script>` is a Web Component that lets you write and run TypeScript directly in HTML.  
Perfect for quick demos, experiments, and learning.  
No build tools required—just drop it in and go.  

Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="module" src="./type-script.min.js"></script>
</head>
<body>
    counter: <span id="count">0</span>
    <type-script>
    console.log(">> run type-script!");
    const countElement = document.querySelector("#count")!;
    let c: number = 0;
    setInterval( () => {
        c++;
        countElement.textContent = `${c}`;
    }, 1000 * 1);
    </type-script>
</body>
</html>
```
