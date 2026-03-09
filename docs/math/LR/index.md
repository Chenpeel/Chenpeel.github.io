---
title: 逻辑推理
date: 2024-08-15
category: Literature
published: true
skills_cloud:
- "logic"
---


# 逻辑推理系统

>  逻辑推理是研究数学的重要基础

逻辑推理是根据一些已知内容推理出一些结论、判断某些结论或假设的真假。

通过自然语言的方式，描述已知信息、推理等是较为复杂的

因此，逻辑推理系统首要处理的就是自然语言的简化描述

例如：

$如果今天下雨，就不上课了\quad 等价于\quad  p \to  \neg q$

$p:今天下雨,q:今天上课\\ \to: 推理, \neg:非\\$

逻辑推理系统，通俗的说，就是对命题的处理方式的描述，并构建出方便推理的方法，以得出结论


### 基本概念

>  自然语言将命题表述为具有确定真假含义的**陈述句**

自然的，非陈述句型并非命题，非真假二值的句子同样不属于命题

#### 符号化

- 对于简单的命题，使用小写字母$p,q,r,s,t\dots$表示，如$p:今天是晴天$，$q:昨天下雨了$
- 对于两个命题的联结方式，有诸如$非:\neg,与:\land,或:\lor,蕴含:\to,\gets,等价:\leftrightarrow$
- 关系$\implies,\impliedby,\iff$

##### 优先级

符号化是方便了运算得出结论，但当大量联结词堆叠，仅仅依靠从左到右的次序，就会出现歧义，因此有联结词的优先级，如我们从小学就开始接触的括号，就是为了提升运算优先次序，优先级表如下，$>$仅表示优先于：

$$
() > \neg > \land > \lor > \to > \leftrightarrow
$$


#### 等值演算

> 对于不同的命题表述，可能会有相同的结果，同样的也会有相同的真假
>
> 推理出命题表述的真假，需要使用等价的关系，将命题简化到可辨真假的程度



##### 等价关系

>  对于A,B,C

$$
\begin{align}
A &\iff \neg\neg A \\
A &\iff A \land A \\
A &\iff A \lor A \\
A \land B &\iff B \land A \\
A \lor B &\iff B \lor A \\
A \leftrightarrow B &\iff B \leftrightarrow A \\
(A \land B) \land C &\iff A \land (B \land C) \\
(A \lor B) \lor C &\iff A \lor (B \lor C) \\
(A \leftrightarrow B) \leftrightarrow C &\iff A \leftrightarrow (B \leftrightarrow C) \\
A \lor (B \land C) &\iff (A \lor B) \land (A \lor C) \\
A \land (B \lor C) &\iff (A \land B) \lor (A \land C) \\
A \to (B \to C) &\iff (A \to B) \to (A \to C) \\
\neg (A \land B) &\iff \neg A \lor \neg B \\
\neg (A \lor B) &\iff \neg A \land \neg B \\
A \land 1 &\iff A \\
A \lor 1 &\iff 1 \\
A \land 0 &\iff 0 \\
A \lor 0 &\iff A \\
A \lor \neg A &\iff 1 \\
A \land \neg A &\iff 0 \\
A \to B &\iff \neg A \lor B \\
A \leftrightarrow B &\iff (A \to B) \land (B \to A) \\
A \to B &\iff \neg B \to \neg A \\
A \leftrightarrow B &\iff \neg A \leftrightarrow \neg B \\
(A \to B) \land (A \to \neg B) &\iff \neg A \\
(A \land B) \to C &\iff A \to (B \to C)
\end{align}
$$

##### 范式

- 析取范式
  以$\lor$联结
- 合取范式
  以$\land$联结

#### 推理

根据以上等价关系，通过等值演算推导出的结果
