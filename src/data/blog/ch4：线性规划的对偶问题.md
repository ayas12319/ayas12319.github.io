---
tags:
  - 优化理论与算法
title: LP问题的对偶以及对偶问题的转化
author: 薛彬
description: 对偶问题的介绍
---

# 对偶问题的理解
**对偶问题：**
即是一对实质相同，但是是从不同角度提出的问题。

**例如生产问题与收购问题：**
已知有生产问题：
![532](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-03-29_14-54-35.png)
现有一个公司想要将这个公司的资源收买过来，至少需要付出多大的代价，才能使得这个公司愿意放弃生产活动，出让自己的资源。
显然，其愿意出让资源的条件是：**出让代价不低于用同等数量资源由自己组织生产活动时获取的赢利。**

设$y_{1}, y_{2}，y_{3}$分别代表物料1,2,3的单位出让代价。
则需要有：
$$
\begin{aligned}
5y_{1} + 4y_{2} + 35y_{3} &\ge 13\\
15y_{1} + 4y_{2} + 20y_{3} &\ge 23
\end{aligned}
$$
同时目标函数为：
$$
minimize \quad 480y_{1} + 160y_{2} +1190y_{3}
$$
两个对称形式的线性规划问题的原问题和对偶问题可以分别表示为：
原问题：
$$
\begin{aligned}
max \quad z &= CX\\
s.t. \quad AX &<= b\\
X &>= 0
\end{aligned}
$$
对偶问题：
$$
\begin{aligned}
min \quad w &= Y^{T}b\\
s.t. \quad A^{T}Y &>= C^{T}\\
Y &>= 0
\end{aligned}
$$

其中：
A ——约束系数矩阵；
b ——约束条件的右端项向量；
C —— 目标函数中的价格系数向量；
y记作对于左侧问题的**对偶变量**，其最优解称作**影子价格**

# 原问题到对偶问题的转化(以最大化为例)
原问题：
$$
\begin{aligned}
max \quad c^{T}x\\
s.t. \quad Ax &<= b\\
x &>= 0
\end{aligned}
$$
## 从探索原问题最优值的上界和下界出发。
通过可行解，探索最优值的下界。即任何可行解，都是最优值的一个下界。

又对偶问题即是要求原问题中的约束条件的线性组合 <= 右端项* 该线性组合，即：$y^{T}Ax <= y^{T}b$
目标是得到目标函数的上界:
$c^{T}x <= y^{T}Ax <= y^{T}b$
此时，$y^{T}b$是目标函数的一个上界。要求$c^{T}x <= y^{T}Ax$成立，即存在约束条件$A^{T}y \ge c$.

**等式约束：**
对于原问题中的约束条件中存在的等式，为了保持$y^{T}Ax <= y^{T}b$中的小于等于关系：
- 对于大于等于的不等式要求对应$y_{i} <= 0$；
- 对于小于等于的不等式要求对应$y_{i} >= 0$;
- 对于等式对应的$y_{i}$不做约束要求。

## 交换min与max理解
标准线性规划方程：
$$
\begin{aligned}
min \quad c^{T}x \\
s.t. \quad Ax &= b\\
x &>= 0
\end{aligned}
$$
等价表示为：
$$
\begin{aligned}
min_{x} \quad c^{T}x + max_{y}y^{T}(b-Ax)\\
s.t. \quad x >= 0
\end{aligned}
$$
其中$max_{y}$保证了，若$b \ne AX$，则其必定能够取到正无穷。

交换min与max顺序后得到：
$$
\begin{aligned}
max_{y} \quad b^{T}y + min_{x\ge 0}x^{T}(c - A^{T}y)
\end{aligned}
$$
其中$min_{x \ge 0}$要求$c - A^{T}y >=0$恒成立。
即得到对偶问题：
$$
\begin{aligned}
max \quad b^{T}y\\
s.t. \quad A^{T}y <= c
\end{aligned}
$$
**总结：原问题转换为对偶问题时变量和约束的转换技巧：**
![](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-04-01_22-16-01.png)

# 对偶定理
已知原问题：
$$
\begin{aligned}
min \quad c^{T}x\\
s.t. \quad Ax = b, x \ge 0
\end{aligned}
$$
对偶问题：
$$
\begin{aligned}
max \quad b^{T}y \\
s.t. \quad A^{T}y <= c
\end{aligned}
$$

- **弱对偶定理：**
若x是原问题可行解，y是对偶问题可行解，则：
$$
b^{T}y <= c^{T}x
$$
**解释：**
若原问题是最小问题，对偶问题是最大问题。
- 任意对偶问题可行解都会给出原始问题最优解的下界
- 任意原问题可行解都会给出对偶问题最优解的上界
- 原始问题的最优值大于等于对偶问题的最优值

**证明：**
$$
b^{T}y= (Ax)^{T}y = x^{T}(A^{T}y) <= c^{T}x
$$
其中$c^{T}x - b^{T}y$称为对偶间隙

- **推论：**
若$c^{T}x = b^{T}y$,则x和y分别为原始问题和对偶问题的最优解。

