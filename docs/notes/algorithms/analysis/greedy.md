
>  面临决策时，局部最优，即是全局最优

##### 三个阶段

- 确定最优子结构，子结构的最优合并到全局，即是最优
- 构建决策关键，包含所有子问题的最优决策
- 判断是否贪心算法结果即是问题的最优结果，一般使用反证法

##### 贪心算法的优劣

- 简单易实现、一般时间复杂度较低，解决局部最优问题
- 局部最优不一定全局最优，需要证明最优方案
  - 反证法：如果交换方案中任意两个元素/相邻的两个元素后，答案不会变得更好，那么可以推定目前的解已经是最优解了。
  - 归纳法：先算得出边界情况（例如 $n=1$ ）的最优解$F_1$，然后再证明：对于每个$n$，$F_{n+1}$ 都可以由$F_n$推导出结果。


##### 贪心算法案例

###### 可碎片化的背包问题

- 描述：与[0-1背包问题](./dynamic_programing#0-1背包问题)基本相同
- 分析：只要计算其相应的价值比率，排序即可
- 题目代码：
  - [knapsack.cpp](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/knapsack.cpp) 



###### <a  href="#huffman">哈夫曼编码问题</a>

- 描述：给定编码字符集和任意字符 $c$ 出现的频率 $f(c)$ ,  $c$ 的一个前缀编码方案 对应一棵二叉完全树T ，求找到使平均长度最短的前缀码方案，例：如下字符集用0-1串编码

  | a    | b    | c    | d    | e    | f    | g    | h    | i    | j    |
  | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
  | 0.22 | 0.13 | 0.07 | 0.06 | 0.2  | 0.1  | 0.07 | 0.06 | 0.1  | 0.07 |

- 分析：字符在T中的深度记为： $d_T(c)$  ，平均码长  $B(T) = \sum\limits_{\begin{subarray}{1} c \in C \end{subarray}} {f(c) \cdot d_T(c)}$

- 题目代码：

  - [huffmancode.cpp](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/huffmancode.cpp)
  - [huffmancode.py](https://github.com/Chenpeel/Codes/tree/master/Python/algo_codes/huffmancode.py)














