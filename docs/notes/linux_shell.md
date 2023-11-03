## <a id="linux_basic">Linux命令基础</a>

<hr>

##### <a id="basic">**最基础命令** </a>: `man  *`

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

##### <a id="files">文件系统</a>

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
<div class="to-center">
  <table>
    <tr>
      <th>选项</th>
      <th>功能</th>
    </tr>
    <tr>
      <td>-z</td>
      <td>打包同时压缩</td>
    </tr>
    <tr>
      <td>-c</td>
      <td>产生.tar打包文件</td>
    </tr>
    <tr>
      <td>-v</td>
      <td>显示详细信息</td>
    </tr>
    <tr>
      <td>-f</td>
      <td>指定压缩后的文件名</td>
    </tr>
    <tr>
      <td>-x</td>
      <td>解包.tar文件</td>
    </tr>
    <tr>
      <td>-C</td>
      <td>解压到指定目录</td>
    </tr>
  </table>
</div>


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
<div class="to-center">
  <table>
    <tr>
      <th>级别</th>
      <th>解释</th>
    </tr>
    <tr>
      <td>0</td>
      <td>系统停机状态</td>
    </tr>
    <tr>
      <td>1</td>
      <td>单用户工作状态，root，用于系统维护，禁止远程登录</td>
    </tr>
    <tr>
      <td>2</td>
      <td>多用户状态（无NFS），不支持网络</td>
    </tr>
    <tr>
      <td>3</td>
      <td>完全多用户模式（NFS），登陆后进入控制台命令行模式</td>
    </tr>
    <tr>
      <td>4</td>
      <td>保留状态</td>
    </tr>
    <tr>
      <td>5</td>
      <td>X11控制台，登入后进入GUI界面</td>
    </tr>
    <tr>
      <td>6</td>
      <td>系统正常关闭并重启</td>
    </tr>
  </table>
</div>

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
  
    <div class="to-center">
      <table>
        <tr>
          <th>选项</th>
          <th>功能</th>
        </tr>
        <tr>
          <td>a</td>
          <td>列出带有终端的所有用户的进程</td>
        </tr>
        <tr>
          <td>u</td>
          <td>列出当前用户的所有进程，包括没有终端的进程</td>
        </tr>
        <tr>
          <td>x</td>
          <td>面向用户的友好型风格显示</td>
        </tr>
        <tr>
          <td>-e</td>
          <td>列出所有进程</td>
        </tr>
        <tr>
          <td>-u</td>
          <td>列出某个用户关联的所有进程</td>
        </tr>
        <tr>
          <td>-f</td>
          <td>显示完整格式的进程列表</td>
        </tr>
      </table>
    </div>

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



##### <a id="apt">APT 包管理</a>

> Advanced Packaging Tools

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



###### 包管理工具RPM 

> Redhat Package Manager

- firefox-102.10.0-1.el9.aarch64
  - `app_name - version . 硬件平台. rpm`
- `rpm -qa` (query all)  
- `rpm -qi app_name ` (query info)
- `rpm -e --nodeps app_name`  (no depandence) 卸载程序
- `rpm -ivh --nodeps app_name` install with verbose and hash\

###### yum 

> Yellow dog Updater Modified

- ` yum  -y  install/update/check-update/remove/list/clean/deplist  `
- 配置yum源
  - `/etc/yum.repo.d`

<hr>


##### 网络通信

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

> configure your network interface parameters
> 用于配置网卡的IP地址信息等网络参数信息，或者用于查看网络接口信息
> 还能够临时性配置IP地址、子网掩码、广播地址、网关信息等

基本信息显示

```bash
❯ ifconfig
# 网卡信息
eth0   Link encap:Ethernet HWaddr 00:50:56:0A:0B:0C 
     inet addr:192.168.0.3 Bcast:192.168.0.255 Mask:255.255.255.0
     inet6 addr: fe80::250:56ff:fe0a:b0c/64 Scope:Link
     UP BROADCAST RUNNING MULTICAST MTU:1500 Metric:1
     RX packets:172220 errors:0 dropped:0 overruns:0 frame:0
     TX packets:132379 errors:0 dropped:0 overruns:0 carrier:0
     collisions:0 txqueuelen:1000 
     RX bytes:87101880 (83.0 MiB) TX bytes:41576123 (39.6 MiB)
     Interrupt:185 Base address:0x2024 

# 本地回环信息
lo    Link encap:Local Loopback 
     inet addr:127.0.0.1 Mask:255.0.0.0
     inet6 addr: ::1/128 Scope:Host
     UP LOOPBACK RUNNING MTU:16436 Metric:1
     RX packets:2022 errors:0 dropped:0 overruns:0 frame:0
     TX packets:2022 errors:0 dropped:0 overruns:0 carrier:0
     collisions:0 txqueuelen:0 
     RX bytes:2459063 (2.3 MiB) TX bytes:2459063 (2.3 MiB)


	
```

关闭网卡

```bash
❯ ifconfig eth0 down
	# 关闭网卡
	...
```

