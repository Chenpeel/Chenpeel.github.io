
# <a id="css"> CSS </a>

> 级联样式表 （Cascading Style Sheet）

- 外观格式设计，解决网页内容和表现分离
- 由选择器和声明构成





## 样式表

### 内联样式表

> 行内样式表

- 内联样式是在单行内使用的样式
- 直接作用于单行

### 内部样式表

- 内部样式是在文件内生效的，对于选择器所选择的进行样式更改
- 复用性低

### 外部样式表

- 外部样式通过link的方式，从另外的、非html文件而是css文件来表现样式

```html
  
  <link rel="stylesheet" src="source_path">
```


- 一个css文件可以作用于多个html





## 选择器

## 标记选择器（元素选择器）

- 包含html中的标记类型，如h1/h2/... , p , div ,  ...

### <a id="class">类选择器</a>

- 以 ` .class_name` 命名，通过`class="class_name"` 使用

- 可重复使用，对多个作用，可以联合使用

```html
  
  <!DOCTYPE html>
  <html>
  <head>
      ...
      <style>
          p {
              text-align: center;
          }
          .box {
              width: 200px;
              height: 200px;
          }
          .red {
              background-color: red;
          }
          .gre {
              background-color: green;
          }
      </style>
  </head>
  <body>
      <div class="box red">
          <p> <img src="../imags/1.jpeg" width="100px" height="100px" hspace="50" vspace="50"> </p>
      </div>
      <div class="box gre">
          <p> <img src="../imags/2.jpeg" width="100px" height="100px" hspace="50" vspace="50"> </p>
      </div>
      <div class="box red">
          <p> <img src="../imags/1.jpeg" width="100px" height="100px" hspace="50" vspace="50"> </p>
      </div>
  </body>
  </html>
```




### <a id="id">id选择器</a>

- 以`#id_name` 命名，通过`id= "id_name"`使用
- 和类选择器类似，但id选择器只能使用一次

### 通配符选择器

- 以`*`命名，意为全选



### 后代选择器

- 在层级关系中逐层选择 
```html
  
  <!DOCTYPE html>
  <html>
  
  <head>
      <style>
          ol li {
              color: red;
          }
      </style>
  </head>
  
  <body>
      <ol>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
      </ol>
      <ul>
          <li>1u</li>
          <li>2u</li>
          <li>3u</li>
          <li>4u</li>
      </ul>
  </body>
  
  </html>
```




### 子元素选择器

- 在层级关系中只选择最近的一层 使用 `elem1 > elem2 {}`

```html
  
  <!DOCTYPE html>
  <html>
  
  <head>
      <style>
          div>a {
              color: blue;
          }
      </style>
  </head>
  
  <body>
      <div>
          <a href="#son"></a>
          <p>
              <a href="grand son"></a>
          </p>
      </div>
  </body>
  
  </html>
```


### 并集选择器

- 即类似于类选择器的复用，通过`,` 分隔
```html
  
  <!DOCTYPE html>
  <html>
  
  <head>
      <style>
          div,
          p {
              color: green;
          }
      </style>
  </head>
  
  <body>
  
      <div> </div>
      <p> </p>
  
  </body>
  
  </html>
```




### 伪类选择器

- 使用`:`来表示常用的有链接伪类、结构伪类等


<div class="to-center">
    <table>
            <thead>
                <tr>
                    <th style='text-align:center;'>Name</th>
                    <th style='text-align:center;'>Explaination</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style='text-align:center;'>link</td>
                    <td style='text-align:center;'>设置a标记在未被访问前的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>hover</td>
                    <td style='text-align:center;'>设置a标记在鼠标悬停时的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>active</td>
                    <td style='text-align:center;'>设置a标记在被点击和释放之间时的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>visited</td>
                    <td style='text-align:center;'>设置a标记在被访问后的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-letter</td>
                    <td style='text-align:center;'>作用于块，设置第一个字符的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-line</td>
                    <td style='text-align:center;'>作用于块，设置第一行的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-child</td>
                    <td style='text-align:center;'>设置第一个子标记的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>lang</td>
                    <td style='text-align:center;'>设置具有lang属性的标记的样式</td>
                </tr>
            </tbody>
        </table>
