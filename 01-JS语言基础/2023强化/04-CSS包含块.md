# CSS包含块

元素的尺寸和位置，会受它的包含块影响。对于一些属性，例如 width, height, padding, margin，当绝对定位元素(position: absolute/fixed)的偏移值为百分比值时，由元素的包含块计算得来。

包含块分两种：

+ **初始包含块(initial containing block)**，即根元素(HTML元素)所在的包含块，浏览器中等于视口 viewport 大小，定位基点在画布原点(视口左上角)。

+ **非根元素包含块**，判定方式分以下规则：

1. 元素 `position: relative/static`，包含块为最近的**块容器** (block container) 的**内容区域**(content area)

2. 元素 `position: fixed`，包含块为视口

3. 元素 `position: absolute`，包含块为最近的 `position` 的值非 `static` (即值为 `fixed`/`absolute`/`relative`/`sticky`) 的祖先元素的内边距区域

案例：

```html
<body>
  <div class="container" style="position: relative;">
    <div class="item">
      <div class="item2" style="position: absolute;"></div>
    </div>
  </div>
</body>
```

`div.item2` 的包含块为 `div.container` 而非 `div.item`。

此外，对于非根元素，包含块还有一种规则：元素 `position: absolute/fixed`，包含块也可能为满足以下条件的最近父级元素的内边距区域：

- `transform` 或 `perspective` 值不为 `none`
-  `will-change: transform/perspective;`
- `filter` 值不为 `none` 或 `will-change: filter;`(仅 Firefox)
- `contain: paint;`

案例：

```html
<body>
  <div class="container" style="position: relative;">
    <div class="item" style="transform: rotate(0deg);">
      <div class="item2" style="position: absolute;"></div>
    </div>
  </div>
</body>
```

此时，`div.item2` 的包含块为 `div.item`。



CSS 规范中所举的例子如下：

```html
<html>
  <head>
    <title>Illustration of containing blocks</title>
  </head>
  <body id="body">
    <div id="div1">
      <p id="p1">This is text in the first paragraph...</p>
      <p id="p2">
        This is text
        <em id="em1">
          in the
          <strong id="strong1">second</strong>
          paragraph.
        </em>
      </p>
    </div>
  </body>
</html>
```

在没有添加任何 CSS 代码的情况下，元素对应的包含块为：

| 元素    | 包含块                      | 参照规则 | 说明               |
| ------- | --------------------------- | -------- | ------------------ |
| html    | initial C.B. (UA-dependent) | 0        |                    |
| body    | html                        | 1        |                    |
| div1    | body                        | 1        |                    |
| p1      | div1                        | 1        |                    |
| p2      | div1                        | 1        |                    |
| em1     | p2                          | 1        |                    |
| strong1 | **p2**                      | 1        | 最近块容器的内容区 |

接下来添加如下 CSS：

```css
#div1 { 
  position: absolute; 
  left: 50px;
}
```

变化如下：

| 元素 | 包含块                      | 参照规则 | 说明                             |
| ---- | --------------------------- | -------- | -------------------------------- |
| div1 | initial C.B. (UA-dependent) | 3        | 最近的非static祖先元素内边距区域 |

继续修改 CSS：

```css
#div1 { 
  position: absolute; 
  left: 50px;
}
#em1  { 
  position: absolute; 
  left: 100px;
}
```

变化如下：

| 元素    | 包含块                      | 参照规则 | 说明                             |
| ------- | --------------------------- | -------- | -------------------------------- |
| div1    | initial C.B. (UA-dependent) |          |                                  |
| em1     | div1                        | 3        | 最近的非static祖先元素内边距区域 |
| strong1 | em1                         | 1        | 最近块容器的内容区               |

其他参考案例：*https://developer.mozilla.org/zh-CN/docs/Web/CSS/Containing_block*