- **强对偶定理：**
线性规划的原问题有最优解，则其对偶问题也有最优解，且两个最优值相等。

**证明：**
若原问题的最优解为$x^{*}$，与最优基B有关，B服从$x_{B} = A_{B}^{-1}b$.
又由于单纯形法完成，检验数非负：
$$
c^{T} - c_{B}^{T}A_{B}^{-1}A \ge 0
$$
定义y = $c_{B}^{T}A_{B}^{-1}$，又因为$A^{T}y <= c$，所以得到y为对偶问题可行解。同时：
$$
b^{T}y = c_{B}^{T}A_{B}^{-1}b = c_{B}^{T}x_{B} = c^{T}x^{*}
$$

# 互补松弛条件
已知原问题：
$$
\begin{aligned}
min \quad c^{T}x \\
s.t. \quad Ax = b, x \ge 0
\end{aligned}
$$
对偶问题：
$$
\begin{aligned}
max \quad b^{T}y \\
s.t. \quad A^{T}y <= c
\end{aligned}
$$
设x与y分别是问题的最优解，根据强对偶定理得到：$c^{T}x = y^{T}b$；
又根据弱对偶定理的不等式得到：
$$
y^{T}b = y^{T}(Ax) = (y^{T}A)x <= c^{T}x
$$
在最优解情况下，不等式全部取等。
故$y^{T}b = y^{T}(Ax)$与$(y^{T}A)x = c^{T}x$成立。
故存在方程组：
$$
\begin{aligned}
y^{T}(Ax - b) &= 0\\
(y^{T}A - c^{T})x &= 0
\end{aligned}
$$
称这两个等式为**互补松弛条件**。

**定理：**
设x与y分别为原问题和对偶问题的可行解，则x和y为最优解的充要条件是：
$$
(y^{T}A - c^{T})x = 0
$$

**快速判断原问题的解是否为最优：**
- 验证解x是否为满足原问题的可行解
- 若满足，则列出对偶可行性与互补松弛约束
- 求解出y，若y是对偶问题可行解，则解x是原问题的最优解。

## 一般互补松弛条件
例如对于问题：
![](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-04-08_18-58-15.png)
**定理：**
若x和y为原问题和对偶问题的可行解。则x和y为最优解的充要条件是：
$$
\begin{aligned}
y_{i}*(a_{i}^{T}x - b_{i}) = 0\\
x_{j}*(A_{j}^{T}y - c_{j}) = 0
\end{aligned}
$$

# 锥相关理论
**凸集合定义：**
一个集合S$\in R^{n}$若为凸集合，当且仅当对于任意的x, y $\in S$, 及任意$\lambda \in [0, 1]$，满足$\lambda x + (1 - \lambda)y \in S$.

**凸函数定义：**
一个函数f: $R^{n} \rightarrow R$是凸函数如果满足：对于任意$x, y \in R^{n}$和任意的$\lambda \in[0, 1]$，成立：
$$
f(\lambda x + (1 - \lambda)y) <= \lambda f(x) + (1 - \lambda)f(y)
$$

**多面体定义：**
一个集合若是多面体，则其可以表示为如下形式：$\{x \in R^{n} | Ax \ge b\}$

## 多面体锥
**锥和凸锥定义：**
若一个集合C $\in R^{n}$被称为锥，则满足对于任意$x \in C$和$\lambda \ge 0$，有$\lambda x \in C$成立。

**凸锥定义：**
若一个集合$C \in R^{n}$被称为凸锥，则满足对于任意的$x_{1}, x_{2} \in C$和$\theta_{1}, \theta_{2} \ge 0$, 有$\theta_{1}x_{1} + \theta_{2}x_{2} \in C$成立。

**多面体锥定义：**
若一个集合是多面体锥，则可以被表述为：$C = \{x \in R^{n} | Ax \ge 0\}, A \in R^{m*n}$

**锥包定义：**
给定一个集合S $\in R^{n}$，S的锥包是指包含S的最小凸锥，记作cone(S)。定义为：
$$
cone(S) = \{\sum\limits_{i=1}^{n}\lambda_{i}x_{i} | x_{i} \in S, \lambda_{i} \ge 0\}
$$

# Farka's Lemma
**定理：Farka's Lemma:**
A$\in R^{m * n}, b \in R^{m}$，则下列说法有且只有一个成立：
- 存在x $\ge 0$使得Ax = b成立。
- 存在y使得$A^{T}y <= 0$和$b^{T}y > 0$成立

**几何直观理解:**
矩阵A实际就是n个m维的向量，根据凸包的定义可以得到Ax实际上就是一个凸锥。
那么对于向量b$\in R^{m}$只可能存在两种情况：在凸锥中or不在凸锥中。
- 若在凸锥中，即必然存在b = $\sum\limits_{i=1}^{n}a_{i}x_{i} = Ax$;
- 若不在凸锥中，则根据超平面分离定理，必然存在一个过原点的超平面y$\in R^{m}$隔开两者。
![508](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-04-08_20-11-04.png)
**Farka's Lemma变体：**
A$\in R^{m * n}, b \in R^{m}$，则当且仅当系统$\{Ax = 0, x \ge 0, c^{T}x < 0\}$没有可行解时，系统$\{y: A^{T}y <= c\}$存在可行解y

