

>  [什么是递归？](./recursion.md)
> 
>  递归是一种设计和描述算法的有力工具。也是回溯法和动态规划的基础。
>
>  从皮亚诺（[Peano](https://zh.wikipedia.org/wiki/%E7%9A%AE%E4%BA%9A%E8%AF%BA%E5%85%AC%E7%90%86)）关于自然数的公理说起，皮亚诺的$4^{\circ}$ 公理模式下的数学归纳法可以立即知道某一命题的真假，后继元的表达即类比于递推公式

#####  两个阶段

- 递推：将大的问题分为小的子问题
- 回归：获得最简单的解方案后，逐层返回

`(1) ` 确定递归公式，如 斐波那契数列 中 
$$
fib(n) = \begin{cases} fib(n-1)+fib(n-2)&\text{, if } n \ge 2  \\ 1 &\text{, if } n = 1  \\ 0 , &\text{, if } n =0 \end{cases}
$$

`(2)`确定边界bad case，显然，$fib(n)$ 边界就是  $n = 0  |  n =  1$ 



关于编程人第一个接触的算法，[斐波那契数列](https://en.wikipedia.org/wiki/Fibonacci_sequence)必定有一席之地，其数学表达式为 (2)	
$$
F_n = \cfrac{1}{\sqrt 5}\lbrack (\cfrac{1+\sqrt5}{2})^n-(\cfrac {1-\sqrt5}{2})^n \rbrack
$$


##### 递归的效率

- 递归的效率浪费，由于大量后级递归的重复调用，也可能造成栈溢出，python中就限制了递归的深度
- 解决方案：重复的调用过程可用动态规划的dp数组记录，避免重复计算已经计算过的结果，也可以使用滚动记录来避免重复计算

##### 递归案例

###### 阶乘计算

- 描述：计算整数的阶乘
- 代码
  - [cpp](https://github.com/Chenpeel/Algorithms_Notes/tree/master/codes/factorial.cpp)

###### [斐波那契数列](https://en.wikipedia.org/wiki/Fibonacci_sequence) 

- 描述：***fibonacci sequence***美妙的数学数列，在自然界中无处不在，向日葵花的瓣数、树枝的分叉、鳞片的排列、黄金分割,给定任意整数n，求其对应的斐波那契数( $n \in N_+  , fib(0) = 1$ ).
- 斐波那契数有着明显的递归，也可纯粹的[数学解法](https://github.com/Chenpeel/Algorithms_Notes/tree/master/math_optimize/math.md)，另：数学解法上的优化让算法走捷径，而且计算机中，遍地都是数学，望重视
  - [fib.cpp](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/fib.cpp)

###### [汉诺塔问题](https://en.wikipedia.org/wiki/Tower_of_Hanoi)

- 描述：有三根杆子A，B，C。A杆上有 N 个 (N>1) 穿孔圆盘，盘的尺寸由下到上依次变小。要求按下列规则将所有圆盘移至 C 杆：
  1. 每次只能移动一个圆盘；
  2. 大盘不能叠在小盘上面。
  3. 最少移动次数
- 汉诺塔问题用递归的方法分解非常的简单
  - [hanoi.cpp](https://github.com/Chenpeel/Codes/blob/master/Cpp/algo_codes/hanoi.cpp)

###### 全排列问题

- 描述：生成n个元素${r_1,r_2,...,r_n}$ 的全排列
- 全排列递归求解
  - [full_permutation.cpp](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/full_permutation.cpp) 

###### 分解数字n

- 描述：将非0自然数 ***n*** **划分**成一系列非0自然数之和$n = n_1+n_2+...+n_k({n_1,n_2,...,n_k,k\ge1})$，求不同的划分的个数
- pass
  - [sum_to_n.cpp](https://github.com/Chenpeel/Codes/blob/master/Cpp/algo_codes/sum_to_n.cpp)


###### [快速排序](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/sort/quick_sort.h)

###### [归并排序](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/sort/merge_sort.h)

###### [链表反转](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/reverse_linked_list.cpp)

###### [二叉树相关算法](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/tree)

