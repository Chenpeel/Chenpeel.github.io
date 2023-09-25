# Math Foundations PDF

<style>
  #pdf-container {
    width: 100%;
    height: 1000px;
    overflow: hidden;
    border-radius: 10px;
  }

  #pdf-content {
    width: 100%;
    height: 100%;
  }

  #page-number {
    text-align: center;
    margin-top: 10px;
  }
</style>

<div id="pdf-container">
    <embed id="pdf-content" src="./ml.pdf" type="application/pdf" width="100%" height="200%">
</div>
<div id="page-number">Math Foundations PDF</div>


<center>Download DIVIDED & MERGED PDF on  <a href="https://github.com/Chenpeel/Codes/tree/master/Jupyter/ML/machine_learn_pdf" text-indent="none">GitHub</a>  /  <a href="https://gitee.com/chenyh43/ML/tree/master/machine_learn_pdf" text-indent="none">Gitee</a></center>

<hr>
<br><br>

# Living Examples
## KNN

—— K近邻算法，表示一个标本时，使用其最接近的K个近邻来决定。

- 可以用于分类和回归

##### 过程

- 从训练集中选择离待预测样本最近的K个样本
- 更具K个样本计算待预测样本的值

##### 实现

- 根据iris花样例实现, Download from [Kaggle DataSets](https://www.kaggle.com/datasets) 或者从笔者[Github](https://github.com/Chenpeel/Codes/raw/master/Jupyter/ML/files/iris.zip) / [Gitee](https://gitee.com/chenyh43/ML/tree/master/files/iris.zip)

##### Codes

<a href="https://github.com/Chenpeel/Code_Learning/tree/master/jupyter/KNN">KNN Python</a>

<a href="./">KNN C++</a>



## 线性回归

—— 线性拟合自变量与因变量之间的关系 $y= w^0 + w^1x^1+w^2x^2 +\cdot\cdot\cdot+w^nx^n =\displaystyle \sum_{i=0}^{n}w^{i}x^{i} = W^{T}X$

##### 目标函数

$J(w) = \cfrac{1}{2} \displaystyle \sum_{i=1}^{n}(y^{(i)} - \hat{y}^{(i)})^2$

##### 求解方式

- 最小二乘法
   通过矩阵乘法来计算权重
  <a href="https://github.com/Chenpeel/Codes/blob/master/Jupyter/ML/OLS.ipynb">OLS</a>
  
- 梯度下降法
  如果矩阵不是满秩,没有逆矩阵,就无法使用最小二乘法
  