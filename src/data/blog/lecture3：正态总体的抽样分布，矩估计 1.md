---
tags:
  - 数理统计
title: 正态总体的抽样分布，矩估计
author: 薛彬
description: 主要介绍学生定理及其证明，以及矩估计
pubDatetime: 2026-04-22
---
# 正态总体的抽样分布
## 单个正态总体的抽样分布
**学生定理：**
设$X_{1},X_{2},...,X_{n}$为互相独立的随机变量，每个$X_{i}$都服从N($\mu, \sigma^{2}$)分布。定义随机变量：
$$
\bar{X} = \frac{1}{n}\sum\limits_{i=1}^{n}X_{i}, \quad S^{2} = \frac{1}{n-1}\sum\limits_{i=1}^{n}(X_{i} - \hat{X})^{2}
$$
则有:
- $\bar{X}$服从N($\mu, \sigma^{2} / n$)分布

- $\bar{X}$与$S^{2}$相互独立

- $(n-1)S^{2} / \sigma^{2}$服从$x^{2}(n-1)$分布
**证明：**
设有随机变量：$V = \sum\limits_{i=1}^{n}(\frac{X_{i} - \mu}{\sigma})^{2}$, 有$V \sim x^{2}(n)$
又：
$$
\begin{aligned}
V &=\sum\limits_{i=1}^{n}[\frac{(X_{i} - \bar{X}) + (\bar{X} - u)}{\sigma}]^{2}\\
 &= \sum\limits_{i=1}^{n}\frac{(X_{i} - \bar{X})^{2}}{\sigma^{2}} + \sum\limits_{i=1}^{n}\frac{(\bar{X} - \mu)^{2}}{\sigma^{2}} + 2\sum\limits_{i=1}^{n}\frac{(X_{i}-\bar{X})(\bar{X} - \mu)}{\sigma}\\
 &= \sum\limits_{i=1}^{n}\frac{(X_{i} - \bar{X})^{2}}{\sigma^{2}} + n\frac{(\bar{X} - \mu)^{2}}{\sigma^{2}} + 2(\bar{X} - \mu)\sum\limits_{i=1}^{n}\frac{X_{i} - \bar{X}}{\sigma}
\end{aligned}
$$
易知第三项为0，又$n\frac{(\bar{X} - \mu)^{2}}{\sigma^{2}} \sim N(0, 1)$，即服从自由度为1的卡方分布。
由卡方分布的可加性得到：$\sum\limits_{i=1}^{n}\frac{(X_{i} - \bar{X})^{2}}{\sigma^{2}} \sim x^{2}(n-1)$。

- 随机变量
$$
T = \frac{\bar{X} - \mu}{S / \sqrt{n}}
$$

服从自由度为n-1的t-分布
**证明：**
原式等价于：
$$
\frac{(\bar{X} - \mu) / (\sigma / \sqrt{n})}{\sqrt{(n-1)S^{2} / \sigma^{2}(n-1)}}
$$
可知上式$\sim N(0, 1)$，下式 $\sim x^{2}(n-1)$，故原式$\sim t(n-1)$

## 两个正态总体的抽样分布
**定理：**
设样本($X_{1},X_{2},...,X_{n}$)与($Y_{1}, Y_{2},...,Y_{n}$)分别来自总体N($\mu_{1},\sigma_{1}^{2}$)和N($\mu_{2},\sigma_{2}^{2}$)，并且他们相互独立。假设样本均值分别为$\bar{X}, \bar{Y}$,样本方差分别为$S_{1}^{2},S_{2}^{2}$.则可得到如下的三个分布：
$$
F = \frac{S_{1}^{2} / \sigma_{1}^{2}}{S_{2}^{2} / \sigma_{2}^{2}}\sim F(n_{1} - 1, n_{2} - 1)
$$
**证明：**
结合学生定理中的$\frac{(n-1)S^{2}}{\sigma^{2}} \sim x^{2}(n-1)$,以及F-分布的定义可以得到结论。

$$
\frac{(\bar{X} -\bar{Y}) - (\mu_{1} - \mu_{2})}{\sqrt{\frac{\sigma_{1}^{2}}{n_{1}} + \frac{\sigma_{2}^{2}}{n_{2}}}} \sim N(0, 1)
$$

当$\sigma_{1}^{2} = \sigma_{2}^{2} = \sigma^{2}$时，
$$
\frac{(\bar{X} - \bar{Y}) - (\mu_{1} - \mu_{2})}{S_{w}\sqrt{\frac{1}{n_{1}} + \frac{1}{n_{2}}}} \sim t(n_{1}+n_{2}-2)
$$
其中
$$
S_{w}^{2} = \frac{(n_{1} - 1)S_{1}^{2} +(n_{2} - 1)S_{2}^{2}}{n_{1} + n_{2} - 2}
$$

# 矩估计
**点估计定义：**
设总体X有未知参数$\theta$，$X_{1},X_{2},...,X_{n}$为样本。点估计即构造合适的统计量$\hat{\theta} = \hat{\theta}(X_{1},...,X_{n})$来估计未知参数$\theta$。统计量$\hat{\theta}$即为$\theta$的点估计量。

**矩估计定义：**
用样本矩作为总体矩的估计即为矩估计。




