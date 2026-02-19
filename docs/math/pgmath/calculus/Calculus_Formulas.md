---
title: Calculus Formula Sheet
date: 2026-02-19
category: Math
published: true
skills_cloud: ["微积分", "导数", "积分", "极限"]
---

# 微积分公式速查表

## 1. 极限 Limits

### 基本极限

$$\lim_{x \to 0} \frac{\sin x}{x} = 1$$

$$\lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}$$

$$\lim_{x \to 0} (1 + x)^{1/x} = e$$

$$\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e$$

$$\lim_{x \to 0} \frac{e^x - 1}{x} = 1$$

$$\lim_{x \to 0} \frac{\ln(1+x)}{x} = 1$$

### 等价无穷小（$x \to 0$）

| 函数 | 等价 |
|------|------|
| $\sin x$ | $x$ |
| $\tan x$ | $x$ |
| $\arcsin x$ | $x$ |
| $\arctan x$ | $x$ |
| $1 - \cos x$ | $\dfrac{x^2}{2}$ |
| $e^x - 1$ | $x$ |
| $\ln(1+x)$ | $x$ |
| $(1+x)^\alpha - 1$ | $\alpha x$ |

---

## 2. 导数 Derivatives

### 求导法则

**线性法则：**
$$(af + bg)' = af' + bg'$$

**乘积法则：**
$$(fg)' = f'g + fg'$$

**商法则：**
$$\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$$

**链式法则：**
$$\frac{d}{dx}f(g(x)) = f'(g(x)) \cdot g'(x)$$

### 基本导数公式

| 函数 $f(x)$ | 导数 $f'(x)$ |
|------------|-------------|
| $c$（常数）| $0$ |
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $a^x$ | $a^x \ln a$ |
| $\ln x$ | $\dfrac{1}{x}$ |
| $\log_a x$ | $\dfrac{1}{x \ln a}$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |
| $\cot x$ | $-\csc^2 x$ |
| $\sec x$ | $\sec x \tan x$ |
| $\csc x$ | $-\csc x \cot x$ |
| $\arcsin x$ | $\dfrac{1}{\sqrt{1-x^2}}$ |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1-x^2}}$ |
| $\arctan x$ | $\dfrac{1}{1+x^2}$ |

### 高阶导数

**莱布尼茨公式：**
$$(fg)^{(n)} = \sum_{k=0}^{n} \binom{n}{k} f^{(k)} g^{(n-k)}$$

**常见高阶导数：**

$$(\sin x)^{(n)} = \sin\!\left(x + \frac{n\pi}{2}\right)$$

$$(\cos x)^{(n)} = \cos\!\left(x + \frac{n\pi}{2}\right)$$

$$(x^n)^{(n)} = n!$$

---

## 3. 微分中值定理

**罗尔定理：** 若 $f$ 在 $[a,b]$ 连续，$(a,b)$ 可微，且 $f(a)=f(b)$，则 $\exists\, c \in (a,b)$，使 $f'(c)=0$。

**拉格朗日中值定理：**
$$f(b) - f(a) = f'(c)(b-a), \quad c \in (a,b)$$

**柯西中值定理：**
$$\frac{f(b)-f(a)}{g(b)-g(a)} = \frac{f'(c)}{g'(c)}, \quad c \in (a,b)$$

**洛必达法则**（$\frac{0}{0}$ 或 $\frac{\infty}{\infty}$ 型）：

$$\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}$$

---

## 4. 泰勒展开 Taylor Series

$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n$$

**麦克劳林展开（$a=0$）常用公式：**

$$e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$

$$\sin x = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots$$

$$\cos x = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!} = 1 - \frac{x^2}{2} + \frac{x^4}{24} - \cdots$$

$$\ln(1+x) = \sum_{n=1}^{\infty} \frac{(-1)^{n-1} x^n}{n} = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots \quad (-1 < x \le 1)$$

$$(1+x)^\alpha = 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!}x^2 + \cdots \quad (-1 < x < 1)$$

$$\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n = 1 + x + x^2 + x^3 + \cdots \quad (|x| < 1)$$

---

## 5. 不定积分 Indefinite Integrals

### 基本积分公式