配置网卡IP地址

```bash
❯ ifconfig eth0 192.168.1.56/24
	# 配置IP地址
```



###### <a id="route">ROUTE</a>

> [静态路由](https://en.wikipedia.org/wiki/Static_routing)和[动态路由](https://en.wikipedia.org/wiki/Dynamic_routing)
> 手动操作的是静态

路由信息

```bash
❯ route -n
# -n 是显示Gateway为IP地址的形式
Kernel IP routing table

Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.31.1    0.0.0.0         UG    100    0        0 eth0
169.254.0.0     0.0.0.0         255.255.0.0     U     1000   0        0 eth0
172.31.0.0      0.0.0.0         255.255.255.0   U     0      0        0 docker0
192.168.31.0    0.0.0.0         255.255.255.0   U     100    0        0 eth0
```

创建/删除路由信息

```bash
route add/del default
# 删除默认网关
```



###### <a id="ip">IP</a>

> IP 信息管理

```bash
❯ ip --help
Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
       ip [ -force ] -batch filename
where  OBJECT := { address | addrlabel | fou | help | ila | ioam | l2tp | link |
                   macsec | maddress | monitor | mptcp | mroute | mrule |
                   neighbor | neighbour | netconf | netns | nexthop | ntable |
                   ntbl | route | rule | sr | tap | tcpmetrics |
                   token | tunnel | tuntap | vrf | xfrm }
       OPTIONS := { -V[ersion] | -s[tatistics] | -d[etails] | -r[esolve] |
                    -h[uman-readable] | -iec | -j[son] | -p[retty] |
                    -f[amily] { inet | inet6 | mpls | bridge | link } |
                    -4 | -6 | -M | -B | -0 |
                    -l[oops] { maximum-addr-flush-attempts } | -br[ief] |
                    -o[neline] | -t[imestamp] | -ts[hort] | -b[atch] [filename] |
                    -rc[vbuf] [size] | -n[etns] name | -N[umeric] | -a[ll] |
                    -c[olor]}
                    
# link： 网络设备
# address：定义IPv4、IPv6地址
# neighbor：查看arp缓存(MAC地址映射)
# route：路由表对象 -> ip route
# maddress：多播地址
# tunel：IP上的通道
```

显示IP地址信息

```bash
❯ ip addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: sit0@NONE: <NOARP> mtu 1480 qdisc noop state DOWN group default qlen 1000
    link/sit 0.0.0.0 brd 0.0.0.0
3: ip6tnl0@NONE: <NOARP> mtu 1452 qdisc noop state DOWN group default qlen 1000
    link/tunnel6 :: brd :: permaddr 2e1d:4d23:4b20::
4: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether fc:7c:02:ec:d7:2b brd ff:ff:ff:ff:ff:ff
    inet 192.168.31.2/24 brd 192.168.31.255 scope global dynamic noprefixroute eth0
       valid_lft 25736sec preferred_lft 25736sec
    inet 192.168.31.250/24 brd 192.168.31.255 scope global secondary eth0:1
       valid_lft forever preferred_lft forever
    inet6 fe80::7586:9c06:781c:e1d7/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
5: wlan0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq state DOWN group default qlen 1000
    link/ether 9e:61:9c:ad:18:02 brd ff:ff:ff:ff:ff:ff
6: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default
    link/ether 02:42:8f:fc:71:76 brd ff:ff:ff:ff:ff:ff
    inet 172.31.0.1/24 brd 172.31.0.255 scope global docker0
       valid_lft forever preferred_lft forever
```

显示eth0设备信息

```bash
❯ ip -s link show dev eth0

4: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether fc:7c:02:ec:d7:2b brd ff:ff:ff:ff:ff:ff
    RX:  bytes packets errors dropped  missed   mcast
     171354734 2838307      0       0       0       0
    TX:  bytes packets errors dropped carrier collsns
       3273718   36406      0       0       0       0
```

给网卡添加别名

```bash
 ip addr add 192.168.31.250/24 dev eth0 lable eth0:1
```



###### <a id="ssh">SSH</a>

>  使用本地主机进行ssh远程登录

远程连接我的N1盒子

> beta是用户名也可以使用root用户进行登录

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



###### <a id="netstat">NETSTAT</a>

显示网络状态

```bash
❯ netstat -an
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:111             0.0.0.0:*               LISTEN
tcp        0    172 192.168.31.2:22         192.168.31.252:61288    ESTABLISHED
tcp6       0      0 :::22                   :::*                    LISTEN
tcp6       0      0 :::111                  :::*                    LISTEN
udp        0      0 127.0.0.53:53           0.0.0.0:*
udp        0      0 192.168.31.2:68         192.168.31.1:67         ESTABLISHED
udp        0      0 0.0.0.0:111             0.0.0.0:*
udp        0      0 127.0.0.1:323           0.0.0.0:*
udp6       0      0 :::111                  :::*
udp6       0      0 ::1:323                 :::*
raw6       0      0 :::58                   :::*                    7
Active UNIX domain sockets (servers and established)
Proto RefCnt Flags       Type       State         I-Node   Path
# Proto： socket协议 
# Recv-Q： 连接这个socket的用户，还未copy的字节数
# Send-Q： 远程主机还未确认的字节数
# Local Address： socket的本地地址和端口
# Foreign Address：socket的远程主机地址和端口
# State： 运行状况
```

查看正在运行的端口状况

```bash
❯ netstat -tunlp
# t : tcp
# u : udp
# l : listen
# p : process

(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
Active Internet connections (only servers)

Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN      -
tcp        0      0 0.0.0.0:3000            0.0.0.0:*               LISTEN      23514/busybox
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -
tcp        0      0 0.0.0.0:111             0.0.0.0:*               LISTEN      -
tcp6       0      0 :::22                   :::*                    LISTEN      -
tcp6       0      0 :::111                  :::*                    LISTEN      -
udp        0      0 127.0.0.53:53           0.0.0.0:*                           -
udp        0      0 0.0.0.0:111             0.0.0.0:*                           -
udp        0      0 127.0.0.1:323           0.0.0.0:*                           -
udp6       0      0 :::111                  :::*                                -
udp6       0      0 ::1:323                 :::*                                -
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

### 参数处理
<div class="to-center">
  <table>
    <tr>
      <th>参数</th>
      <th>说明</th>
    </tr>
    <tr>
      <td>$#</td>
      <td>传递到脚本的参数个数</td>
    </tr>
    <tr>
      <td>$*</td>
      <td>以一个单字符串显示所有向脚本传递的参数</td>
    </tr>
    <tr>
      <td>$$</td>
      <td>当前脚本运行的进程ID号</td>
    </tr>
    <tr>
      <td>$!</td>
      <td>后台最后一个进程ID号</td>
    </tr>
    <tr>
      <td>$@</td>
      <td>同$*但是使用时加引号，并在引号中返回每个参数</td>
    </tr>
    <tr>
      <td>$-</td>
      <td>显示shell使用的当前选项，与set命令功能相同</td>
    </tr>
    <tr>
      <td>$?</td>
      <td>显示最后命令的退出状态。0表示没有错误，其他任何值表示有错误。</td>
    </tr>
    <tr>
      <td>'' 和 ""</td>
      <td>使用引号防止通配符的扩展</td>
    </tr>
  </table>
</div>

### 关系运算符
<div class="to-center">
  <table>
    <tr>
      <th>关系运算符</th>
      <th>说明</th>
    </tr>
    <tr>
      <td>-eq</td>
      <td>相等</td>
    </tr>
    <tr>
      <td>-ne</td>
      <td>不相等</td>
    </tr>
    <tr>
      <td>-gt</td>
      <td>大于</td>
    </tr>
    <tr>
      <td>-lt</td>
      <td>小于</td>
    </tr>
    <tr>
      <td>-ge</td>
      <td>大于等于</td>
    </tr>
    <tr>
      <td>-le</td>
      <td>小于等于</td>
    </tr>
  </table>
</div>

### 布尔运算符
<div class="to-center">
  <table>
    <tr>
      <th>布尔运算符</th>
      <th>说明</th>
    </tr>
    <tr>
      <td>!</td>
      <td>非</td>
    </tr>
    <tr>
      <td>-o</td>
      <td>或</td>
    </tr>
    <tr>
      <td>-a</td>
      <td>与</td>
    </tr>
  </table>
</div>
### 字符串运算符
<div class="to-center">
  <table>
    <tr>
      <th>字符串运算符</th>
      <th>说明</th>
    </tr>
    <tr>
      <td>=</td>
      <td>字符串是否相等</td>
    </tr>
    <tr>
      <td>!=</td>
      <td>字符串是否不相等</td>
    </tr>
    <tr>
      <td>-z</td>
      <td>字符串长度是否为0</td>
    </tr>
    <tr>
      <td>-n</td>
      <td>字符串长度是否不为0</td>
    </tr>
    <tr>
      <td>$</td>
      <td>字符串是否不为空</td>
    </tr>
  </table>
</div>

### 操作符
<div class="to-center">
  <table>
    <tr>
      <th>操作符</th>
      <th>说明</th>
      <th>举例</th>
    </tr>
    <tr>
      <td>-b file</td>
      <td>检测文件是否是块设备文件</td>
      <td>[ -b $file ] 返回 false。</td>
    </tr>
    <tr>
      <td>-c file</td>
      <td>检测文件是否是字符设备文件</td>
      <td>[ -c $file ] 返回 false。</td>
    </tr>
    <tr>
      <td>-d file</td>
      <td>检测文件是否是目录</td>
      <td>[ -d $file ] 返回 false。</td>
    </tr>
    <tr>
      <td>-f file</td>
      <td>检测文件是否是普通文件（不是目录、设备文件）</td>
      <td>[ -f $file ] 返回 true。</td>
    </tr>
    <tr>
      <td>-g file</td>
      <td>检测文件是否设置了 SGID 位</td>
      <td>[ -g $file ] 返回 false。</td>
    </tr>
    <tr>
      <td>-k file</td>
      <td>检测文件是否设置了粘着位(Sticky Bit)</td>
      <td>[ -k $file ] 返回 false。</td>
    </tr>
    <tr>
      <td>-p file</td>
      <td>检测文件是否是有名管道</td>
      <td>[ -p $file ] 返回 false。</td>
    </tr>
    <tr>
      <td>-u file</td>
      <td>检测文件是否设置了 SUID 位</td>
      <td>[ -u $file ] 返回 false。</td>
    </tr>
    <tr>
      <td>-r file</td>
      <td>检测文件是否可读</td>
      <td>[ -r $file ] 返回 true。</td>
    </tr>
    <tr>
      <td>-w file</td>
      <td>检测文件是否可写</td>
      <td>[ -w $file ] 返回 true。</td>
    </tr>
    <tr>
      <td>-x file</td>
      <td>检测文件是否可执行</td>
      <td>[ -x $file ] 返回 true。</td>
    </tr>
    <tr>
      <td>-s file</td>
      <td>检测文件是否为空（文件大小是否大于0）</td>
      <td>[ -s $file ] 返回 true。</td>
    </tr>
    <tr>
      <td>-e file</td>
      <td>检测文件（包括目录）是否存在</td>
      <td>[ -e $file ] 返回 true。</td>
    </tr>
  </table>
</div>  

其他检查符：

- `-S` 判断某文件是否socket
- `-L`检查文件是否存在并且是一个符号链接



## <a id="re">重定向</a>
<div class="to-center">
  <table>
    <tr>
      <th>命令</th>
      <th>说明</th>
    </tr>
    <tr>
      <td>command &gt; file</td>
      <td>将输出重定向到 file。</td>
    </tr>
    <tr>
      <td>command &lt; file</td>
      <td>将输入重定向到 file。</td>
    </tr>
    <tr>
      <td>command &gt;&gt; file</td>
      <td>将输出以追加的方式重定向到 file。</td>
    </tr>
    <tr>
      <td>n &gt; file</td>
      <td>将文件描述符为 n 的文件重定向到 file。</td>
    </tr>
    <tr>
      <td>n &gt;&gt; file</td>
      <td>将文件描述符为 n 的文件以追加的方式重定向到 file。</td>
    </tr>
    <tr>
      <td>n &gt;& m</td>
      <td>将输出文件 m 和 n 合并。</td>
    </tr>
    <tr>
      <td>n &lt;& m</td>
      <td>将输入文件 m 和 n 合并。</td>
    </tr>
    <tr>
      <td>&lt;&lt; tag</td>
      <td>将开始标记 tag 和结束标记 tag 之间的内容作为输入。</td>
    </tr>
  </table>
</div>


## <a id="RegExp">正则表达式</a>

> regual expression，用于处理大量字符串和文本文件
>
> 在linux中仅有**sed**、**awk**、**grep**支持正则表达式，而通配符则是大部分普通命令所支持的

- grep：文本过滤工具，（模式：pattern）工具
- sed：stream editor，流编辑器，文本编辑工具
- awk：（GNU awk）Linux的文本报告生成器（格式化文本）



#### 基本正则表达式

> BRE

- 匹配字符
- 匹配次数
- 位置锚定

<div class="to-center">
<table>
    <tr>
      <th>符号</th>
      <th>作用</th>
    </tr>
    <tr>
      <td>^</td>
      <td>用于模式的最左侧，匹配以特定字符开头的行</td>
    </tr>
    <tr>
    	<td>$</td>
      <td>用于模式的最右侧，匹配以特定字符结尾的行</td>
    </tr>
    <tr>
      <td>^$</td>
      <td>组合符，表示空行</td>
    </tr>
    <tr>
      <td>.</td>
      <td>匹配任意一个且有且只有一个字符，不能匹配空行</td>
    </tr>
    <tr>
      <td>\</td>
      <td>转义字符，还原特殊字符本意</td>
    </tr>
    <tr>
      <td>*</td>
      <td>匹配前一个字符（连续出现）0次或1次以上，重复0次代表空，即匹配所有内容</td>
    </tr>
    <tr>
      <td>.*</td>
      <td>匹配所有内容</td>
    </tr>
    <tr>
      <td>^.*</td>
      <td>匹配任意多个字符开头的内容</td>
    </tr>
    <tr>
      <td>.*$</td>
      <td>匹配任意多个字符结尾的内容</td>
    </tr>
    <tr>
      <td>[abc]</td>
      <td>匹配[]集合内的任意一个字符([a-c]也可)</td>
    </tr>
    <tr>
      <td>[^abc]</td>
      <td>匹配除了^后面的任意字符，^表示对[abc]的取反，等同于[d-z]</td>
    </tr>
  </table>
</div>



#### 拓展正则表达式

> ERE

扩展的正则表达式必须使用`grep -E`才能生效

<div class="to-center">
<table>
    <tr>
      <th>符号</th>
      <th>作用</th>
    </tr>
    <tr>
      <td>+</td>
      <td>匹配前一个字符1次或多次</td>
    </tr>
    <tr>
    	<td>[:/]+</td>
      <td>匹配括号内的":"或者"/"一次或多次</td>
    </tr>
    <tr>
      <td>?</td>
      <td>匹配前一个字符0次或1次</td>
    </tr>
    <tr>
      <td>｜</td>
      <td>表示或者，同时过滤多个字符串</td>
    </tr>
    <tr>
      <td>()</td>
      <td>分组过滤，被括起来内容代表一个整体</td>
    </tr>
    <tr>
      <td>a{n,m}</td>
      <td>匹配前一个字符最少n次最多m次</td>
    </tr>
    <tr>
      <td>a{n,}</td>
      <td>匹配前一个字符最少n次</td>
    </tr>
    <tr>
      <td>a{n}</td>
      <td>匹配前一个字符恰好n次</td>
    </tr>
    <tr>
      <td>a{,m}</td>
      <td>匹配前一个字符最多m次</td>
    </tr>
  </table>
</div>



##### <a id="grep">GREP</a>

> Global search REgular expression and Print out the line

作用：文本搜索工具，根据指定的pattern对目标进行逐行匹配检查，打印匹配到的行信息

pattern： 由正则表达式的元字符及文本字符所编写的过滤条件

```bash
# 语法
# grep [options] "pattern" file
# 命令 参数 匹配模式 文件数据
grep     -n -i       ^A        file
# -i：ignorecase，忽略字符大小写
# -o：仅显示匹配到的字符本身
# -w：仅匹配过滤的单词
# -v,--invert-match：显示不能被模式匹配到的行
# -E：支持使用扩展的正则表达式元字符
# -q,--quiet,--silent：静默模式，即不输出任何信息
# -r: recursion，递归查找
# -n：显示匹配行与行号
# --color=auto：为过滤结果添加颜色
# -c：只统计匹配的行数
```

> 它可以从文本文件或管道流中，筛选匹配的行和数据

```bash
grep -n -i ^grep  linux_shell.md
1494:grep "^From " $message
2122:grep     -n -i       ^A        file
```

##### <a id="sed">SED</a>

> Stream EDitor流编辑

```bash
# 语法
# sed [options] "sed内置命令字符" file

# [options]
# -n：取消默认sed输出，常与内置命令p一起使用
# -i：直接修改源文件，不用-i，修改的是内存数据
# -e：多次编辑，无需管道符了
# -r：支持正则扩展

# [sed内置命令字符]
# a：append，对文本进行追加，在指定的行后面添加一行或多行文本
# d：delete，删除匹配行
# i：insert，表示插入文本，在指定行前添加一行或多行
# p：print，打印匹配行的内容
# s/正则/替换内容/g： 替换符合的所有字符，g表global，也可以使用s###、s@@@，在vim中只可以用/
```

sed匹配范围

<div class="to-center">
<table>
    <tr>
      <th>范围</th>
      <th>解释</th>
    </tr>
    <tr>
      <td>空地址</td>
      <td>全文处理</td>
    </tr>
    <tr>
    	<td>单地址</td>
      <td>指定文件的某一行</td>
    </tr>
    <tr>
      <td>/pattern/</td>
      <td>被模式匹配到的每一行</td>
    </tr>
    <tr>
      <td>范围区间</td>
      <td>10,20 十到二十行； 10,+5第十行向下五行；/pattern1/,/pattern2/多个模式</td>
    </tr>
    <tr>
      <td>步长</td>
      <td>1~2表示1、3、5、7、9；2~2表示2、4、6、8、10行</td>
    </tr>
  </table>
</div>



##### <a id="awk">AWK</a>

> 由 Alfred Aho、Peter Weinberger 和 Brian Kernighan 首字母命名的文本处理工具和编程语言
>
> 支持判断、数组、循环、函数等功能

```bash
# 语法

# awk [options] "pattern" {action} file
```

```bash
cat test.txt
test_awk1 test_awk2 test_awk3 test_awk4 test_awk5 test_awk6 test_awk7 test_awk8 test_awk9 test_awk10
test_awk11 test_awk12 test_awk13 test_awk14 test_awk15 test_awk16 test_awk17 test_awk18 test_awk19 test_awk20
test_awk21 test_awk22 test_awk23 test_awk24 test_awk25 test_awk26 test_awk27 test_awk28 test_awk29 test_awk30
test_awk31 test_awk32 test_awk33 test_awk34 test_awk35 test_awk36 test_awk37 test_awk38 test_awk39 test_awk40
test_awk41 test_awk42 test_awk43 test_awk44 test_awk45 test_awk46 test_awk47 test_awk48 test_awk49 test_awk50


awk '{print $1}' test.txt 
#输出第一列
test_awk1
test_awk11
test_awk21
test_awk31
test_awk41

awk '{print $0}' test.txt
#输出所有列
test_awk1 test_awk2 test_awk3 test_awk4 test_awk5 test_awk6 test_awk7 test_awk8 test_awk9 test_awk10
test_awk11 test_awk12 test_awk13 test_awk14 test_awk15 test_awk16 test_awk17 test_awk18 test_awk19 test_awk20
test_awk21 test_awk22 test_awk23 test_awk24 test_awk25 test_awk26 test_awk27 test_awk28 test_awk29 test_awk30
test_awk31 test_awk32 test_awk33 test_awk34 test_awk35 test_awk36 test_awk37 test_awk38 test_awk39 test_awk40
test_awk41 test_awk42 test_awk43 test_awk44 test_awk45 test_awk46 test_awk47 test_awk48 test_awk49 test_awk50


awk '{print $NF}' test.txt
#输出最后一列 Number of Fields
test_awk10
test_awk20
test_awk30
test_awk40
test_awk50

awk 'NF>=2 {print $(NF-1)}' test.txt
# 输出倒数第二列
test_awk9
test_awk19
test_awk29
test_awk39
test_awk49


awk '{print $NR}' test.txt
# 输出当前记录 Number of Records
test_awk2
test_awk13
test_awk24
test_awk35
test_awk46

awk 'NR==4,NR==5{print$0}' test.txt
test_awk31 test_awk32 test_awk33 test_awk34 test_awk35 test_awk36 test_awk37 test_awk38 test_awk39 test_awk40
test_awk41 test_awk42 test_awk43 test_awk44 test_awk45 test_awk46 test_awk47 test_awk48 test_awk49 test_awk50

awk '{print NR":", $0}' test.txt
# cat -n test.txt
1: test_awk1 test_awk2 test_awk3 test_awk4 test_awk5 test_awk6 test_awk7 test_awk8 test_awk9 test_awk10
2: test_awk11 test_awk12 test_awk13 test_awk14 test_awk15 test_awk16 test_awk17 test_awk18 test_awk19 test_awk20
3: test_awk21 test_awk22 test_awk23 test_awk24 test_awk25 test_awk26 test_awk27 test_awk28 test_awk29 test_awk30
4: test_awk31 test_awk32 test_awk33 test_awk34 test_awk35 test_awk36 test_awk37 test_awk38 test_awk39 test_awk40
5: test_awk41 test_awk42 test_awk43 test_awk44 test_awk45 test_awk46 test_awk47 test_awk48 test_awk49 test_awk50
```

- 内层字符串用双引号，外层用单引号，否则外层会被识别为字符串

```bash
awk '{print "第一列:" $1, "第二列:" $2}' test.txt
第一列:test_awk1 第二列:test_awk2
第一列:test_awk11 第二列:test_awk12
第一列:test_awk21 第二列:test_awk22
第一列:test_awk31 第二列:test_awk32
第一列:test_awk41 第二列:test_awk42
```

awk参数

<div class="to-center">
<table>
    <tr>
      <th>参数</th>
      <th>解释</th>
    </tr>
    <tr>
      <td>-F</td>
      <td>指定分割字段符</td>
    </tr>
    <tr>
    	<td>-V</td>
      <td>定义或修改一个awk内部变量</td>
    </tr>
    <tr>
      <td>-f</td>
      <td>从脚本文件中读取awk命令</td>
    </tr>
  </table>
</div>





## <a id = "All_Commands">Linux 命令大全</a>

<div class="to-center">
    <table>
        <tr>
            <th>1. 文件管理</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-cat.html'>cat</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-chattr.html'>chattr</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-chgrp.html'>chgrp</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-chmod.html'>chmod</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-chown.html'>chown</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-cksum.html'>cksum</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-cmp.html'>cmp</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-diff.html'>diff</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-diffstat.html'>diffstat</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-file.html'>file</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-find.html'>find</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-git.html'>git</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-gitview.html'>gitview</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-indent.html'>indent</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-cut.html'>cut</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ln.html'>ln</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-less.html'>less</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-locate.html'>locate</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-lsattr.html'>lsattr</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mattrib.html'>mattrib</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-mc.html'>mc</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mdel.html'>mdel</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mdir.html'>mdir</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mktemp.html'>mktemp</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-more.html'>more</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mmove.html'>mmove</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mread.html'>mread</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mren.html'>mren</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-mtools.html'>mtools</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mtoolstest.html'>mtoolstest</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mv.html'>mv</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-od.html'>od</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-paste.html'>paste</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-patch.html'>patch</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-rcp.html'>rcp</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-rm.html'>rm</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-slocate.html'>slocate</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-split.html'>split</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-tee.html'>tee</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-tmpwatch.html'>tmpwatch</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-touch.html'>touch</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-umask.html'>umask</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-which.html'>which</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-cp.html'>cp</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-whereis.html'>whereis</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mcopy.html'>mcopy</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mshowfat.html'>mshowfat</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-rhmask.html'>rhmask</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-scp.html'>scp</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-awk.html'>awk</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-read.html'>read</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-updatedb.html'>updatedb</a></td>
        </tr>
        <tr>
            <td><strong>2. 文档编辑</strong></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-col.html'>col</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-colrm.html'>colrm</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-comm.html'>comm</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-csplit.html'>csplit</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-ed.html'>ed</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-egrep.html'>egrep</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ex.html'>ex</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-fgrep.html'>fgrep</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-fmt.html'>fmt</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-fold.html'>fold</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-grep.html'>grep</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ispell.html'>ispell</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-jed.html'>jed</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-joe.html'>joe</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-join.html'>join</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-look.html'>look</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-mtype.html'>mtype</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-pico.html'>pico</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-rgrep.html'>rgrep</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-sed.html'>sed</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-sort.html'>sort</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-spell.html'>spell</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-tr.html'>tr</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-expr.html'>expr</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-uniq.html'>uniq</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-wc.html'>wc</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-let.html'>let</a></td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><strong>3. 文件传输</strong></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-lprm.html'>lprm</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-lpr.html'>lpr</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-lpq.html'>lpq</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-lpd.html'>lpd</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-bye.html'>bye</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ftp.html'>ftp</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-uuto.html'>uuto</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-uupick.html'>uupick</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-uucp.html'>uucp</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-uucico.html'>uucico</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-tftp.html'>tftp</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ncftp.html'>ncftp</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-ftpshut.html'>ftpshut</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ftpwho.html'>ftpwho</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ftpcount.html'>ftpcount</a></td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><strong>4. 磁盘管理</strong></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-cd.html'>cd</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-df.html'>df</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-dirs.html'>dirs</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-du.html'>du</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-edquota.html'>edquota</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-eject.html'>eject</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mcd.html'>mcd</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mdeltree.html'>mdeltree</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-mdu.html'>mdu</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mkdir.html'>mkdir</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mlabel.html'>mlabel</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mmd.html'>mmd</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-mrd.html'>mrd</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mzip.html'>mzip</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-pwd.html'>pwd</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-quota.html'>quota</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-mount.html'>mount</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mmount.html'>mmount</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-rmdir.html'>rmdir</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-rmt.html'>rmt</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-stat.html'>stat</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-tree.html'>tree</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-umount.html'>umount</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ls.html'>ls</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-quotacheck.html'>quotacheck</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-quotaoff.html'>quotaoff</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-lndir.html'>lndir</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-repquota.html'>repquota</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-quotaon.html'>quotaon</a></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><strong>5. 磁盘维护</strong></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-badblocks.html'>badblocks</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-cfdisk.html'>cfdisk</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-dd.html'>dd</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-e2fsck.html'>e2fsck</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-ext2ed.html'>ext2ed</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-fsck.html'>fsck</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-fsck-minix.html'>fsck.minix</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-fsconf.html'>fsconf</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-fdformat.html'>fdformat</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-hdparm.html'>hdparm</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mformat.html'>mformat</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mkbootdisk.html'>mkbootdisk</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-mkdosfs.html'>mkdosfs</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mke2fs.html'>mke2fs</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mkfs-ext2.html'>mkfs.ext2</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mkfs-msdos.html'>mkfs.msdos</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-mkinitrd.html'>mkinitrd</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mkisofs.html'>mkisofs</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mkswap.html'>mkswap</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mpartition.html'>mpartition</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-swapon.html'>swapon</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-symlinks.html'>symlinks</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-sync.html'>sync</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mbadblocks.html'>mbadblocks</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-mkfs-minix.html'>mkfs.minix</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-fsck-ext2.html'>fsck.ext2</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-fdisk.html'>fdisk</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-losetup.html'>losetup</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-mkfs.html'>mkfs</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-sfdisk.html'>sfdisk</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-swapoff.html'>swapoff</a></td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><strong>6. 网络通讯</strong></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-apachectl.html'>apachectl</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-arpwatch.html'>arpwatch</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-dip.html'>dip</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-getty.html'>getty</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-mingetty.html'>mingetty</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-uux.html'>uux</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-telnet.html'>telnet</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-uulog.html'>uulog</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-uustat.html'>uustat</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ppp-off.html'>ppp-off</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-netconfig.html'>netconfig</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-nc.html'>nc</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-httpd.html'>httpd</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ifconfig.html'>ifconfig</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-minicom.html'>minicom</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mesg.html'>mesg</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-dnsconf.html'>dnsconf</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-wall.html'>wall</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-netstat.html'>netstat</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ping.html'>ping</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-pppstats.html'>pppstats</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-samba.html'>samba</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-setserial.html'>setserial</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-talk.html'>talk</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-traceroute.html'>traceroute</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-tty.html'>tty</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-newaliases.html'>newaliases</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-uuname.html'>uuname</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-netconf.html'>netconf</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-write.html'>write</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-statserial.html'>statserial</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-efax.html'>efax</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-pppsetup.html'>pppsetup</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-tcpdump.html'>tcpdump</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ytalk.html'>ytalk</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-cu.html'>cu</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-smbd.html'>smbd</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-testparm.html'>testparm</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-smbclient.html'>smbclient</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-shapecfg.html'>shapecfg</a></td>
        </tr>
        <tr>
            <td><strong>7. 系统管理</strong></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-adduser.html'>adduser</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-chfn.html'>chfn</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-useradd.html'>useradd</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-date.html'>date</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-exit.html'>exit</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-finger.html'>finger</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-fwhios.html'>fwhios</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-sleep.html'>sleep</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-suspend.html'>suspend</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-groupdel.html'>groupdel</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-groupmod.html'>groupmod</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-halt.html'>halt</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-kill.html'>kill</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-last.html'>last</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-lastb.html'>lastb</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-login.html'>login</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-logname.html'>logname</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-logout.html'>logout</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ps.html'>ps</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-nice.html'>nice</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-procinfo.html'>procinfo</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-top.html'>top</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-pstree.html'>pstree</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-reboot.html'>reboot</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-rlogin.html'>rlogin</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-rsh.html'>rsh</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-sliplogin.html'>sliplogin</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-screen.html'>screen</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-shutdown.html'>shutdown</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-rwho.html'>rwho</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-sudo.html'>sudo</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-gitps.html'>gitps</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-swatch.html'>swatch</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-tload.html'>tload</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-logrotate.html'>logrotate</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-uname.html'>uname</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-chsh.html'>chsh</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-userconf.html'>userconf</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-userdel.html'>userdel</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-usermod.html'>usermod</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-vlock.html'>vlock</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-who.html'>who</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-whoami.html'>whoami</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-whois.html'>whois</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-newgrp.html'>newgrp</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-renice.html'>renice</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-su.html'>su</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-skill.html'>skill</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-w.html'>w</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-id.html'>id</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-groupadd.html'>groupadd</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-free.html'>free</a></td>
        </tr>
        <tr>
            <td><strong>8. 系统设置</strong></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-reset.html'>reset</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-clear.html'>clear</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-alias.html'>alias</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-dircolors.html'>dircolors</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-aumix.html'>aumix</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-bind.html'>bind</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-chroot.html'>chroot</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-clock.html'>clock</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-crontab.html'>crontab</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-declare.html'>declare</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-depmod.html'>depmod</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-dmesg.html'>dmesg</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-enable.html'>enable</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-eval.html'>eval</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-export.html'>export</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-pwunconv.html'>pwunconv</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-grpconv.html'>grpconv</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-rpm.html'>rpm</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-insmod.html'>insmod</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-kbdconfig.html'>kbdconfig</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-lilo.html'>lilo</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-liloconfig.html'>liloconfig</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-lsmod.html'>lsmod</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-minfo.html'>minfo</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-set.html'>set</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-modprobe.html'>modprobe</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ntsysv.html'>ntsysv</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mouseconfig.html'>mouseconfig</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-passwd.html'>passwd</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-pwconv.html'>pwconv</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-rdate.html'>rdate</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-resize.html'>resize</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-rmmod.html'>rmmod</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-grpunconv.html'>grpunconv</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-modinfo.html'>modinfo</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-time.html'>time</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-setup.html'>setup</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-sndconfig.html'>sndconfig</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-setenv.html'>setenv</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-setconsole.html'>setconsole</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-timeconfig.html'>timeconfig</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-ulimit.html'>ulimit</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-unset.html'>unset</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-chkconfig.html'>chkconfig</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-apmd.html'>apmd</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-hwclock.html'>hwclock</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-mkkickstart.html'>mkkickstart</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-fbset.html'>fbset</a>
            </td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-unalias.html'>unalias</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-svgatextmode.html'>SVGATextMode</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-gpasswd.html'>gpasswd</a></td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><strong>9. 备份压缩</strong></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-ar.html'>ar</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-bunzip2.html'>bunzip2</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-bzip2.html'>bzip2</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-bzip2recover.html'>bzip2recover</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-gunzip.html'>gunzip</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-unarj.html'>unarj</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-compress.html'>compress</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-cpio.html'>cpio</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-dump.html'>dump</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-uuencode.html'>uuencode</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-gzexe.html'>gzexe</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-gzip.html'>gzip</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-lha.html'>lha</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-restore.html'>restore</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-tar.html'>tar</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-uudecode.html'>uudecode</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-unzip.html'>unzip</a>
            </td>
            <td><a href='https://www.runoob.com/linux/linux-comm-zip.html'>zip</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-zipinfo.html'>zipinfo</a></td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><strong>10. 设备管理</strong></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-setleds.html'>setleds</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-loadkeys.html'>loadkeys</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-rdev.html'>rdev</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-dumpkeys.html'>dumpkeys</a></td>
        </tr>
        <tr>
            <td><a href='https://www.runoob.com/linux/linux-comm-makedev.html'>MAKEDEV</a></td>
            <td><a href='https://www.runoob.com/linux/linux-comm-poweroff.html'>poweroff</a></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </table>
</div>


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





