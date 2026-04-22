---
tags:
  - 数理统计
title: 极大似然估计，估计量的评价准则
author: 薛彬
pubDatetime: 2026-04-22
description: 极大似然估计的概念与求解，引入有偏的判断与纠偏
---
# 极大似然估计
**似然函数定义：**
设总体X具有概率质量函数p($x;\theta$)，或概率密度函数f($x;\theta$)，其中$\theta$未知。设$X_{1}, X_{2}, ...,X_{n}$为样本，其观测值为$x_{1}, x_{2}, x_{n}$，则似然函数定义为：
$$
L(\theta) = \prod_{i=1}^{n}p(x_{i};\theta)\quad or \quad \prod_{i=1}^{n}f(x_{i};\theta)
$$

**极大似然估计定义：**
若{$x_{1}, x_{2}, x_{3},...,x_{n}$}满足：
$$
L\{\hat{\theta}(x_{1},...,x_{n})\} = max_{\theta} L(\theta)
$$
则称$\theta(x_{1},...,x_{n})$为$\theta$的极大似然估计值，称对应的统计量$\hat{\theta}(X_{1},...,X_{n})$称为$\theta$的极大似然估计量。
**直观理解：**
极大似然估计就是已知某种已经出现的结果，反推出出现这种结果概率最大的一种中参数方案。

**对于极大似然估计的求解：**
可令似然函数对于每一个参数$\theta_{j}$的偏导为0，得到方程组:
$$
\frac{\partial L(\theta)}{\partial \theta_{j}} = 0, \quad j = 1,...,k 
$$
联立求解可得极大似然估计。

**note:**
对于指数函数等形式，通常还会采取令$l(\theta) = log(L(\theta))$的形式进行求导，解出max值的情况。

**定理：**
**若$\hat{\theta}$是$\theta$的极大似然估计，则$g(\hat{\theta})$也是$g(\theta)$的极大似然估计。**

