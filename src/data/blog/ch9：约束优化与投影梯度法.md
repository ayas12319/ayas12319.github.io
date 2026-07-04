---
tags:
  - 优化理论与算法
title: 投影梯度法
author: 薛彬
description: 投影梯度算法
---

在有约束条件下，普通GD可能会失效：
普通GD为：
$$
x^{k+1} = x^{k} - \alpha_{k}\partial f(x^{k})
$$
默认$x^{k+1}$可以落在任意位置
但若要求x的定义域为C，则可能会出现$x^{k+1} \notin C$的情况发生。

常见约束集合：
- 盒约束：$l_{i} \le x_{i} \le u_{i}$，存在上下界。
- 非负约束：$x_{i} \ge 0$
- 球约束：$||x||_{2} \le R$
- 单纯形约束：$x_{i}\ge 0, \sum\limits_{i}x_{i} = 1$，如概率分布，投资权重等。
- 线性等式约束：$Ax = b$，如预算平衡，供需平衡。

# 投影算子：回到可行域
给定闭凸集合C，点z到C的投影定义为：
$$
\prod_{C}(z) = argmin_{x \in C}\frac{1}{2}||x-z||^{2}
$$
含义：在集合内的所有可行点中，找到离z最近的点

## 投影梯度法的框架：
先做无约束GD：
$$
z^{k} = x^{k} - \alpha_{k} \partial f(x^{k})
$$
然后投影：
$$
x^{k+1} = \prod_{C}(z^{k})
$$
即：下降方向 + 可行性修正

**算法框架：**
1，选择初始点$x^{0} \in C$, 步长$\alpha_{k} > 0$
2，计算梯度$g^{k} = \partial f(x^{k})$
3，先执行GD下降：$z^{k} = x^{k} - \alpha_{k}g^{k}$
4，再投影：$x^{k+1} = \prod_{C}(z^{k})$
5，若变化较小，或迭代到最大次数，则停止。
## 各约束投影例子：
**球约束投影：**
已知球约束为：
$$
C = \{x: ||x||_{2} \le R\}
$$
- 若z已在球内，则$\prod_{C}(z) = z$
- 若z在球外，则$\prod_{C}(z) = R\frac{z}{||z||}$

**单纯形投影：**
单纯形约束为:
$$
\Delta_{n} = \{x \in R^{n}; x_{i} \ge 0, \sum\limits_{i=1}^{n}x_{i} = 1\}
$$
投影问题为：
$$
argmin_{x \ge 0, \sum\limits_{i}x_{i} = 1} \frac{1}{2}||x-z||^{2}
$$
**其解具有形式：**
$$
x_{i} = max\{z_{i} - r, 0\}
$$
直观理解为：
整体平移z，再把负数截成0，最后总和刚好为1.
**推导：**
对于优化问题：
$$
\begin{aligned}
min \quad \frac{1}{2}\sum\limits_{i}(x_{i}-z_{i})^{2}\\
s.t. \quad \sum\limits_{i}x_{i} = 1\\
x_{i} \ge 0
\end{aligned}
$$
是一个凸优化问题，可以使用KKT。
构造拉格朗日函数得到：
$$
L(x,r,\mu) = \frac{1}{2}\sum\limits_{i}(x_{i}-z_{i})^{2} + r(\sum\limits_{i}x_{i}-1)-\sum\limits_{i}\mu_{i}x_{i}
$$
得到其偏导为：
$$
x_{i} - z_{i} + r - \mu_{i} = 0
$$
又根据KKT的互补松弛条件得到：
$$
\mu_{i}x_{i} = 0
$$
故分类讨论：
- 当$\mu_{i} = 0$时，$x_{i} > 0$：得到$x_{i} = z_{i} - r$
- 当$\mu_{i} \neq 0$时，$x_{i} = 0, \mu_{i} > 0$：得到$\mu_{i} = r - z_{i}$
故综上有：$x_{i} = max\{0, z_{i} - r\}$

## 投影梯度的最优性条件
投影梯度法的固定点满足：
$$
x^{*} = \prod_{C}(x^{*} - \alpha \partial f(x^{*}))
$$
常定义投影梯度映射：
$$
G_{\alpha}(x) = \frac{1}{\alpha}(x - \prod_{C}(x - \alpha \partial f(x)))
$$
若$G_{\alpha}(x) = 0$，则说明具有一阶稳定性。

## 收敛速度：
投影梯度法本质上就是带有修正的GD，故其理论速度与GD同一量级。
