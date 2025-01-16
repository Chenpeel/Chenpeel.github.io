# <a name="js"> JavaScript </a>

> 客户端脚本语言

- 核心（ECMAScript）
- 文档对象模型（Document Object Model,DOM）
- 浏览器对象模型（Brower Object Model,BOM）

<hr>

#### JavaScript是什么？

JavaScript如其名所示是一个脚本语言（可简称为js），工作在客户端，由布兰登艾奇在1995年十天内发明完成。

和其他的语言（如C语言、python等）一样，js也是高级语言，需要进行转译为机器语言（机器能直接执行的语言）。而脚本语言的特性是：需要解释器逐行执行。同样的，JS引擎就是JS的解释器。

#### JavaScript位置

同CSS相似的，js书写的位置：

###### 行内

> 直接在标签内使用

```html
<!--这是html代码内部-->
<!DOCTYPE html>
<html>
<head>
    <title>I'm Title</title>
</head>
<body>
  <input name="button" value="Alert" onclick="alert('Hello,JS!')">
  <!--其中的onclick即为JS-->
</body>
</html>
```

###### 内部

> 内部的JS，需要用`<script></script>`包围起来，可以放置在html内的任意位置

```html
<!--html-->
<!DOCTYPE html>
<html>
<head>
    <title>I'm Title</title>
</head>
<body>
  <input name="button" value="Alert">
</body>
  <script>
    alert('hello,js')
  </script>
</html>
```

###### 外部

> 外部JS和CSS类似，需要新建一个以`.js`结尾的文件，并在文件内引入

```js
// <!-- script.js文件 -->
alert('hello,js')
```

```html
<!--html-->
<!DOCTYPE html>
<html>
<head>
    <title>I'm Title</title>
  <script src="./script.js"></script>
</head>
<body>
  <input name="button" value="Alert">
</body>
</html>
```

⚠️这里的`<script></script>`标签内部不要有任何js代码🙅



#### JS注释

js中使用不同于html和css的方式注释

```js
// 单行注释（可以在IDE中使用键盘快捷键来快捷注释）

/*

多行注释

*/
```









<br>

<hr>

Loading.....



