function fibonacci(max, fib1 = 1, fib2 = 2, result = []) {
  if (fib1 >= max) return result;
  result.push(fib1);
  return fibonacci(max, fib2, fib1 + fib2, result);
}

const res = fibonacci(100);
