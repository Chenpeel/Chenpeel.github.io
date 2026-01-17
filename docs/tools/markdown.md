---
title: Markdown
date: 2023-09-10
category: Tools
published: true
skills_cloud:
  - Markdown
at: true

---

# Markdown

<a id="md"> 用Markdown写Markdown [这何尝不是一种递归](./markdown.md) </a>[^1]

> 使用的编辑器
>
> [Typora](https://typoraio.cn)



<hr>


### 文字操作

`<s>删除线</s>` ：<s>删除线</s>

`**加粗**` ：**加粗**

`*倾斜*` ：*倾斜*

`<u> 下划线 </u>` ：<u>下划线</u>

`**<u>*ABC*</u>**` ：**<u>*ABC*</u>**

`==高亮==` :<img src="/imgs/gaoliang.png" alt="image-20250115184502659" style="zoom:50%;" />

<hr>

### 上下角标

`^ + num + ^ `：$cm^3$

`~ + Num + ~`：$H_2O$

<hr>

### 多层分点

#### 无序

` '*' / '-' + 空格` ：

* 田径
    * 田赛
    * 径赛
        * 跳高
        * 跳远
    * 游泳
    * 举重



#### 有序

`1. 2. 3. + 空格`：

> 必须是英文句号

一键三连：
1. 点赞
2. 投币
3. 收藏


### 勾选框

#### 已完成
`- [x]`

<input type="checkbox" checked>早饭
<input type="checkbox" checked>午饭
<input type="checkbox" checked>晚饭
<input type="checkbox" checked>我的人生

#### 未完成
`- [ ]`

<input type="checkbox">原地趋势

<hr>

### 代码

#### 行内

> 一组反引号 `` 或 ~~

`echo "hello world"`

#### 代码块

` ~~~  + C/C++/Python/Rust/Shell/Cmake/... + ~~~`

` ``` + C/C++/Python/Rust/Shell/Cmake/... + ``` `

```c
#include <stdio.h>
void main(){
  printf("Hello World!\n");
}
```



<hr>

### 公式

> 数学公式编辑Markdown支持部分Latex的公式语法，可能会有冲突
>
>
>
> [Latex](https://www.latex-project.org/)

#### 行内：

`$ \sin{2x} = 2 \sin{x}\cos{x} $` ：$\sin{2x}=2 \sin {x}\cos{x}$



#### 公式块

`$$ + LaTeX + $$`：
$$
E_{\rm k} = \frac  1 2 m v^2
\tag{1.1}
$$
$$
E = mc^2
\tag{1.2}
$$

>  动能公式 $(1.1)$
>
> 质能方程 $(1.2)$



#### 字母

`$\alpha,\beta,\gamma,\delta,\epsilon,\zeta,\eta,\theta,\kappa,\lambda,\mu,\nu,\xi,\omicron,\pi,\rho,\sigma,\tau,\upsilon,\phi,\chi,\psi,\omega$`：

 $\alpha,\beta,\gamma,\delta,\epsilon,\zeta,\eta,\theta,\kappa,\lambda,\mu,\nu,\xi,\omicron,\pi,\rho,\sigma,\tau,\upsilon,\phi,\chi,\psi,\omega$

#### 大写

`$\Alpha, \Beta, \Gamma, \Delta, \Epsilon, \Zeta, \Eta, \Theta, \Iota, \Kappa, \Lambda, \Mu, \Nu, \Xi, \Omicron, \Pi, \Rho, \Sigma, \Tau, \Upsilon, \Phi, \Chi, \Psi, \Omega$`：

$A, B, \Gamma, \Delta, E, Z, H, \Theta, I, K, \Lambda, M, N, \Xi, O, \Pi, P, \Sigma, T, \Upsilon, \Phi, X, \Psi, \Omega$

#### 变体

`$\vartheta,\varkappa,\varsigma,\varrho,\varphi,\varpi,\varTheta,\varSigma,\varPi$`：

$\vartheta,\varkappa,\varsigma,\varrho,\varphi,\varpi,\varTheta,\varSigma,\varPi$

<hr>

### 表格

` | | | | | `

| day  |  Mon  | Tue  | Wed  | Thu  | Fri  | Sat  | Sun  |
| ---- | :---: | ---- | ---- | ---- | ---- | ---- | ---- |
| 早   | 豆浆 油条 小笼包  | ... | ... | ... | ... | ... | ... |
| 午   |  米饭 鸡腿 蟹黄堡  | ... | ... | ... | ... | ... | ... |
| 晚   | 面条 辣酱 加点蒜 | ... | ... | ... | ... | ... | ... |



<hr>

### 注释

#### 行内注释
` > + space`：

> 这是一个行内注释

#### 另注
`[^1]`：

>并在下方指明注释内容，可以采用 `[^1]:链接`的方式直接跳转

如[这何尝不是一种递归](#md)$^{注}$[^1]



### 链接

#### 网页跳转

`[bilibili](bilibili.com)` ：[bilibili](https:www.bilibili.com)

#### 业内跳转

`[我在用Markdown写Markdown](#md)`：[我在用Markdown写Markdown](#md)

使用`#`作为目标选择器，`<a id="#md">内容</a>`

> 这里使用的是HTML中的方式, Markdown方式在页面中可能无法显示跳转



<br>

<hr>




[^1]: /cs/algorithms/recursion.md
