// 通过一个工厂类来负责创建产品对象，而不需要在使用的地方直接创建。这样可以将对象的创建逻辑封装起来，使得代码更具可维护性和灵活性。在示例中，Factory 类的 createProduct 方法根据传入的参数决定创建哪种具体的产品对象。

class Product {
  constructor(type, price) {
    console.log(`创建了${type}产品，价格是${price}`);
    this.type = type;
    this.price = price;
  }
}
class Factory {
  createProduct(product) {
    if (product === "book") {
      return new Product("book", 20);
    }
    if (product === "phone") {
      return new Product("phone", 5000);
    }
  }
}

// 使用
const factory = new Factory();
const bookProduct = factory.createProduct("book");
const phoneProduct = factory.createProduct("phone");

console.log(bookProduct);
console.log(phoneProduct);
