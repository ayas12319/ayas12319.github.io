---
tags:
  - 优化理论与算法
title: 梯度下降算法
author: 薛彬
description: GD算法的基本概念
pubDatetime: 2026-07-04
---

# 下降方向与步长
主要针对于无约束优化问题：
$$
min \quad f(x)
$$
其中函数$f(x)$连续可微。

**基本迭代格式：**
$$
x^{k+1} = x^{k} - \alpha_{k}\nabla f(x^{k})
$$
其中$\alpha_{k}$为步长

**下降方向的一些选择：**
- 梯度下降方向：$d^{k} = -\nabla f(x^{k})$
- 牛顿方向(二阶导)：$d^{k} = -\frac{\nabla f(x^{k})}{\nabla^{2}f(x^{k})}$
- 拟牛顿方向：$d^{k} = -H_{k} \nabla f(x^{k})$

**最速下降方向：**
设$\nabla f(x) \neq 0$，则在所有满足$||d|| = 1$的方向中，
$$
d^{*} = -\frac{\nabla f(x)}{||\nabla f(x)||}
$$
为一阶降幅$\nabla f(x)^{T}d$最小的方向，其对应的降幅为$-||\partial f(x)||$。


**确定步长：**
目标：精确最小化，找到$\alpha_{k} > 0$，使得：
$$
f(x_{k}+\alpha_{k}d^{k}) = min f(x^{k} +\alpha d^{k})
$$

**算法框架：**
```
for k = 0, 1, 2,...,K-1 do
   计算梯度g^k = f'(x^k)
   if ||g^k|| <= delta then
      输出x^k, 停止
   end if
   选取步长 a_k > 0
   更新x^(k+1) = x^k - a_k g^k
```

# 步长选择与线搜索
例如对于问题：
$$
f(x_{1},x_{2}) = \frac{1}{2}(x_{1}^{2} +10x_{2}^{2}),\qquad  L = 10
$$
梯度下降为：
$$
x_{1}^{k+1} = (1-\alpha)x_{1}^{k}, \quad x_{2}^{k+1} = (1-10\alpha)x_{2}^{k}
$$

如何协调两个跨度不同变量之间的步长大小：
## 四类步长策略
- 常数步长：
若已知f为L-光滑，理论上取$\alpha \le \frac{1}{L}$

- 精确线搜索
$$
\alpha_{k} \in argmin_{\alpha \ge 0} f(x^{k}-\alpha \nabla f(x^{k}))
$$

- 非精确线搜索(Armijo)
不要求一步最优，只要求函数值有“足够下降”
$$
f(x^{k}-\alpha\nabla f(x^{k})) \le f(x^{k})-c_{1}\alpha||\nabla f(x^{k})||^{2}
$$
若不满足，则令$\alpha = \beta \alpha$回溯。
其中$c_{1}$用来规定要求的最小下降量。

- 递减步长
$$
\alpha_{k} = \frac{\alpha_{0}}{(k+1)^{p}}, \qquad 0 \le p\le 1
$$

## Armijo充分下降条件
取参数$c_{1} \in (0, 1)$。若：
$$
f(x^{k}) - f(x^{k}-\alpha\nabla f(x^{k})) \ge c_{1}\alpha ||\nabla f(x^{k})||^{2}
$$
则称步长$\alpha$满足Armijo条件。
即函数值至少要降到与$\alpha$成比例的梯度能量那么多
![](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/Snipaste_2026-05-07_11-10-36.png)

**Armijo算法框架**:
输入：当前点$x^{k}$, 初值$\hat{\alpha} > 0$，参数$c_{1} \in (0,1)$, $\beta \in (0, 1)$

```
令a = a'
while f(x^k - a f'(x^k)) > f(x^k) - c_1 a||f'(x^k)||^2 do
   a = \beta a
end while
输出a_k = a
```

# 光滑性与收敛性分析
## 梯度Lipschitz与L-光滑
**梯度Lipschitz连续：**
设f:$R^{n} \rightarrow R$连续可微。若存在常数L > 0使得
$$
||\nabla f(x) - \nabla f(y)|| \le L||x-y||
$$
则称$\nabla f$为L-Lipschitz连续的，也称其为L-光滑的
直观形容即是：
**函数f的梯度变化速度有上界L。**

