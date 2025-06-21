def bisection_method(f, a, b, tol=1e-6, max_iter=100):
    """
    Find root of f(x)=0 in [a, b] using the bisection method.
    """
    if f(a) * f(b) >= 0:
        raise ValueError("f(a) and f(b) must have opposite signs.")

    for i in range(max_iter):
        c = (a + b) / 2.0
        if abs(f(c)) < tol or (b - a) / 2 < tol:
            return c
        if f(a) * f(c) < 0:
            b = c
        else:
            a = c
    raise RuntimeError("Maximum iterations reached without convergence.")

# Example usage:
if __name__ == "__main__":
    def func(x):
        return x**3 - x - 2

    root, iterations = bisection_method(func, 1, 2)
    print(f"Root: {root}")
    print(f"Iterations: {iterations}")