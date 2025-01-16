---
title: Real Numbers
date: 2024-05-18
category: Math
published: true
---


# 实数理论

**有理数**

从Peano公理出发，我们可以轻松地、严格定义自然数集$\mathbb{N}$(Set of Natural Number)、整数集$\mathbb{Z}$(Set of Integers)、有理数集$\mathbb{Q}$ (Set of Rational Numbers , Quotient)

但本质上只使用了一个方法——用一个有序数对



容易发现：仅仅靠有理数，是无法描述数轴上所有的点的；

仅仅一个代数方程$x^2-2=0$的解，崩坏了毕达哥拉斯辛苦建立的数学大厦，造成了第一次数学危机



**实数**

1. 构造实数的主要方法：

- Dedekind分割
- 无限十进制小数
- 闭区间套
- Cauchy列
- 无穷级数
- etc.

2. 刻画实数完备性的方式：

- Dedekind定理
- 确界原理
- Heine-Borel定理
- 单调有界定理
- 闭区间套定理
- Bolzano-Weierstrass定理
- Cauchy原理



<hr>

## Dedekind

将有理数集分割按序关系排列在一条直线上，分割为任意两集合$\alpha,\beta$

对于$\alpha,\beta$ 来说 ，总是有

- $\forall p \in \alpha,\exists q\in\alpha \quad q \gt p$ 表明$\alpha$无最大元素
- $\forall p \in \beta,\exists q\in\beta \quad q \lt p$ 表明$\beta$无最小元素

可见：有理数域虽然稠密，但并不完备；因此，迫切需要构建一个相对完备的数集

#### Dedekind分割

对于数集$K$ 的一个划分 ${\alpha,\beta}$，若满足

- $1^{\circ}\quad ((\forall x,y \in \alpha) \land x\lt y )\quad y \in \alpha \to x \in \alpha$
- $2^{\circ}\quad (\forall x \in \alpha)(\exists y \in \alpha \land y \gt x)$

称其为$K$上的一个Dedekind分割（记作$\alpha | \beta$）

> 通过y去 ***无限逼近*** $\alpha|\beta$的临界点
>
> 由于给定$\alpha \iff \alpha | \beta$ ，因此我们可以用 $\alpha$代表其划分，并用集合$\alpha$ （即一个分割的下集）表示一个实数实数
