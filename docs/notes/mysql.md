> #### 写在前面✍️
>
> 本篇是学习数据库的基本内容的信息，作为**速览List** 
<style>
.to-center {
  display: flex;
  justify-content: center; 
  align-items: center;
  margin:auto;
}

table {
  border-collapse: collapse;
  align: center;
  text-align: center;
}

table, tr, th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
}

</style>



## SQL分类：

### Table

<div class="to-center">
  <table>
    <tr>
      <th>分类</th>
      <th>全称</th>
      <th>说明</th>
    </tr>
    <tr>
      <td>DDL</td>
      <td>Data Definition Language</td>
      <td>数据定义语言，用来定义数据库中的对象（数据库、表、字段）</td>
    </tr>
    <tr>
      <td>DML</td>
      <td>Data Manipulation Language</td>
      <td>数据操作语言，用来对数据库表中的数据进行增删改</td>
    </tr>
    <tr>
      <td>DQL</td>
      <td>Data Query Language</td>
      <td>数据查询语言，用来查询数据库中表的记录</td>
    </tr>
    <tr>
      <td>DCL</td>
      <td>Data Control Language</td>
      <td>数据控制语言，用来创建数据库用户、控制数据库的访问权限</td>
    </tr>
  </table>
</div>

## SQL语法：

### DDL

##### 数据库

- 查询
```
show databases;		--显示所有库
select database;	--当前数据库
```

- 创建

```
create database ithema default charset utf8mb4 if not exists;
```


- 删除

```
drop database if exists test
```


- 使用
```
use database
```


##### 查询创建

- 查询所有表
```
show tables
```


- 查询表结构
```
desc table_name
```


- 查询指定表的建表语句

```
show create table table_name
```


- 创建表

```
create table test_user( 
id int comment '编号', 
name varchar(50) comment '姓名', 
age tinyint unsigned comment 'age',
gender varchar(1) comment 'sex' ,
entrydate date comment '入职时间'
)comment 'user_table';
```


##### 表操作-修改

- 添加字段

```

alter table table_name add nick_name varchar(20) comment '昵称';
```


- 修改字段

```

alter table table_name modify nick_name varchar(21);
```


- 修改字段名和字段类型

```

alter table table_name change nick_name nickname varchar(20) ;
```


- 删除字段

```

alter table table_name drop nickname;
```


- 修改表名

```

alter table old_table_name rename to new_table_name;
```


##### 表操作-删除<a id="表操作-删除"></a>

- 删除表

```
drop table if exists table_name;
```


- 删除并重新创建

```
truncate table table_name;
```


![](/imgs/image-20230422232140753.jpg)

![](/imgs/image-20230422232634397.jpg)

![](/imgs/image-20230422232846561.jpg)

### DML

##### 添加数据

- 给指定字段添加数据

```
insert into table_name (field1,field2,...) values(value1,value2,...);
```


- 给全部字段添加数据

```
insert into table_name values(value1,value2,...);
```


- 批量添加数据

```
insert into table_name (field1,field2,...) values(value1,value2,...),(value1,value2,....),...;
insert into table_name values(value1,value2,...),(value1,value2,..);
```


##### 修改数据

- 修改数据

```
update table_name set colum1 = value1,colum2 = value2,...[where confition];
```


##### 删除数据

- 删除数据

```
delete from table_name [where condition];
```




### DQL

##### 语法

```
select  	--基础查询 
from 			--条件查询
where   	--聚合查询
group by 	--分组查询
having 		
order by 	--排序查询
limit			--分页查询
```


##### 基本查询

- 查询多个字段

```
select field1,field2,... from table_name;
select * from table_name;
```


- 设置别名

```
select field1 [as new_name1],field2 [as new_name2],... from table_name;
```


- 去重复记录

```
select distinct field_list from table_name;
```


##### 条件查询

- 语法

```
select field_list from table_name where conditions_list;
```


