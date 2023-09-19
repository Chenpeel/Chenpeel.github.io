## 自然数集的公理化

#### Peano公理

设集合$X$,规定$X$上的一个映射$S$, 若$X$和$S$满足

- $1^{\circ} \quad  x \in X$ 
- $2^{\circ} \quad x \notin S(X)$
- $3^{\circ} \quad S$是一个单射
- $4^{\circ} \quad$ 设 $A \subseteq X$ 若$x \in A$且对任一$a \in A$都有$S(a) \in A$,则$A = X$
  
则称集合$X$是自然数集 (set of natural numbers), 记作 $N$. 自然数集中的元素称为自然数 (natural number). $x$称 为初始元素 (initial element). $S(x)$ 称为 $x$ 的后继元 (successor), 其中$S$ 称为后继映射 (successor map).


> $1^{\circ} \ 2^{\circ} \ 3^{\circ}$可以确定: 在从 $x\to ?$ 的路上,不会出现**某个元素的后继元**在这个元素**之前就已经出现**的现象 <br>也就是不可能形成循环 
<br>而$4^{\circ}$,则是用来确定$A$的唯一性, 即确定: 起点 $x$的唯一性
<br>从而实现$\ 0 \to \infty$,而不是$\ ? \to \infty$

#### 数学归纳
公理 $4^{\circ}$ 被称为数学归纳公理 , 实际上其是一条公理模式 , 即可以用来证明和自然数有关的命题的公理

设自然数集$\mathbb{N}$,$S$是$\mathbb{N}$上的后继映射. $x \in \mathbb{N}$ 且 $x\notin S(\mathbb{N})$. 若满足

- $1^{\circ}\quad$当$n=x$时, 命题P成立.
- $2^{\circ}\quad$当$n=k$时命题P成立,则当$n=S(k)$时命题P也成立.

则对于一切$n \in \mathbb{N}$命题都成立

