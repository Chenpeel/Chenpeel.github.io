<a id="md"> 用Markdown写Markdown 🤣 [我先归了](./Markdown.md) </a>[^1]

> 使用的编辑器 
[Typora](https://typoraio.cn)

<hr>
> 基本的

<s>删除线</s> 
:
`<s>删除线</s>` 或
option + command + S

**加粗**
:
`**加粗**` 或
command + B


*倾斜*
:
`*倾斜*` 或
command + I 

<u>下划线</u> 
:
`<u> 下划线 </u>` 或
command + U 


**<u>*ABC*</u>**
:
`**<u>*ABC*</u>**` 或
command + BIU 


==高亮==
:
`==高亮==` 或
shft+command + H

<hr>

> 上下角标

cm^3^
:
`^ + num + ^ `


H~2~O
:
`~ + Num + ~`

<hr>

> 多级层次

- 田径
* 田赛
* 径赛
  * 跳高  
  * 跳远
    * 
* 游泳
- 举重

` '*' / '-' + space` 或 
option + command + U 
<br>

> 有序层次

一键三连：
1. 点赞
2. 投币
3. 收藏

`1. 2. 3. + space`

> 勾选框

-[x] 早饭
-[x] 午饭
-[x] 晚饭
-[x] 我的人生
-[ ] 原地趋势  


todo: `- [ ]` <br>
finish: `- [x]`  <br>或者
option + command + X 

<hr>

> 行内代码


` ~行内代码~ ` 
<br>
~ `行内代码` ~
<br>
使用英文的 ~ 和 `

>  代码块 :

```cpp
#include <iostream>
using std::cout;
using std::endl;
int main (){
	cout<<Python is the best script .sh <<endl; 
	return 0
}
```

` ~~~  + C/C++/Python/Rust/Bash/Cmake + ~~~`
<br>
` ``` + C/C++/Python/Rust/Bash/Cmake + ``` `
<br>
 option + command +C


<hr>

数学公式编辑笔者使用的是Latex的公式语法

<a href="https://www.latex-project.org/" text-description="none"> Latex </a>

>  行内公式：

$\sin{2x}=2 \sin {x}\cos{x}$
:

`$ \sin{2x} = 2 \sin{x}\cos{x} $` 或
control + M 

>  公式块：

$$
E_{\rm k} = \frac  1 2 m v^2
\tag{1.1}
$$
$$
E = mc^2
\tag{1.2}
$$

公式动能公式 $(1.1)$ <br>
质能方程 $(1.2)$

`$$ + LaTeX + $$`


> 希腊字母

delta & lambda <br>
$\delta,\lambda$ <br>

` $\delta , \lambda$`

 $\alpha,\beta,\gamma,\delta,\epsilon,\zeta,\eta,\theta,\kappa,\lambda,\mu,\nu,\xi,\omicron,\pi,\rho,\sigma,\tau,\upsilon,\phi,\chi,\psi,\omega$

> 首字大写
$\Delta,\Lambda$ <br>

$\Alpha,\Beta,\Gamma,\Delta,\Epsilon,\Zeta,\Eta,\Theta,\Kappa,\Lambda,\Mu,\Nu,\Xi,\Omicron,\Pi,\Rho,\Sigma,\Tau,\Upsilon,\Phi,\Chi,\Psi,\Omega$

> 变体

$\vartheta,\varkappa,\varsigma,\varrho,\varphi,\varpi,\varTheta,\varSigma,\varPi,$


<hr>

> 表格

` | | | | | ` 或
option + command +T

| day  |  Mon  | Tue  | Wed  | Thu  | Fri  | Sat  | Sun  |
| ---- | :---: | ---- | ---- | ---- | ---- | ---- | ---- |
| 早   | 豆浆 油条 小笼包  |      |      |      |      |      |      |
| 午   |  米饭 鸡腿 蟹黄堡  |      |      |      |      |      |      |
| 晚   | 面条 辣酱 加点蒜 |      |      |      |      |      |      |









> 注释
> fuck[^1]
<br>

` > + space`
` > + space + [^1]`



> 网页跳转

[bilibili](https:www.bilibili.com)

`[bilibili](bilibili.com)` 或
command + K

> 页内跳转 , 首先需要有一个锚点作为目标 :  `<a id="md"> 我在用Markdown写Markdown 🤣 [我先归了]() </a> `

<a href="#md">上述</a> <br>
`<a href="#md"></a>` 使用`#`作为目标选择器<br> 

> 这里使用的是HTML中的方式, Markdown方式在页面中可能无法显示跳转

[上述](#md) <br>
`[上述](#md)`

<br>
<br>




<hr>
The End
<hr>


[^1]: /notes/algorithms/analysis/recursion.md