</div>

​        
```html
  
  <!DOCTYPE html>
  <html>
  
  <head>
    <style>
      a:link {
        color:gray ; text-decoration:none;
      }
      a:visited{
        color:red; text-decoration:none;
      }
      a:hover{
        color:deeppink; text-decoration:none;
      }
      a:active{
        color:yellow; text-decoration:none;
      }
      p:first-letter{
        font-weight:bold;font-family:"黑体";
      }
      p:first-line{
        font-size:32px;
      }
    </style>
  </head>
  
  <body>
    <p>
          qwertyuiopasdfghjklzxcvbnm
          qwertyuiopasdfghjklzxcvbnm
          qwertyuiopasdfghjklzxcvbnm
          qwertyuiopasdfghjklzxcvbnm
          qwertyuiopasdfghjklzxcvbnm
          qwertyuiopasdfghjklzxcvbnm
      
    </p>
    <a href="https://zachary.world"> my blog </a>
  
  </body>
  
  </html>
```


- 值的注意的是：关于链接伪类的使用是有先后次序的，一般按照LVHA的次序即`link->visited->hover->active`

- 另外还有focus伪类用于获取表单的光标焦点



### 属性选择器

- 对于低版本的浏览器可能不支持
- 可以使用`[Attribute]`的方式来进行选择



## CSS盒模型

### Intro

>  网页中的每一个元素都可以看作一个矩形盒子，通常使用DIV+ CSS的方式来定义一个盒子的元素和样式

CSS盒模型，将特定的元素描述为盒子，并实现对这个盒子包装进行美化，其中重要的概念**MBPC**
- Margin：外边界，多个盒子、或盒子与其他物体堆放其之间的间隔
- Border：边界，盒子的实在的边界，如纸盒子的纸皮（纸皮厚度可以是0，假想皮）
- Padding：填充，承载玻璃时，盒子里常用泡沫或减压泡泡减震，这些泡沫减压层就是填充物
- Content：内容，每一个盒子，都是为了包装存在，没有了被包装物，盒子也就不存在了
- 四周：每个盒子都是完整的包围content的，即MBPC有四个基本边界属性（top、right、bottom、left），他们都可以使用长度单位、百分比单位、auto这样的样式值调整边界宽度

### Margin

>  一般是盒子外面的那一层空气，只有厚度没有颜色

### Border

> 可以使用不同颜色、不同材质的材料的盒子将内容包装起来

同样的，可以使用诸如样式、颜色、宽度等来设置border边界

###### border

> 可以使用一个复合定义粗细、样式、颜色

```css
#default{
  border: /* border-width */ 2px /* border-style */ thin  /* border-color */ red;
}
```

###### border-style

<div class="to-center">
  <table>
            <thead>
                <tr>
                    <th style='text-align:center;'>Key</th>
                    <th style='text-align:center;'>Explaination</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style='text-align:center;'>none</td>
                    <td style='text-align:center;'>定义无边框</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>hidden</td>
                    <td style='text-align:center;'>与none相同，用于表时例外，用于解决边界冲突</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>dotted</td>
                    <td style='text-align:center;'>定义点状边框</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>dashed</td>
                    <td style='text-align:center;'>定义虚线</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>solid</td>
                    <td style='text-align:center;'>定义实线</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>double</td>
                    <td style='text-align:center;'>定义双线。宽度等于border-width</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>groove</td>
                    <td style='text-align:center;'>定义3D凹槽边框。效果取决于border-color</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>ridge</td>
                    <td style='text-align:center;'>定义山脊状边框。效果取决于border-color</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>inset</td>
                    <td style='text-align:center;'>定义使页面沉入感边框。效果取决于border-color</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>outset</td>
                    <td style='text-align:center;'>定义使页面浮出感边框。效果取决于border-color</td>
                </tr>
            </tbody>
      </table>