| 被积函数 | 积分结果 |
|---------|---------|
| $x^n$（$n \ne -1$）| $\dfrac{x^{n+1}}{n+1} + C$ |
| $\dfrac{1}{x}$ | $\ln|x| + C$ |
| $e^x$ | $e^x + C$ |
| $a^x$ | $\dfrac{a^x}{\ln a} + C$ |
| $\ln x$ | $x\ln x -x +C$ |
| $x\ln x$ | $\dfrac{x^2}{2} \ln x - \dfrac{x^2}{4} +C$ |
| $\sin x$ | $-\cos x + C$ |
| $\cos x$ | $\sin x + C$ |
| $\sec{x}$ | $\ln{|\sec x + \tan x|} +C$ |
| $\csc x$ | $\ln{|\csc x - \cot x |} + C$ |
| $\tan x$ | $-\ln|\cos x| + C$ |
| $\cot x$ | $\ln|\sin x| + C$ |
| $\sec^2 x$ | $\tan x + C$ |
| $\csc^2 x$ | $-\cot x + C$ |
| $\sec x \tan x$ | $\sec x + C$ |
| $\csc x \cot x$ | $-\csc x + C$ |
| $\tan^2 x$ | $\tan x -x +C$ |
| $\cot^2 x$ | $-\cot x -x +C$ |
| $I_n = \sec^n x$ | $\cfrac{1}{n-1} \bigg( \tan x \sec^{n-2}x + (n-2)\cdot I_{n-2}\bigg)$ |
| $\arcsin x$ | $x\arcsin x +\sqrt{1-x^2} +C$ |
| $\arctan x$ | $x\arctan x + \ln {(1+x^2)} +C$ |
| $\dfrac{1}{\sqrt{1-x^2}}$ | $\arcsin x + C$ |
| $\dfrac{1}{1+x^2}$ | $\arctan x + C$ |
| $\dfrac{1}{\sqrt{x^2 \pm a^2}}$ | $\ln\!\left|x + \sqrt{x^2 \pm a^2}\right| + C$ |
| $\dfrac{1}{\sqrt{a^2-x^2}}$ | $\arcsin \dfrac{x}{a} + C$ |
| $\dfrac{1}{a^2+x^2}$ | $\dfrac{1}{a} \arctan \dfrac{x}{a} + C$ |
| $\dfrac{1}{a^2 - x^2}$ | $\dfrac{1}{2a} \ln \left|{\dfrac{x+a}{x-a}}\right| +C$ |
| $\dfrac{1}{x^2 - a^2}$ | $\dfrac{1}{2a} \ln \left|{\dfrac{x-a}{x+a}}\right| +C$ |
| $\sqrt{a^2-x^2}$ | $\dfrac{a^2}{2} \arcsin \dfrac{x}{a} + \dfrac{x}{2}\sqrt{a^2 -x^2} +C$ |
| $\sqrt{a^2+x^2}$ | $\dfrac{a^2}{2} \ln {(x + \sqrt{x^2 + a^2})}  +\dfrac{x}{2}\sqrt{a^2 + x^2}+C$ |

### 积分法则

**分部积分：**
$$\int u \, dv = uv - \int v \, du$$

**换元法（第一类）：**
$$\int f(g(x)) g'(x) \, dx = \int f(u) \, du, \quad u = g(x)$$

**换元法（第二类）：**
$$\int f(x) \, dx \xrightarrow{x = \varphi(t)} \int f(\varphi(t))\,\varphi'(t) \, dt$$

### 通解

- $$\int\dfrac{A}{(x-k)^{\alpha}}\, dx = \begin{cases}A \ln |x-k| +C& \alpha =1 \\ \dfrac{A}{(1-\alpha)(x-k)^{\alpha-1}} &  \alpha > 1\end{cases} $$
- $$\int\dfrac{Ax+B}{(x^2+\mu x +\nu)^{\alpha}}\, dx$$

---

## 6. 定积分 Definite Integrals

### 微积分基本定理

**第一基本定理（牛顿-莱布尼茨公式）：**
$$\int_a^b f(x) \, dx = F(b) - F(a), \quad F' = f$$

**第二基本定理：**
$$\frac{d}{dx} \int_a^x f(t) \, dt = f(x)$$

**变上限求导：**
$$\frac{d}{dx} \int_a^{g(x)} f(t) \, dt = f(g(x)) \cdot g'(x)$$

### 常用性质

$$\int_a^b f(x) \, dx = -\int_b^a f(x) \, dx$$

$$\int_a^b [f(x) \pm g(x)] \, dx = \int_a^b f(x) \, dx \pm \int_a^b g(x) \, dx$$

$$\int_{-a}^{a} f(x) \, dx = \begin{cases} 2\displaystyle\int_0^a f(x)\,dx & f \text{ 为偶函数} \\ 0 & f \text{ 为奇函数} \end{cases}$$

**周期性质**

$$\int_a^{a+T} f(x) \, dx = \int_0^{T} f(x)\, dx$$

$$\int_0^{nT} f(x)\, dx = n\int_0^{T} f(x)\, dx$$

**区间再现**

$$\int_{a}^{b} f(x)\, dx = \int_a^b f(a+b-x) \, dx$$

$$\int_0^{\pi} x\cdot f(\sin x)\, dx = \dfrac{\pi}{2}\int_0^{\pi} f(\sin x) \, dx$$

**Wallis 公式：**
$$\int_0^{\pi/2} \sin^n x \, dx = \int_0^{\pi/2} \cos^n x \, dx = \begin{cases} \dfrac{(n-1)!!}{n!!} \cdot \dfrac{\pi}{2} & n \text{ 为偶数} \\[6pt] \dfrac{(n-1)!!}{n!!} & n \text{ 为奇数} \end{cases}$$

### 常用定积分结果

$$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2} \quad \text{（高斯积分）}$$

$$\int_0^{\pi} x f(\sin x) \, dx = \frac{\pi}{2} \int_0^{\pi} f(\sin x) \, dx$$

---

## 7. 反常积分 Improper Integrals

$$\int_a^{+\infty} f(x) \, dx = \lim_{b \to +\infty} \int_a^b f(x) \, dx$$

$$\int_a^b f(x) \, dx = \lim_{\varepsilon \to 0^+} \int_{a+\varepsilon}^b f(x) \, dx \quad \text{（}x=a \text{ 为奇点）}$$

**p 级数收敛判断：**

$$\int_1^{+\infty} \frac{1}{x^p} \, dx \begin{cases} \text{收敛} & p > 1 \\ \text{发散} & p \le 1 \end{cases}$$
