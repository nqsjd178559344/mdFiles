// todo 考虑bigInt
function numberThousands(count, separator = ",") {
  if (isNaN(Number(count))) return;
  let _count = count + "";
  let result = "";
  while (_count.length > 0) {
    result = separator + _count.slice(-3) + result;
    _count = _count.slice(0, -3);
  }

  return result.slice(1);
}

// => '1,234,567,898'
const res = numberThousands(1234567898);
console.log(res, "res");

//=> '123'
const res1 = numberThousands(123);
console.log(res1, "res1");

//=> '1,234,567'
const res2 = numberThousands(1234567);
console.log(res2, "res2");

// todo bigInt显示错误
// => '123,456,789,876,543,210'
const res4 = numberThousands(12345678987654321);
console.log(res4, "res4");
