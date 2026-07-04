---
tags:
  - 优化理论与算法
author: 薛彬
title: 动量法与Nestrov加速
description: 动量法与Nestrov加速
---

**问题引入：**
若梯度下降再病态问题上很慢，能够利用历史信息进行加速。

# 加速的必要性
对于L-光滑函数，梯度下降法为:
$$
x^{k+1} = x^{k} - \alpha \partial f(x^{k})
$$
若f进一步为$\mu$-强凸，取合适步长时有线性收敛：
$$
f(x^{k}) - f^{*} \le (1-\frac{\mu}{L})^{k}(f(x^{0}) - f^{*})
$$
**条件数定义：**
$$
k = \frac{L}{\mu}
$$
其刻画目标函数再不同方向上的曲率差异。k越大，**水平集(所有函数值等于c的点的集合)** 越狭长，普通梯度下降越慢，等高兴越接近于一个圆形。
## 病态二次函数
对于二维二次函数
$$
f(x_{1},x_{2}) = \frac{1}{2}(x_{1}^{2} + kx_{2}^{2})
$$
其水平集为狭长椭圆。负梯度方向不指向最优点，而是近似垂直于当前水平集。
<div align="center">
    <img src="https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-06-01_14-42-22.png" width="400">
</div>
- 陡峭方向上，步长过大，容易导致振荡
- 平坦方向上，步长太小，导致推进缓慢
**故轨迹常出现zig-zag现象：**
梯度下降不是沿着谷底直接前进，而是在谷底两侧来回横跳，缓慢向最优点靠近。

## 加速基本思想：利用历史信息
**核心思想：**
在负梯度方向外，加入部分历史位移方向，使得算法在稳定方向上积累速度，在振荡方向上收到抑制。


# Heavy-ball动量法
**Heavy-ball迭代公式：**
给定步长$\alpha > 0$与栋梁系数$\beta \in [0, 1)$， Heavy-ball方法为：
$$
x^{k+1}= x^{k} - \alpha \partial f(x^{k}) + \beta(x^{k} - x^{k-1})
$$
设速度变量：$v^{k} = x^{k} - x^{k-1}$，故原公式可写为：
$$
v^{k+1}= \beta v^{k} - \alpha \partial f(x^{k})
$$
注：
动量系数$\beta$决定了算法的记忆长度：
- 当$\beta = 0$时，退化为普通梯度下降。
- 当$\beta$过大时，惯性过强，越过谷底。

## 速度变量与历史梯度累积
由前式可得：
$$
v^{k+1} = \beta v^{k} - \alpha g^{k}, \quad g^{k} = \partial f(x^{k})
$$
则展开后可以得到：
$$
\begin{aligned}
v^{k+1} &= -\alpha g^{k} - \alpha \beta g^{k-1} - \alpha \beta^{2} g^{k-2} -... - \alpha \beta^{k}g^{0}\\
&= -\alpha \sum\limits_{j=0}^{k}\beta^{j}g^{k-j}
\end{aligned}
$$
即Heavy-ball实际上看的时当前梯度之外叠加过去梯度的指数衰减平均值。

## 收敛因子：从k到$\sqrt{k}$
在二次函数的特征方向上，GD的误差因子为：
$$
max_{\lambda \in [\mu, L]} |1 - \alpha \lambda|
$$
解释：
对于
$$
f(x) = \frac{1}{2}x^{T}Qx
$$
满足$\mu I \le Q \le LI$，因此有：$\lambda_{i}(Q) \in [\mu, L]$
GD得到：$x_{k+1} = (I-\alpha Q)x_{k}$.
由于Q可对角化：$Q = V AV^{T}$
故可把误差写为：$x_{k} = \sum\limits_{i}c_{i}^{(k)}v_{i}$，其中$v_{i}$是特征向量。
故每个方向上均满足：$c_{i}^{(k+1)} = (1-\alpha \lambda_{i})c_{i}^{(k)}$，又收敛速度是由最大的收缩因子决定的。

目标：希望$\rho(\alpha)$尽可能小——收缩地更快一些。
由于$\rho(\alpha) = |1 - \alpha \lambda|$在$[\mu, L]$上是线性的，最大值一定出现在端点上，即有：$\rho(\alpha) = max\{|1-\alpha \mu|, |1 - \alpha \lambda|\}$
若使得最大值最小，即使得两端一样大：
$$
1 - \alpha \mu = 1- \alpha L
$$
所以解得：$\alpha = \frac{2}{L + \mu}$

故代回原式得到，**GD最优收敛因子**为：
$$
\rho_{GD} = 1 - \alpha \mu = \frac{L - \mu}{L + \mu} = \frac{k-1}{k+1}
$$

又对于Heavy-ball的每个特征方向均是二阶递推，满足：
$$
\rho_{HB} = \frac{\sqrt{L} - \sqrt{\mu}}{\sqrt{L} +\sqrt{\mu}} = \frac{\sqrt{k}-1}{\sqrt{k} + 1}
$$
## 二次强凸问题上的推荐参数
对于特征值落在区间$[\mu, L]$上的二次问题，Heavy-ball有经典参数：
$$
\alpha_{HB} = \frac{4}{(\sqrt{L} + \sqrt{\mu})^{2}}, \quad \beta_{HB} = (\frac{\sqrt{L} -\sqrt{\mu}}{\sqrt{L} - \sqrt{\mu}})^{2}
$$
此时的收敛因子为：
$$
\rho_{HB} = \frac{\sqrt{k}-1}{\sqrt{k}+1}
$$

# Nesterov加速与方法对比
## Nesterov加速核心思想
先沿动量方向走到前瞻点，再在前瞻点计算梯度。
<div align="center">
    <img src="https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-06-01_16-48-02.png" width="400">
</div>

## NAG算法公式
$$
\begin{aligned}
y^{k} &= x^{k} + \beta_{k}(x^{k} - x^{k-1})\\
x^{k+1} &= y^{k} - \alpha \partial f(y^{k})
\end{aligned}
$$
与HB的区别：
HB使用$\partial f(x^{k})$，而NAG使用$\partial f(y^{k})$。前瞻梯度具有更好的加速性质。

## 前瞻点的意义
HB的梯度在当前位置计算：
$$
x^{k+1} = x^{k} - \alpha \partial f(x^{k}) + \beta (x^{k} - x^{k-1})
$$
NAG的方式是：
先预测一个位置：
$$
y^{k} = x^{k} + \beta_{k}(x^{k} - x^{k-1})
$$
再在预测点修正：
$$
x^{k+1} = y^{k} - \alpha \partial f(y^{k})
$$

## NAG的典型参数与收敛速度
对于光滑凸函数，Nesterov加速方法可以达到：
$$
f(x^{k}) - f^{*} = O(\frac{1}{k^{2}})
$$
对于$\mu$-强凸且$L$-光滑的问题，常见参数可写为：
$$
\alpha = \frac{1}{L}, \quad \beta = \frac{\sqrt{k}-1}{\sqrt{k}+1}
$$
此时达到精度$\delta$的迭代复杂度为：
$$
O(\sqrt{k}log(\frac{1}{\delta}))
$$
