# 引入：
对于之前使用的斐波那契堆，红黑树，优先队列，B树，他们对于N个元素的排序操作，其时间复杂度的下界均为O(NlogN)。
考虑类比[[排序算法]]中的计数排序，通过利用附加属性，在限定的范围内对于有限个元素进行排序，以实现O(N+K)的线性时间复杂度。

下面介绍几种判断元素X是否存在于动态集合S中的方法：
# 基本方法：
## 直接寻址：
维护一个u位的位向量数组，判断一个元素是否在集合中出现，即看对应位置的元素是否为1。这样的INSERT，DELETE，MEMBER操作时间复杂度均为O(1), 但是SEARCH操作为O(N)
## 叠加的二叉树结构：
想要知道整个数组中是否存在某个元素。
- 使得位向量的每一个元素都作为二叉树的一个叶子结点，使用0或1来表示对应的位置索引是否存在。
   例如对于数组\[2,3,4,5,7\]，叶子层设置为：

| A     | 0   | 0   | 1   | 1   | 1   | 1   | 0   | 1   | 0   |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| INDEX | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   |

向上的每一个结点均为两个子节点的逻辑或结果。
- 查找最小元素：从树根开始总是走最左边包含1的路径直至叶节点。
- 查找最大元素：从树根开始总是走最右边包含1的路径直至叶节点。
- 查找x的后继：从x的叶节点开始，向上走，直至从左侧进入一个结点，同时其右孩子z为1。从z开始查找子树的最小元素。
**时间复杂度为O(lgu)**
```c++
层级 3 (根) :                     [1]
                                 /   \
层级 2 :                      [1]     [1]
                            /   \    /   \
层级 1 :                  [1]   [0] [1]   [1]
                         / \    / \ / \   / \
层级 0 (原始位向量):      0   1  0  0 1 0  1   1
                        0   1  2  3 4 5  6   7  (索引)
```
## 叠加一颗高度恒定的树
对于给定大小范围<= u的元素列表。假设全域的大小u = $2^{2k}$，对于位向量叠加一个高度为$\sqrt u$的树。
故深度为1的$\sqrt u$个结点定义了一个summary数组，用来表示其子数组中是否存在1。
对于summary\[i\]对应的子数组，称为第i个**簇**。
对于位A\[x\]，其出现在簇号为$\frac{x}{\sqrt u}$的 簇中。
- 插入操作：置A\[x\]与summary\[$\frac{x}{\sqrt u}$\]为1，时间复杂度为O(1)。
- 查询最值：现在summary数组中查询最左or最右位置，再在对应簇中查询最左or最右位置。
- 查找x的后继or前驱：先在x的簇内部向右or向左查找。若无结果，令i = $\frac{x}{\sqrt u}$,在summary数组中向右or向左查找。
- 删除操作：将A\[x\]置为0，再将summary\[$\frac{x}{\sqrt u}$\]重新改为簇中元素的逻辑或结果。
操作至多对两个簇进行查找，即时间复杂度最多为O($\sqrt u$)。
# 递归结构
类比于“叠加固定高度树的方法”，进行进一步的延申，$u^\frac{1}{2}$中包含$u^\frac{1}{4}$的结构......依此类推。按照平方根的规模缩减问题的集域，最终降到项数为2时为止。
先假设u = $2^{2^{k}}$。
目标是达到O(lglgN)的时间复杂度，考虑递归式为：
$$
T(u) = T(\sqrt u) + O(1)
$$
解得T(u) = O(lglgN)。
现将u代入为$2^{m}$，得到递推式：
$$
T(2^{m}) = T\left(2^{\frac{m}{2}}\right)+ O(1)
$$
另一种考虑思路为：
递归数据结构的全域大小为：
$$
u, u^{\frac{1}{2}}, u^{\frac{1}{4}}, u^{\frac{1}{8}} .....
$$
顶层需要lgN来存储位数，又总共需要递归lgN层，故总的时间复杂度为O(lglgN)。
现对于元素的具体位置，定义若干函数：
- high(x) = \[x/ $\sqrt u$\]，x的最高(lgu)/2位，即x的簇号。
- low(x) = x mod $\sqrt u$，x在簇中的索引位置。
- index(x, y) = x$\sqrt u$ + y，有恒等式：x = index(high(x), low(x))。
## proto-vEB结构
理解为vEB结构的简化版，具体结构如下：
protovEB(u):
-- u: 全域大小
-- clusters：长度为$\sqrt u$的数组，每一个元素都是一个proto-vEB($\sqrt u$)的结构
\-\- summary: 一个proto-vEB($\sqrt u$)结构，用来记录哪些clusters非空。

**基本操作：**
- **查找元素是否存在：**
  1，计算cluster号：i = high(x)
  2，计算内部位置：j = low(x)
  3，递归调用cluster\[i\].member(j)
