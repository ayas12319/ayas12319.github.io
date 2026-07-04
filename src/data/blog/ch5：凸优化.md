---
tags:
  - 优化理论与算法
title: 凸优化
author: 薛彬
description: 凸函数，凸集与凸问题
pubDatetime: 2026-07-04
---

# 凸集
## 内部，闭包，边界
**定义：**
设X是$R^{n}$中的一个非空集合
- 一个点$x_{0}$被称为内部点，若存在r > 0，使得：
$$
    B(x_{0}, r) = \{x : ||x - x_{0}||_{2} <= r\} \in X 
$$
- 一个点$x_{0}$称为极限点，若存在$\{x_{n}\} \in X$,使得$x_{n} \rightarrow x_{0}$当$n \rightarrow \infty$

**定义：**
- 内部：int(X) = 所有内部点的集合
- 闭包：cl(X) = 所有极限点的集合
- 边界：$(X)$ = cl(X) - int(X)
NOTE:
对于X = \[0, 1\]中的无理数，集合中的每一个点都是该集合的边界。

## 开集与闭集
**定义：**
- X是开集，当且仅当int(X) = X
- X是闭集，当且仅当cl(X) = X

**性质**：
- int(X) $\in$ X $\in$ cl(X)
- X是闭集当且仅当X的补集是开集——例如可以用来判断{3}是闭集
- 任意多个闭集的交集是闭集
- 有限个闭集的并集是闭集——例如对于\[1 + $\frac{1}{n}$, 3\] n从1到无穷。

## 凸集
**凸集定义:**
一个集合中任意两点之间的线段也包含在该集合中。
即:
$$
对于所有的x_{1},x_{2} \in C, \quad 0 <= \theta  <= 1, \rightarrow \quad \theta x_{1} + (1 - \theta)x_{2} \in C
$$

凸集合的性质保证了沿着线性方向梯度下降时，线性搜索的成立型。
![397](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-04-09_10-36-49.png)

## 常见的凸集合
- 超平面：$\{x \in R^{n} | a^{T}x = b\}, (a \in R^{n}, b \in R)$
- 半空间：$\{x \in R^{n} | a^{T}x <= b\}, (a \in R^{n}, b \in R)$
- 仿射空间：$\{x \in R^{n} | Ax = b\}, (A \in R^{mn}, b\in R^{m})$
- 多面体：$\{x \in R^{n} | Ax <= b\}, (A \in R^{mn}, b\in R^{m})$

### 欧几里得球与椭球体
- 欧几里得球：
    中心为$x_{c}$， 半径为r：
    $B(x_{c}, r) = {x \in R^{n}: ||x - x_{c}||_{2} <= r}$
- 椭球体：
    $\{x \in R^{n}: (x - x_{c})^{T}P^{-1}(x - x_{c}) <= 1\}$, 其中$P \in S_{+}^{n}$
    也可以表示为$\{x_{c}+ Au: ||u||_{2} \le 1\}$，其中A是方阵，且非奇异满足$P = AA^{T}$

### 范数球与范数锥
**范数：**
一个函数$||'||$满足：
- $||x|| \ge 0$, $||x|| = 0$当且仅当x = 0
- $||tx|| = |t| * ||x||$ 对所有t$\in R$成立
- $||x + y|| <= ||x|| + ||y||$

**范数球：**
中心为$x_{c}$, 半径为r：满足$\{x \in R^{n} : ||x - x_{c}|| <= r\}$

**范数锥：**
$\{(x, t) : ||x|| <= t\}$

# 凸组合与凸包
## 四种凸组合
定义：
给定任意元素$x_{1}, x_{2},...,x_{n}$，组合
$$
\theta_{1}x_{1} + \theta_{2}x_{2} + ... + \theta_{n}x_{n}
$$
被称为：
- 凸组合：若$\theta_{i} \ge 0$, 同时$\sum\limits_{i=1}^{n}\theta_{i} = 1$
- 锥组合：若$\theta_{i} \ge 0$
- 仿射组合：若$\sum\limits_{i=1}^{n}\theta_{i} = 1$
- 线性组合：若$\theta_{i} \in R$

在此基础上对于所在集合空间定义有：
- 凸包：给定集合中所有点的凸组合构成的集合
- 凸锥：给定集合中所有点的锥组合构成的集合
- 仿射子空间：给定集合中所有点的仿射组合构成的集合
- 线性子空间：给定集合中所有点的线性组合构成的集合
有结论：
线性子空间一定是凸锥；凸锥一定是凸集

