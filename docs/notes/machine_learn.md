<style>
.book{
    border: 2px solid gray;
    margin: 30px;
    padding: 20px;
    margin: 0 auto;
    text-align: center;
    background-color: rgba(0,0,0,0.1);;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transition: transform 0.3s ease;
    text-align: center;
}
.book:hover{
    transform: translateY(-5px); 
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); 
}
.copyright{
    background-color: rgba(0,0,0,0.1); 
    text-align: center; 
    padding: 10px 0; 
    font-size: 14px;
}
</style>

<h1 class="article-title">机器学习(ML )</h1>

<br><br>

数学基础PDF

>  ML-Math - PDF

<div class="book"
    onclick="
    var pdfContainer = document.getElementById('pdf-container');
    if (pdfContainer.style.display === 'none') {
      pdfContainer.style.display = 'block';
    } else {
      pdfContainer.style.display = 'none';
    }
    ">
  <p>ML - Math</p>
  <div class="pdf-container" id="pdf-container" style="display: none;">
    <iframe src="https://drive.google.com/file/d/1R_fta4L7-cNN1mgJHJNlXO0wIb7c0FIL/view?usp=drive_link" width="100%" height="1000"></iframe>
  </div>
</div>


## 概率近似正确 - PAC(Probably Approximately Correct)

最重要理论模型 :
$$
P (|f(X)-y| \le \epsilon)\ge 1 - \delta
$$
其中:

- $X : data$
- $f(X): 对X的判断$ 
- $y : 真实值$
- $\epsilon : 一个趋于零值$  
- $P : 概率值$
- $\delta: 一个趋于零值$ 

 

NFL定理: 具体问题, 具体分析.  

没有最好的算法,只有相对较优的算法 

( 马哲贯彻人生🙃 )

## 误差

- Underfitting(欠拟合)
- Overfitting(过拟合)

![image-20230925213330855](/imgs/image-20230925213330855.png) 



## 三个关键问题

### 1. 评估方法

- 留出法(hold-out)
  > 将data切分为两个set,训练集和测试集(0.8:0.2 ...)
  - 保证数据分布一致性(分层采样)
  - 多次重复划分(百次测试求均值,去除切分数据的影响)
  - 最终预测模型为全数据训练

- $k$-fold交叉验证法(cross calidation)
  > 进行$k$次划分,去除划分扰动,再根据$k$ 划分 data后,循环训练 这$k$ 个集合
  - 留一法($k =X-1$, 则得到 level-one-out, LOO )

- 自助法(bootstrap)
  > 基于可重复采样, 约有36.8%的数据不会被抽中
  - 训练集与原样本集相同
  - 包外估计(out-of-bag estimation)

$$
\lim_\limits{m\to \infty} {(1-\cfrac{1}{m})} = \cfrac{1}{e} \approx 0.368
$$

#### 参数

- 算法的参数: 一般由人设定,也称为 “超参数”
- 模型的参数: 一般由学习确定



### 2. 性能度量

#### 回归任务

常用均方误差Err : 
$$
E(f,X) = \cfrac{1}{2m} \displaystyle \sum\limits_{i=1}^{m}(f(x_i)-y_i)^2
$$

#### 分类任务

- 错误率Err:

$E(f,X) = \cfrac{1}{m} \displaystyle \sum \limits_{i=1}^{m} I \cdot (f(x_i)\ne y_i)$



- 精度Acc:

$A(f,X) = \cfrac{1}{m}\displaystyle \sum \limits_{i=1}^{m}  I \cdot (f(x_i) = y_i)$

$= 1-E(f,X)$



 ![image-20230925224501316](/imgs/image-20230925224501316.png)

- 查准率: $P=\cfrac{TP}{TP+FP}$
- 查全率: $R=\cfrac{TP}{TP+FN}$
- $F_1$度量: $\cfrac{1}{F_1} = \cfrac{1}{2} \cdot (\cfrac{1}{P} + \cfrac{1}{R})$
- $F_{\beta}$度量:

$\cfrac{1}{F_{\beta}} = \cfrac{1}{1+{\beta}^2} \cdot \left(\cfrac{1}{P} + \cfrac{{\beta}^2}{R}\right)$

$\text{当} \begin{cases}
\beta < 1, & \text{查准率影响更大} \\
\beta > 1, & \text{查全率影响更大}
\end{cases}$

###  3. 比较检验

> 统计假设检验为学习器性能比较提供了重要依据

- 交叉验证t检验(基于成对t检验)
  - k-fold交叉检验; $5 \times 2$ 交叉验证
- McNemar检验(基于列联表,卡方检验)







## 线性回归(Linear Regression)

#### 1. 线性回归

$y \backsimeq \displaystyle \sum_{i=1}^{m} w_ix_i + b = w^Tx+b$

- 离散变量
  - 有序: 0,1,2
  - 无序: 001,010,100 (k维向量)

令均方误差最小化:

$(w^*,b^*) = \arg\min_\limits{(w,b)} \displaystyle \sum_\limits{i=1}^{m} (f(x_i)-y_i)^2$

