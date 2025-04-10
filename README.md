# web-components-typescript

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
    <type-script>
        let c: number = 0;
        const ele = document.querySelector<HTMLSpanElement>("#counter")!;
        setInterval( () => {
            c++;
            ele.textContent = `${c}`;
        }, 1000 * 1);
    </type-script>
    <span id="counter">0</span>
</body>
</html>
```
