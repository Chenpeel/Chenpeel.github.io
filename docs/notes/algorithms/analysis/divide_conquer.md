

# 分治

> 分而治之，大到诸侯分治，小到小区管理

##### 两个阶段

- 划分子集
- 聚合治理


##### 分治优劣

- 分治算法逻辑清晰，易于实现。关键在于怎么划分，其划分的方法不同，其时间复杂度会有一定差别

- 划分的质量不行，时间复杂度可能不被接受，另外其耗费相当的空间

##### 分治算法案例

###### 最大子段和

- 描述：给定 *n* 个整数（可以为负数）的序列$(a_1,a_2,...,a_n)$ ,求$\max\lbrace{ 0 ,\max_\limits{1\le i\le j\le n} \sum_\limits{k=i}^{j} a_k }\rbrace$ 实例：$[-2,11,-4,13,-5,-2]$
- 分析：将序列划分为左右两半，递归计算左右段最大子段和，最终取三者最大值$res = \max \lbrace{S_{left},S_{right},S_1 + S_2}\rbrace$ 
- 题解代码
  - [max_subarray_sum.cpp](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/max_subarray_sum.cpp)
  - [max_subarray_sum.py](https://github.com/Chenpeel/Codes/tree/master/Python/algo_codes/max_subarray_sum.py) 


