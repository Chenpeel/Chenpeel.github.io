## 矩阵运算之求导

##### 1. 标量方程对向量求导

 对方程组

$\begin{cases} \cfrac {\partial f(y_1,y_2,...,y_i)}{\partial y_1} = 0 \\  \qquad \vdots \\ \cfrac {\partial f(y_1,y_2,...,y_i)}{\partial y_i} = 0 \end{cases}$  令 $\vec y = \begin {bmatrix} y_1 \\y_2 \\ \vdots \\y_i \end {bmatrix}$ 对方程组可有 简化如下：

$\cfrac{\partial f(\vec y)}{\partial \vec y}=\begin{bmatrix} \cfrac{\partial f(\vec y)}{\partial y_1} \\ \cfrac{\partial f(\vec y)}{\partial y_2} \\ \vdots \\ \cfrac{\partial f(\vec y)}{\partial y_i} \end{bmatrix}$ 此 $i \times 1$形式为 分母布局 （Denominator Layout）



> 而 同样可能存在如下表达方式：

$\cfrac{\partial f(\vec y)}{\partial \vec y}=\begin{bmatrix} \cfrac{\partial f(\vec y)}{\partial y_1} , \cfrac{\partial f(\vec y)}{\partial y_2}, \cdots,  \cfrac{\partial f(\vec y)}{\partial y_i} \end{bmatrix}$ 如此$1 \times i$形式为 分子布局（Numerator Layout）

<br>

⚠️**布局方式要统一**，否则会十分混乱

<br><br><br>

  

##### 2. 向量方程对向量的导数

对于$\vec f(\vec y) = \begin{bmatrix} f_1(\vec y) \\ f_2(\vec y) \\ \vdots  \\ f_n (\vec y)\end{bmatrix}$  其中 $\vec y = \begin{bmatrix} y_1 \\ y_2 \\ \vdots \\y_m \end{bmatrix}$

> 这里采用分母布局，$n \times m$的矩阵

对其求导可得

$\cfrac {\partial \vec f(\vec y)}{\partial \vec y} = \begin{bmatrix}  \cfrac{\partial f_1(\vec y)}{\partial y_1}\quad \cfrac{\partial f_2(\vec y)}{\partial y_1} \quad \cdots \quad  \cfrac{\partial f_n(\vec y)}{\partial y_1} \\ \cfrac{\partial f_1(\vec y)}{\partial y_2}  \qquad \quad \qquad \qquad  \qquad  \qquad \\ \vdots \qquad \qquad \quad\ddots\qquad\qquad \vdots \\ \cfrac{\partial f_1(\vec y)}{\partial y_m}  \quad \quad   \quad \cdots\qquad\quad \cfrac{\partial f_n(\vec y)}{\partial y_m}\end{bmatrix}$



当$n=m$时即其为n阶方阵

对于n阶方阵 $A = \begin{bmatrix} a_{ij} \end{bmatrix}_{n\times n}$和向量$\vec y = \begin {bmatrix} y_1 \\y_2 \\ \vdots \\y_n \end {bmatrix}$，易证如下结论：

$\cfrac {\partial A\vec y}{\vec y} = A^T$

$\cfrac {\partial\vec y^TA\vec y}{\vec y} = A\vec y+A^T \vec y$ 当$A$对称时有 $\cfrac {\partial\vec y^TA\vec y}{\vec y} = 2A\vec y$



