# 协方差 & 相关系数

> Covariance  &  Correlation coefficient

##### Cov

###### 定义

对于两个随机变量$X,Y$ 

有期望和方差：$E(X)、E(Y),\quad D(X)、D(Y)$

其协方差为：$Cov(X,Y)=E\Big(\big(X-E(X)\big)\big(Y-E(Y) \big)\Big)$ 

可得$Cov(X,Y) = E(XY)-E(X)E(Y)$

$D(X ± Y) = D(X)+D(Y)±Cov(X,Y)$

###### 注意

- 独立仅是协方差为0的必要条件，即使不独立，协方差也可能为0

- 协方差受变量单位的影响

###### 协方差矩阵

对于矩阵$A = [X_1, X_2, \ldots, X_n]$ ， $(X_i=[x_{i1},x_{i2},\ldots,x_{in}]^T)$， 期望向量$[\mu_1,\mu_2,\ldots,\mu_n]$

其协方差矩阵元素：$\Sigma_{ij}=Cov(X_i,X_j) = E[(X_i-\mu_i)(X_j-\mu_j)]$

协方差矩阵为：

$\Sigma = \begin{bmatrix}    \sigma_{1}^2 & \sigma_{12} & \cdots & \sigma_{1n} \\    \sigma_{21} & \sigma_{2}^2 & \cdots & \sigma_{2n} \\    \vdots & \vdots & \ddots & \vdots \\    \sigma_{n1} & \sigma_{n2} & \cdots & \sigma_{n}^2 \end{bmatrix}$

由于$Cov(X,Y)=Cov(Y,X)$可知协方差矩阵是一个对称矩阵，对角线元素即为各个变量的方差

然而在大多数情况下，无法获取总体数据进行计算时，我们只能使用部分样本数据来进行估计

对于样本数据$N$，第$k$个样本的第$i（j）$个变量$x_{ki},x_{kj}$ ，以及第$i（j）$个样本均值$\bar x_i,\bar x_j$

$\hat\Sigma_{ij} = \cfrac{1}{N-1}\sum\limits_{i=1}^{N}(A_{ki}-\bar A_i)(A_{kj}-\bar A_j)$



##### $\rho$相关系数

> 为了解决协方差中单位的影响，合理的表示两个随机变量之间的（线性）相关性

###### 定义

令$X^* = \cfrac{X-E(X)}{\sqrt{D(X)}}, \quad Y^* = \cfrac{Y-E(Y)}{\sqrt{D(Y)}}$，对$X,Y$进行标准化

因此$Cov(X^*,Y^*)$

$= E\Big(\cfrac{X-E(X)}{\sqrt{D(X)}}\cdot \cfrac{Y-E(Y)}{\sqrt{D(Y)}} \Big)$

$- E\Big(\cfrac{X-E(X)}{\sqrt{D(X)}}\Big)\cdot E\Big(\cfrac{Y-E(Y)}{\sqrt{D(Y)}}\Big)$

$= \cfrac{E\Big(\big(X-E(X)\big)\big(Y-E(Y) \big)\Big)}{\sqrt{D(X)D(Y)}}$

令$\rho = Cov(X^*,Y^*) = \cfrac{Cov(X,Y)}{\sqrt{D(X)D(Y)}}$，其中$\|\rho\| \le 1 \to \big(E(XY)\big)^2 \le E(X)^2E(Y)^2$

- $\rho = 0$ ，只能说明$X,Y$之间不存在线性关系，二者不独立，协方差也可能为0
- $\|\rho\| =1$，说明二者完全正（负）相关

###### 相关系数矩阵

对于矩阵$A = [X_1, X_2, \ldots, X_n]$， $(X_i=[x_{i1},x_{i2},\ldots,x_{in}]^T)$

其相关系数矩阵元素$R_{ij} = \rho(X_i,X_j) = \cfrac{\sigma_{ij}}{\sqrt{\sigma_{ii}\sigma_{jj}}}$

在使用样本估计总体时$\hat R_{ij} = \cfrac{\hat\Sigma_{ij}}{\sqrt{\hat \Sigma_{ii} \hat\Sigma_{jj}}}$ .

由于相关系数取值在$[-1,1]$ 其相关系数矩阵为：

$R = \begin{bmatrix}    1 & \rho_{12} & \cdots & \rho_{1n} \\    \rho_{21} & 1 & \cdots & \rho_{2n} \\    \vdots & \vdots & \ddots & \vdots \\    \rho_{n1} & \rho_{n2} & \cdots & 1 \end{bmatrix}$

