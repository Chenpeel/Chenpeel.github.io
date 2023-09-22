## <a id="linux_basic">Linux命令基础</a>

<hr>

#### <a id="basic">**最基础命令** </a>: `man  *`

> 解释命令

举个🌰: `man pwd` , 显示出关于pwd的一系列信息

```bash
❯ man pwd
......
PWD(1)                           General Commands Manual                          PWD(1)

NAME
     pwd – return working directory name

SYNOPSIS
     pwd [-L | -P]

DESCRIPTION
     The pwd utility writes the absolute pathname of the current working directory to
     the standard output.
     Some shells may provide a builtin pwd command which is similar or identical to this
     utility.  Consult the builtin(1) manual page.
     
     The options are as follows:
     -L      Display the logical current working directory.
     -P      Display the physical current working directory (all symbolic links
             resolved).
     If no options are specified, the -L option is assumed.
ENVIRONMENT
     Environment variables used by pwd:
     PWD      Logical current working directory.
EXIT STATUS
     The pwd utility exits 0 on success, and >0 if an error occurs.
EXAMPLES
     Show current working directory with symbolic links resolved:
           $ /bin/pwd -P
           /usr/home/fernape
     Show the logical current directory.  Then use file(1) to inspect the /home
     directory:
           $ /bin/pwd
           /home/fernape
           $ file /home
           /home: symbolic link to usr/home
SEE ALSO
     builtin(1), cd(1), csh(1), realpath(1), sh(1), getcwd(3)
STANDARDS
     The pwd utility conforms to IEEE Std 1003.1-2001 (“POSIX.1”).
HISTORY
     The pwd command appeared in Version 5 AT&T UNIX.
BUGS
     In csh(1) the command dirs is always faster because it is built into that shell.
     However, it can give a different answer in the rare case that the current directory
     or a containing directory was moved after the shell descended into it.

     The -L option does not work unless the PWD environment variable is exported by the
     shell.
macOS 13.5                          October 24, 2020                          macOS 13.5
(END)
```



当然也可以使用`man man `来自解释

```bash
❯ man man
......
MAN(1)                                                                          General Commands Manual                                                                         MAN(1)

NAME
     man, apropos, whatis – display online manual documentation pages

SYNOPSIS
     man [-adho] [-t | -w] [-M manpath] [-P pager] [-S mansect] [-m arch[:machine]] [-p [eprtv]] [mansect] page ..
     man -f [-d] [-M manpath] [-P pager] [-S mansect] keyword ...
     whatis [-d] [-s mansect] keyword ...

     man -k [-d] [-M manpath] [-P pager] [-S mansect] keyword ...
     apropos [-d] [-s mansect] keyword ...

DESCRIPTION
     The man utility finds and displays online manual documentation pages.  If mansect is provided, man restricts the search to the specific section of the manual.
     The sections of the manual are:
           1.   General Commands Manual
           2.   System Calls Manual
           3.   Library Functions Manual
           4.   Kernel Interfaces Manual
           5.   File Formats Manual
           6.   Games Manual
           7.   Miscellaneous Information Manual
           8.   System Manager's Manual
           9.   Kernel Developer's Manual

     Options that man understands:
     -M manpath
             Forces a specific colon separated manual path instead of the default search path.  See manpath(1).  Overrides the MANPATH environment variable.
     -P pager
             Use specified pager.  Defaults to “less -sR” if color support is enabled, or “less -s”.  Overrides the MANPAGER environment variable, which in turn overrides the PAGER
             environment variable.
     -S mansect
             Restricts manual sections searched to the specified colon delimited list.  Defaults to “1:8:2:3:3lua:n:4:5:6:7:9:l”.  Overrides the MANSECT environment variable.
     -a      Display all manual pages instead of just the first found for each page argument.
     -d      Print extra debugging information.  Repeat for increased verbosity.  Does not display the manual page.
     -f ......
     .
     .
     .
```

man页面一般可以分为8种命令类型

1. 用户命令
2. 系统调用
3. c库函数
4. 设备与网络接口
5. 文件格式
6. 游戏与屏保
7. 环境、表、宏
8. 系统管理员命令和后台运行命令
9. 内核开发者手册

想要知道什么命令就可以直接优雅的(地)`man`来使用啦




<br><br>
<br><br><br><br>







完结撒花~~🎉🎉🎉






<hr>

#### <a id="files">文件系统</a>



###### <a id="which&whereis">WHICH & WHEREIS</a>

用于查找文件等等

```bash
❯ which man
/usr/bin/man


❯ whereis man
man: /usr/bin/man /usr/share/man/man1/man.1

```

- which 指令会在<a href="#env">环境变量$PATH</a>设置的目录里寻找符合条件的文件, 输出文件的路径
- whereis则会在特定目录寻找符合条件的文件,用于定位二进制文件,源码文件

###### <a id="find">FIND</a>

用于按需求查找文件,可以按照(修改)时间,名称,字数等方式查找

```bash
❯ find ./qck  -name  "*.sh"
./qck/qck_py/ins.sh
./qck/qck_sh/load_esp.sh
./qck/qck_sh/reference.sh
./qck/qck_sh/reop_reference.sh
./qck/qck_sh/x86asm.sh
./qck/qck_sh/stop_reference.sh
./qck/qck_sh/x86asm_releasa.sh
```

可以看到,按照名字匹配目录中含`.sh`后缀的文件



###### <a id="pwd"> PWD </a>

如👆的`man pwd`可以显然看到

```bash
pwd – return working directory name
```

就是返回你当前的工作目录啦(print working directory)

比如说:

```bash
❯ pwd
/root
```

###### <a id="cd">CD </a>

同样的`man cd`

```bash
BUILTIN(1)                                   General Commands Manual                                   BUILTIN(1)

NAME
     builtin, !, %, ., :, @, [, {, }, alias, alloc, bg, bind, bindkey, break, breaksw, builtins, case, cd, chdir,
     command, complete, continue, default, dirs, do, done, echo, echotc, elif, else, end, endif, endsw, esac,
     eval, exec, exit, export, false, fc, fg, filetest, fi, for, foreach, getopts, glob, goto, hash, hashstat,
     history, hup, if, jobid, jobs, kill, limit, local, log, login, logout, ls-F, nice, nohup, notify, onintr,
     popd, printenv, printf, pushd, pwd, read, readonly, rehash, repeat, return, sched, set, setenv, settc,
     setty, setvar, shift, source, stop, suspend, switch, telltc, test, then, time, times, trap, true, type,
     ulimit, umask, unalias, uncomplete, unhash, unlimit, unset, unsetenv, until, wait, where, which, while –
     shell built-in commands

.........

:_
```

结果输出了一堆东西,注意第一行`BUILTIN(1)`

你的man想告诉你: 不要再问啦,这种内置命令你怎么问的出口的🥹

```bash
❯ which cd
cd: shell built-in command
❯ whereis cd
cd: /usr/bin/cd /usr/share/man/man1/builtin.1
```

通过which和whereis可以看到cd的信息,位于根目录`/bin`

```bash 
❯ cd /bin 
❯ ls
[         cp        dd        expr      launchctl mkdir     pwd       sh        tcsh      zsh
bash      csh       df        hostname  link      mv        realpath  sleep     test
cat       dash      echo      kill      ln        pax       rm        stty      unlink
chmod     date      ed        ksh       ls        ps        rmdir     sync      wait4path
```

这里的`ls`就是输出你的某目录下的文件

可以看到内置了许多诸如`cd`, `ls`等命令

从我输入的cd命令,可以看出cd的作用,即:更改当前工作目录(Change working Directory)

我绕了这么一圈子,就是想强调多man一man,不只是命令行哦😁



###### <a id="ls">LS</a>

显然ls是输出某个目录的文件及文件夹(list directory contents)

另外笔者经常加上参数使用

- `ls -a` : 显示包含隐藏字符`.`的文件.   man给出的解释是: `-a   Include directory entries whose names begin with a dot (‘.’).`(后续不再给出man结果,请读者自行使用)

- `ls -l` : 以更加规整的方式显示输出

```bash
  ❯ ls -l
  total 8
  -rw-r--r--@  1 alpha  staff   90 Jun 14 01:30 README.md
  drwxr-xr-x@ 23 alpha  staff  736 May 25 15:49 fuckZHS
  drwxr-xr-x@  8 alpha  staff  256 Sep 14 21:14 qck_py
  drwxr-xr-x@  8 alpha  staff  256 Sep 14 21:48 qck_sh
```

  可以看到,参数l输出时显示了读写权限,当前用户,大小, 时间,文件等信息,十分规整

- `ls -lh`:  以人类可读的方式显示当前目录中的文件和目录大小

提到显示目录信息,那就不得不提目录树

###### <a id="tree">TREE</a>

> tree命令在某些Linux/Unix操作系统需要单独下载,笔者使用的Mac就需要下载

- 下载:

  - Mac OS使用包管理工具Homebrew
```bash 
    brew install tree
```

  - Linux 使用apt、yum或者pacman等等, 下载即可
```bash
    sudo apt install tree
    sudo yum -y install tree
    sudo pacman -S tree 
```

- 使用:

  - 在任意目录下直接输入tree

```bash
    ❯ tree
    .
    ├── qck_py
    │   ├── ins.sh
    │   ├── latex2svg.py
    │   ├── morse_code.py
    │   ├── pic_png.py
    │   ├── time_grep.py
    │   └── wallpaper_of_bing.py
    └── qck_sh
        ├── load_esp.sh
        ├── reference.sh
        ├── reop_reference.sh
        ├── stop_reference.sh
        ├── x86asm.sh
        └── x86asm_releasa.sh
    
    2 directories, 12 files
```

    如⬆️输出了一个目录树,你可以清楚的看到层级关系



###### <a id="mkdir&rmdir">MKDIR & RMDIR</a>

创建和删除目录(make | remove  directories),

既然是复数的dir那么就可以同时创建或者删除多个目录,可以通过参数来确定是使用嵌套的方式创建或是递归删除等等

```bash
❯ mkdir -p  test_dep1/test_dep2
❯ tree test_dep1
test_dep1
└── test_dep2

2 directories, 0 files
```

