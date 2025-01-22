>   算法虐我千百遍，我待算法如初恋




* 把所有经典算法、数据结构手搓一遍
* 理解源码   STL源码，各种库，推荐使用[cppreference](https://zh.cppreference.com/w/)、[cplusplus](https://cplusplus.com) 。
* 看经典书籍 （《C++ Primer中文版》、《Essential C++》、《More Effective C++（中文版）》、《提高C++性能的编程技术》、《C++ Templates中文版》、《STL源码剖析》等等）
* 刷题   (主刷[leetcode](https://leetcode.cn/u/chen___chen/))



> 时间复杂度

$O(1)  < O(log_2n) < O(n)  < O( \sqrt n) < O(nlog_2^{n})  < O(n^c) < O(c^n)  < O(n!) < O(n^n)$



# 算法设计思想


* [递归](./recursion.md)
* [分治算法](./divide_conquer.md)
* [动态规划](./dynamic_programing.md)
* [回溯法](./back_track.md)
* [贪心算法](./greedy.md)

<br><br><br>

# 算法

> 基本概念

#### 算法的五个特征

* 有穷性：有限步之后结束
* 确定性：不存在二义性，即没有歧义
* 可行性：比如受限于计算机的计算能力，有些算法虽然理论上可行，但实际上无法完成。
* 输入：能被计算机处理的各种类型数据，如数字，音频，图像等等。
* 输出：一至多个程序输出结果。

#### 复杂度
* 时间复杂度：
    * 它用来衡量算法随着问题规模增大，算法执行时间增长的快慢；
    * 描述问题规模的函数：$T(n)$ 是时间规模函数 时间复杂度主要分析 $T(n)$ 的数量级
    * $T(n)=O(f(n))$ ，$f(n)$ 是算法中基本运算的频度 一般我们考虑最坏情况下的时间复杂度
* 空间复杂度：
    * 它用来衡量算法随着问题规模增大，算法所需空间的快慢；
    * 是问题规模的函数：$S(n)=O(g(n))$ ，算法所需空间的增长率和 $g(n)$ 的增长率相同。

#### 复杂度计算
* 常用的时间复杂度大小关系：
* 复杂度如何计算
    * 时间复杂度计算（单个循环体）
        * 直接关注循环体的执行次数，设为k
    * 时间复杂度计算（多个循环体）
        * 两个运算规则：乘法规则，加法规则。

<hr>


## 基础数据结构&算法 示例

#### Linear List & Array

###### 遍历、元素统计、改变移动、旋转轮换

- Cpp中的`std::vector`
- [移动零](https://leetcode.cn/problems/move-zeroes/)
- [数组循环轮换 ](https://leetcode.cn/problems/rotate-array/)、 [旋转函数](https://leetcode.cn/problems/rotate-function/)
- [最小操作次数使数组元素相等](https://leetcode.cn/problems/minimum-moves-to-equal-array-elements/)
- [非递减数列](https://leetcode.cn/problems/non-decreasing-array/)

###### 二维数组、滚动数组

Loading...

###### 前缀和数组 & 差分数组

> 规定一维，原数组$a_n$ 、前缀和数组$prefix\_sum_{n+1}$、差分数组$diffence_{n+1}$

由前缀和数组定义可知$prefix\_sum[i] = prefix[i-1] + a[i]$（其中$prefix\_sum[0]=0$）

由差分数组定义可知$diffence[i] = a[i]-a[i-1]$ （其中$diffence[0]=a[0]$）

> 对前缀和数组，做一次差分即得原数组，反之亦然。

-  [用邮票贴满网格图](https://leetcode.cn/problems/stamping-the-grid/)

#### Linked List

###### 自定链表数据结构

* [单向链表](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/liner_list/singly_linked_list.hpp)
* [双向链表](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/liner_list/doubly_linked_list.hpp)
* [循环链表](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/liner_list/circular_linked_list.hpp)

###### 链表的旋转、合并

- [二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/)
- [旋转链表](https://leetcode.cn/problems/rotate-list/)、[ 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/) 、[K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/)
- [合并K个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)
- [ 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)、[环形链表](https://leetcode.cn/problems/linked-list-cycle/)

#### Queue

* [线性队列](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/queue/linear_queue.hpp)
* [循环队列](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/queue/circular_queue.hpp)

#### Stack

- [线性栈](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/stack/sequeue_stack.hpp)
- [链式栈](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/stack/linked_stack.hpp)

#### Tree

* [二叉树](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/tree/binary_tree.hpp)
  *   [快速排序](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/sort/quick_sort.h)就是个二叉树的前序遍历，归并排序就是个二叉树的后序遍历
* [二叉查找树BST](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/tree/binary_search_tree.hpp)  有序的二叉树，中序遍历结果是递增的
* [平衡二叉树 AVL树](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/tree/avl_tree.hpp)   绝对平衡二叉树；
* [红黑树](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/tree/redblack_tree.hpp)  弱平衡二叉树；使用广泛
* [B树](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/tree/b_tree.hpp)
* [B+树](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/tree/bplus_tree.hpp)  mysql 索引使用 B+树 的数据结构
* [字典树trie](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/tree/trie.hpp) 字典树也叫前缀树，单词查找树
* [二叉堆](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/tree/binary_heap.hpp)
* [伸展树](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/tree/splay_tree.hpp)
* [后缀树](https://oi-wiki.org/string/suffix-tree/)
  * [Ukkonen's Algorithm](https://cceh.github.io/suffix-tree/builder/ukkonen.html) （[动画演示](https://brenden.github.io/ukkonen-animation/)）
  * [McCreight's Algorithm](https://cceh.github.io/suffix-tree/builder/mccreight.html)

* [斐波那契堆(Fibonacci Heap)  ](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/tree/fibonacci_heap.hpp)
* [最优二叉树（哈夫曼树）](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/tree/huffman_tree.hpp)
  * <a href="./greedy.md/#huffman">哈夫曼编码</a>

#### String

* [字符串](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/struct/string/string.hpp)
* 子串查找
  * BF算法
  * KMP算法
  * BM算法
* 正则表达式
* 数据压缩
* 排序

#### Map

* 图的存储结构和基本操作（建立，遍历，删除节点，添加节点）
* 最小生成树
* 拓扑排序
* 关键路径
* 最短路径: Floyd,Dijkstra,bellman-ford,spfa

#### Sort

* [冒泡排序](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/sort/bubble_sort.h)
* [插入排序](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/sort/insert_sort.h)
* [选择排序](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/sort/selection_sort.h)
* [希尔排序](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/sort/shell_sort.h)
* [快速排序](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/sort/quick_sort.h)
* [归并排序](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/sort/merge_sort.h)
* [堆排序](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/sort/heap_sort.h)
* [桶排序](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/sort/bucket_sort.h)
* [计数排序](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/sort/counting_sort.h)



### Search


* 哈希表： O(1)  hashtab<实现参考这里
* 散列函数
* 碰撞解决
* 有序表查找：二分查找
* 顺序表查找：顺序查找, 复杂度O(N)
* 分块查找： 块内无序，块之间有序；可以先二分查找定位到块，然后再到**块**中顺序查找
* 动态查找:  二叉排序树，AVL树，B- ，B+（这里之所以叫**动态查找表**，是因为表结构是查找的过程中动态生成的）





## C++ STL的容器分类

> ..

![container](/imgs/container.png)








# 刷算法题目

* 字符串
* 堆和栈
* 链表
* 数值问题
* 数组和数列问题
* 矩阵问题
* 二叉树
* 图
* 海量数据处理
* 智力思维训练
* 系统设计


# 海量数据处理

* Hash映射/分而治之
* Bitmap
* Bloom filter(布隆过滤器)
* Trie树
* 数据库索引
* 倒排索引(Inverted Index)
* 双层桶划分
* 外排序
* simhash算法
* 分布处理之Mapreduce



# 开源项目中的算法

* YYCache
* cocos2d-objc
* bitcoin
* geohash
* kafka
* nginx
* zookeeper
* ...




# 15个经典基础算法


* KMP 字符串匹配算法
* Hash
* [快速排序](https://github.com/Chenpeel/Codes/tree/master/Cpp/algo_codes/sort/quick_sort.h)
* 快速选择SELECT
* 红黑树 （一种弱/自平衡的“二叉查找树”）
* BFS/DFS （广度/深度优先遍历）
* 寻路算法： 求解最短路径
* Dijkstra：最短路径算法
* `SPFA(Shortest Path Faster Algorithm)` 单元最短路径算法
* 启发式搜索
* 遗传算法 `GA`
* [DP (动态规划 dynamic programming)](./dynamic_programing.md)
* 图像特征提取之`SIFT` 算法 , 广泛的应用于图像识别，图像检索，3D重建等CV的各种领域
* 傅立叶变换






# 推荐阅读

### 刷题必备

* 《剑指offer》
* 《编程之美》
* 《编程之法:面试和算法心得》
* 《算法谜题》 都是思维题

### 基础

* 《编程珠玑》Programming Pearls
* 《编程珠玑(续)》
* 《数据结构与算法分析》
* 《Algorithms》 这本近千页的书只有6章,其中四章分别是排序，查找，图，字符串，足见介绍细致

### 算法设计

* 《算法设计与分析基础》
* 《算法引论》 告诉你如何创造算法   断货
* 《Algorithm Design Manual》算法设计手册 红皮书
* 《算法导论》 是一本对算法介绍比较全面的经典书籍
* 《Algorithms on Strings,Trees and Sequences》
* 《Advanced Data Structures》 各种诡异高级的数据结构和算法 如元胞自动机、斐波纳契堆、线段树  600块


### 延伸阅读

* 《深入理解计算机系统》
* 《TCP/IP详解三卷》
* 《UNIX网络编程二卷》
* 《UNIX环境高级编程：第2版》
* 《The practice of programming》   Brian Kernighan和Rob Pike
* 《writing efficient programs》  优化
* 《The science of programming》 证明代码段的正确性   800块一本




# 参考链接和学习网站



- [July 博客](http://blog.csdn.net/v_july_v)



* 《数学建模十大经典算法》
* 《数据挖掘领域十大经典算法》
* 《十道海量数据处理面试题》
* 《数字图像处理领域的二十四个经典算法》
* 《精选微软等公司经典的算法面试100题》
* [The-Art-Of-Programming-By-July](https://github.com/julycoding/The-Art-Of-Programming-By-July)
* [微软面试100题](http://blog.csdn.net/column/details/ms100.html)
* [程序员编程艺术](http://blog.csdn.net/v_JULY_v/artic</details/6460494)



### 基本算法演示

- http://www.cs.usfca.edu/~gal<s/visualization/Algorithms.html


### 编程网站

* [Leetcode](https://leetcode.cn/u/chen___chen/)个人主页
* [AcWing](https://www.acwing.com/prob<m/) 刷题
* [codetop](https://codetop.cc/home) 企业高频面试题库，刷题必备
* [openjudge](http://openjudge.cn/)  开放在线程序评测平台，可以创建自己的OJ小组
* [九度OJ](http://ac.jobdu.com/index.php)
* 这有个[ACM训练方案](http://www.java3z.com/cwbwebhome/artic</artic<19/res041.html)

### 竞赛网站

- [Leetcode竞赛](https://leetcode.cn/contest/)
- [AtCoder](https://atcoder.jp/) 英国网站，作息阴间的可以一试
- [ForceCd](https://codeforces.com/) 同上



### 网课

- [代码随想录](https://www.bilibili.com/video/BV1fA4y1o715/?spm_id_from=333.788&vd_source=2ed772ef3c25dca43937d30b2e9c63c9)：刷题思路讲解
- [高级数据结构和算法](https://www.coursera.org/<arn/gaoji-shuju-jiegou/)  ：北大教授张铭老师在coursera上的课程。完成这门课之时，你将掌握多维数组、广义表、Trie树、AVL树、伸展树等高级数据结构，并结合内排序、外排序、检索、索引有关的算法，高效地解决现实生活中一些比较复杂的应用问题。当然coursera上也还有很多其它算法方面的视频课程。
- [算法设计与分析 Design and Analysis of Algorithms](https://www.coursera.org/<arn/algorithms?) ：由北大教授Wanling Qu在coursera讲授的一门算法课程。首先介绍一些与算法有关的基础知识，然后阐述经典的算法设计思想和分析技术，主要涉及的算法设计技术是：分治策略、动态规划、贪心法、回溯与分支限界等。每个视频都配有相应的讲义（pdf文件）以便阅读和复习。




### 其它

[OI Wiki](https://github.com/24OI/OI-wiki/) 主要内容是 OI/ACM-ICPC 编程竞赛 (competitive programming) 相关的知识整理, 包括基础知识、常见题型、解题思路以及常用工具等内容。

[labuladong 的算法小抄](https://labuladong.gitee.io/algo/) 作者整理了很多的解题套路框架，看完获益良多
