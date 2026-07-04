---
tags:
  - 投资科学
author: 薛彬
description: 投资组合模型
title: 投资组合模型
pubDatetime: 2026-07-04
---

# 投资组合与收益率

## 卖空
即借入资产，将其卖出，再在约定时间内返还资产的行为。

假设通过卖空在初期获得了$x_{0}$的收入，在后期付出$x_{1}$买回资产用于归还。获得收益为$x_{0} - x_{1}$；则此次卖空的总收益率：
$$
R = \frac{-x_{1}}{-x_{0}} = \frac{x_{1}}{x_{0}}
$$
收益率为： 
$$
r = \frac{-x_{1} - (-x_{0})}{-x_{0}} = R-1
$$
利润p = $x_{0} - x_{1}$ = $-rx_{0}$

## 投资组合
- 投资组合：将初始财富$x_{0}$配置到n种不同的资产：
$$
\pi = (x_{01},x_{02},...,x_{0n})'
$$
- 用$w = (w_{1},w_{2},...,w_{n})'$表示投资组合的权重向量，其中：
$$
w_{i} = \frac{x_{0i}}{x_{0}}
$$

### 投资组合的收益
使用$R_{i}$和$r_{i}$分别表示第i项资产的总收益和收益率，用向量表示为：
$$
R:= (R_{1},R_{2},...,R_{n})'
$$
则投资组合的总收益为：相应单个资产收益的加权总和
$$
R_{p} = \frac{\sum\limits_{i=1}^{n}R_{i}x_{0i}}{x_{0}} = \sum\limits_{i=1}^{n}w_{i}R_{i} = R'w
$$
设随机收益向量r的均值为：
$$
\bar{r} = E[r] = (\bar{r_{1}}, \bar{r_{2}}, ....,\bar{r_{n}})'
$$
则有：
投资组合的期望收益率：为各项资产期望收益率的加权平均和
$$
\bar{r_{p}} = E[r'w] = \sum\limits_{i=1}^{n}w_{i}\bar{r_{i}} = r'w
$$
投资组合的方差：
$$
\sigma_{p}^{2} = Var(r_{p}) = \sum\limits_{i,j=1}^{n}w_{i}w_{j}\sigma_{ij} = w'\sum\limits w
$$

## 分散效应
分散投资：
在原有投资组合中引入新的资产，以期减小方差的行为。

例如：一个带有n种不相关资产的市场。每种资产的期望收益和方差均为m和$\sigma^{2}$。考虑如下投资组合$w_{i} = \frac{1}{n}$。计算投资组合的均值与方差
解：
投资组合的总收益率为：
$$
r = \frac{1}{n}\sum\limits_{i=1}^{n}r_{i}
$$
得到总收益率 = m，与n无关。
投资组合的方差为：
$$
Var(r) = \frac{1}{n^{2}}\sum\limits_{i=1}^{n}\sigma^{2} = \frac{\sigma^{2}}{n}
$$
可以看到，若引入不相关的资产越多$\rightarrow$ n越大，Var(r)越小。

![600*600](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-05-11_23-01-01.png)
- 不相关的资产数目增加，可以有效地降低方差
- 正相关的资产数目增加，也能一定程度降低方差，但存在下限。

**风险来源：**
证券投资的风险由两部分组成：
- 不可分散的系统性风险：由市场变动产生，不能通过证券组合消除
- 可分散的非系统性风险：可随着证券数量的增加而减少

## 投资组合的平均收益与标准差
### 收益-标准差图像
考虑两个资产的$\alpha$投资组合；两个资产的平均回报为$\bar{r_{1}}$和$\bar{r_{2}}$；标准差为$\sigma_{1}$和$\sigma_{2}$;相关系数为：$\rho = \frac{\sigma_{12}}{\sigma_{1}\sigma_{2}}$;协方差为：$\sigma_{12} = \rho \sigma_{1}\sigma_{2}$。假设投资在第二个资产上的比例为$\alpha$

与所有投资组合对应的点的集合称为**可行集合**或者**可行区域**。
![500* 500](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-05-12_14-29-41.png)
#### 最小方差集合
可行集的左边界被称为最小方差集——在相同的期望收益率的情况下，左边界的方差最小。
投资者都是风险厌恶的：
- 在相等收益下，投资者偏向于选择风险较小的投资组合。
- 在相等风险下，投资者偏向于选择平均收益较大的组合。

**有效前沿**为：最小方差集的上半部分。即为投资者偏向于选择的较优投资组合的集合。
![400*400](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-05-12_14-37-04.png)

# 均值-方差投资组合模型
## 马克维茨模型建立
假定期望值固定为$\bar{r}$。在可行集中找到具有这一均值的最小方差的可行投资组合。构建问题如下：
$$
\begin{aligned}
min \quad \frac{1}{2}\sum\limits_{i,j=1}^{n}w_{i}w_{j}\sigma_{ij}\\
s.t. \quad \sum\limits_{i=1}^{n}w_{i}\bar{r_{i}} = \bar{r}\\
\sum\limits_{i=1}^{n}w_{i} = 1
\end{aligned}
$$
## 模型的求解
通过拉格朗日乘数来解决带有约束条件的最优化问题。构造拉格朗日函数为：
$$
L = \frac{1}{2}\sum\limits_{i,j=1}w_{i}w_{j}\sigma_{ij}  - \lambda\left(\sum\limits_{i=1}^{n}\bar{r_{i}} - \bar{r}\right)- \mu(\sum\limits_{i=1}^{n}w_{i} - 1)
$$
对$w_{i}$求导后得到：
$$
\begin{aligned}
\sum\limits_{j=1}^{n}\sigma_{ij}w_{j}-\lambda \bar{r_{i}} - \mu = 0\\
\sum\limits_{i=1}^{n}w_{i}\bar{r_{i}} = \bar{r}\\
\sum\limits_{i=1}^{n}w_{i} = 1
\end{aligned}
$$
**解得最优投资策略为**：
$$
w^{*} = \sum\limits^{-1}(\lambda \bar{r} +\mu e)
$$
$\sum\limits$指的是协方差矩阵。

其中还需要满足两个约束，得到：
$$
\begin{pmatrix}
 \lambda\\
\mu
\end{pmatrix} = \begin{pmatrix}
 C_{rr} & C_{er}\\
C_{er} & C_{ee}
\end{pmatrix}^{-1}\begin{pmatrix}
r_{d} \\
1
\end{pmatrix}
$$
其中：
$$
C_{rr} = \bar{r}'\sum\limits^{-1}\bar{r},\quad C_{er} = e'\sum\limits^{-1}\bar{r}, \quad C_{ee} = e'\sum\limits^{-1}e 
$$

则该投资组合的最小方差为：
$$
\sigma_{p}^{2} = (r_{d}, 1)\begin{pmatrix}
 C_{rr} & C_{er}\\
C_{er} & C_{ee}
\end{pmatrix}^{-1}\begin{pmatrix}
r_{d} \\
1
\end{pmatrix}
$$

例题：
考虑三个不相关的资产，方差都是1，均值分别为1,2,3；给定投资组合目标回报率为$r_{d}$；采用方程组和矩阵的形式两种方法求解最优投资组合；
解：
期望收益向量为：
$$
\bar{r} = (1, 2, 3)
$$
协方差矩阵为：
$$
\sum\limits = \begin{pmatrix}
  1& 0 &0 \\
  0& 1& 0\\
  0& 0 &1
\end{pmatrix} = I
$$
模型为：
$$
\begin{aligned}
min \quad \frac{1}{2}w^{T}\sum\limits w \quad &\rightarrow \frac{1}{2}(w_{1}^{2} + w_{2}^{2} + w_{3}^{2})\\
w_{1} + 2w_{2} + 3w_{3} &= r_{d}\\
w_{1} + w_{2} + w_{3} &= 1
\end{aligned}
$$
构造拉格朗日函数为：
$$
L = \frac{1}{2}(w_{1}^{2} + w_{2}^{2} + w_{3}^{2}) - \lambda (w_{1} + 2w_{2} + 3w_{3} - r_{d}) - \mu(w_{1} + w_{2} + w_{3} - 1)
$$
........求解即可

也可以直接计算得到$C_{rr}, C_{er}, C_{ee}$，进而求解出$\lambda, \mu$

## 两基金原理
由均值-方差模型的最优条件可以得到：
$$
\sum\limits w = \lambda \bar{r} - \mu e
$$
设有两个不同的目标收益率$r_{d}^{1}$与$r_{d}^{2}$，其分别对应最优解为：$w^{1}, w^{2}$
定义：$\alpha = \alpha r_{d}^{1} + (1-\alpha)r_{d}^{2}$，则对应的最优解为：$w = \alpha w^{1} + (1-\alpha)w^{2}$
即**有效投资组合之间是线性组合关系。**

证明：
由题可知有：
$$
\begin{aligned}
\sum\limits w^{1} = \lambda \bar{r_{d}^{1}} - \mu_{1} e\\
\sum\limits w^{2} = \lambda \bar{r_{d}^{2}} - \mu_{2} e
\end{aligned}
$$
验证收益率约束得到：
$$
\begin{aligned}
\bar{r}^{T}w &= \bar{r}^{T}(\alpha w^{1} + (1-\alpha)w^{2})\\
&= \alpha r_{d}^{1} + (1-\alpha)r_{d}^{2}\\
&= r_{d}
\end{aligned}
$$
其余约束同理验证，则W仍为最优解。

**两基金原理：**
找到两个投资组合，使其对于任意有效投资组合，都可以通过取其线性组合来复制其的均值和方差。

**使用两基金原理计算：**
- 首先找到两个解：可令(a)$\lambda = 0, \mu = 1$；(b)$\lambda = 1, \mu = 0$
- 对于约束$e'w = 1$，可以采用乘以相同倍数，归一化处理。
- 问题的所有解可以通过该两个解的线性组合得到。
- (a)的解是一个**最小方差点**

## 引入无风险资产
**无风险资产：**
若某些资产的收益率为确定值，则称其为无风险资产。
（使用$r_{f}$表示无风险收益；$w_{f}$表示投资在无风险资产上的权重）

**特点：**
无风险资产与风险资产的协方差为0

## 单基金定理
单基金定理：
存在一只由风险资产组合而成的基金F，使得任意的有效投资组合，都可以由F和无风险资产组合而得。

若允许无风险资产的借入与贷出，**有效集为一条直线**。
这条线从无风险收益点出来，与原式风险资产模型的有效前沿是相切的。
![](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-05-12_18-53-55.png)
## 夏普指标
**夏普指标定义：**
资产的超额收益与标准差的比值
$$
\rho_{sp} = \frac{\bar{r_{p}} - r_{f}}{\sigma_{p}} 
$$