```bash
❯ rmdir -p  test_dep1/test_dep2
❯ ls | grep test_dep
❯ _
```

p参数即parent的意思,在创建时即使用嵌套创建,删除时使用递归删除

其中<a href="#grep">grep</a>在下面会介绍,在这里理解为捕捉关键字



###### <a id="touch">TOUCH</a>

Hey, I touched a new file~ 我创建了一个新文件

```bash
❯ touch test.cpp test.txt test.py test.png
❯ ls | grep test
test.cpp
test.png
test.py
test.txt
```

可以创建任何形式的文件,任何后缀都可以

不仅是使用`touch` 你还可以使用强大的编辑器Vi/Vim来创建

```bash
vi	test.php
vim test.php
```

这种方式创建后会直接进入文件,并进行命令和编辑,参见我写的[Vim](../tools/Vim.md)基础



###### <a id="rm">RM</a>

使用`rm`命令可以删除文件或是文件夹

```bash
rm test.txt
```

执行命令后,终端一般会询问是否确认删除并要求键入y(yes)

通常情况下,笔者一般使用

```bash
rm -rf test.txt
```

指递归地(r)、强制地(f)删除文件,这里的递归就是指文件夹啦,学会了快去`rm -rf /*`吧😈



###### <a id="cp">CP</a>

除创建和删除之外,日常使用复制也必不可少,没错就是`cp`(copy)

```bash
cp  ./source_dir/source_file  ./target_dir
```

从源文件复制到目标文件下,或者可以使用r参数来递归(recursional)复制文件夹



###### <a id="mv">MV</a>

如果你不小心输错了目标目录或者touch文件时出现问题怎么办,直接rm 再重新操作吗?

这时候`mv`就派上用场了

mv可以进行更改文件位置或改名操作

```bash
mv wrong_path_file  ./Target_dir/ 

mv wrong_name_file  right_name

```

改名, 怎么给系统文件改<s>命</s>名呢[Thinking]

当然最好不要,权限也不一定够

但是可以给你的系统文件设置小名啦

```bash
alias cd='rm -rf ' 
```

成功把`rm -rf`别名为`cd`😈

但对于用户来说只有这一个终端窗口是有效的,仅仅是一个“局部变量” 

可以将其写入`.bash_profile`或者其他预加载文件(诸如: `.zshrc` `.dash_profile` ...)

```bash
echo ' alias cd="rm -rf" ' >> .bash_profile
```

这样对于你当前用户Test来说(`/Users/Test/` ),只要此用户开启一个终端,那么`.bash_profile`就会预加载,然后使用`cd   /Users/Test/Desktop/`    💥💥💥



###### <a id="echo">ECHO</a>

上面的命令中我使用了`echo` (回声)命令,它可真的就是字面意思

```bash
❯ echo 这里是米奇妙妙屋
这里是米奇妙妙屋
```

终端会直接**输出**输入的内容,像回声一样,但显然无法达到我的目的

所以使用了<a href="#re">重定向运算符</a> `>>` 

使用`>`和`>>`时需留意,单个`>`配合`echo`会将文件原有的内容覆盖,而双`>>`则会在原文件最后**追加** 

```bash
❯ echo 'echo "..">test.sh ' >test.sh
```

需要注意的是,echo后的(运算符前的)单引号内被识别为字符串,而使用双引号则会识别一些变量,变量会在<a href="#shell">shell编程基础</a>中讲到

- [ ] 怎么确定写入的是对的呢?
- [x] 输出查看呐!

###### <a id="cat">CAT</a>

输出文件的内容(只)

```bash
❯ cat morse_code.py

morse_code={
    "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".",
    "F": "..-.", "G": "--.", "H": "....", "I": "..", "J": ".---",
    "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---",
    "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-",
    "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--",
    "Z": "--..", "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".",
    "f": "..-.", "g": "--.", "h": "....", "i": "..", "j": ".---",
    "k": "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---",
    "p": ".--.", "q": "--.-", "r": ".-.", "s": "...", "t": "-",
    "u": "..-", "v": "...-", "w": ".--", "x": "-..-", "y": "-.--",
    "z": "--..", "0": "-----", "1": ".----", "2": "..---",
    "3": "...--", "4": "....-", "5": ".....", "6": "-....",
    "7": "--...", "8": "---..", "9": "----.", ".": ".-.-.-",
    ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
    "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...",
    ":": "---...", ";": "-.-.-.", "=": "-...-", "+": ".-.-.",
    "-": "-....-", "_": "..--.-", '"': ".-..-.", "$": "...-..-",
    "@": ".--.-."
}


def get_morse_code(char):
    if char.upper() in morse_code:
        return morse_code[char.upper()]
    else:
        return "未找到对应的莫斯密码"
text = input()
# for i in text:
#     if i not in " ":
#          print(morse_code.get(int(i)," "),end="  ")
#     else :
#         print("")
print(get_morse_code(text))
```

可以看到莫斯码转换的脚本被输出了

**你也可以使用cat同时输出多个文件的内容**

然而有时输出超出了终端窗口的长度,那么就会被截断

此时,你就可以使用`less`或`more`👇



###### <a id="more&less">MORE & LESS</a>

more 诞生于less之前,从而less的功能比之more要强大

两者都是实现分页浏览,然而more只能向上翻页,而less则前后都可以翻页浏览

关于more和less浏览时的操作按键操作自行查看(优雅的man从不麻烦别人🙃)



###### <a id="head&tail">HEAD&TAIL</a>

一头一尾就是显示文件的头几行和尾几行,🌰如:

```bash
❯ head -n 10 morse_code.py

morse_code={
    "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".",
    "F": "..-.", "G": "--.", "H": "....", "I": "..", "J": ".---",
    "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---",
    "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-",
    "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--",
    "Z": "--..", "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".",
    "f": "..-.", "g": "--.", "h": "....", "i": "..", "j": ".---",
    "k": "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---",
    
```

而通过`tail`能够实时跟踪运行日志(注: 使用Vim对实时更新的日志进行更改,并**不会显示出来**)

```bash
tail -f output_log.txt
```



###### <a id="history">HISTORY </a>

此命令是用来查看你的命令输入历史的

众所周知: 在终端可以通过⬆️⬇️来快捷的再次输入你所输入过的命令

这个操作所依赖的就是history的内容了

```bash
❯ history
    1  ls
    2  man history
    3  which history
    4  whereis history
    5  cat .bash_profile
    6  whereis omz_history
    7  l
    8  l | grep history
    9  history 3
```

可以看到我的history内容,显然怎么可能只有这么少一点呢

因为我清理过了,怎么能让你们看到我的历史🤏,你所看到的只是我想让你看到的

```bash
❯ history -c
History file deleted.
❯ history
    1  history
```

通过`-c`可以删除历史记录,但是`~/ `下的`.bash_history`还是可以看到记录	

```bash
❯ cat .zsh_history
: 1694761770:0;history
: 1694761871:0;cat .bash_profile
: 1694761881:0;cat .zsh_history
```

一并删了即可

另外,可以通过`!3`的形式,来快捷获取第三行做的命令操作

```
❯ !3
❯ cat .zsh_history

		...zsh_history...
		
❯ history 3
    3  cat .zsh_history
```



###### <a id="wc">WC</a>

>  卧槽[bushi]🤪

wc可以计算文件中的字数、Byte数或是列数，若不指定文件名称、或是所给予的文件名为"-"，则wc指令会从标准输入设备读取数据。(Word Count)

```bash
❯ wc -c test.sh
      19 test.sh
```



###### <a id="zip">ZIP</a>

zip是1952年出现的一个划时代性产物,大大提升了文件的传输效率

- zip

  > zip命令非常的简单明了

``` bash
  zip target.zip source_file/dir 
```

  解压同样使用unzip即可

- gzip
  gzip同zip命令,不同的只是适用性和压缩率的问题

- tar
  tar命令则与上两个不一样

```bash
  tar [参数] file
```

  | options |     functions      |
  | :-----: | :----------------: |
  |  `-z`   |    打包同时压缩    |
  |  `-c`   |  产生.tar打包文件  |
  |  `-v`   |    显示详细信息    |
  |  `-f`   | 指定压缩后的文件名 |
  |  `-x`   |    解包.tar文件    |
  |  `-C`   |   解压到指定目录   |



###### <a id="ln">LN</a>

经常访问多层级目录之间时,一定会有这种烦恼😣

即使有Table键都要操作好久, 才能找到我要cd的目录😡

`link` 可以帮你解决这个问题,可以直接把常用的文件链接到用户目录下,直接一步cd即可触及

```bash 
❯ tree testA
testA
└── testB
    └── testC
        └── testZ
            └── test.sh

4 directories, 1 file

❯ ln -s testA/testB/testC/testZ/test.sh  ./test.sh

❯ echo "this is link test" > test.sh

❯ cat test.sh
this is link test

❯ cat testA/testB/testC/testZ/test.sh
this is link test
```

可以看到我将文件链接到了用户下,直接可以访问,而这种链接是不占用空间的,相当于一种映射或者说给你的目录树夹了个书签,可以快捷访问

- 软链接(亦称符号连接 symbolic link): 如上使用的就是软链接 参数`-s` ,它可以对不存在的文件进行链接,也可以对不同的文件系统进行链接,比如使用本地主机链接服务器的某个文件/文件夹
- 硬链接(hard link) : 以文本副本的形式存在,但不会占用你的实际空间,而且不允许给目录创建,毕竟文件才能有副本
  只有在同一个文件系统才可以建立硬链接



###### <a id="cal&date">CAL & DATE</a>

今天是几号? 几点了?

笔者使用的MacOS喜欢隐藏状态栏和启动台,但iTerm常驻且不想耗费宝贵的生命能量, 挪手动鼠标,于是就有

```bash
Command + Table 到 iTerm

❯ cal && date
   September 2023
Su Mo Tu We Th Fr Sa
                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15^ 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30

Fri Sep 15 23:40:10 CST 2023
```

没错重写更新这篇已经是23年9月了🫠 还是晚上近

