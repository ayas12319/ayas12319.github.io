---
pubDatetime: 2026-07-04
tags:
  - 优化理论与算法
title: 近端梯度法
author: 薛彬
description: 近端梯度法约束在可行域内
---

# 新方法引入的必要性
通常目标函数可以写为：
$$
F(x) = f(x) + g(x)
$$
其中$f(x)$光滑可导，$g(x)$可能不可导：例如正则项......
那么对于$g(x)$，普通GD无法直接对其更新。

故核心思路：
近端梯度法 = 对光滑部分做梯度下降，对结构部分做“近端修正”

# 典型例子：Lasso
Lasso回归为：
$$
min_{x} \frac{1}{2}||Ax-b||^{2} + \lambda||x||_{1}
$$
对于此函数：$f(x) = \frac{1}{2}||Ax-b||^{2}$,  $B(x) = \lambda||x||_{1}$
对于$f(x)$采取梯度下降处理：$\partial f(x) = A^{T}(Ax-b)$；
对于$B(x)$采取：$||x||_{1} = \sum\limits_{i}|x_{i}|$

其他复合优化例子：
- 约束优化问题：
    $f(x)$为光滑目标函数，$g(x)$为指示函数$\delta_{C}(x)$——在domain中为1.否则为0
- 稀疏逻辑回归：
    $f(x)$为逻辑损失函数，$g(x)$为$l_{1}$正则函数
- 图像去噪：
    $f(x)$数据拟合项，$g(x)$为稀疏正则。

# 近端算子概念
对于函数g，近端算子定义为：
$$
prox_{\alpha g}(z) = argmin_{x}\{g(x) + \frac{1}{2\alpha}||x-z||^{2}\}
$$
其中z是输入数据。
**理解：**
即近端算子不是沿着梯度走，而是在希望不可导项g(x)小的同时，希望x不要距离z太远。

**与投影的比较：**
投影：将目标解拉回可行域；
prox：将目标解拉向g喜欢的结构。

# 近端梯度法：
## 近端梯度法公式
先处理光滑项：
$$
z^{k} = x^{k} - \alpha \partial f(X^{k})
$$
再处理不可导或结构项：(即近端修正)
$$
x^{k+1} = prox_{\alpha g}(z^{k})
$$

直观理解：
即先像GD一样走到$z^{k}$，再用prox将$z^{k}$修正成满足结构的新点。

## 软阈值：$l_{1}$正则的prox
若
$$
g(x) = \lambda||x||_{1}
$$
则近端算子逐坐标可写为：
$$
prox_{\alpha \lambda ||x||_{1}}(z)_{i} = S_{\alpha \lambda}(z_{i})
$$
软阈值算子为：
$$
S_{r}(z) = sign(z)max\{|z|-r, 0\}
$$
实现效果：
- 超过阈值的正数变小
- 超过阈值的负数变大
- 绝对值小于阈值的直接变为0
![400*400](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-05-21_11-21-28.png)

**例如：**
设阈值为：
$$
r = \alpha \lambda = 0.4
$$
对于向量
$$
z = (1.2, 0.3, -0.2, -1.5, 0.8)
$$
逐坐标执行软阈值得到：
$$
S_{0.4}(z) = (0.8, 0, 0, -1.1, 0.4)
$$

## 常见近端算子
### 逐坐标型
- $l_1$范数为软阈值：$g(x) = \lambda ||x||_{1} \rightarrow  prox(z) = S_{\alpha \lambda}(z_{i})$，即为软阈值
- 平方$l_{2}$缩放：$\frac{\lambda}{2}||x||_{2}^{2} \rightarrow \frac{1}{1+\alpha \lambda}z$
- 约束指示函数对应投影：$\delta_{x\ge 0}(x) \rightarrow maz(z, 0)$

**例子：平方$l_{2}$正则的prox：**
若
$$
g(x) = \frac{\lambda}{2} ||x||_{2}^{2}
$$
则
$$
prox_{\alpha g}(z) = argmin_{x}\{\frac{\lambda}{2}||x||^{2} + \frac{1}{2\alpha}||x-z||^{2}\}
$$
对目标求导并
令其为0：
$$
\lambda x + \frac{1}{\alpha}(x-z) = 0
$$
所以得到：
$$
prox_{\alpha g}(z) = \frac{1}{1+\alpha \lambda}z
$$


### 结构型
约束优化：$\delta_{C}(x) \rightarrow \prod_{C}(z)$
即投影梯度法可以看做是近端梯度法的特例：
$$
x^{k+1} = \prod_{C}(x^{k} - \alpha \partial f(x^{k}))
$$
投影可以看作是对指示函数做prox

## ISTA: Lasso的近端梯度法
对于Lasso：
$$
min_{x} \frac{1}{2} ||Ax - b||^{2} + \lambda ||x||_{1}
$$
近端梯度法给出：
$$
x^{k+1} = S_{\alpha \lambda}(x^{k} - \alpha A^{T}(Ax^{k} - b))
$$
先根据残差$Ax^{k} - b$调整系数，让预测更加接近数据；
再通过软阈值，将较小系数压成0，得到更加简洁的模型。

## 停止准则：近端梯度映射
定义近端梯度映射为：
$$
G_{\alpha}(x) = \frac{1}{\alpha}(x-prox_{\alpha g}(x - \alpha \partial f(x)))
$$
- 若$||G_{\alpha}(x)||$很大，说明点还未稳定
- 若$||G_{\alpha}(x)||$接近0，则可以作为停止信号。

## FISTA：对于ISTA的动量加速
**FISTA核心思想：**
引入动量项来加速收敛：构造一个加速序列$y_{k}$，使其包含前两次迭代解的线性组合信息。
算法流程：
1， 计算动量系数：
$$
\beta_{k} = \frac{t_{k-1} - 1}{t_{k}}
$$
2，构造预测点y：
$$
y_{k} = x_{k} + \beta_{k}(x_{k} - x_{k-1})
$$
3，在y上进行梯度下降：
$$
z_{k} = y^{k} - \alpha \partial f(y^{k}) 
$$
注意与ISTA的区别：
ISTA中梯度下降的更新为：
$$
x^{k} - \alpha \partial f(x^{k})
$$
4，进行软阈值计算：
$$
x_{k+1} = S_{\alpha \lambda}(z^{k})
$$

5，更新t：
$$
t_{k+1} = \frac{1 + \sqrt{1 + 4t_{k}^{2}}}{2}
$$
6，对于x的值进行更新