## 例题：
**均匀分布：(样本的取值范围含有参数)**
设总体X服从均匀分布U(a, b)，其中a, b未知。设$X_{1}, X_{2}, ..., X_{n}$为样本，试求a,b的极大似然估计。进一步求E(x)的极大似然估计。
解：
均匀分布的密度函数为:
$$
f(x) = \left\{\begin{matrix}
 \frac{1}{b-a}, \quad a <= x <= b\\
0, \quad else 
\end{matrix}\right.
$$
对应的似然函数为：
$$
L(\theta) = \left\{\begin{matrix}
 \frac{1}{(b-a)^{n}}, \quad a <= x_{i} <= b\\
0, \quad else 
\end{matrix}\right.
$$
这里对a，b存在范围上的约束：
$$
\begin{aligned}
\hat{a} = min\{X_{1}, X_{2}, X_{3},...X_{n}\}\\
\hat{b} = max\{X_{1}, X_{2},....,X_{n}\}
\end{aligned}
$$
故极大似然估计量为：$\hat{a} = x_{(1)}$, $\hat{b} = x_{(n)}$，此时区间最小，即$L(\theta)$最大。


# 估计量的评价准则
## 无偏性
**偏差定义：**
设参数$\theta$有估计量$\hat{\theta} = \hat{\theta}(X_{1}, X_{2},...,X_{n})$，则称$|E(\hat{\theta}) - \theta|$称为估计量$\theta$的偏差。

**无偏性定义：**
若参数$\theta$的估计量$\hat{\theta}$满足：
$$
E(\hat{\theta}) = \theta
$$
则称$\hat{\theta}$是$\theta$的无偏估计量。
即：是在大量重复实验下，有$\hat{\theta}$给出的估计的平均值为$\theta$，而单次给定的样本值中，$\hat{\theta}$不一定等于$\theta$.

**例题(均匀分布中最值期望的求解)：**
设总体X服从均匀分布U(0, $\theta$)，$\theta$ > 0是未知参数。样本分别为$X_{1}, X_{2}, ...,X_{n}$。试分别求$\theta$的矩估计和极大似然估计，并判断各自是否无偏。
解：
首先求矩估计：
由$\mu_{1}$ = E(X) = $\frac{\theta}{2}$，可得样本的$\hat{\theta} = 2\bar{X}$。可以得到：
$$
E(\hat{\theta}) = 2E(\bar{X}) = 2E(X) = \theta
$$
故矩估计无差。
然后求最大似然估计：
U(0, $\theta$)的密度函数为：
$$
f(x;\theta) = \left\{\begin{matrix}
 \frac{1}{\theta}, \quad 0 <= x <= \theta\\
0, \quad else 
\end{matrix}\right.
$$
得到对应的似然函数为：
$$
L(\theta) = \left\{\begin{matrix}
 \frac{1}{\theta^{n}}, \quad 0 <= x_{i} <= \theta\\
0, \quad else 
\end{matrix}\right.
$$
由于需要保证$\theta \ge max\{X_{1}, X_{2}, ...,X_{n}\}$。所以得到极大似然解为$\theta = X_{n}$.
对于E($\hat{\theta}$)的计算，首先计算$\hat{\theta}$的累积分布函数：
$$
\begin{aligned}
F_{(n)}(x) = P(\hat{\theta} <= x) &= P(max\{X_{1},X_{2},...,X_{n}\} <= x)\\
&= P(X <= x)^{n}\\
&= (\frac{x}{\theta})^{n}
\end{aligned}
$$
求导后得到对应的概率密度函数为：
$$
f_{(n)}(x) = F_{(n)}'(x) = \frac{nx^{n-1}}{\theta^{n}}
$$
于是：
$$
E(\hat{\theta}) = \int_{0}^{\theta}x* \frac{nx^{n-1}}{\theta^{n}}dx = \int_{0}^{\theta}\frac{nx^{n}}{\theta^{n}}dx = \frac{n}{n+1}\theta < \theta
$$
故极大似然法求得的结果有偏差。

**纠偏方法：**
若E($\hat{\theta}$) = $a\theta + b$，其中a, b是常数，则$\frac{\hat{\theta} - b}{a}$为其对应的无偏估计。


## 有效性
**有效性定义：**
设$\hat{\theta}_{1}, \hat{\theta}_{2}$为两个无偏估计，如果$Var(\hat{\theta}_{1}) < Var(\hat{\theta}_{2})$对一切$\theta$均成立，则称$\theta_{1}$比$\theta_{2}$有效。

## 均方误差
**均方误差定义：**
设$\hat{\theta}$对于参数$\theta$的点估计，方差存在，则称$E(\hat{\theta} - \theta)^{2}$是估计量$\hat{\theta}$的均方误差，记作Mse($\hat{\theta}$)
设$\hat{\theta_{1}}, \hat{\theta_{2}}$是$\theta$的点估计，若$Mse(\hat{\theta_{1}}) < Mse(\hat{\theta_{2}})$成立，则称在均方误差下，$\hat{\theta_{1}}$优于$\hat{\theta_{2}}$

**均方误差分解式的推导：**
$$
\begin{aligned}
Mse(\hat{\theta}) = E(\hat{\theta} - \theta)^{2} &= E(\hat{\theta} - E(\hat{\theta}) + E(\hat{\theta}) -\theta)^{2}\\
&=E(\hat{\theta} - E(\hat{\theta}))^{2} + E(E(\hat{\theta}) - \theta)^{2} + 2E[(\hat{\theta} - E(\hat{\theta}))(E(\hat{\theta}) - \theta)]\\
&= Var(\hat{\theta}) + \{E(\hat{\theta}) - \theta\}^{2}
\end{aligned}
$$
**即均方误差 = $\hat{\theta}$的方差 + $\hat{\theta}$偏差的平方。**

**相合性定义：**
设$\hat{\theta}$为$\theta$的估计量。若对于任意$\theta$,当$n \rightarrow \infty$时，
$$
\hat{\theta} \rightarrow \theta
$$
则称$\hat{\theta_{n}}$为$\theta$的相合估计量(一致估计量)