当然你也可以显示某一年某一个月的日历、或者以你期望的方式输出日期

```bash
❯ cal oct 2023
    October 2023
Su Mo Tu We Th Fr Sa
 1  2  3  4  5  6  7
 8  9 10 11 12 13 14
15 16 17 18 19 20 21
22 23 24 25 26 27 28
29 30 31

❯ date  -I
2023-09-15
```

###### <a id="time">TIME</a>

如果你以为time是平时所说的time那就错了

命令行的time一般都是时间戳,用于计算衡量执行一些程序或是进程的消耗时间长短和系统资源等

```bash
❯ time
shell  31.49s user 10.83s system 0% cpu 25:35:48.14 total
children  3.27s user 19.22s system 0% cpu 25:35:48.14 total


❯ time  qck/qck_sh/reference.sh
Now docker is Running
7580fc8d10ea1bf176a661c3d7a26502e1f43f845d2cfbf47a56b910eedd6cee
Reference start successfully!

qck/qck_sh/reference.sh  0.58s user 0.50s system 4% cpu 24.623 total
```

这里我尝试执行了一个我写的在本地启动一个docker并访问端口的小脚本

可以看到耗时、系统占用、cpu消耗等信息

###### <a id="top">TOP</a>

相比于time,top则是实时显示当前系统的资源使用情况,并包含了PID等信息

```bash
Processes: 440 total, 3 running, 437 sleeping, 2299 threads                                                                                                                    01:01:35
Load Avg: 1.40, 1.81, 1.81  CPU usage: 16.52% user, 2.91% sys, 80.55% idle  SharedLibs: 439M resident, 89M data, 20M linkedit.
MemRegions: 226376 total, 1990M resident, 165M private, 2011M shared. PhysMem: 7386M used (1689M wired, 971M compressor), 245M unused.
VM: 184T vsize, 4285M framework vsize, 227116(0) swapins, 403927(0) swapouts. Networks: packets: 6393612/7292M in, 4368188/3728M out. Disks: 13896259/253G read, 3960641/98G written.

PID    COMMAND      %CPU  TIME     #TH   #WQ  #PORT MEM    PURG   CMPRS  PGRP  PPID  STATE    BOOSTS           %CPU_ME %CPU_OTHRS UID  FAULTS    COW    MSGSENT    MSGRECV    SYSBSD
1069   corespotligh 100.4 05:08:05 4/1   2/1  221   27M    0B     19M    1069  1     running  *451[1]          0.00000 99.93917   501  662511    1460   93740      51437      3096368
30629  iTerm2       10.5  57:40.73 11    8    300-  306M   2464K  88M    30629 1     sleeping *0-[5097]        0.26914 1.55691    501  2527822+  5305   4636928+   2234317+   24823601+
576    WindowServer 7.4   03:25:10 19    5    2819- 1740M  94M    205M   576   1     sleeping *0[1]            2.33797 0.35968    88   20900512+ 228945 110598197+ 64102152+  107644927+
```



###### <a id="grep">GREP</a>

grep用于查找文件或文件中符合条件的字符串或正则表达式

如果某个目录下文件太多,或某个文件字符信息太多就可以使用

```bash
❯ grep -r python=python3
./.zshrc:alias python=python3

❯ time grep -r "alias python=python3"
./.zshrc:alias python=python3
^C
grep --color=auto --exclude-dir={.bzr,CVS,.git,.hg,.svn,.idea,.tox} -r   11.67s user 0.44s system 97% cpu 12.470 total


❯ cat python/basic_learn/basic_lan/*.py  | grep import
from math import pow
count(text)import math
import turtle
from  turtle import *
done()from turtle import*
done()from turtle import *
from datetime import datetime
from PIL import Image
from PIL import ImageFilter
# The most important function is the  ** turtle.write() **
from turtle import *
from math import sqrt
from math import radians
from turtle import *
import turtle

```

其中的`|` 为管道符,就是将上一条命令的输出通过管道流向下一条命令作为输入

不要轻易使用`-r`递归查找,system 占用97% 😧

正则的水很深,要好好把握🫴,值得细细学习



###### <a id="ping">PING</a>

ping指令经常用于测试网络状况,通过ping其他主机来排除自己主机的一些网络问题

使用ICMP传输协议,发出要求回应的信息

```bash
❯ ping -i 1 -c 10  -R baidu.com
PING baidu.com (39.156.66.10): 56 data bytes
64 bytes from 39.156.66.10: icmp_seq=0 ttl=50 time=23.591 ms
64 bytes from 39.156.66.10: icmp_seq=1 ttl=50 time=23.733 ms
64 bytes from 39.156.66.10: icmp_seq=2 ttl=50 time=23.670 ms
64 bytes from 39.156.66.10: icmp_seq=3 ttl=50 time=23.742 ms
64 bytes from 39.156.66.10: icmp_seq=4 ttl=50 time=23.639 ms
64 bytes from 39.156.66.10: icmp_seq=5 ttl=50 time=23.683 ms
64 bytes from 39.156.66.10: icmp_seq=6 ttl=50 time=23.661 ms
64 bytes from 39.156.66.10: icmp_seq=7 ttl=50 time=23.666 ms
64 bytes from 39.156.66.10: icmp_seq=8 ttl=50 time=23.708 ms
64 bytes from 39.156.66.10: icmp_seq=9 ttl=50 time=23.692 ms

--- baidu.com ping statistics ---
10 packets transmitted, 10 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 23.591/23.678/23.742/0.042 ms


ping google.com
```

笔者通常ping两个主机以确定网络状况



###### <a id="ifconfig">IFCONFIG</a>

可以设置网络设备的状态或者显示当前的设置

在查看自己的IP是经常用到

```bash
❯ ifconfig
eth0   Link encap:Ethernet HWaddr 00:50:56:0A:0B:0C 
     inet addr:192.168.0.3 Bcast:192.168.0.255 Mask:255.255.255.0
     inet6 addr: fe80::250:56ff:fe0a:b0c/64 Scope:Link
     UP BROADCAST RUNNING MULTICAST MTU:1500 Metric:1
     RX packets:172220 errors:0 dropped:0 overruns:0 frame:0
     TX packets:132379 errors:0 dropped:0 overruns:0 carrier:0
     collisions:0 txqueuelen:1000 
     RX bytes:87101880 (83.0 MiB) TX bytes:41576123 (39.6 MiB)
     Interrupt:185 Base address:0x2024 

lo    Link encap:Local Loopback 
     inet addr:127.0.0.1 Mask:255.0.0.0
     inet6 addr: ::1/128 Scope:Host
     UP LOOPBACK RUNNING MTU:16436 Metric:1
     RX packets:2022 errors:0 dropped:0 overruns:0 frame:0
     TX packets:2022 errors:0 dropped:0 overruns:0 carrier:0
     collisions:0 txqueuelen:0 
     RX bytes:2459063 (2.3 MiB) TX bytes:2459063 (2.3 MiB)

❯ ifconfig eth0 down
	# 关闭网卡
	...
	
❯ ifconfig eth0 192.168.1.56 
	# 配置IP地址
```



###### <a id="ssh">SSH</a>

笔者经常在服务器提供商查看服务器IP,再使用本地主机进行ssh远程登录

这样就不用登录提供商网页即可使用服务器整花活

```bash
❯ ssh beta@192.168.31.2
beta@192.168.31.2's password:*******
    _              _      ____  ___   ___  ____      _
   / \   _ __ ___ | |    / ___|/ _ \ / _ \| ___|  __| |
  / _ \ | '_ ` _ \| |____\___ \ (_) | | | |___ \ / _` |
 / ___ \| | | | | | |_____|__) \__, | |_| |___) | (_| |
/_/   \_\_| |_| |_|_|    |____/  /_/ \___/|____/ \__,_|

Welcome to Armbian 23.08.0-trunk Jammy with Linux 5.15.117-ophub

System load:   2%           	Up time:       2 days 16:54
Memory usage:  10% of 1.77G  	IP:	       172.31.0.1 192.168.31.2
CPU temp:      49°C           	Usage of /:    89% of 6.4G
RX today:      631.1 KiB

[ 48 security updates available, 61 updates total: apt upgrade ]
Last check: 2023-09-16 00:00
```

如上beta是用户名也可以使用root用户进行登录

###### <a id="netstat">NETSTAT</a>

显示网络状态

```bash
❯ netstat -i
Name       Mtu   Network       Address            Ipkts Ierrs    Opkts Oerrs  Coll
lo0        16384 <Link#1>                       1912550     0  1912550     0     0
lo0        16384 127           localhost        1912550     -  1912550     -     -
lo0        16384 localhost   ::1                1912550     -  1912550     -     -
lo0        16384 chenpeeldem fe80:1::1          1912550     -  1912550     -     -
```

如👆显示网卡列表

通过netstat可以显示socket、路由器配置的快取信息、显示TCP传输协议的连线状况等等信息



###### <a id="snr">SERVICE NETWORK RESTART</a>

用来重启网络服务

```bash
❯ service network restart
==== AUTHENTICATING FOR org.freedesktop.systemd1.manage-units ===
Authentication is required to restart 'network.service'.
Authenticating as: Beta,,, (beta)
Password:*******
```



###### <a id="hostname">HOSTNAME</a>

使用hostname输出当前所处的用户的用户名,也可以为其更改用户名

```bash
❯ hostname
ChenpeeldeMacBook-Air.local
❯ hostname Chenpeel
Chenpeel
```



###### <a id="env">系统环境变量</a>

常用系统环境变量：`$HOME` `$PWD` `$SHELL` `$USER` 等等

系统环境变量是定义你所使用的目录、用户、字符格式等一系列复杂信息的变量

通过`$`符对变量进行访问,对于变量的访问都是通过此方式,更加标准的是使用`${PATH}`使用大括号将其隔离,进行访问

```bash
❯ echo ${PATH}
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
```


