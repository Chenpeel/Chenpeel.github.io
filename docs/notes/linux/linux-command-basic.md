##### <a id="basic">**基础命令** </a>: `man  *`

> 解释命令

display online manual documentation pages

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

没错，如👆的就是，这一部分的内容

```bash
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
```







<br>

再举个🌰: `man pwd` , 显示出关于pwd的一系列信息

```bash
❯ man pwd
......
PWD(1)                           General Commands Manual                          PWD(1)

NAME
     pwd – return working directory name
     # 注：  返回工作目录

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

可以看出pwd是做什么的呢？

显然，懂一点点英文即可享用

pwd是显示你的当前工作目录——以绝对路径的方式（以根为起点）



<br><br><br><br><br><br><br><br><br><br><br><br>

现在，想要知道什么命令就可以直接优雅的(地)`man`来使用啦

完结撒花~~🎉🎉🎉
