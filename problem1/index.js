function sum_to_n_loop(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
  }
  function sumToNWhile(n) {
    let sum = 0;
    let i = 1;
    
    while (i <= n) {
      sum += i;
      i++;
    }
    
    return sum;
  }
  
  
  function sum_to_n_recursion(n) {
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n_recursion(n - 1);
  }