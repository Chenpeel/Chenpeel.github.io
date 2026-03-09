---
title: Docker Server
date: 2024-06-25
category: CS
published: true
skills_cloud:
    - server
    - compose
    - daemon
at: true
description: ""
---

# Quick Deploy Server




### DNS Server

通过提供DNS服务器的容器镜像`sameersbn/bind`创建一个容器bind提供DNS服务

内部端口10000，外部端口5354（被占用另选），`root`密码`password`

```sh
docker run -d --name=bind --publish=10000:10000 --publish=5354:53/udp --volume=/tmp/dockerdata/data --env='ROOT_PASSWORD=password' sameersbn/bind:latest
```



通过浏览器访问 `https://localhost:10000`

<img src="/imgs/image-20240420162804662.png" alt="image-20240420162804662" style="zoom:50%;" />

输入root账户和`password`后进入管理页面

![image-20240420163124389](/imgs/image-20240420163124389.png)



点击DNS Server

![image-20240420163235982](/imgs/image-20240420163235982.png)



创建master zones

![image-20240420163345682](/imgs/image-20240420163345682.png)

![image-20240420163506527](/imgs/image-20240420163506527.png)



其中IP：`172.17.0.2`

是通过`docker inspect  bind | grep IPAddress`确认

创建完成



通过docker运行一个centos容器，作为测试dns server

```sh
docker run --dns 172.17.0.2 --name dnstest -it centos /bin/bash
```



![image-20240420164208046](/imgs/image-20240420164208046.png)



### FTP Server





























