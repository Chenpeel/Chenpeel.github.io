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
