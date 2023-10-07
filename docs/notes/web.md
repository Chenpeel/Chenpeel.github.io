
<h1>Web前端</h1>
<br>
<hr>

> Web标准

1. **结构** ：<a href="#html">HTML</a> -> 页面元素
2. **表现** ： <a href="#css">CSS</a> -> 页面样式
3. **行为** ：<a href="#js"> JavaScript </a> -> 页面交互的动态效果

<br>
<hr>

# <a id="html"> HTML </a>

> 超文本标记语言（Hyper Text Markup Language）
>
> 载入内容,包括文本、音频、图片等等





## 注明文件

- `<!DOCTYPE element-name DTD-type DTD-name DTD-urk>`：位于`<html>`标记之前，标记使用的规范类型
- DTD三种类型
  - 严格型：HTML Strict DTD
  - 过渡型：HTML Transitional DTD
  - 框架型：HTML Frameset DTD

- `<!DOCTYPE html>` ：注明文件类型为html


## 元信息标记

- `<meta name="NAME" content="CONTENT">`
<div class="to-center">
    <table>
        <thead>
            <tr>
                <th>Value</th>
                <th>Explaination</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>author</td>
                <td>网页作者</td>
            </tr>
            <tr>
                <td>description</td>
                <td>网页简短描述</td>
            </tr>
            <tr>
                <td>keywords</td>
                <td>网页关键词</td>
            </tr>
            <tr>
                <td>generator</td>
                <td>编辑器</td>
            </tr>
        </tbody>
    </table>
</div>

<div class="to-center">
  <table>
  <thead>
      <tr>
          <th>Attribute</th>
          <th>Value</th>
          <th>Explaination</th>
      </tr>
  </thead>
  <tbody>
      <tr>
          <td>content</td>
          <td>some_text</td>
          <td>定义与http-equiv或name属性相关的元信息</td>
      </tr>
  </tbody>
  </table>

</div>


```html
  
  <meta name = "keywords" content = "CONTENT">
  <!-- 网页关键词 -->
  
  <meta name = "description" content = "CONTENT">
  <!-- 网页简要说明 -->
  
  <meta name = "author" content = "CONTENT">
  <!-- 作者信息 -->
  
  <meta name = "generator" content = "CONTENT">
  <!-- 指明生成页面工具 -->
  
  <meta name = "copyright" content = "CONTENT">
  <!-- 页面版权信息 -->
  
  <meta name = "robots" content = "CONTENT">
```


  - robots告诉搜素引擎机器人抓取哪些页面

<div class="to-center"> 
<table>
<thead>
    <tr>
        <th>Value</th>
        <th>Explain</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>all</td>
        <td>文件将被检索，且页面上的链接可以被查询</td>
    </tr>
    <tr>
        <td>none</td>
        <td>文件将不被检索，网页上的链接不可以被查询</td>
    </tr>
    <tr>
        <td>index</td>
        <td>文件将被检索</td>
    </tr>
    <tr>
        <td>noindex</td>
        <td>文件将不被检索，但网页上的链接可以被查询</td>
    </tr>
    <tr>
        <td>follow</td>
        <td>页面上的链接可以被查询</td>
    </tr>
    <tr>
        <td>nofollow</td>
        <td>文件将被检索，但页面上的链接不可以被查询</td>
    </tr>
</tbody>
</table>
</div>



- `<mata http-equiv>`

- 用于提供http协议的响应头报文
```html
  
  <meta http-equiv = "cache-control " content = "no-cache">
  <!-- 设置限制，仅从服务器获取资源而不是从本地cache中 -->
  <meta http-equiv = "refresh" content = "5; url = https://chenpeel.github.io">
  <!-- 5s后重定向到指定的网页 -->
  <meta http-equiv = "content-type" content="text/html;charset=utf-8"/>
  <!-- 指定编码字符集 -->
  <meta http-equiv = "expires" content="Sat, 26 Feb 2022 08:00:00 GMT"/>
  <!-- 指定到期时间 -->
```




### 语言

- `<html lang="en">`

- 语言标签，向浏览器指明网页主要使用的语言

<div class="to-center"> 
    <table>
        <thead>
            <tr>
                <th><code>lang</code></th>
                <th>Explaination</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>zh-CN</td>
                <td>简体中文</td>
            </tr>
            <tr>
                <td>zh-TW</td>
                <td>繁体中文</td>
            </tr>
            <tr>
                <td>en</td>
                <td>英语</td>
            </tr>
            <tr>
                <td>ru</td>
                <td>俄语</td>
            </tr>
            <tr>
                <td>ja</td>
                <td>日语</td>
            </tr>
            <tr>
                <td>fr</td>
                <td>法语</td>
            </tr>
        </tbody>
    </table>