- **查找最小元素：**
  1，找到summary中第一个非空的cluster
  2，在cluster中找到对应的最小值：j = cluster\[i\].minimun()
  3，返回i * $\sqrt u$ + j
  分析：由于每次都两次调用proto-vEB结构，所以有递归式：
   $T(u) = 2T(\sqrt u) + O(1)$。所以解得T(u) = O(lgu)
- **查找后继：**
    1，先计算i = high(x), j = low(x)
    2，在cluster\[i\]中查找j的后继。若不存在，则继续在i的后继cluster中查找最小元素。
    分析：最坏情况下，也需要递归两次，即时间复杂度为O(lg u)
- **插入：**
    1，计算i = high(x), j = low(x)
    2，递归调用cluster\[i\].insert(j)。
    3，递归调用summary.insert(i)。
    分析：依然使用两次递归，时间复杂度为O(log u)
- **删除：**
    1，计算i =high(x), j = low(x)
    2，递归调用cluster\[i\].delete(j)
    3，若当前cluster\[i\]为空，则递归调用summary.delete(i)
    分析：时间复杂度仍为O(log u)

# vEB树及其操作：
## 基本概念
对比原型的改进，即是**在对应的结点中添加其子树中元素的最值信息**。**将递归的结构数量缩减至1次。**
vEB树对比proto-vEB树所增加的属性：
- min值大小
- max值大小
其中min值并不存储在任何递归的vEB树中，为单独存放。
即vEB树中存储的元素包括：
- 树V中存储的元素min
- V.cluster\[0......$\sqrt u - 1$\]所指向的元素。
![|514x362](https://cdn.jsdelivr.net/gh/ayas12319/picture-bed@main/img/20260220173904509.png)
这种设置的好处：
- 以O(1)的复杂度实现提取最值的操作
- 避免用于判断x的后继是否在high(x)中的递归调用：
    当且仅当x严格小于high(x)簇的max时，x的后继位于high(x)簇中
- 用与判断树是否为空，有一个元素，或有大于等于2个元素。
由于每次操作只需递归检查一次，故实现O(lglg u)的时间复杂度
## vEB树的操作
### 查找操作：
- **查找最小元素和最大元素：**
    ```c++
    vEB-Tree minimum(v){
      return v.min;
    }
    
	vEB-Tree maximum(v){
	  return v.max;
	}
    ```
- **判断值是否在集合中：**
    ```c++
    vEB-Tree member(v, x){
       if (x == v.min || x  == v.max)
        return true;
       else if(v.u == 2)
        return false;
       else return vEB-Tree(v.cluster[high(x)], low(x));
    }
    ```
此时的时间复杂度为O(lglg u)
- **查找前驱与后继：**
    ```c++
    vwb-tree successor(v, x){
      if x < v.min
       return v.min;
      int i = high(x);
      if low(x) < v.cluster[i].max{
         j = successor(v.cluster[i], low(x));
         return index(i, j);
       }
       else{
        i' = succesor(v.summary[i], high(x));
        if i' == null
          return null;
        j' = v.cluster[i'],min;
        return index(i', j');
       }
    }
    ```
- **插入一个元素：**
    ```c++
    ## 若簇中没有一个元素时
    veb-tree insert-empty(v, x){
     v.min = x;
     v.max = x;
    }
    
    ## x不在树中的insert操作代码：
    veb-tree insert(v, x){
     if v.min == null
        insert-empty(v, x);
     else if x < v.min
         exchange(x, v.min);
         if v.u > 2
            if minimum(v.cluster[high(x)]) == null
                insert(v.summary, high(x));
                insert-empty(v.cluster[high(x)], low(x));
            else insert(v.cluster[high(x)], low(x));
        if x > v.max
           v.max = x;
    }
    ```
- **删除一个元素：**
    ```c++
    delete(v, x){
       if (v.min == v.max){
        v,min == null;
         v.max == null;
       }
       else if(v.u == 2){    //对于基本情况，只剩余0，1索引被管理
         if (x == 0)
             v.min = 1;
         else v.min = 0;
         v.max = v.min;
       }
       else if (x == v.min){ //因为min实际不在簇中，需要从簇中找到最小值赋值给v.min后，删除min
         first-cluster = minimum(v.summary);
         x = index(first-cluster, minimum(v.cluster[first-cluster]));
         v.min = x;
         delete(v.cluster[high(x)], low(x));
       }
       if (minimum(v.cluster[high(x)]) == null) {  //删除后，检查所在簇是否变为空，并处理max的赋值
          delete(v.summary, high(x));
          if (x == v.max){
             summary-max = maximum(v.summary);
             if (summary-max == null) //结构v中此时只有一个元素。
                v.max = v.min;
             else v.max = index(summary-max, maximum(v.cluster[summary-max]));
          }
       }
       else if(x == v.max){  //簇为变空，删除的是最大值
         v.max = index(high(x), maximum(v.cluster[high(x)]));
       }
    }
    ```
    