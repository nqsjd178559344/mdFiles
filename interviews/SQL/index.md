```sql
-- 1. 有一张名为 employees 的表，包含字段 employee_id（员工编号，主键），employee_name（员工姓名），department（部门），salary（薪资）。编写 SQL 语句查询所有员工的姓名和薪资。
    SELECT employee_name,salary FROM employees

-- 2. 条件查询：基于employees表，查询部门为'Sales'且薪资大于 5000 的员工姓名和薪资。
    SELECT employee_name,salary FROM employees WHERE employee_name = 'Sales' AND salary > 5000

-- 3. 排序查询：在employees表中，按照薪资从高到低的顺序查询所有员工的信息。
    SELECT * FROM employees ORDER BY salary DESC

-- 4. 分组统计：orders表记录了订单信息，包含字段order_id（订单编号，主键），customer_id（客户编号），order_date（订单日期），order_amount（订单金额）。编写 SQL 语句统计每个客户的订单总金额，并按总金额从高到低排序。
    SELECT customer_id, SUM(order_amount) AS total_amount FROM orders GROUP BY customer_id ORDER BY total_amount desc

-- 5. 多表连接：有两张表，customers表包含字段customer_id（客户编号，主键），customer_name（客户姓名），contact_number（联系电话）；orders表包含字段order_id（订单编号，主键），customer_id（客户编号），order_date（订单日期），order_amount（订单金额） 。查询每个客户及其对应的订单信息（包括没有订单的客户）。
    SELECT
    customers.customer_name,
    orders.order_id,
    orders.order_date,
    orders.order_amount,
    FORM customers LEFT JOIN orders ON customers.customer_id = orders.order_id

-- 6. 基于employees表，查询薪资高于平均薪资的员工信息。
    SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees)

-- 7. 已知students表，包含字段student_id（学生编号，主键）、student_name（学生姓名）、course（选修课程）。要求查询出所有学生选修过的课程，且课程不能重复。
    SELECT DISTINCT course FROM students

-- 8. 在employees表中，字段有employee_id（员工编号，主键）、employee_name（员工姓名）、job_title（职位）。查询职位中包含 “Manager” 的员工姓名和职位。
    SELECT employee_name,job_title FROM employees WHERE job_title LIKE '%Manager%'

-- 9. 有departments表（department_id，department_name）和employees表（employee_id，employee_name，department_id，salary）。查询每个部门的名称以及该部门的员工总人数和平均薪资。
    SELECT d.department_name, COUNT(e.employee_id),AVG(e.salary) FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id GROUP BY d.department_name

-- 10. 在products表中，有字段product_id（产品编号，主键）、product_name（产品名称）、price（价格）。查询价格排名前三的产品信息。
    SELECT * FROM products WHERE price IN (SELECT DISTINCT price FROM products ORDER BY price DESC LIMIT 3)

-- 11. 在scores表中，存在字段student_id（学生编号，主键）、course_name（课程名称）、score（成绩）。现在需要查询成绩在 80（含）到 90（含）之间的学生编号和对应的课程名称与成绩。
    SELECT * FROM scores WHERE course_name BETWEEN 80 AND 90

-- 12. orders表包含字段order_id（订单编号，主键）、customer_id（客户编号）、order_date（订单日期，格式为 'YYYY - MM - DD'）、order_amount（订单金额）。要求查询出在 2024 年 1 月 1 日之后（包含当天）的所有订单信息。
    -- SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND NOW
    SELECT * FROM orders WHERE order_date >= '2024-01-01'

-- 13. 有products表（product_id，product_name，category，price）和category_stats表（category，avg_price）。category_stats表用于存储每个产品类别的平均价格。现在需要根据products表中的数据更新category_stats表中的平均价格。
    UPDATE category_stats SET avg_price = (SELECT AVG(price) FROM products WHERE products.category = category_stats.category)

-- 14. 假设有 customers 表（customer_id，customer_name，contact_email）、orders表（order_id，customer_id，order_date，order_status）、order_items表（order_id，product_id，quantity）以及 products 表（product_id，product_name，product_price，category）。需要查询出在 2024 年有过已完成订单（order_status 为 'completed'），且购买过电子产品类（category 为 'Electronics'）产品的客户的姓名和联系邮箱。
    SELECT DISTINCT customers.customer_name,customers.contact_email
    FORM customers
    JOIN orders ON customers.customer_id = orders.customer_id
    JOIN order_items ON orders.order_id = order_items.order_id
    JOIN products ON order_items.product_id = products.product_id
    WHERE orders.order_date >= '2024-01-01'
        AND orders.order_date < '2025-01-01'
        AND orders.order_status = 'completed'
        AND products.category = 'Electronics'
```

```sql
--  14题完整sql(MySQL)
    CREATE TABLE customers (customer_id INT AUTO_INCREMENT PRIMARY KEY, customer_name VARCHAR(255),contact_email VARCHAR(255));

    INSERT INTO customers(1,'ALICE','alice@example.com');
    INSERT INTO customers(2,'Bob','bob@example.com');
    INSERT INTO customers(3,'Charlie','charlie@example.com');

    CREATE TABLE orders (order_id INT ,order_date DATE,order_status VARCHAR(255),customer_id INT);

    ALTER TABLE orders ADD CONSTRAINT fk_orders_customers FOREIGN KEY (customer_id) REFERENCES customers (customer_id);

    INSERT INTO orders (101,'2024-03-15','completed',1);
    INSERT INTO orders (102,'2023-12-20','in_progress',2);
    INSERT INTO orders (103,'2024-05-20','completed',1);
    INSERT INTO orders (104,'2024-01-10','completed',3);

    CREATE TABLE order_items (order_id INT ,product_id INT ,quantity INT);
    ALTER TABLE order_items ADD CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders (order_id);
    INSERT INTO order_items (101,201,2);
    INSERT INTO order_items (101,202,1);
    INSERT INTO order_items (103,203,3);
    INSERT INTO order_items (104,204,1);

    CREATE TABLE products (product_id INT ,product_name VARCHAR(255),product_price INT,category VARCHAR(255));
    ALTER TABLE products ADD CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES order_items (product_id);
    INSERT INTO products (201,'Laptop',1000,'Electronics');
    INSERT INTO products (202,'Mouse',50,'Electronics');
    INSERT INTO products (203,'Book',20,'Books');
    INSERT INTO products (204,'Headphones',150,'Electronics');

    SELECT * FROM customers ;
    SELECT * FROM orders;
    SELECT * FROM order_items;
    SELECT * FROM products ;

-- 需要查询出在 2024 年有过已完成订单（order_status 为 'completed'），且购买过电子产品类（category 为 'Electronics'）产品的客户的姓名和联系邮箱。
    SELECT DISTINCT customer_name,contact_email FROM customers
    JOIN orders ON customers.customer_id = orders.customer_id
    JOIN order_items ON order_items.order_id = orders.order_id
    JOIN products ON products.product_id = order_items.product_id
    WHERE orders.order_date >= '2024-01-01' AND orders.order_date < '2025-01-01'
    AND order_status = 'completed'
    AND products.category = 'Electronics'
```

[廖雪峰 SQL 教程](https://liaoxuefeng.com/books/sql/introduction/index.html)