</div>

  - 更多编码跳转维基百科[ISO_639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 



## 注释

- `<!-- 语句注释内容 -->`
- `<comment> 段落注释内容 </comment>`

## 标题

- `<title>显示在网址栏标题</title>`

## 主体


- 主体样式

```html
  
  <body>
  <!-- 主体内容 -->
  </body>
```


- 标记属性

  - 设置body的标记属性可以改变页面的样式

```html
  
  <body leftmargin="50px" topmargin="50px" text="#000000" bgcolor="#339999" link="red" alink="black" vlink="blue" background="../imags/1.jpg">
```


  - 属性详情

<div class="to-center"> 
  <table>
        <thead>
            <tr>
                <th>Attribute</th>
                <th>Value</th>
                <th>Explaination</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>text</td>
                <td><a
                        href="#color">rgb(r,g,b)<br />rgb(r%,g%,b%)<br />#rrggbb或#rgb<br />colorname</a></td>
                <td>
                    rgb函数（Int，取值0～255）<br />rgb函数（percent，取值0～100）<br />十六进制数（6位或3位，0～9，A～F）<br />颜色英文名（red,green,blue
                    etc. ）</td>
            </tr>
            <tr>
                <td>bgcolor</td>
                <td>同上</td>
                <td>规定文档的背景颜色，不建议使用</td>
            </tr>
            <tr>
                <td>alink</td>
                <td>同上</td>
                <td>规定文档中的活动链接颜色</td>
            </tr>
            <tr>
                <td>link</td>
                <td>同上</td>
                <td>规定未访问的链接的默认颜色</td>
            </tr>
            <tr>
                <td>vlink</td>
                <td>同上</td>
                <td>规定已被访问的链接的颜色</td>
            </tr>
            <tr>
                <td>background</td>
                <td>URL</td>
                <td>规定文档的背景图像（图像过大影响访问速度）</td>
            </tr>
            <tr>
                <td>topmargin</td>
                <td>pixel</td>
                <td>规定文档中的上边距的大小</td>
            </tr>
            <tr>
                <td>leftmargin</td>
                <td>pixel</td>
                <td>规定文档中左边距的大小</td>
            </tr>
        </tbody>
    </table>
</div>


## 标记类型

- 单标记：单标记元素没有结束标记，通常用于表示没有内容的元素。
- 双标记：双标记元素有开始和结束标记，用于表示包围在标记中的内容。

## 标签间的关系

> 父子关系（嵌套关系）

```html
<head>
	<title> son </title>
</head>
```

> 兄弟关系（并列关系）

```html
<head></head>
<body></body>
```

### 行

> 个人记忆标记，非正式

## H系列 

> 六种标题

- `<h1></h1>`

- `## `

- `<h3></h3>`

- `<h4></h4>`

- `<h5></h5>`

- `<h6></h6>`

## 段落

- `<p align = center> central paragraph </p>`

## 换行&水平线

- `<br>` or `<br/>`
- `<hr width="" size="" color="">`

<div class="to-center">
<table>
<thead>
    <tr>
        <th>Attribute</th>
        <th>Value</th>
        <th>Explaination</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>width</td>
        <td>像素（px）或百分比</td>
        <td>设置水平线宽度</td>
    </tr>
    <tr>
        <td>size</td>
        <td>整数（单位px）</td>
        <td>设置水平线高度</td>
    </tr>
    <tr>
        <td>color</td>
        <td>同<a href="#color">颜色</a></td>
        <td>设置颜色</td>
    </tr>
    <tr>
        <td>align</td>
        <td>left | center | right</td>
        <td>设置位置</td>
    </tr>
</tbody>
</table>
</div>

## 文本格式

- 文本位置

<div class="to-center"> 
<table>
<thead>
    <tr>
        <th>key</th>
        <th>Explanation</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><code>left</code></td>
        <td>左对齐</td>
    </tr>
    <tr>
        <td><code>center</code></td>
        <td>居中</td>
    </tr>
    <tr>
        <td><code>right</code></td>
        <td>右对齐</td>
    </tr>
    <tr>
        <td><code>justify</code></td>
        <td>两端对齐</td>
    </tr>
</tbody>
</table>
</div>

- 特殊字符

<div class="to-center"> 
<table>
            <thead>
                <tr>
                    <th>Display</th>
                    <th>Explaination</th>
                    <th>Code</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>&nbsp;</td>
                    <td>显示一个空格</td>
                    <td><code>&amp;nbsp;</code></td>
                </tr>
                <tr>
                    <td>&lt;</td>
                    <td>小于</td>
                    <td><code>&amp;lt;</code></td>
                </tr>
                <tr>
                    <td>&gt;</td>
                    <td>大于</td>
                    <td><code>&amp;gt;</code></td>
                </tr>
                <tr>
                    <td>&amp;</td>
                    <td>&amp;符号</td>
                    <td><code>&amp;amp;</code></td>
                </tr>
                <tr>
                    <td>&quot;</td>
                    <td>双引号</td>
                    <td><code>&amp;quot;</code></td>
                </tr>
                <tr>
                    <td>&copy;</td>
                    <td>版权</td>
                    <td><code>&amp;copy;</code></td>
                </tr>
                <tr>
                    <td>&reg;</td>
                    <td>注册商标</td>
                    <td><code>&amp;reg;</code></td>
                </tr>
                <tr>
                    <td>&times;</td>
                    <td>乘号</td>
                    <td><code>&amp;times;</code></td>
                </tr>
                <tr>
                    <td>&divide;</td>
                    <td>除号</td>
                    <td><code>&amp;divide;</code></td>
                </tr>
            </tbody>
        </table>
</div>


- 拼音格式

```html
  
  <ruby>
    中<rt>
    		zhong
    	</rt>
  	国<rt>
    		guo
    	</rt>
  </ruby>
```




- 文本修饰

<div class="to-center"> 
<table>
<thead>
    <tr>
        <th>Explaination</th>
        <th>key</th>
        <th>key</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>加粗</td>
        <td><code>&lt;b&gt;&lt;/b&gt;</code></td>
        <td><code>&lt;strong&gt;&lt;/strong&gt;</code></td>
    </tr>
    <tr>
        <td>下划线</td>
        <td><code>&lt;u&gt;&lt;/u&gt;</code></td>
        <td><code>&lt;ins&gt;&lt;/ins&gt;</code></td>
    </tr>
    <tr>
        <td>倾斜</td>
        <td><code>&lt;i&gt;&lt;/i&gt;</code></td>
        <td><code>&lt;em&gt;&lt;/em&gt;</code></td>
    </tr>
    <tr>
        <td>删除线</td>
        <td><code>&lt;s&gt;&lt;/s&gt;</code></td>
        <td><code>&lt;del&gt;&lt;/del&gt;</code></td>
    </tr>
    <tr>
        <td>变大</td>
        <td><code>&lt;big&gt;&lt;/big&gt;</code></td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td>变小</td>
        <td><code>&lt;small&gt;&lt;/small&gt;</code></td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td>上标</td>
        <td><code>&lt;sup&gt;&lt;/sup&gt;</code></td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td>下标</td>
        <td><code>&lt;sub&gt;&lt;/sub&gt;</code></td>
        <td>&nbsp;</td>
    </tr>
</tbody>
</table>
</div>

- 引用和术语

<div class="to-center"> 
<table>
            <thead>
                <tr>
                    <th>key</th>
                    <th>Explaination</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>&lt;abbr&gt; etc. &lt;/abbr&gt;</code></td>
                    <td>定义缩写</td>
                </tr>
                <tr>
                    <td><code>&lt;address&gt; Beijing China &lt;/address&gt;</code></td>
                    <td>定义地址</td>
                </tr>
                <tr>
                    <td><code>&lt;blockquote&gt; 长引用 &lt;/blockquote&gt;</code></td>
                    <td>定义长引用</td>
                </tr>
                <tr>
                    <td><code>&lt;cite&gt; 引用、引证 &lt;/cite&gt;</code></td>
                    <td>定义引用引证</td>
                </tr>
                <tr>
                    <td><code>&lt;q&gt; 短语引用 &lt;/q&gt;</code></td>
                    <td>定义短引用语</td>
                </tr>
                <tr>
                    <td><code>&lt;dfn&gt; 定义项目 &lt;/dfn&gt;</code></td>
                    <td>定义个定义项目</td>
                </tr>
            </tbody>
        </table>
</div>

- 计算机输出标记

<div class="to-center"> 
<table>
<thead>
    <tr>
        <th>key</th>
        <th>Explaination</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><code>&lt;code&gt; code &lt;/code&gt;</code></td>
        <td>定义计算机代码</td>
    </tr>
    <tr>
        <td><code>&lt;kbd&gt; keyboard code &lt;/kbd&gt;</code></td>
        <td>定义键盘码</td>
    </tr>
    <tr>
        <td><code>&lt;samp&gt; sample &lt;/samp&gt;</code></td>
        <td>定义计算机代码样本</td>
    </tr>
    <tr>
        <td><code>&lt;tt&gt; printer code &lt;/tt&gt;</code></td>
        <td>定义打印机代码</td>
    </tr>
    <tr>
        <td><code>&lt;var&gt; variable &lt;/var&gt;</code></td>
        <td>定义变量</td>
    </tr>
    <tr>
        <td><code>&lt;pre&gt; pre text &lt;/pre&gt;</code></td>
        <td>定义预格式化</td>
    </tr>
</tbody>
</table>
</div>
  


## 字体

- `<font key1="" key2="" ...> ... </>`

- 字体属性标记：

<div class="to-center"> 
<table>
<thead>
    <tr>
        <th>Attribute</th>
        <th>Value</th>
        <th>Explaination</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>size</td>
        <td>+1～+7，1～7，-1～-7</td>
        <td>同数值大小相匹配</td>
    </tr>
    <tr>
        <td>color</td>
        <td>同<a href="#color">颜色</a></td>
        <td>同<a href="#color">颜色</a></td>
    </tr>
    <tr>
        <td>face</td>
        <td>字体1,字体2,......</td>
        <td>可以有多个值，用逗号分隔。从左到右依此选用，都不存在，默认为宋体</td>
    </tr>
</tbody>
</table>
</div>

## 滚动文字

> 为文字添加滚动的效果，丰富页面内容

```html
<marquee width="" height="" bgcolor="" direction="up|down|left|right" 
         behavior="scoll|slide|alternate" hspace="" vspace="" scollamount="" scolldelay="" 
         loop="" onmouseover="this.stop()" onMouseOut="this.start()">
  <font size="4"> 
  	这是一个滚动的文字
  </font> 

</marquee>
```

- 宽度，高度：width,height
- 背景色：bgcolor，值同<a href="#color">颜色</a>
- 方向：direction 上下左右
- 表现：behavior平滑，滚动，交替
- 边距：hspace,vspace
- 滚动速度、暂停时间：scollamount,scolldelay
- 循环次数：loop
- 鼠标悬停停止，离开继续滚动：onmouseover,onMouseOut



## 链接

- 链接的路径

  - 根路径（熟悉linux一定很清楚这个，这里的根路径一般是与网站的域名对应）
  - 绝对路径：绝对路径一般是从根目录开始
  - 相对路径：相对路径是从当前页面开始 `./` 代表当前的页面`../代表上级`

- 网址链接：
  `<a href="https://chenpeel.xyz"></a>` —— <a href="https://chenpeel.xyz">blog_github_page</a> 
  `<a href="https://zachary.world"></a>` ——<a href="https://zachary.world"> blog</a>

- 站内链接：<a href="/">我的首页</a>

- 页面书签链接：`<a href= "#name" title="" target = "_blank"> The link </a>`

  如<a href= "#html" >Go to HTML</a> 跳转到HTML篇首

<div class="to-center"> 
<table>
<thead>
    <tr>
        <th>Key</th>
        <th>Explaination</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>href</td>
        <td>指向锚点</td>
    </tr>
    <tr>
        <td>name/id</td>
        <td>锚点名称</td>
    </tr>
    <tr>
        <td>title</td>
        <td>链接的提示信息</td>
    </tr>
    <tr>
        <td>target</td>
        <td>指定打开的目标窗口</td>
    </tr>
</tbody>
</table>
</div>

  - target有五种值

<div class="to-center"> 
<table>
<thead>
    <tr>
        <th>Value</th>
        <th>Explaination</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>_self</td>
        <td>在当前框架中打开链接</td>
    </tr>
    <tr>
        <td>_blank</td>
        <td>在新的空白页中打开链接</td>
    </tr>
    <tr>
        <td>_top</td>
        <td>在顶层框架中打开链接</td>
    </tr>
    <tr>
        <td>_parent</td>
        <td>在上层框架打开链接</td>
    </tr>
    <tr>
        <td>framename</td>
        <td>在指定的框架或浮动的框架内打开链接，框架名称可以自定义</td>
    </tr>
</tbody>
</table>
</div>

- 链接也可用于下载文件、访问FTP服务器、打开图片详情、发送电子邮件，如下
```html
  
  <a href="ftp://chenpeel.xyz"> chenpeel </a> <!-- FTP链接 仅示例 -->
  
  <a href="https://github.com/Chenpeel/Chenpeel.github.io/blob/master/imags/2.jpeg">
    ![](../public/img/2.jpg)
  </a> <!-- 图片跳转 -->
  
  <a href="mailto:chenpeelalpha@gmail.com;
           ?subject=point me & ?cc=example@gmail.com & ?bcc=example@gmail.com & ?body=这周没课啦！">
    点击发送邮件
  </a>
  
```




### 块

> 个人记忆方式，非正式



## 列表

> 为网页进行合理布局，有序列表和无序列表组合嵌套使用，使页面层次分明


<div class="to-center">
<table>
<thead>
    <tr>
        <th>Type</th>
        <th>Key</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>无序列表</td>
        <td><code>&lt;ul&gt; unordered list &lt;/ul&gt;</code></td>
    </tr>
    <tr>
        <td>有序列表</td>
        <td><code>&lt;ol&gt; ordered list &lt;/ol&gt;</code></td>
    </tr>
    <tr>
        <td>定义列表</td>
        <td><code>&lt;dl&gt; defined list &lt;/dl&gt;</code></td>
    </tr>
    <tr>
        <td>菜单列表</td>
        <td><code>&lt;menu&gt; menu &lt;/menu&gt;</code></td>
    </tr>
    <tr>
        <td>目录列表</td>
        <td><code>&lt;dir&gt; directory &lt;/dir&gt;</code></td>
    </tr>
</tbody>
</table>
</div>

- 无序列表（unordered list）

```html
  
  <ul type="">
    <li type=""> name </li>
    <li type=""> name </li>
    ...
  </ul>
```




<div class="to-center"> 
<table>
<thead>
    <tr>
        <th>Key</th>
        <th>Explaination</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>disc</td>
        <td>实心圆圈</td>
    </tr>
    <tr>
        <td>circle</td>
        <td>空心圆圈</td>
    </tr>
    <tr>
        <td>square</td>
        <td>实心正方形</td>
    </tr>
    <tr>
        <td>none</td>
        <td>不使用</td>
    </tr>
</tbody>
</table>
</div>

- 有序列表（ordered list）

```html
  
  <ol type="" start="" >
    <li type=""> name1 </li>
    <li type=""> name2 </li>
    ...
  </ol>
```


  - `start` ：数值，有序列表中的起始数值
  - `typr` ：可以是 数字、大小写的字母、大小写的罗马字母

<div class="to-center"> 
<table>
    <tr>
      <th>Key</th>
      <th>Explanation</th>
    </tr>
    <tr>
      <td>decimal</td>
      <td>数字 123...</td>
    </tr>
    <tr>
      <td>lower-roman</td>
      <td>小写罗马数字 i, ii, iii...</td>
    </tr>
    <tr>
      <td>upper-roman</td>
      <td>大写罗马数字 I,II,III,IV...</td>
    </tr>
    <tr>
      <td>lower-alpha</td>
      <td>小写字母 abc...</td>
    </tr>
    <tr>
      <td>upper-alpha</td>
      <td>大写字母 ABC...</td>
    </tr>
  </table>
</div>

​    

- 定义列表（difined list）

```html
  
  <dl>
    <dt>product1</dt>
    	<dd>describ1</dd>
  	  <dd>describ2</dd>
    <dt>product2</dt>
    	<dd>describ1</dd>
  	  <dd>describ2</dd>
  </dl>
```


## 表格

- 表：`<table> </table>`
- 表题：`<caption> name </caption>`
- 表头：`<th></th>` or `<thead></thead>`
- 行：`<tr></tr>`
- 格：`<td></td>` 
- 底：`<tfoot></tfoot>`
```html
<table border="100" width="600" height="200">
  <caption>表题</caption>
  <tr>
  	<th> 表头c1 </th> <th> 表头c2 </th> <th> 表头c3 </th>
  </tr>
  <tr>
  	<td> 单元格1-1 </td> <td> 单元格1-2 </td> <td> 单元格1-3 </td>
  </tr>
  <tr>
  	<td> 单元格2-1 </td> <td> 单元格2-2 </td> <td> 单元格2-3 </td>
  </tr>
  <tr>
  	<td> 单元格3-1 </td> <td> 单元格3-2 </td> <td> 单元格3-3 </td>
  </tr>
  <tfoot>
		<td> 总结： </td> <td> 总结1 </td> <td> 总结2 </td>
  </tfoot>
    <!--<caption>当然写在这也是可以的</caption>-->
</table>
```
> 合并单元格

- 行合并：删掉其中一个单元格的代码，在另一个`<td></td>`中添加属性`colspan`即column span
- 列合并：删掉其中一个单元格的代码，在另一个`<td></td>`中添加属性`rowspan`

```html
<table border="200" width="1000" height="500" align="center">
  <caption>表测</caption>
  <tr>
      <th> 表头c1 </th>
      <th> 表头c2 </th>
      <th> 表头c3 </th>
  </tr>
  <tr>
      <td> 单元格1-1 </td>
      <td rowspan="2"> 单元格1-2 & 2-2 </td>
      <td> 单元格1-3 </td>
  </tr>
  <tr>
      <td> 单元格2-1 </td>
      <!-- <td> 单元格2-2 </td> -->
      <td> 单元格2-3 </td>
  </tr>
  <tr>
      <td> 单元格3-1 </td>
      <td colspan="3"> 单元格3-2 & 3-3</td>
      <!-- <td> 单元格3-3 </td> -->
  </tr>
  <tfoot>
      <td>总结：</td>
      <td>总结1</td>
      <td>总结2</td>
  </tfoot>
```





## <a id="div">div图层</a>

> 分区/分节，会自动开始新一行，与<a href="#span">span标记</a> 向对照
>
> 可以被标记属性<a href="#id">id</a>、<a href="#class">class</a>、style

- `<div id="" class="" style="" > 块包含的内容 </div>`

> 设置style的属性

<div class="to-center"> 
<table>
<thead>
    <tr>
        <th>Attribute</th>
        <th>Key</th>
        <th>Explaination</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>position</td>
        <td>static|absolute|relative|fixed</td>
        <td>静态、绝对、相对位置、图层固定</td>
    </tr>
    <tr>
        <td>border</td>
        <td>线粗细、线型、线颜色</td>
        <td>边框设置</td>
    </tr>
    <tr>
        <td>background-color</td>
        <td>同<a href="#color">颜色</a></td>
        <td>背景颜色</td>
    </tr>
    <tr>
        <td>left</td>
        <td>pixes|%</td>
        <td>图层左边距</td>
    </tr>
    <tr>
        <td>top</td>
        <td>pixes|%</td>
        <td>图层与顶边距</td>
    </tr>
    <tr>
        <td>width</td>
        <td>pixes|%</td>
        <td>图层宽度</td>
    </tr>
    <tr>
        <td>height</td>
        <td>pixes|%</td>
        <td>图层高度</td>
    </tr>
    <tr>
        <td>float</td>
        <td>left|right|none</td>
        <td>允许浮动元素在左边、右边、不浮动</td>
    </tr>
    <tr>
        <td>clear</td>
        <td>left|right|both|none</td>
        <td>清除左、右、左右浮动和允许浮动</td>
    </tr>
    <tr>
        <td>z-index</td>
        <td>auto|数字</td>
        <td>子图层按照父图层显示、无单位整数或负数</td>
    </tr>
    <tr>
        <td>overflow</td>
        <td>scroll|visible|auto|hidden</td>
        <td>内容溢出控制，始终显示滚动条、不显示，但超出部分可见、内容超出时显示、超出时隐藏内容</td>
    </tr>
    <tr>
        <td>display</td>
        <td>block|inline|none</td>
        <td>表示按照块元素显示、行内方式显示和隐藏</td>
    </tr>
</tbody>
</table>
</div>

> div 图层可以嵌套和层叠使用
>
> 层叠使用时必须将position设置成绝对位置



## <a id="span">span</a>标记

> span标记是行内标记，不回自动换行。 与<a href="#div">div图层</a>相对应
>
> 可以被标记属性<a href="#id">id</a>、<a href="#class">class</a>
>
> 纯粹的应用样式，没有结构上的意义

- div标记可以包含span，反之不行

- display可以转化块标记和行

<div class="to-center"> 
<table>
<thead>
    <tr>
        <th>Key</th>
        <th>Explaination</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>none</td>
        <td>此元素不会被显示</td>
    </tr>
    <tr>
        <td>inline</td>
        <td>设置为行内元素，在行内显示</td>
    </tr>
    <tr>
        <td>block</td>
        <td>设置为块级元素，以块状显示，自动换行</td>
    </tr>
    <tr>
        <td>inline-block</td>
        <td>设置为行内块标记</td>
    </tr>
    <tr>
        <td>inherit</td>
        <td>规定应该从父元素继承display属性</td>
    </tr>
</tbody>
</table>
</div>







## 图片

- 单标记

- `<img src="" alt="" >`

<div class="to-center"> 
<table>
            <thead>
                <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                    <th>Explaination</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>alt</td>
                    <td>text</td>
                    <td>图像显示错误的替代文本</td>
                </tr>
                <tr>
                    <td>src</td>
                    <td>URL/PATH</td>
                    <td>显示的源</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>text</td>
                    <td>图像名称</td>
                </tr>
                <tr>
                    <td>height</td>
                    <td>pixels/%</td>
                    <td>图高</td>
                </tr>
                <tr>
                    <td>width</td>
                    <td>pixels/%</td>
                    <td>图宽</td>
                </tr>
                <tr>
                    <td>align</td>
                    <td>top|middle|bottom<br />left|center|right</td>
                    <td>如何在文本中排布</td>
                </tr>
                <tr>
                    <td>border</td>
                    <td>pixels</td>
                    <td>周围边框</td>
                </tr>
                <tr>
                    <td>hspace</td>
                    <td>pexels</td>
                    <td>左右侧空白</td>
                </tr>
                <tr>
                    <td>vspace</td>
                    <td>pixels</td>
                    <td>顶部和底部空白</td>
                </tr>
                <tr>
                    <td>usemap</td>
                    <td>URL</td>
                    <td>将图像定义为客户端图像映射</td>
                </tr>
            </tbody>
        </table>
</div>

  - usemap 可以映像跳转到其他，如下
```html
  
  <img src="../pics/1.jpeg" usemap="#example">
  <map name="example">
  	<area shape="circle" croods="0,0,100" href="http://example.com" alt="example">
  </map>
```


<div class="to-center"> 
<table>
<tr>
  <th>Shape Value</th>
  <th>Explanation</th>
  <th>Coords Value</th>
  <th>Explanation</th>
</tr>
<tr>
  <td>rect</td>
  <td>矩形</td>
  <td>$x_1, y_1, x_2, y_2$</td>
  <td>矩形的两个顶点坐标</td>
</tr>
<tr>
  <td>circle</td>
  <td>圆形</td>
  <td>$x_o, y_o, radius$</td>
  <td>圆心坐标和半径</td>
</tr>
<tr>
  <td>poly</td>
  <td>多边形</td>
  <td>$x_1, y_1, x_2, y_2, ..., x_n, y_n, x_1, y_1$</td>
  <td>各顶点坐标（首尾相同）</td>
</tr>
</table>
</div>

## 音频

- `<audio src="" alt="">`
- 同img

## 视频

- `<video src="" alt="">`
- 显示播放的控件：Control 
- 自动播放：autoplay 
- 循环播放：loop 

## 多媒体

- 包含Midi、Mav、AIFF、SWF、AV、MP3、MOV、AVI等等
- `<embed src="" ... > </embed>`
- 自动播放：atuostart （true/false）
- 循环播放：loop（true/false）


### 域

> 个人记忆标记，非正式

## 表单

> 表单元素

- input
```html

<input type="">
```


  > type属性值和描述如下：

  |   Key    |                  Explaination                  |
  | :------: | :--------------------------------------------: |
  |  button  |        定义点击按钮，用于通过js启动脚本        |
  | checkbox |                     复选框                     |
  |   file   |      定义输入字段和“浏览”按钮，供文件上传      |
  |  hidden  |               定义隐藏的输入字段               |
  |  image   |             定义图像形式的提交按钮             |
  | password |               定义密码字段，隐文               |
  |  radio   |                  定义单选按钮                  |
  |  reset   |       定义重置按钮，以清除表单的所有数据       |
  |  submit  |        定义提交按钮，将数据发送给服务器        |
  |   text   | 定义单行的输入字段，用户可输入文本，默认20字符 |

  > 其他属性：

  | Attribute |    Key     |            Explaination             |
  | :-------: | :--------: | :---------------------------------: |
  |   name    |   自定义   |         定义input元素的名称         |
  |   value   |   自定义   |          规定input元素的值          |
  |  checked  |  checked   | 规定此input元素首次加载时应当被选中 |
  | maxlength | $$ \Z_+ $$ |     规定输入字段的最大字符长度      |

  >  label标签和input共同作用

```html
  
  <label for="text"> 用户名：</label><input type="text" id = "text"> 
```

![](/imgs/image-20230723193656094.jpg)

  点击“用户名”三字就可输入文字等等

- select
```html

<select>
  <option selected="selected">default</option>
  <option>选项1</option>
  <option>选项2</option>
	<option>选项3</option>
</select>
```


![](/imgs/image-20230723194536444.jpg)

- textarea
```html
<textarea cols="100" rows="20">点击输入文字……</textarea>
```


![](/imgs/image-20230723195005236.jpg)



## 浮动框架

> 内嵌框架可以在网页中直接插入其他网页或内容

```html
<body>
  <iframe src="https://github.com/Chenpeel/Notes-of-CS/tree/master/pics/1.jpeg" name="test" width="1400" height="1100" frameborder="1" marginwidth="300" marginheight="100" scolling="yes">
    
  </iframe>
</body>
```

> 属性：

- 来源：src
- 命名：name
- 宽度：width
- 高度：height
- 边框：frameborder
- 边距：marginwidth,marginheight










<br>
<hr>

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

## <a id="class">类选择器</a>

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




## <a id="id">id选择器</a>

- 以`#id_name` 命名，通过`id= "id_name"`使用
- 和类选择器类似，但id选择器只能使用一次

## 通配符选择器

- 以`*`命名，意为全选



## 后代选择器

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




## 子元素选择器

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


## 并集选择器

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




## 伪类选择器

- 使用`:`来表示常用的有链接伪类、结构伪类等

  |     Name     |            Explaination             |
  | :----------: | :---------------------------------: |
  |     link     |     设置a标记在未被访问前的样式     |
  |    hover     |     设置a标记在鼠标悬停时的样式     |
  |    active    | 设置a标记在被点击和释放之间时的样式 |
  |   visited    |      设置a标记在被访问后的样式      |
  | first-letter |   作用于块，设置第一个字符的样式    |
  |  first-line  |     作用于块，设置第一行的样式      |
  | first-child  |       设置第一个子标记的样式        |
  |     lang     |    设置具有lang属性的标记的样式     |

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



## 属性选择器

- 对于低版本的浏览器可能不支持
- 可以使用`[Attribute]`的方式来进行选择





## 单位

## 绝对单位

> 绝对单位在网页中很少使用，一般应用于平面印刷

- 英寸（in）：使用最广泛的长度单位（1 in = 2.54cm）
- 厘米（cm）：生活中最常用的单位
- 毫米（mm）：在研究领域使用较为广泛
- 磅（pt）：在印刷领域使用广泛，也称点。CSS也常用pt设置字体大小（1 pt = 1/72 in）
- pica（pc）：印刷领域使用较多（1 pc = 12 pt）

## 相对单位

> 相对单位的大小是不固定的

- em：表示元素的字体高度
- ex：表示以所使用的字体中小写字母x的高度作为参考。在实际使用中，浏览器通过em/2来取得ex
- px：表示根据屏幕的像素点来确定的
- 百分比%：相对单位值，通过另一个值来计算



## 文字文本样式

## 文字

|  Attribute   |            Key            |               Explaination               |
| :----------: | :-----------------------: | :--------------------------------------: |
| font-family  | "Microsoft YaHei" , Arial | 默认使用第一个，本地无此字体则使用下一个 |
|  font-size   |        number + px        |               定义文字大小               |
|  font-style  |        number + px        |            字体样式，倾斜 ...            |
| font-weight  | number \|  normal \| ...  |                 字体宽度                 |
| font-variant |   normal \| small-caps    |       正常字体/小型的大写字母字体        |
|     font     |         复合使用          |    综合上述属性，最少要有size和family    |
## 文本

|    Attribute    |                             Key                              |                         Explaination                         |
| :-------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|      color      | 直接使用英文如red/blue<br>或者使用`#ff00ff`<br>或者使用`rgb(255,0,0)`<br>同<a href="#color">颜色</a> |                           文本颜色                           |
|   text-align    |                      left/center/right                       |                   左对齐，居中对齐，右对齐                   |
| text-decoration |             none/underline/overline/line-through             |               取消划线，下划线，上划线，删除线               |
|   text-indent   |                 number + px \| number  + em                  |               缩进像素大小/缩进多少个文字大小                |
|   line-height   |                         number + px                          |                    文字上下两行之间的距离                    |
| letter-spacing  |                      normal \| em/ex...                      |                           字符间距                           |
| text-transform  |         capitalize \| uppercase \| lowercase \| none         |              首字母大写、转大写、转小写、不转换              |
| vertical-align  |      top \| middle \| bottom \| text-top \| text-bottom      | 元素顶端与行中最高元素顶端对齐 、<br/>元素放置在父元素中部、<br/>元素顶端与行中最低元素的顶端对齐、<br/>元素顶端与父元素字体顶端对齐、<br/>元素底端与父元素字体底端对齐 |





## <a id="color">颜色</a>

> 关于颜色的渲染千篇一律
>
> 常用颜色编码如下

|  Name   | Hexadecimal |   rgb  Percentage   |   rgb  Integer   |
| :-----: | :---------: | :-----------------: | :--------------: |
|  black  |   #000000   |    rgb(0%,0%,0%)    |    rgb(0,0,0)    |
|  white  |   #FFFFFF   | rgb(100%,100%,100%) | rgb(255,255,255) |
|   red   |   #FF0000   |   rgb(100%,0%,0%)   |   rgb(255,0,0)   |
| yellow  |   #FFFF00   |  rgb(100%,100%,0%)  |  rgb(255,255,0)  |
|  lime   |   #00FF00   |   rgb(0%,100%,0%)   |   rgb(0,255,0)   |
|  aqua   |   #00FFFF   |  rgb(0%,100%,100%)  |  rgb(0,255,255)  |
|  blue   |   #0000FF   |   rgb(0%,0%,100%)   |  rgb(0,255,255)  |
| fuchsia |   #FF00FF   |  rgb(100%,0%,100%)  |  rgb(255,0,255)  |
|  gray   |   #808080   |  rgb(50%,50%,50%)   | rgb(128,128,128) |
| silver  |   #c0c0c0   |  rgb(75%,75%,75%)   | rgb(192,192,192) |
| maroon  |   #800000   |   rgb(50%,0%,0%)    |   rgb(128,0,0)   |
|  olive  |   #808000   |   rgb(50%,50%,0%)   |  rgb(128,128,0)  |
|  green  |   #008000   |   rgb(0%,50%,0%)    |   rgb(0,128,0)   |
|  teal   |   #008080   |   rgb(0%,50%,50%)   |  rgb(0,128,128)  |

## 背景

> 指定背景色彩、图案等，可以直接使用复合属性background

|       Attribute       |                             Key                              |                Explaination                |
| :-------------------: | :----------------------------------------------------------: | :----------------------------------------: |
|   background-color    |                  <a href="#color">如上</a>                   |                  背景颜色                  |
|   background-image    |                         url \| none                          |                  背景图案                  |
|   background-repeat   |         repeat \| repeat-x \| repeat-y \| no-repeat          | 在背景图小于指定元素的情况下，是否充分填充 |
| background-attachment |                       scroll \| fixed                        |          背景图案是否跟随元素滚动          |
|  background-position  | left\|center\|right<br />top\|center\|bottom<br />x%\|y%<br />xpos\|ypos |             背景图案的起始位置             |







<br>
<hr>

# <a name="js"> JavaScript </a>

> 客户端脚本语言

- 核心（ECMAScript）
- 文档对象模型（Document Object Model,DOM）
- 浏览器对象模型（Brower Object Model,BOM）