- `env`  显示所有系统环境变量
```bash
	❯ env
	
	LC_TERMINAL_VERSION=3.4.20
	LC_CTYPE=C.UTF-8
	LC_TERMINAL=iTerm2
	USER=beta
	LOGNAME=beta
	HOME=/home/beta
	PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
	SHELL=/usr/bin/zsh
	TERM=xterm-256color
	XDG_SESSION_ID=739
	XDG_RUNTIME_DIR=/run/user/1000
	DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
	XDG_SESSION_TYPE=tty
	XDG_SESSION_CLASS=user
	.....
	❯ env |grep path
	DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
```

- `set` 显示所有变量

```bash
❯ set | less

'!'=37278
'#'=0
'$'=37260
'*'=(  )
.....


❯ set | less |grep path

ZSH_HIGHLIGHT_STYLES=( [arg0]='fg=green' [assign]=none [autodirectory]='fg=green,underline' [back-dollar-quoted-argument]='fg=cyan' [back-double-quoted-argument]='fg=cyan' [back-quoted-argument]=none [back-quoted-argument-delimiter]='fg=magenta' [bracket-error]='fg=red,bold' [bracket-level-1]='fg=blue,bold' [bracket-level-2]='fg=green,bold' [bracket-level-3]='fg=magenta,bold' [bracket-level-4]='fg=yellow,bold' [bracket-level-5]='fg=cyan,bold' [command-substitution]=none [command-substitution-delimiter]='fg=magenta' [commandseparator]=none [comment]='fg=black,bold' [cursor]=standout [cursor-matchingbracket]=standout [default]=none [dollar-double-quoted-argument]='fg=cyan' [dollar-quoted-argument]='fg=yellow' [double-hyphen-option]=none [double-quoted-argument]='fg=yellow' [global-alias]='fg=cyan' [globbing]='fg=blue' [history-expansion]='fg=blue' [line]='' [named-fd]=none [numeric-fd]=none [path]=underline [path_pathseparator]='' [path_prefix_pathseparator]='' [precommand]='fg=green,underline' [process-substitution]=none [process-substitution-delimiter]='fg=magenta' [rc-quote]='fg=cyan' [redirection]='fg=yellow' [reserved-word]='fg=yellow' [root]=standout [single-hyphen-option]=none [single-quoted-argument]='fg=yellow' [suffix-alias]='fg=green,underline' [unknown-token]='fg=red,bold' )
_p9k__last_buffer='set | less |grep path'
_p9k__preexec_cmd='set | less | grep --color=auto  path'
cdpath=(  )
fpath=( /Users/alpha/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting /Users/alpha/.oh-my-zsh/plugins/git /Users/alpha/.oh-my-zsh/functions /Users/alpha/.oh-my-zsh/completions /Users/alpha/.oh-my-zsh/cache/completions /usr/local/share/zsh/site-functions /usr/share/zsh/site-functions /usr/share/zsh/5.9/functions )
mailpath=(  )
manpath=(  )
module_path=( /usr/lib/zsh/5.9 )
path=( /opt/homebrew/bin /usr/local/bin /System/Cryptexes/App/usr/bin /usr/bin /bin /usr/sbin /sbin /Library/TeX/texbin /opt/X11/bin /Library/Apple/usr/bin /var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin /var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin /var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin )
```





###### <a id="systemctl">SYSTEMCTL / SYSCTL</a>

系统状态指令, 用于获取或者设置内核状态

- 系统运行级别

  - `0~7`

    | levels |                   explainations                   |
    | :----: | :-----------------------------------------------: |
    |   0    |                   系统停机状态                    |
    |   1    | 但用户工作状态，root，用于系统维护，禁止远程登录  |
    |   2    |          多用户状态（无NFS），不支持网络          |
    |   3    | 完全多用户模式（NFS），登陆后进入控制台命令行模式 |
    |   4    |                     保留状态                      |
    |   5    |           X11控制台，登入后进入GUI界面            |
    |   6    |                系统正常关闭并重启                 |

  - `multi-user.target `  级别3

  - ` graphicl.target`  级别5

  - `systemctl get-default`查看运行级别

  - `systemctl set-default TARGET.target `设置运行级别

  - `chkconfig network of|off`,`chkconfig --level num network on|off` 网络服务状态改变

###### <a id="sync">SYNC </a>

将数据有内存同步到硬盘

###### <a id="halt">HALT</a>

停机，关闭系统，但不断电，内存可能还有救

###### <a id="poweroff">POWEROFF</a>

关机断电

###### <a id="reboot">REBOOT</a>

关机重启



##### <a id="userctl">用户管理</a>

###### <a id="su&sudo">SU & SUDO</a>

`su`的作用是切换(存在的)用户,而`sudo`是为某次命令操作赋予权限

使用`su` 或`su root`切换至root用户

```bash
❯ su root
Password:
armbian:beta:# cd
armbian:~:# pwd
/root
armbian:~:#

```

使用sudo赋予非root用户权限以下载 sl

```bash
❯ sudo apt install sl
[sudo] Password for beta:

Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following NEW packages will be installed:
  sl
0 upgraded, 1 newly installed, 0 to remove and 65 not upgraded.
Need to get 12.8 kB of archives....
```



###### <a id="useradd&userdel">USERADD & USERDEL</a>

添加用户test 再使用userdel删除

```bash
❯ sudo useradd test
❯ sudo cat /etc/passwd |grep test
test:x:1001:1001::/home/test:/usr/bin/zsh

❯ sudo userdel test && sudo cat /etc/passwd | grep test

```

当添加时,还可以设置有效期限(-e)、缓冲天数(-f)、群组信息(-g)、设置默认解释器(-s)、账号uid(-u)等操作

```bash
❯ sudo useradd test  -u 0070
❯ sudo cat /etc/passwd |grep test
test:x:70:1001::/home/test:/usr/bin/zsh
```

###### <a id="groupadd&groupdel">GROUPADD & GROUPDEL</a>

给用户设置群组,就得先有群组

```bash
❯ sudo groupadd  test
[sudo] Password for beta:
❯ sudo groupdel  test

```

###### <a id="id">ID </a>

每次都`sudo cat /etc/passwd |grep test`是有些麻烦的🫠

直接使用ID即可查看用户ID

```bash
❯ id
uid=1000(beta) gid=1000(beta) groups=1000(beta),5(tty),6(disk),20(dialout),27(sudo),29(audio),44(video),46(plugdev),60(games),100(users),101(systemd-journal),106(input),115(netdev)

❯ id test
uid=70(test) gid=1001(test) groups=1001(test)
```

###### <a id="passwd">PASSWD</a>

添加用户后就是对用户的密码设置㊙️

```bash
❯ sudo passwd test
New password:
Retype new password:
passwd: password updated successfully
```



###### <a id="chmod">CHMOD</a>

 文件操作权限,分为读、写和执行

例如对于某一个脚本test.sh

```bash
❯ chmod 777 test.sh
❯ ./test.sh
.....
...
```

可以给其赋予执行权限👆
![](/imgs/chmod.jpg)

###### <a id="chown">CHOWN</a>

改变文件的所有者

```bash
❯ l | grep quick_sh
drwxrwxr-x  2 beta beta 4.0K Jul  1 15:14 quick_sh
❯ sudo chown root quick_sh
[sudo] password for beta:
❯ l | grep quick_sh
drwxrwxr-x  2 root beta 4.0K Jul  1 15:14 quick_sh

```

可以看到,使用前后所有者从beta替换到了root





##### <a id="process">Process</a>

- 查看进程`ps` (process status)

  - `ps [] | grep key `

    | options |                 functions                  |
    | :-----: | :----------------------------------------: |
    |    a    |        列出带有终端的所有用户的进程        |
    |    u    | 列出当前用户的所有进程，包括没有终端的进程 |
    |    x    |          面向用户的友好型风格显示          |
    |   -e    |                列出所有进程                |
    |   -u    |         列出某个用户关联的所有进程         |
    |   -f    |           显示完整格式的进程列表           |

    - uid用户名
    - pid 进程ID
    - ppid父进程ID
    - VSZ占用的虚拟内存
    - RSS占用的物理内存（LRU内存置换算法）
    - TTY使用的终端
      - pts0-255虚拟终端
      - tty1图形化终端
      - tty2-tty6本地字符界面
    - STAT状态（status）
      - R：运行状态
      - S：睡眠状态
      - T：暂停状态
      - Z：僵尸状态
      - s：包含子进程
      - l：多线程
      - +：前台显示
      - <：优先级高
      - N：优先级低

- 终止进程`kill [-9] [all][pid] ` `[-9]`force kill,`[all]` 杀疯了

- `pstree` 显示进程树

- `top[]` 实时显示进程状况 `[-d 1 ,  -i,  -p]`

- `crontab` 系统定时任务

  - `crontab [-l,-e,-r]` list , edit, remove
  - `crontab -e` --> vim
    - `***** [commands] ` min1,min2,min3/hour/day/month/weekday 、 `*/n` for how long

  

##### <a id="disk">Disk operators</a>

- `du file/dirc` （disk usage）
  - `-h` 易阅读的方式显示
  - `-a` 不仅查看子目录大小，还要包括文件
  - `-c` 显示所有的文件和子目录大小后，显示总和
  - `-s` 只显示总和
  - `--max-depth=num` 最大深度

- `df -h` (disk free)
  - 内存和swap分区都使用tmps 
  - devtmpfs文件系统挂载
- `free -h ` 内存查看
- `lsblk -f` 查看设备挂载情况
  - sda1 | vda1 | hda1 硬盘情况
  - s表示SATA、SCSI硬盘，v表示虚拟硬盘，h表示IDE硬盘
  - a表示第一块硬盘
  - 数字表示分区

- `mount` & `umount`
- `fdisk -l` 查看硬盘情况
  - `fdisk /dev/sdb`
  - `mkfs -t xfs /dev/sdb`



##### <a id="apt">APT (Advanced Packaging Tools) 包管理</a>

- 更改apt安装源(以ubuntu20.04为例)

  - 将如下change_source.sh复制到本地