- 条件
<div class="to-center">
  <table>
    <tr>
      <th>比较运算符</th>
      <th>功能</th>
    </tr>
    <tr>
      <td>&gt;</td>
      <td>大于</td>
    </tr>
    <tr>
      <td>&gt;=</td>
      <td>大于等于</td>
    </tr>
    <tr>
      <td>&lt;</td>
      <td>小于</td>
    </tr>
    <tr>
      <td>&lt;=</td>
      <td>小于等于</td>
    </tr>
    <tr>
      <td>=</td>
      <td>等于</td>
    </tr>
    <tr>
      <td>&lt;&gt; 或 !=</td>
      <td>不等于</td>
    </tr>
    <tr>
      <td>BETWEEN ... AND ...</td>
      <td>在某个范围之内（包括min、max）</td>
    </tr>
    <tr>
      <td>IN(...)</td>
      <td>在in之后的列表中的值，多选一</td>
    </tr>
    <tr>
      <td>LIKE</td>
      <td>模糊匹配(_匹配单个字符，%匹配任意个字符，可组合使用)</td>
    </tr>
    <tr>
      <td>IS NULL</td>
      <td>是NULL（IS NOT NULL）</td>
    </tr>
    <tr>
      <td>AND 或 &&</td>
      <td>且</td>
    </tr>
    <tr>
      <td>OR 或 ||</td>
      <td>或</td>
    </tr>
    <tr>
      <td>NOT 或 !</td>
      <td>非</td>
    </tr>
  </table>
</div>

##### 聚合函数

- 将一列数据作为一个整体进行纵向计算

- 常见的聚合函数 (所有的NULL不参与聚合函数查询)
<div class="to-center">
  <table>
    <tr>
      <th>函数</th>
      <th>功能</th>
    </tr>
    <tr>
      <td>count</td>
      <td>统计数量</td>
    </tr>
    <tr>
      <td>max</td>
      <td>最大值</td>
    </tr>
    <tr>
      <td>min</td>
      <td>最小值</td>
    </tr>
    <tr>
      <td>avg</td>
      <td>平均值</td>
    </tr>
    <tr>
      <td>sum</td>
      <td>求和</td>
    </tr>
  </table>
</div>

##### 分组查询

- 语法

```
select field_list from table_name [where condition] group by group_field_name [having condition]
```


- where 和 having 区别
  - 判断时机不同: where 是分组之前进行过滤，不满足where条件，不参与分组，而having 是分组之后进行过滤
  - 判断条件不同: where 不能对聚合函数进行判断，而having可以

- 执行顺序： where > 聚合函数 > having

- 分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义

##### 排序查询

- 语法

```
SELECT * FROM table_name ORDER BY age asc; --升序 可省略
SELECT * FROM table_name ORDER BY age DESC;    --降序
SELECT * FROM table_name ORDER BY age asc , entrydate ASC; --先按age 再按entrydate
```


##### 分页查询

- 语法

```
select * from table_name LIMIT begin , query_num_mark
```


- 不同的SQL有不同的此语法  

##### 执行顺序

```
select 						--4
from							--1
where 						--2
group by	having	--3
order by					--5
limit							--6
```




### DCL

##### 管理用户

- 查询用户

```
use ;
select * from user;
```


- 创建用户

```
create user 'user_name'@'host_name' IDENTIFIED BY 'password';
```


-  修改用户密码

```
alter user 'user_name'@'host_name' IDENTIFIED WITH _native_password BY 'password';
```


- 删除用户

``` 
drop user 'user_name'@'host_name';
```


##### 权限控制

<div class="to-center">
  <table>
    <tr>
      <th>-</th>
      <th>权限</th>
      <th>说明</th>
    </tr>
    <tr>
      <td rowspan="7">ALL, ALL PRIVILEGES</td>
      <td>所有权限</td>
      <td>包括查询、插入、修改、删除、修改表、删除数据库/表/视图、创建数据库/表等所有权限</td>
    </tr>
    <tr>
      <td>SELECT</td>
      <td>查询数据</td>
    </tr>
    <tr>
      <td>INSERT</td>
      <td>插入数据</td>
    </tr>
    <tr>
      <td>UPDATE</td>
      <td>修改数据</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>删除数据</td>
    </tr>
    <tr>
      <td>ALTER</td>
      <td>修改表</td>
    </tr>
    <tr>
      <td>DROP</td>
      <td>删除数据库/表/视图</td>
    </tr>
    <tr>
      <td>CREATE</td>
      <td>创建数据库/表</td>
    </tr>
  </table>
</div>