**证明：**
考虑一对对偶问题：
原问题：
$$
\begin{aligned}
min \quad c^{T}x\\
s.t. \quad Ax = 0, x \ge 0
\end{aligned}
$$
对偶问题：
$$
\begin{aligned}
max \quad 0\\
s.t.\quad A^{T}y <= c
\end{aligned}
$$
若存在x满足$Ax = 0, x \ge 0, c^{T}x < 0$，则必然存在一个正数t，对于x进行任意放缩，故原问题一定无界，则对偶问题一定无解。

# 对偶单纯形法



# 灵敏度分析
## 局部灵敏度
对于标准型线性规划问题：
$$
\begin{aligned}
V &:= min \quad c^{T}x\\
s.t.\quad Ax &= b\\
x &\ge 0
\end{aligned}
$$
给定A和b，可将V看做c的函数：V(c)。
**定理：**
若原问题有唯一最优解$x^{*}$，则有：
$$
dV(c) = x^{*}
$$
**若$c_{i}$发生小幅变化$\Delta c_{i}$，则最优值变化约为$\Delta c_{i} x_{i}^{*}$;**

类比其对偶问题：
给定A和c，将V看做b的函数：V(b)
**定理：**
若对偶问题有唯一最优解$y^{*}$,则：
$$
dV(b) = y^{*}
$$
**若$b_{i}$发生小幅变化$\Delta b_{i}$，则最优值变化为$\Delta b_{i}y_{i}^{*}$**

**影子价格：**
若$y^{*}$是对偶问题最优解，同时
$$
dV(b) = y^{*}
$$
则称$y^{*}$为右端项b的影子价格。
在生产实例中，影子价格就表示：若增加一个单位该资源，最优收益会提高多少。

### 对于非紧约束的灵敏度分析
对于问题：
$$
\begin{aligned}
max \quad c^{T}x\\
s.t. \quad Ax &<= b\\
x &\ge 0
\end{aligned}
$$
若最优解为$x^{*}$，同时第i个约束满足：
$$
a_{i}^{T}x^{*} < b_{i}
$$
则改变$b_{i}$时：
- 根据互补松弛定理$y_{i}(a_{i}^{T}x^{*} - b_{i}) = 0$，得到对应的$y_{i}^{*} = 0$；
- 所以当$b_{i}$发生变化时，不影响对应的$y_{i}^{*}$的值，故也不影响$x_{i}^{*}$的值。

### 局部灵敏度的不足之处：
- 当最优基发生改变时，局部灵敏度结论一般不再成立
- 所谓“小幅度变化”的程度难以界定。

## 全局灵敏度
### 改变b
当右端项变为$b' = b + \Delta b$，为保持原最优基B，对应的新基解为：
$$
x_{B}'= A_{B}^{-1}(b +\Delta b) = x_{B}^{*} + A_{B}^{-1} \Delta b
$$
- 若新基解$x_{B}' \ge 0$， 则B仍为最优基。
- 新的最优解为($x_{B}', 0$)
- 新的最优值为：$V(b') = V^{*} + c_{B}^{T}A_{B}^{-1} \Delta b = V^{*} + (y^{*})^{T}\Delta b$

**什么程度的变化可视为“局部”变化：**
设$\Delta b = \lambda e_{i}$,$e_{i}$为第i个分量为1的单位向量，需要满足：
$$
x_{B}^{*} + \lambda A_{B}^{-1}e_{i} \ge 0
$$
只要不等式保持成立，则最优基保持不变，局部灵敏度分析依然适用。

### 改变c
若目标系数变为：$c' = c + \Delta c$
为保证原基本解仍为最优解，需要保证新的检验数满足：
$$
C_{N}^{T} - C_{B}^{T}A_{B}^{-1}A_{N} \ge 0
$$
令$\Delta c = \lambda e_{j}$
分两种情况讨论：
- j$\in B$：基变量对应的目标系数改变
- j$\in N$：非基变量对应的目标系数改变
**case1：$j \in B$**
新的检验数为：
$$
\begin{aligned}
c_{N}^{T} - c_{B}^{T}A_{B}^{-1}A_{N} &= c_{N}^{T} - (c_{B}^{T} +\lambda e_{j}^{T})A_{B}^{-1}A_{N} \\
&=r_{N}^{T} - \lambda e_{j}^{T}A_{B}^{-1}A_{N} \ge 0
\end{aligned}
$$
解其可行区间即为$\lambda$范围

**case2：j$\in N$**
新的检验数为：
$$
\begin{aligned}
c_{N}^{T} - c_{B}^{T}A_{B}^{-1}A_{N} &= c_{N}^{T} +\lambda e_{j}^{T}- c_{B}^{T} A_{B}^{-1}A_{N} \\
&=r_{N}^{T} + \lambda e_{j}^{T} \ge 0
\end{aligned}
$$