## 凸包
- 凸包Conv(X)是包含集合X的最小凸集
- 若X是凸集，则Conv(X) = X

## 保持凸性的运算
- 交集
- 和
- 平移
- 缩放
- 笛卡尔积
- 坐标投影
$$
\{x_{1} | (x_{1},x_{2}) \in C \,for \,some\,x_{2}\}
$$
- 像集（线性变换）

## 分离与支撑超平面定理
### 分离超平面定理
若C和D是非空不相交的凸集，则存在$a \neq 0, b$使得：
$$
a^{T}x \le b, \text{对所有} x \in C, \quad a^{T}x \ge b, \text{对所有}x \in D
$$
即超平面$\{x | a^{T}x = b\}$将集合C和D分离。

### 支撑超平面定理
**支撑超平面：**
对于集合C在边界点$x_{0}$的支撑超平面为：
$$
\{x | a^{T}x = a^{T}x_{0}\} \quad \text{其中} a \neq 0, a^{T}x \le a^{T}x_{0}, for \,all \,x \in C
$$
![400*400|474](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-05-17_11-38-18.png)

**支撑超平面定理：**
若C为凸集，则在C的每一个边界点上都存在一个支撑超平面。
# 凸函数
**定义：**
函数f是凸函数当且仅当：
1，f的定义域是一个凸集
2，对于任意$x_{1}, x_{2} \in dom(f)$且$\theta \in [0, 1]$，有：
$$
f(\theta x_{1} + (1 - \theta)x_{2}) <= \theta f(x_{1} )+ (1 - \theta)f(x_{2})
$$

- **若-f是凸函数，则f是凹函数**
- **仿射函数即是凹函数又是凸函数**
- **其中若$\le$中的等于不成立，则为严格凸函数。**

## 凸函数的验证方法：
- **一阶条件：**
1，f的定义域是凸集。
2，同时满足：
$$
f(x) + df(x)^{T}(y-x) \le f(y)
$$
即：**任意一点的一阶导数近似是f的一个全局下界。**

- **二阶条件**
若函数f是二阶可微的，则满足：
1，**dom(f)是开集**
2，**且Hessian矩阵在每个x$\in dom(f)$上存在。**
**NOTE:**
Hessian矩阵定义为：
$$
\frac{\partial^{2} f(x)}{\partial x_{i}\partial x_{j}}
$$
对于所有的$i, j = 1,....,n$

对于定义域为凸集的二阶可微函数f，有：
1，f是凸函数，**当且仅当对应的Hessian矩阵为半正定矩阵**
2，若Hessian矩阵严格大于0，则f是严格凸函数

-  **划归为标量函数**
**将凸函数限制在一条直线上的方法**：
若$f: R^{n} \rightarrow R$是凸函数，当且仅当domf是凸集，且如下定义的函数g:$R \rightarrow R$是凸函数：
$$
g(t) = f(x + tv), \quad dom g = \{t | x +tv \in dom f\}
$$
其中：$x \in dom \, f, v \in R^{n}$，g(t)是t上的凸函数。

**通过一元函数的凸性验证多变量函数的凸性**
例子：
$$
\begin{aligned}
f: S^{n}\rightarrow R\, ,f(X) &= -ln\, detX\, ,dom\, f = S_{++}^{n} \\
g(t) &= -ln\, det(X+tV)\\
&= -ln\, detX - ln\, det(I + tx^{- \frac{1}{2}}vx^{-\frac{1}{2}})\\
&= -ln \, detX - \sum\limits_{i=1}^{n}ln(1 + t\lambda_{i})
\end{aligned}
$$
其中$\lambda_{i}$是$X^{- \frac{1}{2}}VX^{\frac{1}{2}}$的特征值。由于$g(t)$是凸函数——求得其二阶导数，每一项均为非负数。因此f是凸函数

- **上图法：**
**上图集与上水平集的区别**
**$\alpha$-下水平集**对于函数f:$R^{n} \rightarrow R$定义为：
$$
C_{\alpha} = \{x \in dom f |f(x) <= \alpha\}
$$
凸函数的下水平集是凸集(**反过来不成立**)