查询权限

```
show grants for 'user_name'@'host_name';
```


- 授予权限

```
grant 权限列表 ON database_name.table_name from 'user_name'@'host_name';
```


- 撤销权限

```
revoke 权限列表 ON database_name.table_name from 'user_name'@'host_name';
```






## 函数：

##### 字符串函数
<div class="to-center">
  <table>
    <tr>
      <th>函数</th>
      <th>功能</th>
    </tr>
    <tr>
      <td>CONCAT(S1,S2,...Sn)</td>
      <td>字符串拼接，将S1,S2,...Sn拼接成一个字符串</td>
    </tr>
    <tr>
      <td>LOWER(str)</td>
      <td>转小写</td>
    </tr>
    <tr>
      <td>UPPER(str)</td>
      <td>转大写</td>
    </tr>
    <tr>
      <td>LPAD(str,n,pad)</td>
      <td>左填充，用字符串pad对str左边进行填充，以达到n个字符长度</td>
    </tr>
    <tr>
      <td>RPAD(str,n,pad)</td>
      <td>右填充，用字符串pad对str右边进行填充，以达到n个字符长度</td>
    </tr>
    <tr>
      <td>TRIM(str)</td>
      <td>去掉字符串头尾的空格</td>
    </tr>
    <tr>
      <td>SUBSTRING(str,start,len)</td>
      <td>返回字符串str从start起len个长度字符串</td>
    </tr>
  </table>
</div>

#### 数值函数 
<div class="to-center">
  <table>
    <tr>
      <th>函数</th>
      <th>功能</th>
    </tr>
    <tr>
      <td>CEIL(x)</td>
      <td>向上取整</td>
    </tr>
    <tr>
      <td>FLOOR(x)</td>
      <td>向下取整</td>
    </tr>
    <tr>
      <td>MOD(x, y)</td>
      <td>返回x/y的模</td>
    </tr>
    <tr>
      <td>RAND()</td>
      <td>返回0～1内的随机数</td>
    </tr>
    <tr>
      <td>ROUND(x, y)</td>
      <td>求参数x的四舍五入值，保留y位小数</td>
    </tr>
  </table>
</div>


##### 日期函数

<div class="to-center">
  <table>
    <tr>
      <th>函数</th>
      <th>功能</th>
    </tr>
    <tr>
      <td>CURDATE()</td>
      <td>返回当前日期</td>
    </tr>
    <tr>
      <td>CURTIME()</td>
      <td>返回当前时间</td>
    </tr>
    <tr>
      <td>NOW()</td>
      <td>返回当前日期和时间</td>
    </tr>
    <tr>
      <td>YEAR(date)</td>
      <td>获取指定date的年份</td>
    </tr>
    <tr>
      <td>MONTH(date)</td>
      <td>获取指定date的月份</td>
    </tr>
    <tr>
      <td>DAY(date)</td>
      <td>获取指定date的日期</td>
    </tr>
    <tr>
      <td>DATE_ADD(date, INTERVAL expr type)</td>
      <td>返回一个日期/时间值加上一个时间间隔expr后的时间值</td>
    </tr>
    <tr>
      <td>DATEDIFF(date1, date2)</td>
      <td>返回起始时间date1和结束时间date2之间的天数</td>
    </tr>
  </table>
</div>

##### 流程控制函数

<div class="to-center">
  <table>
    <tr>
      <th>函数</th>
      <th>功能</th>
    </tr>
    <tr>
      <td>IF(value,t,f)</td>
      <td>如果value为true，返回t，否则返回f</td>
    </tr>
    <tr>
      <td>IFNULL(value1,value2)</td>
      <td>如果value1不为空，返回value1，否则value2</td>
    </tr>
    <tr>
      <td>CASE WHEN [val1] THEN [res1]...ELSE [default] END</td>
      <td>如果val1为true，返回res1,...，否则返回default</td>
    </tr>
    <tr>
      <td>CASE [expr] WHEN [val1] THEN [res1]...ELSE [default] END</td>
      <td>如果expr值等于val1，返回res1,...,否则返回default</td>
    </tr>
  </table>
</div>




## 约束 ：

##### 概念

- 约束是作用于表中字段上的规则，用于限制存储在表中的数据

