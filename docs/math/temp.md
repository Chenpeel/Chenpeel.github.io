# Temporary File

设X,Y是相互独立的随机变量，他们都服从正态分布$N(0,\sigma ^2)$ 试验证随机变量$Z = \sqrt{X^2 + Y^2}$ 的概率密度为
$$
f_Z(z)= 
\begin{cases} 
 \cfrac{z}{\sigma ^2}\cdot e^{-\cfrac{z^2}{2\sigma^2}} , &\text {if}\quad z > 0 ,  
\\ 0, &\text{others}.
\end{cases}
$$
我们称$Z$ 服从参数$\sigma (\sigma>0)$  的Rayleigh分布





由于二元正态分布函数
$$
f_{X,Y}(x,y) = \cfrac{1}{2\pi\sigma_X\sigma_Y \sqrt{1-\rho^2}} \cdot 
e^{ {\bigg( -\cfrac{1}{2(1-\rho^2)} \cdot \bigg[\cfrac{(x-\mu_X)^2}{\sigma_X^2} - \cfrac{2\rho(x-\mu_X)(y-\mu_Y)}{\sigma_X\sigma_Y} + \cfrac{(y-\mu_Y)^2}{\sigma_Y^2}  \bigg] }\bigg) }
$$
而其中$\sqrt{1-\rho^2}$ 表示$x,y$的相关性，本体$x,y$相互独立所以$\rho = 0$ ，且$x,y$二者均服从$N(0,\sigma^2)$故:$ 标准差\sigma _X=\sigma_Y = \sigma,均值 \mu_X=\mu_Y= 0$


$$
f_{X,Y} (x,y) = \cfrac{1}{2\pi\sigma^2} \cdot 
e ^{-\cfrac{x^2+y^2}{2\sigma^2}}
$$





##### MLE


由于有两个参数$\mu \quad \&  \quad \sigma $ 所以然而数据拟合函数只有一个，常规的通过导数或者梯度下降的方式，没法同时获取两个变量的最大化收益（求导或者梯度下降求解函数上升下降，来确定最佳$\mu \quad \& \quad \sigma$） ，因此使用极大似然估计是统计学常用的手段（正态分布很常见，很多分布都可以近似成正态分布），求解方式也很简单



给定概率密度函数

$f(x; \mu,\sigma) = \cfrac{1}{\sqrt{2 \pi \sigma^2} }e^{-\cfrac{(x-\mu)^2}{2\sigma^2}}$ 

$\mu$是均值，$\sigma$ 是标准差，$X$是给定的数据集

对其进行极大似然（MLE）的函数就可写为

$L(\mu,\sigma|X) =\Pi_{i=1}^n f(x_i;\mu,\sigma)$ 

这个函数的目的就是为了求得**概率值连乘的最大值**，从而保证收益最佳，或者**对数据集的最大程度的拟合**

求解方式也很简单

由于是连乘，可以对其进行对数降阶，方便计算

于是有

$ln \big(L(\mu,\sigma|X)\big)  = \sum\limits_{i=1}^{n} ln\big( f(x_i;\mu,\sigma) \big) = -\cfrac{n}{2} ln\big(2\pi\sigma^2\big) -\frac{1}{2\sigma^2} \sum\limits_{i=1}^{n} (x_i -\mu)^2$

由于带负号，所以直接转为正，变成求解最小值

$T=\cfrac{n}{2} ln\big(2\pi\sigma^2\big) +\frac{1}{2\sigma^2} \sum\limits_{i=1}^{n} (x_i -\mu)^2 $

然后对上述函数求偏导

$\cfrac{\part T}{\part\mu}、\cfrac{\part T}{\part \sigma}$ 

即可得$ \hat\mu_{MLE},\hat\sigma_{MLE}$
