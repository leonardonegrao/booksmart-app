export function getFunctionTime(fn: any, name: string, isAsync: boolean = false, ...args: any[]) {
  const startTime = performance.now();

  if (isAsync) {
    return fn(...args).then(() => {
      const endTime = performance.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(4);
      console.log(`${name} ran in ${timeTaken} seconds`);
    });
  }
  
  fn(...args);

  const endTime = performance.now();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(4);
  console.log(`${name} ran in ${timeTaken} seconds`);
}
