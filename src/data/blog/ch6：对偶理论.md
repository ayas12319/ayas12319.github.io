---
tags:
  - 优化理论与算法
title: 对偶理论
author: 薛彬
description: 对偶理论与拉格朗日对偶
pubDatetime: 2026-07-04
---

**使用对偶理论的基本思想:**
将一个等价的对偶问题与给定的原始问题关联起来

# 拉格朗日函数
标准形式问题：
$$
\begin{aligned}
min \quad f_{0}(x)\\
s.t. \quad f_{i}(x) \le 0, \\
h_{i}(x) = 0
\end{aligned}
$$
定义域为D，最优值为$p^{*}$
对应的**拉格朗日函数**为：
$$
L(x, \lambda, v) = f_{0}(x) + \sum\limits_{i=1}^{m}\lambda_{i}f_{i}(x) + \sum\limits_{i=1}^{p}v_{i}h_{i}(x)
$$
$\lambda_{i}$即为不等式约束的拉格朗日乘子；$v_{i}$为对应等式约束的拉格朗日乘子

**拉格朗日对偶函数**
定义为：
$$
\begin{aligned}
g(\lambda, v) &= inf_{x \in D}L(x, \lambda, v)\\
&= inf_{x \in D}(f_{0}(x) +\sum\limits_{i=1}^{m}\lambda_{i}f_{i}(x) + \sum\limits_{i=1}^{p}v_{i}h_{i}(x) )
\end{aligned}
$$
- 函数g是凹函数——作为一系列函数的下界，自然为凹函数。
- 下界性质：若$\lambda \ge 0$，则$g(\lambda, v) \le p^{*}$，即$g(\lambda, v)$一定为原问题最优解的下界。
**下界性质的证明：**
由于$f_{0}(x) < 0$恒成立，若$\lambda \ge 0$，即有$\lambda f_{0}(x) < 0$。所以有：
$$
f_{0}(x) \ge L(x, \lambda, v) \ge g(\lambda, v)
$$

# 线性方程组的最小范数解
已知问题：
$$
\begin{aligned}
 min \quad x^{T}x \\
 s.t. \quad Ax = b
\end{aligned}
$$
**对偶函数：**
- 拉格朗日函数为：$L(x, v) = x^{T}x + v^{T}(Ax - b)$
- 令L最小化，导数为0：$\nabla_{x}L(x, v) = 2x + A^{T}v = 0$，即$x = -\frac{1}{2}A^{T}v$
- 将x代回L得到函数g：$g(v) = -\frac{1}{4}v^{T}AA^{T}v - b^{T}v$
- 得到的$g(v)$为v的一个凹函数
- g(v)为原方程最优解的下界性质不变