```shell
    #!/bin/bash
    # change_source.sh
    
    sudo cp /etc/apt/source.list   /etc/apt/source_default.list
    echo "deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
    deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
    deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse" > /etc/apt/source.list
    echo "if not succeed please see http://mirrors.ustc.edu.cn"
```

  - 执行脚本再键入`sudo apt update && sudo apt upgrade `即可
  
  - [其他版本(清华镜像)](http://mirrors.ustc.edu.cn)




###### 包管理工具RPM (Redhat Package Manager)

- firefox-102.10.0-1.el9.aarch64
  - `app_name - version . 硬件平台. rpm`
- `rpm -qa` (query all)  
- `rpm -qi app_name ` (query info)
- `rpm -e --nodeps app_name`  (no depandence) 卸载程序
- `rpm -ivh --nodeps app_name` install with verbose and hash\

###### yum (Yellow dog Updater Modified)

- ` yum  -y  install/update/check-update/remove/list/clean/deplist  `
- 配置yum源
  - `/etc/yum.repo.d`

<hr>




<br><br><br><br><br><br>

## <a id="shell">Shell编程基础</a>

<hr>

### <a id="from_first_line">从第一行开始</a>

- 此行称为[shebang](https://en.wikipedia.org/wiki/Shebang) （sharp(#) + bang(!)的意思），指引操作系统运行文件
- `#!/bin/bash`或`#!/bin/zsh` 是指定特定的程序来执行

```shell
#!/bin/bash
#!/bin/zsh
```

### <a id="variable">变量</a>

- shell默认变量全都是字符串

#### <a id="var_asre"> 变量赋值及引用</a>

- 使用变量无需事先声明
- 命名遵循`<tt>[a-zA-Z_][a-zA-Z0-9_]+`，即大小写字母数字和下划线组成（不能以数字开头）
- 等号的左右都不能有空格
- 引用时须变量前加`$`
- 引用时变量可能会与其他文字混淆

```shell
varname="val1"

num=2
echo "This is the $numnd" #由于可能引起歧义,使用符号{}来区分
echo "This is the {$num}nd" #放歪了 ，勿手残
echo "This is the ${num}nd" #加在$所引用的变量前
```



#### <a id="var_arithmetic"> 变量算术</a>

- 由于变量都是字符串，那么直接尝试加肯定不会如意

```shell
  var=1
  var=$var+1
  echo ${var}  # 这里的输出是"1+1"
```

  > “好孩子写法”----C语言风格

```shell
  var=0
  ((var += 1))
  ((var++))
  echo ${var}  # 2
  ((var = var * var))
  echo ${var}  # 4
  let  'var=var/3'  #整数除法，向0舍入，1
  echo ${var}  # 1
  echo $((var+=2)) # 3
  var=$((var-1))
  echo $var    # 2
```

  > 甚至有人用expr之类的外部程序，杀鸡焉用牛刀。。

```shell
  var=1
  var=$(expr "$var"+1)
  echo $var #然而输出是"1+1"
  echo var=`expr "$var"+1`
  echo $var #然而是"1+1+1"
```

### <a id="contr">流程控制</a>

#### <a id="if">if语句</a>

- `[-f "./test.sh"]` 判读是否是一个文件
- `[-x "/bin/ls"]` 判断是否存在并有可执行权限
- `[-n "$var"]`判断变量是否有值
- `"$a"=="$b"`判断相等

```shell
if [ -f "./ins.sh" ]; then
    echo "yes"
elif [ -f "./test.sh" ]; then
    echo "no"
else
    echo "other"
fi
```

#### <a id="and_or">`&&`和`||`</a>

>shell中的 `&&` 和 `||`没有任何优先级，仅仅先读先行 

> 熟悉C/C++语言可能回喜欢如下表达
>
> 如果左式为真 ， 则执行右式

```shell
[-f "/etc/shadow"] && echo "This Computer uses shadow passwords"
```

> 当然也可以使用`||` 操作，规则也与C/C++相同

```shell
#!/bin/bash

message=/var/spool/folder/message
[ -r "$message" ]  || { echo "can not read this message"; exit 1; }
echo "$message has message from:"
grep "^From " $message
```

#### <a id="case">case语句</a>

> `case [...] in  ... esac`  语句不同于C/C++语言的`swicth case` ，shell语言中一切皆字符串
>
> 如下例子

```shell
#!/bin/bash

printf "Input integer number: "
read num
case $num in
    1)  echo "Monday"
        ;;
    2)  echo "Tuesday"
        ;;
    3)	echo "Wednesday"
        ;;
    4)	echo "Thursday"
        ;;
    5)	echo "Friday"
        ;;
    6) 	echo "Saturday"
        ;;
    7)	echo "Sunday"
        ;;
    *)	echo "error"
esac
```

> 模版如：

```shell
case expression in
	pattern1) 
		statement1
		;;
	pattern2)
		statement2
		;;
	
	.
	.
	.
	
	*) 
		default ;;
esac
```

例如:
```shell
#!/bin/bash

printf "Input integer number: "
read num

case $num in
    1)
        echo "Monday"
        ;;
    2)
        echo "Tuesday"
        ;;
    3)
        echo "Wednesday"
        ;;
    4)
        echo "Thursday"
        ;;
    5)
        echo "Friday"
        ;;
    6)
        echo "Saturday"
        ;;
    7)
        echo "Sunday"
        ;;
    *)
        echo "error"
esac
```

> 其中`case` ， `in` ， `esac` 是shell关键字
>
> expression是表达式，pattern表示匹配模式，匹配到则执行到`;;`才停止

- 执行到`esac`关键字`case in`直接终止

> smartunzip

```shell
#!/bin/bash

ftype="$(file "$1")"

case "$ftype" in
	"$1: Zip archive"*)
			unzip "$1" ;;
	"$1: gzip compressed"*)
			gunzip "$1" ;;
	"$1: bzip2 compressed"*)
			bunzip2 "$1" ;;
	*) 
			echo "File $1 can not be uncompressed with smartunzip" ;;
esac

```

> 运行`smartunzip articles.zip`可以解压三种类型文件

#### <a id="select">select循环语句</a>

> select循环语句是bash的一种扩展应用，擅长交互式场合

```shell
#!/bin/bash

echo "What is your favourite OS?"
select var in "Linux" "Gnu Hurd" "Free BSD" "Other"; do
  break;
done
echo "You have selected $var"
```



#### <a id="while_for">while/for循环</a>

> 在shell中，可以使用如下循环：

```shell
while ... ; do
	...
	done
```

> 如下for循环

```shell
#!/bin/bash
for var in A B C ; do
	echo "var is $var"
  done
```

> 下面是一个实用的脚本showrpm，其功能是打印一些RPM包的统计信息：

```shell
#!/bin/bash

# list a content summary of a number of RPM packages
# USAGE: showrpm rpmfile1 rpmfile2 ...
# EXAMPLE: showrpm /cdrom/RedHat/RPMS/*.rpm
for rpmpackage in "$@"; do
   if [ -r "$rpmpackage" ];then
      echo "=============== $rpmpackage =============="
      rpm -qi -p $rpmpackage
   else
      echo "ERROR: cannot read file $rpmpackage"
   fi
   done
```






### <a id="array">数组</a>

> 数组中可以存放多个值。Bash Shell 只支持一维数组（不支持多维数组），初始化时不需要定义数组大小（与 PHP 类似）。
>
> 与大部分编程语言类似，数组元素的下标由 0 开始。
>
> Shell 数组用括号来表示，元素用"空格"符号分割开，语法格式如下：

`array_name=(value1 value2 ... valuen)`

> 读取数组元素值的一般格式是：

`${array_name[index]}`



>  Bash 支持关联数组，可以使用任意的字符串、或者整数作为下标来访问数组元素。

`declare -A array_name`

> 创建一个关联数组site，并创建不同键值

```shell
declare -A site=(["google"]="www.google.com" ["runoob"]="www.runoob.com" ["taobao"]="www.taobao.com")
```

- 使用`@` 或 `*` 可以获取数组中的所有元素
- 获取数组长度的方法与获取字符串长度的方法相同`${array[*]}` 或`${array[@]}`



### <a id="func">函数</a>

> 用户定义函数，在shell脚本中可以随便调用

```shell
#!/bin/bash

example_func(){
	example_code;
	...
}
```

> 参数，<a href="#para">参数处理</a>见上

```shell
#!/bin/bash

funWithFib(){
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "第十个参数为 $10 !"
    echo "第十个参数为 ${10} !"
    echo "第十一个参数为 ${11} !"
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
}
funWithFib 1 1 2 3 5 8 13 21 34 55 89 144
```




## <a id="special">特殊符号</a>

| <a id ="para">参数处理</a> |                             说明                             |
| :------------------------: | :----------------------------------------------------------: |
|            `$#`            |                     传递到脚本的参数个数                     |
|            `$*`            |            以一个单字符串显示所有向脚本传递的参数            |
|            `$$`            |                    当前脚本运行的进程ID号                    |
|            `$!`            |                     后台最后一个进程ID号                     |
|            `$@`            |        同`$*`但是使用时加引号，并在引号中返回每个参数        |
|            `$-`            | 显示shell使用的当前选项，与<a href="set">set</a>命令功能相同 |
|            `$?`            | 显示最后命令的退出状态。0表示没有错误，其他任何值表示有错误。 |
|        `''` 和`""`         |                   使用引号防止通配符的扩展                   |
|                            |                                                              |

| 关系运算符 |   说明   |
| :--------: | :------: |
|   `-eq`    |   相等   |
|   `-ne`    |  不相等  |
|   `-gt`    |   大于   |
|   `-lt`    |   小于   |
|   `-ge`    | 大于等于 |
|   `-le`    | 小于等于 |

| 布尔运算符 | 说明 |
| :--------: | :--: |
|     ！     |  非  |
|     -o     |  或  |
|     -a     |  与  |

| 字符串运算符 |        说明         |
| :----------: | :-----------------: |
|      =       |   字符串是否相等    |
|      !=      |  字符串是否不相等   |
|      -z      |  字符串长度是否为0  |
|      -n      | 字符串长度是否不为0 |
|      $       |  字符串是否不为空   |

| 操作符  |                             说明                             | 举例                      |
| ------- | :----------------------------------------------------------: | :------------------------ |
| -b file |     检测文件是否是块设备文件<br />如果是，则返回 true。      | [ -b $file ] 返回 false。 |
| -c file |    检测文件是否是字符设备文件<br />如果是，则返回 true。     | [ -c $file ] 返回 false。 |
| -d file |        检测文件是否是目录<br />如果是，则返回 true。         | [ -d $file ] 返回 false。 |
| -f file | 检测文件是否是普通文件（不是目录、设备文件）<br />如果是，则返回 true。 | [ -f $file ] 返回 true。  |
| -g file |    检测文件是否设置了 SGID 位<br />如果是，则返回 true。     | [ -g $file ] 返回 false。 |
| -k file | 检测文件是否设置了粘着位(Sticky Bit)<br />如果是，则返回 true。 | [ -k $file ] 返回 false。 |
| -p file |      检测文件是否是有名管道<br />如果是，则返回 true。       | [ -p $file ] 返回 false。 |
| -u file |    检测文件是否设置了 SUID 位<br />如果是，则返回 true。     | [ -u $file ] 返回 false。 |
| -r file |         检测文件是否可读<br />如果是，则返回 true。          | [ -r $file ] 返回 true。  |
| -w file |         检测文件是否可写<br />如果是，则返回 true。          | [ -w $file ] 返回 true。  |
| -x file |        检测文件是否可执行<br />如果是，则返回 true。         | [ -x $file ] 返回 true。  |
| -s file | 检测文件是否为空（文件大小是否大于0）<br />不为空返回 true。 | [ -s $file ] 返回 true。  |
| -e file |   检测文件（包括目录）是否存在<br />如果是，则返回 true。    | [ -e $file ] 返回 true。  |

其他检查符：

- `-S` 判断某文件是否socket
- `-L`检查文件是否存在并且是一个符号链接



## <a id="re">重定向</a>

| 命令            | 说明                                               |
| :-------------- | :------------------------------------------------- |
| command > file  | 将输出重定向到 file。                              |
| command < file  | 将输入重定向到 file。                              |
| command >> file | 将输出以追加的方式重定向到 file。                  |
| n > file        | 将文件描述符为 n 的文件重定向到 file。             |
| n >> file       | 将文件描述符为 n 的文件以追加的方式重定向到 file。 |
| n >& m          | 将输出文件 m 和 n 合并。                           |
| n <& m          | 将输入文件 m 和 n 合并。                           |
| << tag          | 将开始标记 tag 和结束标记 tag 之间的内容作为输入。 |




## <a id = "All_Commands">Linux 命令大全</a>
<hr>

|                         1. 文件管理                          |                                                              |                                                              |                                                              |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|   [cat](https://www.runoob.com/linux/linux-comm-cat.html)    | [chattr](https://www.runoob.com/linux/linux-comm-chattr.html) | [chgrp](https://www.runoob.com/linux/linux-comm-chgrp.html)  | [chmod](https://www.runoob.com/linux/linux-comm-chmod.html)  |
| [chown](https://www.runoob.com/linux/linux-comm-chown.html)  | [cksum](https://www.runoob.com/linux/linux-comm-cksum.html)  |   [cmp](https://www.runoob.com/linux/linux-comm-cmp.html)    |  [diff](https://www.runoob.com/linux/linux-comm-diff.html)   |
| [diffstat](https://www.runoob.com/linux/linux-comm-diffstat.html) |  [file](https://www.runoob.com/linux/linux-comm-file.html)   |  [find](https://www.runoob.com/linux/linux-comm-find.html)   |   [git](https://www.runoob.com/linux/linux-comm-git.html)    |
| [gitview](https://www.runoob.com/linux/linux-comm-gitview.html) | [indent](https://www.runoob.com/linux/linux-comm-indent.html) |   [cut](https://www.runoob.com/linux/linux-comm-cut.html)    |    [ln](https://www.runoob.com/linux/linux-comm-ln.html)     |
|  [less](https://www.runoob.com/linux/linux-comm-less.html)   | [locate](https://www.runoob.com/linux/linux-comm-locate.html) | [lsattr](https://www.runoob.com/linux/linux-comm-lsattr.html) | [mattrib](https://www.runoob.com/linux/linux-comm-mattrib.html) |
|    [mc](https://www.runoob.com/linux/linux-comm-mc.html)     |  [mdel](https://www.runoob.com/linux/linux-comm-mdel.html)   |  [mdir](https://www.runoob.com/linux/linux-comm-mdir.html)   | [mktemp](https://www.runoob.com/linux/linux-comm-mktemp.html) |
|  [more](https://www.runoob.com/linux/linux-comm-more.html)   | [mmove](https://www.runoob.com/linux/linux-comm-mmove.html)  | [mread](https://www.runoob.com/linux/linux-comm-mread.html)  |  [mren](https://www.runoob.com/linux/linux-comm-mren.html)   |
| [mtools](https://www.runoob.com/linux/linux-comm-mtools.html) | [mtoolstest](https://www.runoob.com/linux/linux-comm-mtoolstest.html) |    [mv](https://www.runoob.com/linux/linux-comm-mv.html)     |    [od](https://www.runoob.com/linux/linux-comm-od.html)     |
| [paste](https://www.runoob.com/linux/linux-comm-paste.html)  | [patch](https://www.runoob.com/linux/linux-comm-patch.html)  |   [rcp](https://www.runoob.com/linux/linux-comm-rcp.html)    |    [rm](https://www.runoob.com/linux/linux-comm-rm.html)     |
| [slocate](https://www.runoob.com/linux/linux-comm-slocate.html) | [split](https://www.runoob.com/linux/linux-comm-split.html)  |   [tee](https://www.runoob.com/linux/linux-comm-tee.html)    | [tmpwatch](https://www.runoob.com/linux/linux-comm-tmpwatch.html) |
| [touch](https://www.runoob.com/linux/linux-comm-touch.html)  | [umask](https://www.runoob.com/linux/linux-comm-umask.html)  | [which](https://www.runoob.com/linux/linux-comm-which.html)  |    [cp](https://www.runoob.com/linux/linux-comm-cp.html)     |
| [whereis](https://www.runoob.com/linux/linux-comm-whereis.html) | [mcopy](https://www.runoob.com/linux/linux-comm-mcopy.html)  | [mshowfat](https://www.runoob.com/linux/linux-comm-mshowfat.html) | [rhmask](https://www.runoob.com/linux/linux-comm-rhmask.html) |
|   [scp](https://www.runoob.com/linux/linux-comm-scp.html)    |   [awk](https://www.runoob.com/linux/linux-comm-awk.html)    |  [read](https://www.runoob.com/linux/linux-comm-read.html)   | [updatedb](https://www.runoob.com/linux/linux-comm-updatedb.html) |
|                       **2. 文档编辑**                        |                                                              |                                                              |                                                              |
|   [col](https://www.runoob.com/linux/linux-comm-col.html)    | [colrm](https://www.runoob.com/linux/linux-comm-colrm.html)  |  [comm](https://www.runoob.com/linux/linux-comm-comm.html)   | [csplit](https://www.runoob.com/linux/linux-comm-csplit.html) |
|    [ed](https://www.runoob.com/linux/linux-comm-ed.html)     | [egrep](https://www.runoob.com/linux/linux-comm-egrep.html)  |    [ex](https://www.runoob.com/linux/linux-comm-ex.html)     | [fgrep](https://www.runoob.com/linux/linux-comm-fgrep.html)  |
|   [fmt](https://www.runoob.com/linux/linux-comm-fmt.html)    |  [fold](https://www.runoob.com/linux/linux-comm-fold.html)   |  [grep](https://www.runoob.com/linux/linux-comm-grep.html)   | [ispell](https://www.runoob.com/linux/linux-comm-ispell.html) |
|   [jed](https://www.runoob.com/linux/linux-comm-jed.html)    |   [joe](https://www.runoob.com/linux/linux-comm-joe.html)    |  [join](https://www.runoob.com/linux/linux-comm-join.html)   |  [look](https://www.runoob.com/linux/linux-comm-look.html)   |
| [mtype](https://www.runoob.com/linux/linux-comm-mtype.html)  |  [pico](https://www.runoob.com/linux/linux-comm-pico.html)   | [rgrep](https://www.runoob.com/linux/linux-comm-rgrep.html)  |   [sed](https://www.runoob.com/linux/linux-comm-sed.html)    |
|  [sort](https://www.runoob.com/linux/linux-comm-sort.html)   | [spell](https://www.runoob.com/linux/linux-comm-spell.html)  |    [tr](https://www.runoob.com/linux/linux-comm-tr.html)     |  [expr](https://www.runoob.com/linux/linux-comm-expr.html)   |
|  [uniq](https://www.runoob.com/linux/linux-comm-uniq.html)   |    [wc](https://www.runoob.com/linux/linux-comm-wc.html)     |   [let](https://www.runoob.com/linux/linux-comm-let.html)    |                                                              |
|                       **3. 文件传输**                        |                                                              |                                                              |                                                              |
|  [lprm](https://www.runoob.com/linux/linux-comm-lprm.html)   |   [lpr](https://www.runoob.com/linux/linux-comm-lpr.html)    |   [lpq](https://www.runoob.com/linux/linux-comm-lpq.html)    |   [lpd](https://www.runoob.com/linux/linux-comm-lpd.html)    |
|   [bye](https://www.runoob.com/linux/linux-comm-bye.html)    |   [ftp](https://www.runoob.com/linux/linux-comm-ftp.html)    |  [uuto](https://www.runoob.com/linux/linux-comm-uuto.html)   | [uupick](https://www.runoob.com/linux/linux-comm-uupick.html) |
|  [uucp](https://www.runoob.com/linux/linux-comm-uucp.html)   | [uucico](https://www.runoob.com/linux/linux-comm-uucico.html) |  [tftp](https://www.runoob.com/linux/linux-comm-tftp.html)   | [ncftp](https://www.runoob.com/linux/linux-comm-ncftp.html)  |
| [ftpshut](https://www.runoob.com/linux/linux-comm-ftpshut.html) | [ftpwho](https://www.runoob.com/linux/linux-comm-ftpwho.html) | [ftpcount](https://www.runoob.com/linux/linux-comm-ftpcount.html) |                                                              |
|                       **4. 磁盘管理**                        |                                                              |                                                              |                                                              |
|    [cd](https://www.runoob.com/linux/linux-comm-cd.html)     |    [df](https://www.runoob.com/linux/linux-comm-df.html)     |  [dirs](https://www.runoob.com/linux/linux-comm-dirs.html)   |    [du](https://www.runoob.com/linux/linux-comm-du.html)     |
| [edquota](https://www.runoob.com/linux/linux-comm-edquota.html) | [eject](https://www.runoob.com/linux/linux-comm-eject.html)  |   [mcd](https://www.runoob.com/linux/linux-comm-mcd.html)    | [mdeltree](https://www.runoob.com/linux/linux-comm-mdeltree.html) |
|   [mdu](https://www.runoob.com/linux/linux-comm-mdu.html)    | [mkdir](https://www.runoob.com/linux/linux-comm-mkdir.html)  | [mlabel](https://www.runoob.com/linux/linux-comm-mlabel.html) |   [mmd](https://www.runoob.com/linux/linux-comm-mmd.html)    |
|   [mrd](https://www.runoob.com/linux/linux-comm-mrd.html)    |  [mzip](https://www.runoob.com/linux/linux-comm-mzip.html)   |   [pwd](https://www.runoob.com/linux/linux-comm-pwd.html)    | [quota](https://www.runoob.com/linux/linux-comm-quota.html)  |
| [mount](https://www.runoob.com/linux/linux-comm-mount.html)  | [mmount](https://www.runoob.com/linux/linux-comm-mmount.html) | [rmdir](https://www.runoob.com/linux/linux-comm-rmdir.html)  |   [rmt](https://www.runoob.com/linux/linux-comm-rmt.html)    |
|  [stat](https://www.runoob.com/linux/linux-comm-stat.html)   |  [tree](https://www.runoob.com/linux/linux-comm-tree.html)   | [umount](https://www.runoob.com/linux/linux-comm-umount.html) |    [ls](https://www.runoob.com/linux/linux-comm-ls.html)     |
| [quotacheck](https://www.runoob.com/linux/linux-comm-quotacheck.html) | [quotaoff](https://www.runoob.com/linux/linux-comm-quotaoff.html) | [lndir](https://www.runoob.com/linux/linux-comm-lndir.html)  | [repquota](https://www.runoob.com/linux/linux-comm-repquota.html) |
| [quotaon](https://www.runoob.com/linux/linux-comm-quotaon.html) |                                                              |                                                              |                                                              |
|                       **5. 磁盘维护**                        |                                                              |                                                              |                                                              |
| [badblocks](https://www.runoob.com/linux/linux-comm-badblocks.html) | [cfdisk](https://www.runoob.com/linux/linux-comm-cfdisk.html) |    [dd](https://www.runoob.com/linux/linux-comm-dd.html)     | [e2fsck](https://www.runoob.com/linux/linux-comm-e2fsck.html) |
| [ext2ed](https://www.runoob.com/linux/linux-comm-ext2ed.html) |  [fsck](https://www.runoob.com/linux/linux-comm-fsck.html)   | [fsck.minix](https://www.runoob.com/linux/linux-comm-fsck-minix.html) | [fsconf](https://www.runoob.com/linux/linux-comm-fsconf.html) |
| [fdformat](https://www.runoob.com/linux/linux-comm-fdformat.html) | [hdparm](https://www.runoob.com/linux/linux-comm-hdparm.html) | [mformat](https://www.runoob.com/linux/linux-comm-mformat.html) | [mkbootdisk](https://www.runoob.com/linux/linux-comm-mkbootdisk.html) |
| [mkdosfs](https://www.runoob.com/linux/linux-comm-mkdosfs.html) | [mke2fs](https://www.runoob.com/linux/linux-comm-mke2fs.html) | [mkfs.ext2](https://www.runoob.com/linux/linux-comm-mkfs-ext2.html) | [mkfs.msdos](https://www.runoob.com/linux/linux-comm-mkfs-msdos.html) |
| [mkinitrd](https://www.runoob.com/linux/linux-comm-mkinitrd.html) | [mkisofs](https://www.runoob.com/linux/linux-comm-mkisofs.html) | [mkswap](https://www.runoob.com/linux/linux-comm-mkswap.html) | [mpartition](https://www.runoob.com/linux/linux-comm-mpartition.html) |
| [swapon](https://www.runoob.com/linux/linux-comm-swapon.html) | [symlinks](https://www.runoob.com/linux/linux-comm-symlinks.html) |  [sync](https://www.runoob.com/linux/linux-comm-sync.html)   | [mbadblocks](https://www.runoob.com/linux/linux-comm-mbadblocks.html) |
| [mkfs.minix](https://www.runoob.com/linux/linux-comm-mkfs-minix.html) | [fsck.ext2](https://www.runoob.com/linux/linux-comm-fsck-ext2.html) | [fdisk](https://www.runoob.com/linux/linux-comm-fdisk.html)  | [losetup](https://www.runoob.com/linux/linux-comm-losetup.html) |
|  [mkfs](https://www.runoob.com/linux/linux-comm-mkfs.html)   | [sfdisk](https://www.runoob.com/linux/linux-comm-sfdisk.html) | [swapoff](https://www.runoob.com/linux/linux-comm-swapoff.html) |                                                              |
|                       **6. 网络通讯**                        |                                                              |                                                              |                                                              |
| [apachectl](https://www.runoob.com/linux/linux-comm-apachectl.html) | [arpwatch](https://www.runoob.com/linux/linux-comm-arpwatch.html) |   [dip](https://www.runoob.com/linux/linux-comm-dip.html)    | [getty](https://www.runoob.com/linux/linux-comm-getty.html)  |
| [mingetty](https://www.runoob.com/linux/linux-comm-mingetty.html) |   [uux](https://www.runoob.com/linux/linux-comm-uux.html)    | [telnet](https://www.runoob.com/linux/linux-comm-telnet.html) | [uulog](https://www.runoob.com/linux/linux-comm-uulog.html)  |
| [uustat](https://www.runoob.com/linux/linux-comm-uustat.html) | [ppp-off](https://www.runoob.com/linux/linux-comm-ppp-off.html) | [netconfig](https://www.runoob.com/linux/linux-comm-netconfig.html) |    [nc](https://www.runoob.com/linux/linux-comm-nc.html)     |
| [httpd](https://www.runoob.com/linux/linux-comm-httpd.html)  | [ifconfig](https://www.runoob.com/linux/linux-comm-ifconfig.html) | [minicom](https://www.runoob.com/linux/linux-comm-minicom.html) |  [mesg](https://www.runoob.com/linux/linux-comm-mesg.html)   |
| [dnsconf](https://www.runoob.com/linux/linux-comm-dnsconf.html) |  [wall](https://www.runoob.com/linux/linux-comm-wall.html)   | [netstat](https://www.runoob.com/linux/linux-comm-netstat.html) |  [ping](https://www.runoob.com/linux/linux-comm-ping.html)   |
| [pppstats](https://www.runoob.com/linux/linux-comm-pppstats.html) | [samba](https://www.runoob.com/linux/linux-comm-samba.html)  | [setserial](https://www.runoob.com/linux/linux-comm-setserial.html) |  [talk](https://www.runoob.com/linux/linux-comm-talk.html)   |
| [traceroute](https://www.runoob.com/linux/linux-comm-traceroute.html) |   [tty](https://www.runoob.com/linux/linux-comm-tty.html)    | [newaliases](https://www.runoob.com/linux/linux-comm-newaliases.html) | [uuname](https://www.runoob.com/linux/linux-comm-uuname.html) |
| [netconf](https://www.runoob.com/linux/linux-comm-netconf.html) | [write](https://www.runoob.com/linux/linux-comm-write.html)  | [statserial](https://www.runoob.com/linux/linux-comm-statserial.html) |  [efax](https://www.runoob.com/linux/linux-comm-efax.html)   |
| [pppsetup](https://www.runoob.com/linux/linux-comm-pppsetup.html) | [tcpdump](https://www.runoob.com/linux/linux-comm-tcpdump.html) | [ytalk](https://www.runoob.com/linux/linux-comm-ytalk.html)  |    [cu](https://www.runoob.com/linux/linux-comm-cu.html)     |
|  [smbd](https://www.runoob.com/linux/linux-comm-smbd.html)   | [testparm](https://www.runoob.com/linux/linux-comm-testparm.html) | [smbclient](https://www.runoob.com/linux/linux-comm-smbclient.html) | [shapecfg](https://www.runoob.com/linux/linux-comm-shapecfg.html) |
|                       **7. 系统管理**                        |                                                              |                                                              |                                                              |
| [adduser](https://www.runoob.com/linux/linux-comm-adduser.html) |  [chfn](https://www.runoob.com/linux/linux-comm-chfn.html)   | [useradd](https://www.runoob.com/linux/linux-comm-useradd.html) |  [date](https://www.runoob.com/linux/linux-comm-date.html)   |
|  [exit](https://www.runoob.com/linux/linux-comm-exit.html)   | [finger](https://www.runoob.com/linux/linux-comm-finger.html) | [fwhios](https://www.runoob.com/linux/linux-comm-fwhios.html) | [sleep](https://www.runoob.com/linux/linux-comm-sleep.html)  |
| [suspend](https://www.runoob.com/linux/linux-comm-suspend.html) | [groupdel](https://www.runoob.com/linux/linux-comm-groupdel.html) | [groupmod](https://www.runoob.com/linux/linux-comm-groupmod.html) |  [halt](https://www.runoob.com/linux/linux-comm-halt.html)   |
|  [kill](https://www.runoob.com/linux/linux-comm-kill.html)   |  [last](https://www.runoob.com/linux/linux-comm-last.html)   | [lastb](https://www.runoob.com/linux/linux-comm-lastb.html)  | [login](https://www.runoob.com/linux/linux-comm-login.html)  |
| [logname](https://www.runoob.com/linux/linux-comm-logname.html) | [logout](https://www.runoob.com/linux/linux-comm-logout.html) |    [ps](https://www.runoob.com/linux/linux-comm-ps.html)     |  [nice](https://www.runoob.com/linux/linux-comm-nice.html)   |
| [procinfo](https://www.runoob.com/linux/linux-comm-procinfo.html) |   [top](https://www.runoob.com/linux/linux-comm-top.html)    | [pstree](https://www.runoob.com/linux/linux-comm-pstree.html) | [reboot](https://www.runoob.com/linux/linux-comm-reboot.html) |
| [rlogin](https://www.runoob.com/linux/linux-comm-rlogin.html) |   [rsh](https://www.runoob.com/linux/linux-comm-rsh.html)    | [sliplogin](https://www.runoob.com/linux/linux-comm-sliplogin.html) | [screen](https://www.runoob.com/linux/linux-comm-screen.html) |
| [shutdown](https://www.runoob.com/linux/linux-comm-shutdown.html) |  [rwho](https://www.runoob.com/linux/linux-comm-rwho.html)   |  [sudo](https://www.runoob.com/linux/linux-comm-sudo.html)   | [gitps](https://www.runoob.com/linux/linux-comm-gitps.html)  |
| [swatch](https://www.runoob.com/linux/linux-comm-swatch.html) | [tload](https://www.runoob.com/linux/linux-comm-tload.html)  | [logrotate](https://www.runoob.com/linux/linux-comm-logrotate.html) | [uname](https://www.runoob.com/linux/linux-comm-uname.html)  |
|  [chsh](https://www.runoob.com/linux/linux-comm-chsh.html)   | [userconf](https://www.runoob.com/linux/linux-comm-userconf.html) | [userdel](https://www.runoob.com/linux/linux-comm-userdel.html) | [usermod](https://www.runoob.com/linux/linux-comm-usermod.html) |
| [vlock](https://www.runoob.com/linux/linux-comm-vlock.html)  |   [who](https://www.runoob.com/linux/linux-comm-who.html)    | [whoami](https://www.runoob.com/linux/linux-comm-whoami.html) | [whois](https://www.runoob.com/linux/linux-comm-whois.html)  |
| [newgrp](https://www.runoob.com/linux/linux-comm-newgrp.html) | [renice](https://www.runoob.com/linux/linux-comm-renice.html) |    [su](https://www.runoob.com/linux/linux-comm-su.html)     | [skill](https://www.runoob.com/linux/linux-comm-skill.html)  |
|     [w](https://www.runoob.com/linux/linux-comm-w.html)      |    [id](https://www.runoob.com/linux/linux-comm-id.html)     | [groupadd](https://www.runoob.com/linux/linux-comm-groupadd.html) |  [free](https://www.runoob.com/linux/linux-comm-free.html)   |
|                       **8. 系统设置**                        |                                                              |                                                              |                                                              |
| [reset](https://www.runoob.com/linux/linux-comm-reset.html)  | [clear](https://www.runoob.com/linux/linux-comm-clear.html)  | [alias](https://www.runoob.com/linux/linux-comm-alias.html)  | [dircolors](https://www.runoob.com/linux/linux-comm-dircolors.html) |
| [aumix](https://www.runoob.com/linux/linux-comm-aumix.html)  |  [bind](https://www.runoob.com/linux/linux-comm-bind.html)   | [chroot](https://www.runoob.com/linux/linux-comm-chroot.html) | [clock](https://www.runoob.com/linux/linux-comm-clock.html)  |
| [crontab](https://www.runoob.com/linux/linux-comm-crontab.html) | [declare](https://www.runoob.com/linux/linux-comm-declare.html) | [depmod](https://www.runoob.com/linux/linux-comm-depmod.html) | [dmesg](https://www.runoob.com/linux/linux-comm-dmesg.html)  |
| [enable](https://www.runoob.com/linux/linux-comm-enable.html) |  [eval](https://www.runoob.com/linux/linux-comm-eval.html)   | [export](https://www.runoob.com/linux/linux-comm-export.html) | [pwunconv](https://www.runoob.com/linux/linux-comm-pwunconv.html) |
| [grpconv](https://www.runoob.com/linux/linux-comm-grpconv.html) |   [rpm](https://www.runoob.com/linux/linux-comm-rpm.html)    | [insmod](https://www.runoob.com/linux/linux-comm-insmod.html) | [kbdconfig](https://www.runoob.com/linux/linux-comm-kbdconfig.html) |
|  [lilo](https://www.runoob.com/linux/linux-comm-lilo.html)   | [liloconfig](https://www.runoob.com/linux/linux-comm-liloconfig.html) | [lsmod](https://www.runoob.com/linux/linux-comm-lsmod.html)  | [minfo](https://www.runoob.com/linux/linux-comm-minfo.html)  |
|   [set](https://www.runoob.com/linux/linux-comm-set.html)    | [modprobe](https://www.runoob.com/linux/linux-comm-modprobe.html) | [ntsysv](https://www.runoob.com/linux/linux-comm-ntsysv.html) | [mouseconfig](https://www.runoob.com/linux/linux-comm-mouseconfig.html) |
| [passwd](https://www.runoob.com/linux/linux-comm-passwd.html) | [pwconv](https://www.runoob.com/linux/linux-comm-pwconv.html) | [rdate](https://www.runoob.com/linux/linux-comm-rdate.html)  | [resize](https://www.runoob.com/linux/linux-comm-resize.html) |
| [rmmod](https://www.runoob.com/linux/linux-comm-rmmod.html)  | [grpunconv](https://www.runoob.com/linux/linux-comm-grpunconv.html) | [modinfo](https://www.runoob.com/linux/linux-comm-modinfo.html) |  [time](https://www.runoob.com/linux/linux-comm-time.html)   |
| [setup](https://www.runoob.com/linux/linux-comm-setup.html)  | [sndconfig](https://www.runoob.com/linux/linux-comm-sndconfig.html) | [setenv](https://www.runoob.com/linux/linux-comm-setenv.html) | [setconsole](https://www.runoob.com/linux/linux-comm-setconsole.html) |
| [timeconfig](https://www.runoob.com/linux/linux-comm-timeconfig.html) | [ulimit](https://www.runoob.com/linux/linux-comm-ulimit.html) | [unset](https://www.runoob.com/linux/linux-comm-unset.html)  | [chkconfig](https://www.runoob.com/linux/linux-comm-chkconfig.html) |
|  [apmd](https://www.runoob.com/linux/linux-comm-apmd.html)   | [hwclock](https://www.runoob.com/linux/linux-comm-hwclock.html) | [mkkickstart](https://www.runoob.com/linux/linux-comm-mkkickstart.html) | [fbset](https://www.runoob.com/linux/linux-comm-fbset.html)  |
| [unalias](https://www.runoob.com/linux/linux-comm-unalias.html) | [SVGATextMode](https://www.runoob.com/linux/linux-comm-svgatextmode.html) | [gpasswd](https://www.runoob.com/linux/linux-comm-gpasswd.html) |                                                              |
|                       **9. 备份压缩**                        |                                                              |                                                              |                                                              |
|    [ar](https://www.runoob.com/linux/linux-comm-ar.html)     | [bunzip2](https://www.runoob.com/linux/linux-comm-bunzip2.html) | [bzip2](https://www.runoob.com/linux/linux-comm-bzip2.html)  | [bzip2recover](https://www.runoob.com/linux/linux-comm-bzip2recover.html) |
| [gunzip](https://www.runoob.com/linux/linux-comm-gunzip.html) | [unarj](https://www.runoob.com/linux/linux-comm-unarj.html)  | [compress](https://www.runoob.com/linux/linux-comm-compress.html) |  [cpio](https://www.runoob.com/linux/linux-comm-cpio.html)   |
|  [dump](https://www.runoob.com/linux/linux-comm-dump.html)   | [uuencode](https://www.runoob.com/linux/linux-comm-uuencode.html) | [gzexe](https://www.runoob.com/linux/linux-comm-gzexe.html)  |  [gzip](https://www.runoob.com/linux/linux-comm-gzip.html)   |
|   [lha](https://www.runoob.com/linux/linux-comm-lha.html)    | [restore](https://www.runoob.com/linux/linux-comm-restore.html) |   [tar](https://www.runoob.com/linux/linux-comm-tar.html)    | [uudecode](https://www.runoob.com/linux/linux-comm-uudecode.html) |
| [unzip](https://www.runoob.com/linux/linux-comm-unzip.html)  |   [zip](https://www.runoob.com/linux/linux-comm-zip.html)    | [zipinfo](https://www.runoob.com/linux/linux-comm-zipinfo.html) |                                                              |
|                       **10. 设备管理**                       |                                                              |                                                              |                                                              |
| [setleds](https://www.runoob.com/linux/linux-comm-setleds.html) | [loadkeys](https://www.runoob.com/linux/linux-comm-loadkeys.html) |  [rdev](https://www.runoob.com/linux/linux-comm-rdev.html)   | [dumpkeys](https://www.runoob.com/linux/linux-comm-dumpkeys.html) |
| [MAKEDEV](https://www.runoob.com/linux/linux-comm-makedev.html) | [poweroff](https://www.runoob.com/linux/linux-comm-poweroff.html) |                                                              |                                                              |

------

### 其他命令

- [Linux bc 命令](https://www.runoob.com/linux/linux-comm-bc.html)
- [Linux tail 命令](https://www.runoob.com/linux/linux-comm-tail.html)
- [Linux head 命令](https://www.runoob.com/linux/linux-comm-head.html)
- [Linux xargs 命令](https://www.runoob.com/linux/linux-comm-xargs.html)
- [Linux ip 命令](https://www.runoob.com/linux/linux-comm-ip.html)
- [Linux nohup 命令](https://www.runoob.com/linux/linux-comm-nohup.html)
- [Linux killall 命令](https://www.runoob.com/linux/linux-comm-killall.html)
- [Linux pkill 命令](https://www.runoob.com/linux/linux-comm-pkill.html)