##### 目的

- 保证数据库中数据的正确、有效性和完整性

##### 分类
<div class="to-center">
  <table>
      <tr>
        <th>约束</th>
        <th>描述</th>
        <th>关键字</th>
      </tr>
      <tr>
        <td>非空约束</td>
        <td>限制该字段的数据不能为null</td>
        <td>NOT NULL</td>
      </tr>
      <tr>
        <td>唯一约束</td>
        <td>保证该字段的所有数据都是唯一、不重复的</td>
        <td>UNIQUE</td>
      </tr>
      <tr>
        <td>主键约束</td>
        <td>主键是一行数据的唯一标识，要求非空且唯一</td>
        <td>PRIMARY KEY</td>
      </tr>
      <tr>
        <td>默认约束</td>
        <td>保存数据时，如果未指定该字段的值，则采用默认值</td>
        <td>DEFAULT</td>
      </tr>
      <tr>
        <td>检查约束</td>
        <td>保证字段值满足某一个条件</td>
        <td>CHECK</td>
      </tr>
      <tr>
        <td>外键约束</td>
        <td>用来让两张表之间建立连接，保证数据的一致性和完整性</td>
        <td>FOREIGN KEY</td>
      </tr>
  </table>
</div>

###### 一般约束

```
CREATE Table key_user (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID 主键',
  name VARCHAR(10) UNIQUE NOT NULL COMMENT '姓名 非空唯一',
  age INT check(
      age > 0
      and age < 120
  ) COMMENT '年龄 0-120',
  status char(1) DEFAULT '1' COMMENT '状态',
  gender CHAR(1) COMMENT '性别'
) COMMENT '用户表';

INSERT INTO
  key_user(name, age, status, gender)
VALUES
  ('Tom', 19, '1', 'm'),
  ('Jack', 22, '1', 'm'),
  ('Tomas', 21, '0', 'm');

INSERT INTO
  key_user (name, age, status, gender)
VALUES
  ('Mina', 22, '1', 'f'),
  ('Meys', 21, '1', 'f');
  
```


- [ ] 主键自增的正确性怎么保证？



###### 外键约束

- 用来建立两表之间的联系

- 语法

```
create table table_name (
    name varchar(10),
    ......
    [constraint] [foreign_key_name] foreign key (外键字段名) references 主表(主表列名)
);
```


```
--添加外键
alter table table_name add constraint foreign_key_name foreign key (外键字段名) references 主表(主表列名);
--删除外键
alter table table_name drop foreign key foreign_key_name;
```


- 删除、更新行为

<div class="to-center">
  <table>
    <tr>
      <th>行为</th>
      <th>说明</th>
    </tr>
    <tr>
      <td>NO ACTION</td>
      <td>当在父表中删除/更新对应的记录时，首先检查记录是否有对应的外键，有则不允许删除/更新（= restrict）</td>
    </tr>
    <tr>
      <td>RESTRICT</td>
      <td>当在父表中删除/更新对应的记录时，首先检查记录是否有对应的外键，有则不允许删除/更新（=no action）</td>
    </tr>
    <tr>
      <td>CASCADE</td>
      <td>当在父表中删除/更新对应的记录时，首先检查记录是否有对应的外键，有则也删除/更新外键在子表中的记录</td>
    </tr>
    <tr>
      <td>SET NULL</td>
      <td>当在父表中删除对应的记录时，首先检查记录是否有对应的外键，有则设置子表中的外键为null</td>
    </tr>
    <tr>
      <td>SET DEFAULT</td>
      <td>父表中有变更时，子表将外键列设置成一个默认值</td>
    </tr>
  </table>
</div>

```
alter table table_name add constraint 
```


## 多表查询：

##### 多表关系

- 一对多（多对一）
- 部门和员工
- 多对多
- 学生和课程（中间表 $n\times m$）
- 一对一
- 多用于单表的拆分（提升操作效率）


##### 多表查询概述

- 从多张表中查询数据
- 笛卡尔积
- 数学中两个集合的组合总数
- 分类
- 连接查询
  - 内连接：相当于查询集合A、B的交集部分数据
  - 外连接：
    - 左外连接：查询左表所有数据，以及两表交集部分
    - 右外连接：查询右表所有数据，以及两表交集部分
  - 自连接：当前表与自身的连接查询，自连接必须使用表的别名
