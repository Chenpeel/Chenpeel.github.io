# 奇异值分解（SVD）

>  Singular  Value Decomposition



###### 定义

对于一个矩阵$A_{m \times n}$可以将其进行奇异值分解，即$A = U \Sigma V^T$ 

在一般情况下$U$ 为$m \times m$ 的[正交矩阵](https://zh.wikipedia.org/wiki/%E6%AD%A3%E4%BA%A4%E7%9F%A9%E9%98%B5)（[Orthogonal Matrix](https://en.wikipedia.org/wiki/Orthogonal_matrix)） ， $\Sigma$ 为$m \times n$的[对角矩阵](https://zh.wikipedia.org/zh-cn/%E5%B0%8D%E8%A7%92%E7%9F%A9%E9%99%A3)（[Diagonal Matrix](https://en.wikipedia.org/wiki/Diagonal_matrix)），其对角线上的元素称为奇异值，$V^T$为$n\times n$ 的正交矩阵的转置。



###### 原理

矩阵运算的本质在于对一个向量空间映射到另一个向量空间，实际上也就是对于坐标轴的变换（大小、方向）实现的。

那么对于矩阵$A$，可以认为，其是对于单位阵$E$进行的一次线性变换

那么这个线性变换过程就可以分解为：旋转、拉伸、旋转。

换一个角度，对于一个线性变换$A$再进行一次旋转，就可以得到与之线性变换过程不同的、变换结果却相同的线性变换过程： $AEV =UE\Sigma$ 我们再对其中的$U 、\Sigma、V$（对应旋转、拉伸、旋转）加以约束，即可得到对$A$的奇异值分解

###### 内涵

对于上述的线性变换，我们关注的就是在变换过程中所未改变的一组单位向量，即[标准正交基](https://zh.wikipedia.org/zh-cn/%E6%A0%87%E5%87%86%E6%AD%A3%E4%BA%A4%E5%9F%BA)（[Orthonormal basis](https://en.wikipedia.org/wiki/Orthonormal_basis)），这组基底在变换前后仍然正交。那么，谁是这组变换过程的标准正交基呢

自然是两次旋转，对于$E$进行的线性变换中，旋转，实际上是对标准正交基的旋转：

$AVE = E U \Sigma$



不妨在二维空间中想象：

原始标准正交基：$V = \begin{bmatrix} \vec v_1  \quad \vec v_2\end{bmatrix}$ 

变换标准正交基：$U = \begin{bmatrix} \vec u_1  \quad  \vec u_2\end{bmatrix}$

矩阵$A$即是对于标准正交基的一次线性变换，换言之，是对两个相互垂直的一维向量的一次线性变换

$AA^T \quad\& \quad A^TA$的特征值分别为$\lambda 、 \mu$ 对应的奇异值即为（$\sqrt{特征值}$）：$\Sigma = \begin{bmatrix} \sigma_1 \quad 0 \\ 0\quad \sigma_2 \end{bmatrix}$ ，其中$\sigma_1=\sqrt{\lambda},\sigma_2 = \sqrt{\mu}$ 





###### 结论

$A_{SVD} = U \Sigma V^T$ 

$AA^T$ 特征值$\mu_1,...,\mu_m$
$A^TA$特征值$\lambda_1,...,\lambda_n$

$U = AA^T_{特征向量}，V^T = A^TA_{特征向量转置}$

$\Sigma = \begin{bmatrix}  \sigma_1 & 0 & \ldots & 0 \\  0 & \sigma_2 & \ldots & 0 \\  \vdots & \vdots & \ddots & \vdots \\  0 & 0 & \ldots & \sigma_p \\  0 & 0 & \ldots & 0 \end{bmatrix}$，其中$p=\min(m,n)$

因此在矩阵运算中就可以自然的算出$A^{-1}$而不用考虑矩阵$A$是否可逆