# cache

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