等价刻画：
若f为L-光滑，即对于所有的x，y都有：
$$
f(y) \le f(x) + \nabla f(x)^{T}(y-x) + \frac{L}{2}||y-x||^{2}
$$

**充分下降引理：**
设f为L-光滑。对于任意的x$\in R^{n}$与任意步长$\alpha > 0$，令$x^{+} = x - \alpha\nabla f(x)$.则：
$$
f(x^{+}) \le f(x) - \alpha(1-\frac{L\alpha}{2})||\nabla f(x)||^{2}
$$
当$0 < \alpha < \frac{2}{L}$时，记M = $\alpha\left(1-\frac{L\alpha}{2}\right)> 0$，有：
$$
f(x^{+}) \le f(x) - M||\partial f(x)||^{2}
$$

**证明：**
由L-光滑的二次上界，取$x^{+} = x - \alpha \partial f(x)$:
$$
f(x^{+}) \le f(x) + \partial f(x)^{T}(x^{+}-x) + \frac{L}{2}||x^{+} - x||^{2}
$$
代入$x^{+} - x = -\alpha \partial f(x)$:
$$
\begin{aligned}
\partial f(x)^{T}(x^{+} - x) &= -\alpha ||\partial f(x)||^{2}\\
||x^{+} - x||^{2} &= \alpha^{2}||\partial f(x)||^{2}
\end{aligned}
$$
代回原式整理得到：
$$
\begin{aligned}
f(x^{+}) &\le f(x) - \alpha ||\partial f(x)||^{2} + \frac{L\alpha^{2}}{2}||\partial f(x)||^{2} \\
&= f(x) - \alpha(1-\frac{L\alpha}{2})||\partial f(x)||^{2}
\end{aligned}
$$

## L-光滑的收敛速度：
### 凸+L-光滑
**定理：**
设函数$f$凸且L-光滑，存在极小点$x^{*}$。取常数步长$0 < \alpha \le \frac{1}{L}$，则：
$$
f(x^{k}) - f(x^{*}) \le \frac{||x^{0} - x^{*}||^{2}}{2\alpha k}
$$
**结论：至多$O(\frac{1}{\delta})$步可使$f(x^{k}) - f(x^{*}) \le \delta$，即收敛速度为$O(\frac{1}{k})$**

### 非凸有下界
设f为L-光滑且$f^{*} = inf_{X}f(x) > -\infty$。取常数步长$0 < \alpha < \frac{2}{L}$,则有：
$$
min_{0 \le i < k}||\partial f(x^{i})||^{2} \le \frac{f(x^{0}) - f^{*}}{(k+1)M}
$$
其中$M = \alpha (1-\frac{L\alpha }{2})$

**结论：至多$O(\frac{1}{\delta^{2}})$步可使得$min_{i}||\partial f(x^{i})|| \le \delta$，即近似驻点。**

### 强凸+L-光滑
**强凸函数：**
f称为$\mu$-强凸函数，若对于任意x，y都有：
$$
f(y) \ge f(x) + \nabla f(x)^{T}(y-x)+\frac{\mu}{2}||y-x||^{2}
$$
相较于普通凸性，其下界要求更严格：
- 普通凸性只要求函数在切平面之上；
- 强凸要求函数至少在一个二次下界之上。

**强凸与光滑函数：**
若f同时$\mu$-强凸且$L$-光滑，则对任意x,y有：
$$
\begin{aligned}
f(x) + \partial f(x)^{T}(y-x) + \frac{\mu}{2}||y-x||^{2} \le f(y)\\
\le f(x) + \partial f(x)^{T}(y-x) + \frac{L}{2}||y-x||^{2}
\end{aligned}
$$
即对于函数的上下界同时进行约束

**梯度范数控制函数值差：**
引理——强凸给出梯度下界：
若f为$\mu$-强凸且可微，记$f^{*} = min_{x}f(x)$，则：
$$
||\partial f(x)||^{2} \ge 2\mu (f(x) - f^{*})
$$
理解：
即将强凸的二次下界关于y最小化。

#### 线性收敛定理
设f为$\mu$-强凸且$L$-光滑，取梯度下降步长为$\alpha = \frac{1}{L}$。则：
$$
f(x^{k}) - f^{*} \le (1-\frac{\mu}{L})(f(x^{0}) - f^{*})
$$
- 误差每次是乘以固定比例
- **收敛因子为$1 - \frac{\mu}{L}$**，严格小于1
故为线性收敛









