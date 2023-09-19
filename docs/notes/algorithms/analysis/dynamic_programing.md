

>  递推公式是动态规划的灵魂，dp的含义、初始化以及遍历的顺序也很关键，但最重要是分析问题的思想，在此，将动态规划划分为五个阶段，来自于[代码随想录](https://www.bilibili.com/video/BV13Q4y197Wg/?spm_id_from=333.337.search-card.all.click&vd_source=2ed772ef3c25dca43937d30b2e9c63c9) 

##### 五个阶段

- 明确dp数组的含义
- 对dp进行正确初始化
- 找出递推公式
- 明确遍历的次序和层级
- debug

##### 动态规划的优劣

- 其效率显然是高于单纯的递归算法和暴力枚举的
- 每次动态规划都需要自定一个dp数组，甚至是二维、三维数组，未免太浪费空间



##### 动态规划的案例

###### N个矩阵连乘问题

- 描述：给定n个矩阵$\lbrace A_1,A_2,...,An \rbrace$ ，其中 $A_i$ 与$A_{i+1}$是可乘的。 如何确定矩阵连乘积的计算次序，使得依此次序计算矩阵连乘积所需要的数乘**次数最少**

- 分析：根据矩阵连乘的结合律，我们可以将其整个相乘划分为两块甚至更多块相乘，从而得到子问题

  - 我们维护一个数组$dp[i:j]$ 表示其计算量从而可得到 (1) ：
  - 根据dp数组找到最优次数
  - 题解代码[n_matrix.cpp](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/n_matrix.cpp) 

  $$
  dp(i,j) =\begin {cases} &{0} &\text{i=j}  \\ &\min_\limits{i\le k<j} {\lbrace{dp(i,k)+dp(k+1,j)+ p_{i-1}\cdot p_k \cdot p_j }\rbrace} &\text{i<j} \end{cases}
  $$

- 

###### 最长公共子序列

- 描述：给定两字符串`str1`，`str2`，找出其最长公共子序列，找出其最长公共子串

  - 子串：字符串中连续的子集
  - 子序列：将给定的字符串去掉n $(n≥0)$个之后的字符串

- 分析：最长公共子串纯粹凑个热闹，O(n) 即可

  - 边界`str1.length()==0` 或`str2.length()==0` 

  - 我们可以追究`str1`和`str2[0:n-1] `,`n=str2.length`的结果从而得到递推公式(2)：
    $$
    dp(i,j) = \begin {cases} &{0} &\text{if}&{i=0}&\text or &{j=0}  \\ &{dp(i-1,j-1)+1} &\text {if}&{i,j>0} & and &{x_i = y_j} \\ & \max({dp(i-1,j),dp(i,j-1))} &\text{if}& {i,j>0} &\text{and}& {x_i≠y_i}\end{cases}
    $$

- 题目代码

  - [max_length_2str.cpp](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/max_length_2str.cpp)





###### 最大子段和

- 描述：给定 *n* 个整数（可以为负数）的序列$(a_1,a_2,...,a_n)$ ,求$ \max\lbrace{ 0 ,\max_\limits{1\le i\le j\le n} \sum_\limits{k=i}^{j} a_k }\rbrace$ 实例：$[-2,11,-4,13,-5,-2]$
- 分析：我们维护一个数组dp[i],显然对于dp[i]有 $dp[i] = \max{(dp[i-1]+ a[i-1],dp[i-1])}$  ，再定`res = max(dp[i],dp[i-1])` 遍历即可
- 题目代码
  - [max_subarray_sum.cpp](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/max_subarray_sum.cpp)
  - [max_subarray_sum.py](https://github.com/Chenpeel/Codes/tree/master/Python/algo_codes/max_subarray_sum.py) 

###### 0-1背包问题

- 描述：一个小偷在洗劫商铺时找到了n个物品：其中第i个物品价值$v_i$ 并且重量为$w_i$（价值和重量整数），小偷背包只能承受$W$ ,物品要么带走，要么留下，求如何才能价值最大化

  - 如果带走的一个物品可以拆分，即只带走一部分，如何价值最大化

- 分析：考察前i个物品能获得的最高价值 $V[i,w]$ ,$w$ 为背包的承受力可有如(3)
  $$
  V[i,w] = \begin{cases} &\max{\lbrace V[i-1,w], V[i-1,w-w_i]+v_i\rbrace} &\text{if}& w_i<w \\ & V[i-1,w] &\text{if}& w_i>w \end{cases}
  $$

- 题目代码

  - [knapsack.cpp](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/knapsack.cpp) 



###### 资源分配问题

- 描述：有资源n,分配给m个项目,$g_i(x)$ 为第i个项目分得资源x所得到的利润。 求总利润最大的资源分配方案,即解下列问题：
  - $max_z = g_1(x_1)+g_2(x_2)+...+g_m(x_m),x_1+x_2+...+x_m = a,x_i≥0,i={1,2,3,...,m}$ 
  - $g_i(x)$ 如下图
  
![资源分配](/imgs/source_reloc.png)

- 分析：很容易得到$dp[i] = \max(dp[i],dp[ j-w[i]+v[i] ])$  ，其中 $w[i]$ 和 $v[i]$  是投入和收益
- 题目代码：
  - [resource_alloc.cpp](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/resource_alloc.cpp) 





