- 子查询

##### 内连接

- 隐式内连接

```
select 字段列表 from 表1，表2 where conditions;
```




- 显式内连接

```

select 字段列表 from 表1 [inner] join 表2  on 连接条件;
```




##### 外连接

- 左外连接

```
select 字段列表 from 表1 left [outer] join 表2 on conditions;
```




- 右外连接

```
select 字段列表 from 表1 right [outer] join 表2 on conditions;
```




##### 自连接

```
select colums from table_name join table_name  on conditions 
```





##### 子查询

- SQL语句中嵌套select语句，为嵌套查询（子查询）

- 结果分类

- ###### 标量子查询

  - 返回单值（数字、日期、字符串等等）
  - 常见操作符 =,<>,>,>=,<,<=

  

- ###### 列子查询

  - 返回的结果是一列（可以多行）

  - 操作符：`IN` `NOT IN` `ANY` `SOME` `ALL`



    

- ###### 行子查询

  - 返回结果是一行（可多列）
  - 常用操作符：= 、<> 、IN、NOT IN

- ###### 表子查询

  - 多行多列
  - 常用操作符：IN

- 位置分类
<div class="to-center">
  <table>
    <tr>
      <th>操作符</th>
      <th>描述</th>
    </tr>
    <tr>
      <td>IN</td>
      <td>在指定的集合范围之内，多选一</td>
    </tr>
    <tr>
      <td>NOT IN</td>
      <td>不在指定的集合范围内</td>
    </tr>
    <tr>
      <td>ANY</td>
      <td>子查询返回列表中，任意一个满足即可</td>
    </tr>
    <tr>
      <td>SOME</td>
      <td>与`ANY` 等同，使用`SOME` 的地方都可以使用`ANY`</td>
    </tr>
    <tr>
      <td>ALL</td>
      <td>子查询返回列表所有值必须满足</td>
    </tr>
  </table>
</div>

- where 、from 、select之后



## 事务：

简介：事务 是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或者撤销操作请求，同时成功同时失败

##### 事务操作

- 查看/设置事务提交方式

```
select @@autocommit;
set @@autocommit = 0;
```




- 提交事务

- `commit`

- 回滚事务

- `rollback`

##### 事务的四大特性

- 原子性(Atomicity)
- 事务是不可分割的最小操作单元
- 一致性(Consistency)
- 事务完成时，数据要保持一致
- 隔离性(Isolation)
- 并发事务不会相互干扰
- 持久性(Durability)
- 事务一旦提交或回滚，对数据库中的数据的改变就是永久的

##### 并发事务的问题

<div class="to-center">
 <table>
    <tr>
      <th>问题</th>
      <th>描述</th>
    </tr>
    <tr>
      <td>脏读</td>
      <td>一个事务读到另外一个事务还没有提交的数据</td>
    </tr>
    <tr>
      <td>不可重复读</td>
      <td>一个事务先后读取同一记录，但是两次读取的数据不同</td>
    </tr>
    <tr>
      <td>幻读</td>
      <td>一个事务按照条件查询数据时，没有对应的数据行，但是在插入时，但发现这行数据已经存在了</td>
    </tr>
  </table>
</div>
##### 事务的隔离级别

<div class="to-center">
  <table>
    <tr>
      <th>隔离级别</th>
      <th>脏读</th>
      <th>不可重复读</th>
      <th>幻读</th>
    </tr>
    <tr>
      <td>read uncommitted</td>
      <td>y</td>
      <td>y</td>
      <td>y</td>
    </tr>
    <tr>
      <td>read committed</td>
      <td>n</td>
      <td>y</td>
      <td>y</td>
    </tr>
    <tr>
      <td>repeatable read</td>
      <td>n</td>
      <td>n</td>
      <td>y</td>
    </tr>
    <tr>
      <td>serializable</td>
      <td>n</td>
      <td>n</td>
      <td>n</td>
    </tr>
  </table>
</div>
- 查看事务隔离级别：

```
select @@transaction_isolation; 
```


- 设置事务隔离级别：

```
set [session global] transaction isolation level {read uncommitted | read committed | repeatable read | serializable }
```