# 标准形式线性规划
$$
\begin{aligned}
min \quad c^{T}x\\
s.t. \quad Ax = b, \quad x \ge 0
\end{aligned}
$$
**对偶函数：**
- 拉格朗日函数为：
$$
\begin{aligned}
L(x, \lambda, v) &= c^{T}x + v^{T}(Ax-b) -\lambda^{T}x\\
&= -b^{T}v +(c+A^{T}v - \lambda)^{T}x
\end{aligned}
$$
- 求导后得到：
$$
g(\lambda, v) = inf_{x}L(x, \lambda, v) = \left\{\begin{matrix}
 -b^{T}v ,& A^{T}v - \lambda +c = 0\\
  -\infty, & otherwise
\end{matrix}\right.
$$
    $g(\lambda, v)$为线性函数，故为凹函数
- 下界性质：
$$
p^{*} \ge -b^{T}v \quad 若A^{T}v + c \ge 0
$$

# 二次规划
原始问题(假设$P \in S_{++}^{n}$)：
$$
\begin{aligned}
min \quad x^{T}Px\\
s.t. \quad Ax \ge b
\end{aligned}
$$
对偶函数：
$$
g(\lambda) = inf_{x}(x^{T}Px +\lambda^{T}(Ax - b)) = .....
$$
对偶问题：
$$
\begin{aligned}
max \quad g(\lambda)\\
s.t. \quad \lambda \ge 0
\end{aligned}
$$

# 弱对偶与强对偶
**弱对偶性质**：$d^{*} \le p^{*}$
- 无论原问题是否为凸均成立

**强对偶性质**：$d^{*} = p^{*}$
- 对于凸优化问题通常成立
- 保证强对偶成立的条件——**约束资格条件**

**对偶间隙**：$p^{*} - d^{*}$

# 几何意义
原始问题：
$$
\begin{aligned}
min \quad f(x)\\
s.t. \quad f_{1}(x) \le 0, \quad x \in D
\end{aligned}
$$
几何框架：
定义集合V如下：
$$
V = \{(u, w) | \exists x \in X使得f_{1}(x) \le u, \quad f(x) \le w\}
$$

几何下的原始问题：
**确定集合V与w轴的最小截距**。最小截距值即为$p^{*}$

对偶函数为：
$$
q(\lambda) = inf_{x \in D}\{f(x) + \lambda f_{1}(x)\} = inf_{(u,w)\in V}\{w +\lambda u\}, \lambda \ge 0
$$
对偶问题为：
$$
\begin{aligned}
max \quad q(\lambda)\\
s.t. \quad \lambda \ge 0
\end{aligned}
$$
# 非垂直超平面
记H为$R^{m} * R$中的一个非垂直超平面，定义为：
$$
H = \{(u, w) | \lambda u + w = q(\lambda)\}
$$
其中：$q(\lambda) = \inf \{w +\lambda u\}$

# Slater约束资格条件
若问题为凸优化问题，且满足Slater条件，则强对偶成立：
$$
\begin{aligned}
min \quad f_{0}(x)\\
s.t. \quad f_{i}(x) &\le 0, i=1,2,...,m\\
Ax &= b
\end{aligned}
$$
**若存在$x \in D$的内部，使得$f_{i}(x) <0$对于每一个分量i均成立，同时满足$Ax = b$。**
则可保证：强对偶成立，并且对偶最优解成立。

# 不等式形式的线性规划
**原始问题**
$$
\begin{aligned}
min \quad c^{T}x\\
s.t. \quad Ax \ge b
\end{aligned}
$$
**对偶函数**
$$
g(\lambda) = inf_{x}((c+A^{T}\lambda)^{T}x-b^{T}\lambda) = \left\{\begin{matrix}
 -b^{T}\lambda & A^{T}\lambda + c = 0\\
 -\infty &otherwise
\end{matrix}\right.
$$
可以将$(c-A^{T}\lambda)^{T}$理解为一个方向向量，则一定可以在一个无穷远的方向取到$-\infty$.只有方向为0时，才有定值。
**对偶问题**
$$
\begin{aligned}
max \quad -b^{T}\lambda \\
s.t. \quad A^{T}\lambda + c = 0, \quad \lambda \ge 0
\end{aligned}
$$
**Slater条件得到：**
若存在$\hat{x}$使得$A\hat{x} < b$, 则$p^{*} = d^{*}$

# 二次规划
**原始问题：(假设P为半正定矩阵)**
$$
\begin{aligned}
min \quad x^{T}Px\\
s.t. \quad Ax \ge b
\end{aligned}
$$
**对偶函数：**
$$
g(\lambda) = inf_{x}(x^{T}Px +\lambda^{T}(Ax-b))
$$
**对偶问题：**
$$
\begin{aligned}
max \quad g(\lambda)\\
s.t. \quad \lambda \ge 0
\end{aligned}
$$
**Slater条件有：**
若存在$\hat{x}$使得$A\hat{x} < b$, 则$p^{*} = d^{*}$

# 互补松弛性
对于原始问题：
$$
\begin{aligned}
min \quad f_{0}(x)\\
s.t. f_{i}(x) \le 0,\quad i=1,2,...,m\\
h_{i}(x) = 0, \quad i=1,2,...,p
\end{aligned}
$$

假设强对偶成立，$x^{*}$为原始问题最优解，$(\lambda^{*}, v^{*})$为对偶问题最优解：
$$
\begin{aligned}
f_{0}(x^{*}) = g(\lambda^{*},v^{*}) &= inf_{x}(f_{0}(x)+\sum\limits_{i=1}^{m}\lambda_{i}^{*}f_{i}(x) +\sum\limits_{i=1}^{p}v_{i}^{*}h_{i}(x))\\
&\le f_{0}(x^{*})+\sum\limits_{i=1}^{m}\lambda_{i}^{*}f_{i}(x^{*}) +\sum\limits_{i=1}^{p}v_{i}^{*}h_{i}(x^{*})\\
&\le f_{0}(x^{*})
\end{aligned}
$$
故不等号必须全部取等：
- $x^{*}$使得拉格朗日函数$L(x,\lambda^{*}, v^{*})$取最小值。
- 对于所有的i = 1,...,m，有：$\lambda^{*}_{i}f_{i}(x^{*}) = 0$，称为互补松弛性。

# 对偶与问题重构
对于一个问题的不同等价形式可能会导出不同的对偶问题。
故当一个对偶问题难以求解时，可以尝试重构原始问题。

**常见的重构方式**
## 引入新变量与等式约束
$$
min \quad f_{0}(Ax +b)
$$
其对偶函数：$g = inf_{x}f_{0}(Ax +b) = p^{*}$为一个常数。
此时的对偶问题几乎无用。
**重写后的问题：**
$$
\begin{aligned}
min \quad f_{0}(y)\\
s.t. \quad Ax + b-y=0
\end{aligned}
$$
对偶问题为：
$$
\begin{aligned}
max \quad b^{T}v - f_{0}^{*}(v)\\
s.t. \quad A^{T}v = 0
\end{aligned}
$$
对偶函数为：
$$
\begin{aligned}
g(v) &= inf_{x,y}(f_{0}(y)-v^{T}y+v^{T}Ax + b^{T}v)\\
&= \left\{\begin{matrix}
 -f_{0}^{*}(v) + b^{T}v & A^{T}v = 0\\
 -\infty &otherwise
\end{matrix}\right.
\end{aligned}
$$

## 范数逼近问题的对偶问题
范数逼近问题：最小化$||Ax - b||^{2}$
$$
\begin{aligned}
min \quad ||y||^{2}\\
s.t. \quad y = Ax - b
\end{aligned}
$$
对偶函数为：
$$
\begin{aligned}
g(v) &= inf_{x,y}(||y||^{2}+v^{T}(y-Ax+b))\\
&= \left\{\begin{matrix}
 b^{T}v + inf_{y}(||y||^{2} +v^{T}y) & A^{T}v = 0\\
 -\infty &otherwise
\end{matrix}\right.\\
&= \left\{\begin{matrix}
b^{T}v-\frac{||v||^{2}}{4} & A^{T}v = 0\\
 -\infty &otherwise
\end{matrix}\right.
\end{aligned}
$$
对偶问题为：
$$
\begin{aligned}
max \quad b^{T}v-\frac{||v||^{2}}{4}\\
s.t. \quad A^{T}v = 0
\end{aligned}
$$

## 隐式约束
带有盒约束的线性规划：
原问题：
$$
\begin{aligned}
min \quad c^{T}x \\
s.t. \quad Ax = b\\
-1 \le x \le 1
\end{aligned}
$$
对偶问题：
$$
\begin{aligned}
max \quad -b^{T}v - 1^{T}\lambda_{1}-1^{T}\lambda_{2}\\
s.t. \quad c + A^{T}v +\lambda_{1}-\lambda_{2} = 0\\
\lambda_{1} \ge 0, \quad \lambda_{2} \ge 0
\end{aligned}
$$

将约束隐式化后的重构问题：
$$
\begin{aligned}
min \quad f_{0}(x) = \left\{\begin{matrix}
c^{T}x & -1 \le x \le 1\\
 \infty &otherwise
\end{matrix}\right.\\
s.t. \quad  Ax = b
\end{aligned}
$$
对偶函数为：
$$
g(v) = inf_{-1 \le x \le 1} (c^{T}x +v^{T}(Ax-b)) = -b^{T}v- ||A^{T}v +c||_{1}
$$
对偶问题：
$$
max \quad -b^{T}v - ||A^{T}v +c||_{1}
$$
