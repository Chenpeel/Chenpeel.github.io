# 奇异值分解（SVD）

>  Singular  Value Decomposition



###### 定义

对于一个矩阵$A_{m \times n}$，存在正交矩阵$U \in \mathbb{R}^{m \times m}$、$V \in \mathbb{R}^{n \times n}$与对角矩阵$\Sigma \in \mathbb{R}^{m \times n}$，使得

$$A = U \Sigma V^T$$

$U$、$V$分别为左/右奇异向量矩阵，$\Sigma$的对角元素为奇异值，记为
$\sigma_1 \ge \sigma_2 \ge \cdots \ge \sigma_p \ge 0$，其中$p=\min(m,n)$，其余位置为$0$。



###### 原理

矩阵代表线性变换，会把单位球映射为椭球。SVD 将这个变换分解为：

1. 先用$V^T$对输入空间做旋转或反射；
2. 再用$\Sigma$沿正交轴做缩放；
3. 最后用$U$对输出空间做旋转或反射。

从单位球开始，依次施加 $V^T$ 旋转、$\Sigma$ 缩放、$U$ 旋转。下图用二维单位圆示意（悬浮显示进度条，可拖动）： 

<SvdScrubber />

| 单位圆 | 旋转 $V^T$ |
| --- | --- |
| ![单位圆](/images/math/svd/svd-3d-1-unit.png) | ![旋转 V^T](/images/math/svd/svd-3d-2-rotate-vt.png) |
| 缩放 $\Sigma$ | 旋转 $U$（A） |
| ![缩放 Sigma](/images/math/svd/svd-3d-3-scale-sigma.png) | ![旋转 U（A）](/images/math/svd/svd-3d-4-rotate-u.png) |


###### 内涵

右奇异向量$v_i$（$V$的列）与左奇异向量$u_i$（$U$的列）构成两组标准正交基，使得

$$A v_i = \sigma_i u_i \quad (i=1,\ldots,p)$$

也就是说，$A$在这两组基之间只做沿各轴的缩放。



###### 结论

$A_{SVD} = U \Sigma V^T$ 

$A^T A$与$A A^T$的非零特征值相同，均为$\sigma_i^2$：

$$A^T A v_i = \sigma_i^2 v_i,\quad A A^T u_i = \sigma_i^2 u_i$$

$V$由$A^T A$的特征向量组成，$U$由$A A^T$的特征向量组成。

$\Sigma = \begin{bmatrix}  \sigma_1 & 0 & \ldots & 0 \\  0 & \sigma_2 & \ldots & 0 \\  \vdots & \vdots & \ddots & \vdots \\  0 & 0 & \ldots & \sigma_p \\  0 & 0 & \ldots & 0 \end{bmatrix}$，其中$p=\min(m,n)$。

若$A$可逆（$m=n$且满秩），则$A^{-1} = V \Sigma^{-1} U^T$；一般情形可用伪逆$A^+ = V \Sigma^+ U^T$。





###### 应用

对于$X=\begin{bmatrix}1&1 \\ 2&2\end{bmatrix},\quad Y=\begin{bmatrix}2&3\\4&5 \end{bmatrix}$

有 $X A = Y$，求 $A$。

1. 易看出$X$的秩$\operatorname{rank}(X)=1$，不可逆，且列空间$\operatorname{Col}(X)=\mathrm{span}\{[1,2]^T\}$ 即该向量张成 $X$。

2. 取一组 SVD：
   $u_1=\frac{1}{\sqrt5}\begin{bmatrix}1\\2\end{bmatrix},\quad v_1=\frac{1}{\sqrt2}\begin{bmatrix}1\\1\end{bmatrix},\quad \sigma_1=\sqrt{10} \\ \\ X=\sigma_1 u_1 v_1^T$
   
3. 伪逆
   $X^+ = v_1 \frac{1}{\sigma_1} u_1^T= \frac{1}{10}\begin{bmatrix}1&2\\1&2\end{bmatrix}$
   
4. 最小二乘解（使 $\|XA-Y\|_F$ 最小）为
   $A = X^+ Y= \begin{bmatrix}1&1.3\\1&1.3\end{bmatrix}$
   
   对应
   $XA=\begin{bmatrix}2&2.6\\4&5.2\end{bmatrix}$
   
5. $Y$ 的第一列 $[2,4]^T$ 在 $\operatorname{Col}(X)$ 中，存在无穷多精确解
    （例如 $a_1=[1,1]^T + t[1,-1]^T$）；第二列 $[3,5]^T$ 不在
    $\operatorname{Col}(X)$ 中，因此 $XA=Y$ 无精确解，只能用伪逆给出最小二乘解。

因此：即使某些情况下，某个矩阵不存在逆矩阵，也可以通过$SVD$的方式实现求解

> 这对于一些机器学习的矩阵运算求解非常方便，可以快速迭代的同时，不必考虑矩阵是否可逆
