---
tags:
  - 优化理论与算法
author: 薛彬
title: 随机梯度算法，Mini-batch与Adam算法
description: 随机梯度，Mini-batch与Adam算法
pubDatetime: 2026-07-04
---

# 随机梯度
## 全梯度的瓶颈
对于全梯度下降：
$$
f(w) = \frac{1}{n}\sum\limits_{i=1}^{n}f_{i}(w)
$$
每次更新参数都需要遍历全部的n个样本，当n很大时，一次全梯度的代价就会很高。

对于固定数据集：一次全梯度的更新太贵；
对于在线数据：完整数据或真是分布无法一次性看完。

## 在线数据中的优化目标
在线情境下，关心的是未来数据的长期平均表现，而不是某个固定训练集上表现良好。
$$
min_{w}F(w) = E_{\delta}[l(w;\delta)]
$$
- $\delta$表示一次随机出现的数据或环境结果
- $l(w;\delta)$表示模型参数w在此次样本上的损失
- E表示对未来可能出现的样本取平均

## GD与SGD
GD:使用全部样本
$$
w^{k+1} = w^{k} - \alpha_{k}(\frac{1}{n} \sum\limits_{i=1}^{n}\partial f_{i}(w^{k}))
$$
SGD:使用一个样本
$$
w^{k+1} = w^{k} - \alpha_{k}\partial f_{ik}(w^{k})
$$
每步成本较低，但方向噪音大

## Minibatch更新
每次使用一小批样本进行更新
$$
w^{k+1} = w^{k} - \alpha_{k}(\frac{1}{|B_{k}|}\sum\limits_{i \in B_{k}}\partial f_{i}(w^{k}))
$$
计算效率和稳定性方面均比较折中