**$\alpha$-上图集：**
对于函数$f: R^{n} \rightarrow R$定义为：
$$
f = \{(x, t) \in R^{n+1} | x \in dom f, \quad f(x) <= t\}
$$
当且仅当函数f是凸集时，该函数是凸的。

## 保持凸性的运算
- **逐点最大值：**
若$f_{1}, f_{2},...,f_{m}$是凸函数，则逐点最大值函数$f(x)$为凸函数：
$$
f(x) = max\{f_{1}(x), f_{2}(x),...f_{m}(x)\}
$$

- **逐点上确界：**
设$f(x, y)$对于每个$y \in A$是关于x的凸函数，则定义
$$
g(x) = sup_{y \in A}f(x, y)
$$
是凸函数

- **与标量函数的复合：**
设$g: R^{n}\rightarrow R, h: R \rightarrow R$，定义复合函数有：
$$
f(x) = h(g(x))
$$
f是凸函数，当满足以下条件之一：
- g是凸函数，h是非减且凸函数
- g是凹函数，h是非增且凸函数

- **与向量函数的复合：**
设g$: R^{n} \rightarrow R^{k}$, $h: R^{k} \rightarrow R$，定义复合函数：
$$
f(x) = h(g(x)) = h(g_{1}(x), g_{2}(x), ... ,g_{k}(x))
$$
f是凸函数，当满足以下条件之一：
- $g_{i}$是凸函数，h在每个变量上都是凸且非减的
- $g_{i}$是凹函数，h在每个变量上都是凸且非增的

- **拟凸性：**
**定义1：**
函数f: $R^{n} \rightarrow R$是拟凸函数，当且仅当domf是凸集，且如下的下水平集：
$$
S_{\alpha} = \{x \in domf: f(x) \le \alpha\}
$$
对所有的$\alpha$都是凸集。
![398](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-04-14_15-50-30.png)

**定义2：**
当domf是凸的，且对于任意的x,y$\in domf$与$\theta \in [0, 1]$，有：
$$
f(\theta x + (1 - \theta)y) <= max\{f(x), f(y)\}
$$
**直观几何形状：**
沿着任意两点的线段，函数值不会超过两端两端的最大值

- **共轭函数**
函数f的共轭函数定义为：
$$
f^{*}(y) = sup_{x \in dom\,f}(y^{T}x - f(x))
$$
**几何意义：**
可以将y视作一条直线的斜率。
$y^{T}x - f(x)$表示这条斜率为y的直线与函数f的最“远离函数”的截距。
即$f^{*}(y)$为在方向y上，函数f的最紧线性支撑。
![300*350](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-05-17_13-54-20.png)

**性质：**
1，无论f是否为凸，$f^{*}$是凸函数
2，Fenchel不等式：
$$
f(x) + f^{*}(y) \ge y^{T}x
$$
3,若f是凸函数且其上图集是闭集，则：
$$
f^{**} = f
$$

# 凸问题
**凸优化问题的标准形式：**
$$
\begin{aligned}
min \quad f_{0}(x) \\
s.t. \quad f_{i}(x) <= 0, \quad i = 1,...,m\\
h_{i}(x) = 0, \quad i = 1,...,p
\end{aligned}
$$
其中$f_{0},f_{1},f_{2},...,f_{m}$为凸函数，等式约束为仿射的。

**最优解与局部最优解：**
若x$\in dom f$，且满足约束，则x为可行解。
若可行解x满足$f_{0}(x) = p^{*}$，则x为最优解，最优解集合记作$X_{opt}$
若存在R > 0，使得x在以下问题中为最优解，则称其为局部最优解：
$$
\begin{aligned}
min_{z} \quad f_{0}(z)\\
s.t. \quad f_{i}(z) <= 0 \\
h_{i}(z) = 0 \\
||z - x||_{2} <= R
\end{aligned}
$$

**可行性问题：**
可行性问题是目标函数为常数$f_{0}(x) = 0$的特例形式：
$$
\begin{aligned}
min \quad 0 \\
s.t. \quad f_{i}(x) <= 0 \\
h_{i}(x) = 0
\end{aligned}
$$

**局部最优与全局最优：**
**结论：**
任意凸优化问题的局部最优点也是全局最优点。

