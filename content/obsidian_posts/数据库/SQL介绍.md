# 查询：
**用于字符串比较的匹配操作符：**
%：匹配任意长度的任意子字符串
_ : 匹配任意单个字符

**按序排列：**
DESC：降序排列
ASC：升序排列（默认）

**集合操作：**
1，UNION:
```sql
(select sname from depo)
UNION
(select cname from borro)
```
2,Interset:
```
(select sname from depo)
INTERSET
(select cname from borro)
```
3,MINUS:
```
(select sname from depo)
MINUS
(select cname from borro)
```
4,聚合函数：
AVG(), SUM(), MIN(), MAX(), SUM(), 
COUNT(\*)：会包括空值
COUNT(DISTINCT cname)：该列中不同且**非空**的值的数目

5，分组：
GROUP BY 函数，对该列进行分组。
分组之后，需要使用having判别筛选条件

6，IN关键字：
用来判断某值是否在该集合中。
IN 或使用 NOT IN

7，SOME关键字：
对于集合内的某值是否符合条件：
eg：5 < some （0， 5， 6） = true
ALL关键字同理。

8，不等于号：<>

9，EXITS 与NOT EXITS只返回逻辑真或假。
A exits B——A是否存在于B

**双重NOT EXITS语句：**
**没有一门课是A不选修的：**
```SQL
SELECT SNAME
FROM STUDENT
WHERE NOT EXITS(
SELECT * FROM CLASSES
WHERE NOT EXITS (
SELECT * FROM SC
WHERE SNO = STUDENT.SNO AND CNO = CLASSES.CNO))
```
即选择主体NOT EXITS---》对象NOT EXITS----》符合条件的对象

10，返回排名函数：
```
RANK() OVER(ORDER BY 根据[ASC/DESC]) AS 排名
```
11，左右连接：
左连接：FROM后的表 + join的表所匹配的行；
右连接：join的表 + FROM后的表所匹配的行；
写法：
**左连接：**
```
SELECT *  FROM 左表，右表
WHERE 左表.字段 = 右表（+）；
```
右连接：
```
SELECT * FROM 左表，右表
WHERE 左表.字段（+）= 右表.字段
```

