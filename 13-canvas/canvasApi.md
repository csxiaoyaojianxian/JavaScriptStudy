# Canvas

### getContext( '2d' || 'webgl' )
> 用来获取一个绘图环境。

### width
> 设置画布的宽度。

### height
> 设置画布的高度。

# Context

### moveTo( x, y )
> 设置路径的起点。

### lineTo( x, y )
> 画一条路径线。

### stroke()
> 根据当前的路径进行描边。

### fill()
> 根据当前的路径进行填充。

### beginPath()
> 清除当前路径（ 开辟新路径 ）

### closePath()
> 闭合路径，路径的起点与结束点相连。

### rect( startX，startY，width，height )
> 画一个矩形路径。

### strokeRect( startX，startY，width，height )
> 直接绘制一个描边矩形，不会产生任何路径。

### fillRect( startX，startY，width，height )
> 直接绘制一个填充矩形，不会产生任何路径。

### clearRect( startX，startY，width，height )
> 清除画布。

### setLineDash( [...] )
> 设置虚线绘制样式。

### getLineDash()
> 获取虚线绘制样式。

### lineDashOffset
> 设置虚线的偏移量

### lineWidth
> 设置线宽

### strokeStyle
> 设置描边样式

### fillStyle
> 设置填充样式

### lineCap
> 设置线帽样式

### lineJoin
> 设置线的交点样式