**证明：**
证明x为局部最优点，但存在y使得$f_{0}(y) < f_{0}(x)$.
局部最优表示，存在R > 0，使得
$$
z可行，||z - x||_{2} <= R ,\rightarrow f_{0}(z) \ge f_{0}(x)
$$
令z = $\theta y + (1-\theta x)$，同时设$\theta = \frac{R}{2(||y-x||_{2})}$。由于$||y - x||_{2} > R$,所以有$\theta \in [0, 1\2]$.
由目标函数的凸性可知：$f_{0}(z) <= \theta f_{0}(y) + (1 - \theta)f_{0}(x) < f_{0}(x)$
与x为局部最优点的定义相矛盾，故原假设不成立。

## 可微函数的最优性判断
若目标函数$f_{0}$可微，点x是最优的当且仅当：
- x是可行解
- 对所有的可行点y，有:
$$
\partial f_{0}(x)^{T}(y-x) \ge 0
$$

### 常见结构下的最优性条件：
**1,无约束问题：**
$$
min \quad f_{0}(x)
$$
最优的充要条件：
$$
\partial f_{0}(x) = 0
$$
**2,等式约束问题：**
$$
\begin{aligned}
min \quad f_{0}(x) \\
s.t. \quad Ax = b
\end{aligned}
$$
最优性充要条件：
存在v使得
$$
x \in dom\, f_{0}, \quad Ax = b, \quad \partial f_{0}(x) + A^{T}v = 0
$$

**3,非负正交域上的最优化：**
$$
\begin{aligned}
min \quad f_{0}(x) 
s.t. \quad x \ge 0
\end{aligned}
$$
最优性充要条件为：
$$
x \in dom \,f_{0}, \quad x \ge 0, \quad \left\{\begin{matrix}
  \partial f_{0}(x)_{i} \ge 0& x_{i} = 0\\
  \partial f_{0}(x)_{i} = 0&x_{i} > 0
\end{matrix}\right.
$$
## 等价凸优化问题
若两个问题的解可以相互转化，则称其为等价。
### 消除等式约束
**目标：消除等式约束$Ax = b$，保持凸性不变**
原问题：
$$
\begin{aligned}
min\quad f_{0}(x) \\
s.t. \quad f_{i}(x) \le 0\\
Ax = b
\end{aligned}
$$
等价于问题：
$$
\begin{aligned}
min \quad f_{0}(Fz + x_{0})\\
s.t. \quad f_{i}(Fz + x_{0}) \LE 0
\end{aligned}
$$
其中F和$x_{0}$满足：$Ax = b \rightarrow x = Fz + x_{0}$

### 引入等式
原问题：
$$
\begin{aligned}
min\quad f_{0}(A_{0}x + b_{0})\\
s.t. \quad f_{i}(A_{i}x + b_{i}) \le 0
\end{aligned}
$$
等价于引入变量$y_{i} = A_{i}x + b_{i}$:
$$
\begin{aligned}
min \quad f_{0}(y_{0})\\
s.t. \quad f_{i}(y_{i}) \le 0\\
y_{i} = A_{i}x+b_{i}
\end{aligned}
$$
### 引入松弛变量
原问题：
$$
\begin{aligned}
min \quad f_{0}(x)\\
s.t. \quad a_{i}^{T}x \le b_{i}
\end{aligned}
$$
等价于：
$$
\begin{aligned}
min \quad f_{0}(x) \\
s.t. \quad a_{i}^{T}x + s_{i} = b_{i} \\
s_{i} \ge 0
\end{aligned}
$$
### 改写为上图形式
凸问题标准形式：
$$
\begin{aligned}
min \quad f_{0}(x) \\
s.t. \quad f_{i}(x) \le 0\\
Ax = b
\end{aligned}
$$
等价于引入变量t：
$$
\begin{aligned}
min \quad t \\
s.t. \quad f_{0}(x) - t \le 0\\
f_{i}(x) \le 0 \\
Ax = b
\end{aligned}
$$

### 对部分变量先进行最小化
原问题：
$$
\begin{aligned}
min \quad f_{0}(x_{1},x_{2})\\
s.t. \quad f_{i}(x_{1}) \le 0 
\end{aligned}
$$
等价于令$\hat{f_{0}}(x_{1}) = min_{x_{2}}f_{0}(x_{1},x_{2})$
$$
min_{x_{1}} \quad \hat{f_{0}}(x_{1})\quad s.t. \quad f_{i}(x_{1}) \le 0
$$