</div>

###### border-color

<a href="#color">颜色</a>

> 可以指定单独一边的颜色

```css
#default{
  border-color:pink;
}
#side-color-set{
  border-top-color:red;
  border-left-color:rgb(254,20,35);
  .
  .
  .
}
```

###### border-width

> 设置边框宽度

默认medium，thin小于默认、thick大于默认、length可见<a href="unit">单位</a>

### Padding

> 盒子的填充物样式同样

```css
#default{
  padding:0;
  background-color:green;
  ...
}
```





## 页面布局

> 规整的页面布局看上去十分赏心悦目

- 经典的布局方式是三行模式（header、main、footer）、三列模式（sidebar、main、info）

- 两者可以相结合（header、main{main_leftside、main_content、main_rightside}、footer），即三行三列
- 三行两列模式是三行三列去除leftside或rightside列的结果

> 在一些网站，会有多行多列的样式

这里是三行三列的基本元素定义

```html
<!doctype html>
<html>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width initial-scale=1'>
    <title>cache</title>
</head>

<body>
    <div id="container">
        <div id="header">
            <div id="logo"></div>
            <div id="nav"></div> /* 导航栏 */
        </div>
        <div id="main">
            <div id="left"></div>
            <div id="content"></div>
            <div id="right"></div>
        </div>

        <div class="clearfloat"></div> /*清除浮动*/
        
        <div id="footer">

        </div>
    </div>
</body>

</html>
```



## <a id="unit">单位</a>

### 绝对单位

> 绝对单位在网页中很少使用，一般应用于平面印刷

- 英寸（in）：使用最广泛的长度单位（1 in = 2.54cm）
- 厘米（cm）：生活中最常用的单位
- 毫米（mm）：在研究领域使用较为广泛
- 磅（pt）：在印刷领域使用广泛，也称点。CSS也常用pt设置字体大小（1 pt = 1/72 in）
- pica（pc）：印刷领域使用较多（1 pc = 12 pt）

### 相对单位

> 相对单位的大小是不固定的

- em：表示元素的字体高度
- ex：表示以所使用的字体中小写字母x的高度作为参考。在实际使用中，浏览器通过em/2来取得ex
- px：表示根据屏幕的像素点来确定的
- 百分比%：相对单位值，通过另一个值来计算



## 文字文本样式

### 文字

<div class="to-center">
      <table>
            <thead>
                <tr>
                    <th style='text-align:center;'>Name</th>
                    <th style='text-align:center;'>Explaination</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style='text-align:center;'>link</td>
                    <td style='text-align:center;'>设置a标记在未被访问前的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>hover</td>
                    <td style='text-align:center;'>设置a标记在鼠标悬停时的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>active</td>
                    <td style='text-align:center;'>设置a标记在被点击和释放之间时的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>visited</td>
                    <td style='text-align:center;'>设置a标记在被访问后的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-letter</td>
                    <td style='text-align:center;'>作用于块，设置第一个字符的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-line</td>
                    <td style='text-align:center;'>作用于块，设置第一行的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-child</td>
                    <td style='text-align:center;'>设置第一个子标记的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>lang</td>
                    <td style='text-align:center;'>设置具有lang属性的标记的样式</td>
                </tr>
            </tbody>
        </table>
</div>        

### 文本

<div class="to-center">
    <table>
            <thead>
                <tr>
                    <th style='text-align:center;'>Name</th>
                    <th style='text-align:center;'>Explaination</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style='text-align:center;'>link</td>
                    <td style='text-align:center;'>设置a标记在未被访问前的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>hover</td>
                    <td style='text-align:center;'>设置a标记在鼠标悬停时的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>active</td>
                    <td style='text-align:center;'>设置a标记在被点击和释放之间时的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>visited</td>
                    <td style='text-align:center;'>设置a标记在被访问后的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-letter</td>
                    <td style='text-align:center;'>作用于块，设置第一个字符的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-line</td>
                    <td style='text-align:center;'>作用于块，设置第一行的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-child</td>
                    <td style='text-align:center;'>设置第一个子标记的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>lang</td>
                    <td style='text-align:center;'>设置具有lang属性的标记的样式</td>
                </tr>
            </tbody>
        </table>
