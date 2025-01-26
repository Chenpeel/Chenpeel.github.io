# C/C++



##### C之前世今生

20世纪70年代，肯·汤姆森为了使其设计的Unix系统更加高效，使用B语言的变种（即C语言）在DEC PDP-7计算机上重写了Unix。C语言中许多重要概念来源于[BCPL](https://zh.wikipedia.org/wiki/BCPL)语言，其对C语言的影响也间接地来源于[B语言](https://zh.wikipedia.org/wiki/B语言)。在1978年，[丹尼斯·里奇](https://zh.wikipedia.org/wiki/丹尼斯·里奇)和[布莱恩·柯林汉](https://zh.wikipedia.org/wiki/布萊恩·柯林漢)合作出版了《[C程序设计语言](https://zh.wikipedia.org/wiki/C程序设计语言_(书))》第一版，事实上即为K&R C标准[[7\]](https://zh.wikipedia.org/wiki/C语言#cite_note-7)。1983年，为了制定一个独立于具体机器且无歧义的C语言标准，[美国国家标准协会](https://zh.wikipedia.org/wiki/美国国家标准协会)成立了一个委员会，并在1988年完成了该标准的制定，即ANSI C。此标准同时被[国际标准化组织](https://zh.wikipedia.org/wiki/国际标准化组织)所采纳，也被称作ISO C。

C语言具有高效、灵活、功能丰富、表达力强和较高的[可移植性](https://zh.wikipedia.org/wiki/移植_(軟體))等特点，在[程序设计](https://zh.wikipedia.org/wiki/程序设计)中备受青睐，成为最近25年使用最为广泛的编程语言[[4\]](https://zh.wikipedia.org/wiki/C语言#cite_note-AutoTX-3-4)。目前，C语言[编译器](https://zh.wikipedia.org/wiki/編譯器)普遍存在于各种不同的[操作系统](https://zh.wikipedia.org/wiki/操作系统)中，例如[Microsoft Windows](https://zh.wikipedia.org/wiki/Microsoft_Windows)、[macOS](https://zh.wikipedia.org/wiki/Mac_OS_X)、[Linux](https://zh.wikipedia.org/wiki/Linux)、[Unix](https://zh.wikipedia.org/wiki/Unix)等。C语言的设计影响了众多后来的编程语言，例如[C++](https://zh.wikipedia.org/wiki/C%2B%2B)、[Objective-C](https://zh.wikipedia.org/wiki/Objective-C)、[Java](https://zh.wikipedia.org/wiki/Java)、[C#](https://zh.wikipedia.org/wiki/C♯)等。现行的许多软件都是由C语言或者其影响和派生的编程语言开发出来的。



##### C++之前世今生

C++语言发展大概可以分为三个阶段：

第一阶段从80年代到1995年。这一阶段C++语言基本上是传统类型上的[面向对象](https://zh.wikipedia.org/wiki/面向对象程序设计)语言，并且凭借着接近C语言的效率，在工业界使用的开发语言中占据了相当大份额；

第二阶段从1995年到2000年，这一阶段由于[标准模板库](https://zh.wikipedia.org/wiki/標準模板庫)和后来的[Boost](https://zh.wikipedia.org/wiki/Boost_C%2B%2B_Libraries)等程序库的出现，[泛型程序设计](https://zh.wikipedia.org/wiki/泛型程式設計)在C++中占据了越来越多的比重。当然，同时由于[Java](https://zh.wikipedia.org/wiki/Java)、[C#](https://zh.wikipedia.org/wiki/C＃)等语言的出现和硬件价格的大规模下降，C++受到了一定的冲击；

第三阶段从2000年至今，由于以[Loki](https://zh.wikipedia.org/w/index.php?title=Loki&action=edit&redlink=1)、[MPL(Boost)](https://zh.wikipedia.org/wiki/Boost_C%2B%2B_Libraries)等程序库为代表的[产生式编程](https://zh.wikipedia.org/w/index.php?title=產生式編程&action=edit&redlink=1)和[模板元编程](https://zh.wikipedia.org/wiki/模板元編程)的出现，C++出现了发展历史上又一个新的高峰，这些新技术的出现以及和原有技术的融合，使C++已经成为当今主流程序设计语言中最复杂的一员。

C++存在多个流行的成熟实现：[GCC](https://zh.wikipedia.org/wiki/GCC)、基于[LLVM](https://zh.wikipedia.org/wiki/LLVM)的[Clang](https://zh.wikipedia.org/wiki/Clang)以及[Visual C++](https://zh.wikipedia.org/wiki/Visual_C%2B%2B)等。这些实现同时也是成熟的C语言实现，但对C语言的支持程度不一（例如，VC++对ANSI C89之后的标准支持较不完善）。大多数流行的实现包含了编译器和C++部分标准库的实现。编译器直接提供核心语言规则的实现，而库提供ISO C++标准库的实现。这些实现中，库可能同时包含和ISO C标准库的共享实现（如VC++的msvcrt）；而另一些实现的ISO C标准库则是单独于编译器项目之外提供的，如[glibc](https://zh.wikipedia.org/wiki/Glibc)和[musl](https://zh.wikipedia.org/wiki/Musl)。C++标准库的实现也可能支持多种编译器，如GCC的libstdc++库支持GCC的g++和LLVM Clang的clang++。这些不同的丰富组合使市面上的C++环境具有许多细节上的实现差异，因而遵循ISO C++这样的权威标准对维持可移植性显得更加重要。现今讨论的C++语言，除非另行指明，通常均指ISO C++规则定义的C++语言（虽然因为实现的差异，可能不一定是最新的正式版本）。

值得注意，和流行的误解不同，ISO C和ISO C++都从未明确要求源程序被*编译（compile）*，而仅要求*翻译（translate）*，因此C和C++并不是所谓的*编译型*语言[[来源请求\]](https://zh.wikipedia.org/wiki/Wikipedia:列明来源)。技术上，实现C和C++程序的单位是翻译单元（translation unit）。作为对比，[Java](https://zh.wikipedia.org/wiki/Java)语言规范中就明确要求Java程序被编译实现，明确存在编译单元（compilation unit）。实际上C和C++也存在[REPL](https://zh.wikipedia.org/wiki/REPL)形式的[解释器](https://zh.wikipedia.org/wiki/解释器)实现，如[CINT](https://zh.wikipedia.org/w/index.php?title=CINT&action=edit&redlink=1)和[Cling](https://zh.wikipedia.org/w/index.php?title=Cling&action=edit&redlink=1)。但因为传统上C和C++多以编译器实现，习惯上仍有一些混用，甚至至今仍出现在ISO C++[某节标准库条款的标题](http://www.eel.is/c++draft/intseq) （[页面存档备份](https://web.archive.org/web/20220621164909/http://www.eel.is/c++draft/intseq)，存于[互联网档案馆](https://zh.wikipedia.org/wiki/互联网档案馆)）上。

传统上，C++语言被视为和C语言实现性能相近的语言，强调运行时的高效。C++引入了更多的特性，包括：复合类型（引用类型等）、const限定符和constexpr常量表达式、类型处理运算符（类型别名及auto和decltype等多种类型指示符）、C++标准库（IO库与多种容器类）与迭代器、动态内存与智能指针、函数重载、面向对象程序设计（如数据抽象、成员函数、类作用域、构造函数与析构函数、静态成员、访问控制与继承、虚函数、抽象类与接口等）、拷贝控制、运算符重载、造型与函数风格的强制类型转换、模板与泛型编程，以及异常处理、命名空间、多继承与虚继承、运行时类型识别及嵌套类等。