$=\arg \min_\limits{(w,b)} \displaystyle \sum_{i=1}^{m} (wx_i + b - y_i)^2$

对$E(w,b)= \displaystyle \sum_{i=1}^{m}(wx_i+b-y_i)^2$ 

- 最小二乘法估计

$\cfrac {\partial E(w,b)}{\partial w} = 2 \left( w\displaystyle\sum_{i=1}^{m} x_i^2 - \displaystyle\sum_{i=1}^{m}(y_i -b)x_i \right)$

$\cfrac {\partial E(w,b)}{\partial b} = 2 \left( mb- \displaystyle\sum_{i=1}^{m}(y_i-wx_i) \right)$

令导数为0,得到闭式(closed-form)解:

$w = \cfrac {\displaystyle\sum_{i=1}^{m} y_i(x_i-\overline {x})} {\displaystyle\sum_{i=1}^{m}x_i^2 - \cfrac{1}{m}\left(\displaystyle\sum_{i=1}^{m}x_i \right)^2}$

$b =\cfrac{1}{m}\displaystyle\sum_{i=1}^{m}(y_i -wx_i)$



#### 2. 多元(multi-variate)线性回归

$y \backsimeq  w_0 + w^1x^1+w^2x^2 +\cdot \cdot \cdot+w^nx^n$

$=\displaystyle \sum_{i=0}^{m}w^{i}x^{i} = W^{T}X$

后面我们对观测集,采用下面记号:

$X_{N \times p} = \begin{bmatrix}
x_{11} & x_{12} & \dots & x_{1p} \\
x_{21} & x_{22} & \dots & x_{2p} \\
\vdots & \vdots & \ddots & \vdots \\
x_{N1} & x_{N2} & \dots & x_{Np}
\end{bmatrix}$

$= (x_1,x_2,x_3,\cdots,x_N)^T$

其中$x_i = (x_{i1},x_{i2},\cdots,x_{ip})^T \quad (i \in N)$



- 最小二乘估计

$\hat w^* = \arg\min_\limits{\hat w} (y-X\hat w)^T(y-X\hat w)$

令$E_{\hat w} = (y-X\hat w)^T(y-X\hat w)$

对$\hat w$求导: $\partial E_{\hat w} = 2X^T(X_{\hat w}-y)$令其为零可得$\hat w$ 

- 若$X^TX$ 满秩或正定, 则$\hat w^* = (X^TX)^{-1}X^T y$
- 若$X^TX$不满秩, 则可以解出多个$\hat w$
  - 设置归纳偏好或表达为引入正则化



#### 3. 广义线性模型

一般形式:
$$
y = g^{-1} (W^TX)
$$

例如对于$f(x) = e^{W^TX}$ 可以通过对其求$\ln$ 来降幂从而达到线性拟合,如下图

<img src="/imgs/func1.png" />



#### 4. 对率回归:

> 对数几率回归(logistic regression) 简称对率回归
>
> $\cfrac{y}{1-y} \longrightarrow  \cfrac{P(postive |X)}{P(negetive|X)}$ :几率(odds) 即 log odds $\longrightarrow$ logit 

对于线性回归模型产生的实值输出$z = W^TX$和期望输出$y\in \{0,1\}$

理想函数 $y(z) = \begin{cases} 0,& z<0 \\ 0.5, &z =0 \\ 1 ,& z>0 \end {cases}$的函数性质较差,因此寻找如下替代函数$y = \cfrac{1}{1+e^{-z}}$

<img src="/imgs/func.png" />

相比之下,替代函数的性质更好

- 对率函数(logistic function)与逻辑没有任何关系
- 实值函数,在$y \in (0,1)$ 连续
- 用回归模型做分类

因此对 $y =\cfrac{1}{1+e^{-z}},\quad z =W^TX$

$\Longrightarrow  y = \cfrac{1}{1+e^{-(W^TX)}} \Longrightarrow \ln \cfrac{y}{1-y} = W^TX$

- 无需事先进行假设数据分布
- 可以得到“类别”的近似概率预测
- 可直接应用现有数值优化算法求取最优解












- 梯度下降法
  如果矩阵不是满秩,没有逆矩阵,就无法使用最小二乘法







## KNN
——K近邻算法，表示一个标本时，使用其最接近的K个近邻来决定。

- 可以用于分类和回归

##### 过程

- 从训练集中选择离待预测样本最近的K个样本
- 更具K个样本计算待预测样本的值

##### 实现

- 根据iris花样例实现, Download from [Kaggle DataSets](https://www.kaggle.com/datasets) 或者从笔者[Github](https://github.com/Chenpeel/Codes/raw/master/Jupyter/ML/files/iris.zip) / [Gitee](https://gitee.com/chenyh43/ML/tree/master/files/iris.zip)

##### Codes

<a href="https://github.com/Chenpeel/Codes/blob/master/Jupyter/ML/KNN.ipynb"> KNN Python </a>

<!-- <a href="./"> KNN C++ </a> -->