</div>





## <a id="color">颜色</a>

> 关于颜色的渲染千篇一律
>
> 常用颜色编码如下

<div class="to-center">
      <table>
            <thead>
                <tr>
                    <th style='text-align:center;'>Name</th>
                    <th style='text-align:center;'>Explaination</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style='text-align:center;'>link</td>
                    <td style='text-align:center;'>设置a标记在未被访问前的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>hover</td>
                    <td style='text-align:center;'>设置a标记在鼠标悬停时的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>active</td>
                    <td style='text-align:center;'>设置a标记在被点击和释放之间时的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>visited</td>
                    <td style='text-align:center;'>设置a标记在被访问后的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-letter</td>
                    <td style='text-align:center;'>作用于块，设置第一个字符的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-line</td>
                    <td style='text-align:center;'>作用于块，设置第一行的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-child</td>
                    <td style='text-align:center;'>设置第一个子标记的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>lang</td>
                    <td style='text-align:center;'>设置具有lang属性的标记的样式</td>
                </tr>
            </tbody>
        </table>
</div>

## 背景

> 指定背景色彩、图案等，可以直接使用复合属性background

<div class="to-center">
    <table>
            <thead>
                <tr>
                    <th style='text-align:center;'>Name</th>
                    <th style='text-align:center;'>Explaination</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style='text-align:center;'>link</td>
                    <td style='text-align:center;'>设置a标记在未被访问前的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>hover</td>
                    <td style='text-align:center;'>设置a标记在鼠标悬停时的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>active</td>
                    <td style='text-align:center;'>设置a标记在被点击和释放之间时的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>visited</td>
                    <td style='text-align:center;'>设置a标记在被访问后的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-letter</td>
                    <td style='text-align:center;'>作用于块，设置第一个字符的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-line</td>
                    <td style='text-align:center;'>作用于块，设置第一行的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>first-child</td>
                    <td style='text-align:center;'>设置第一个子标记的样式</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>lang</td>
                    <td style='text-align:center;'>设置具有lang属性的标记的样式</td>
                </tr>
            </tbody>
        </table>
</div>
###### background-image

> 设置背景图片

```css
#default{
  background-image:url("Path");
}
```

###### background-repeat

> 背景重复

<div class="to-center">
    <table>
            <thead>
                <tr>
                    <th style='text-align:center;'>Key</th>
                    <th style='text-align:center;'>Explaination</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style='text-align:center;'>repeat</td>
                    <td style='text-align:center;'>使用背景图完全覆盖</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>repeat-x</td>
                    <td style='text-align:center;'>背景水平方向从左到右重叠覆盖</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>repeat-y</td>
                    <td style='text-align:center;'>背景垂直方向从上到下重叠覆盖</td>
                </tr>
                <tr>
                    <td style='text-align:center;'>no-repeat</td>
                    <td style='text-align:center;'>不使用重复方式</td>
                </tr>
            </tbody>
        </table>
</div>

###### background-attachment

> 背景附件，是否随着图像一起滚动

```css
#default{
  background-attachment:scroll /* 文字页面滚动时，跟随滚动 */ ;
}
#static{
  background-attachment:fixed /* 固定 */;
}

```

###### background-position

> 定位方式可以是百分比、px、两者混用等方式

```css
#default{
  background: 50%px/* 横向 */ 50%-100px /* 纵向 */
}
```




<br>
<hr>
```css
  .ball{
      position:absolute;
      top:0;
      left:0;
      width:10px;
      height:10px;
      border-radius:50%;
      background-color:skyblue;
      animation: 
          hor 3.6s infinite linear alternate;
          ver 2.4s infinite linear alternate 
  }
  @keyframes hor{
      to{
          left:calc(100vw-10px);
      }
  }
  @keyframes ver{
      to{
          top:calc(100vh-10px);
      }
  }
```