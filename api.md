#### 接口文档

简化版的商城 API 接口:http://localhost:3000

- 接口代理

为第三方 api 接口调用提供代理服务

```
url
  /api/v2/proxy
method
  post
params
  url   需要请求的api接口地址
  data  post请求传递的数据
  method GET/POST,
  headers
```

- 文件上传

```
url
  /api/v1/common/file_upload
method
  post
params
  file

返回数据
{
  "code": "success",
  "message": "文件上传成功",
  "info": "/uploads/20190221/1550738827910.jpeg"
}
```

- 用户注册

```
url
  /api/v1/auth/reg
method
  post
params
  userName    用户名
  password    密码
  nickName    昵称
  avatar      头像
return
  {
    "code": "success",
    "token": ""
  }
```

- 用户登录

```
url
  /api/v1/auth/login
method
  post
params
  userName  用户名
  password  密码
return
  {
    "code": "success",
    "token": ""
  }
```

- 获取用户信息

```
url
  /api/v1/users/info
method
  get
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
  }
```

- 获取商品信息

```
url
  /api/v1/products
method
  get
params
  per   每一页显示的数量,默认10
  page  当前页码,默认1
  name  商品名字
  product_category  分类id
return
  {
    "totalCount": 14,   // 总记录数量
    "pages": 1,         // 当前页码
    "products": [...]
  }
```

- 根据 id 获取商品详情

```
url
  /api/v1/products/:id
method
  get
return
  {
  }
```

- 加入购物车

```
url
  /api/v1/shop_carts
method
  post
headers
  authorization Bearer token  // 需要提供jwt信息
params
  product   商品id
  quantity  数量(默认值1)
return
  {
    "code": "success",
    "message": "加入购物车成功！"
  }
```

- 获取用户购物车数据

```
url
  /api/v1/shop_carts
method
  get
headers
  authorization Bearer token  // 需要提供jwt信息
return
  []
```

- 删除购物车信息

```
url
  /api/v1/shop_carts/:id
method
  delete
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
  }
```

- 订单提交

```
url
  /api/v1/orders
method
  post
headers
  authorization Bearer token  // 需要提供jwt信息
data
  {
    receiver      收货人
    regions       收货的省市区县
    address       收货地址
    orderDetails
      [{
        quantity  数量
        product   商品id
        price     商品单价
      }]
  }
return
  {
    code: 'success',
    message: '订单保存成功',
    info: {
      ...
    }
  }
```

- 获取订单列表

```
url
  /api/v1/orders
method
  get
headers
  authorization Bearer token  // 需要提供jwt信息
params
  per   每一页显示的数量,默认10
  page  当前页码,默认1
return
  {
    "totalCount": 14,   // 总记录数量
    "pages": 1,         // 当前页码
    "orders": [...]
  }
```

- 根据 id 获取订单详情

```
url
  /api/v1/orders/:id
method
  get
return
  {
  }
```

- 根据 id 删除详情

```
url
  /api/v1/orders/:id
headers
  authorization Bearer token  // 需要提供jwt信息
method
  delete
return
  {
  }
```

- 收货地址列表

```
url
  /api/v1/addresses
method
  get
headers
  authorization Bearer token  // 需要提供jwt信息
params
  per   每一页显示的数量,默认10
  page  当前页码,默认1
return
  {
    "totalCount": 14,   // 总记录数量
    "pages": 1,         // 当前页码
    "addresses": [...]
  }
```

- 获取单条收货地址

```
url
  /api/v1/addresses/:id
method
  get
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
    ... // 收货地址
  }
```

- 收货地址新增

```
url
  /api/v1/addresses
method
  post
headers
  authorization Bearer token  // 需要提供jwt信息
params
{
  receiver    收货人姓名
  mobile      手机号
  regions     地区信息(河南省-郑州市-二七区)
  address     详细地址(航海路1290号)
  idDefault   是否默认(true/false)
}
return
  {
  }
```

- 收货地址修改

```
url
  /api/v1/addresses/:id
method
  put
headers
  authorization Bearer token  // 需要提供jwt信息
params
{
  receiver    收货人姓名
  mobile      手机号
  regions     地区信息(河南省-郑州市-二七区)
  address     详细地址(航海路1290号)
  idDefault   是否默认(true/false)
}
return
  {
  }
```

- 收货地址删除

```
url
  /api/v1/addresses/:id
method
  post
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
  }
```

#### 管理后台

- 用户管理

管理后台登录

> 管理后台默认登录账号密码为 admin,此处管理员信息的管理功能暂未实现

```
url
  /api/v1/auth/manager_login
params
  userName: admin
  password: admin
return
  {
    "code": "success",
    "token": ""
  }
```

获取管理员信息

```
url
  /api/v1/users/manager_info
method
  get
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
  }
```

1. 获取用户列表

```
url
  /api/v1/admin/users
method
  get
params
  per       每一页显示的数量,默认10
  page      当前页码,默认1
  userName  用户名
  nickName  昵称
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
    "totalCount": 14,   // 总记录数量
    "pages": 1,         // 当前页码
    "products": [...]
  }
```

2. 新增用户

```
url
  /api/v1/admin/users
method
  post
params
  userName  用户名
  password  密码
  nickName  昵称
  avatar    头像
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
    "_id": "5c6e953a224d199e15f12b9d",
    "userName": "xiaoming",
    "password": "asdjiy12h1j21787gzcb#134",
    "nickName": "小明明",
    "avatar": "http://l.asdllksad/asd",
    "createdAt": "2019-02-21T12:10:34.346Z",
    "updatedAt": "2019-02-21T12:10:34.346Z",
    "__v": 0
  }
```

3. 修改用户

```
url
  /api/v1/admin/users/5c6e953a224d199e15f12b9d
method
  put
params
  userName  用户名
  nickName  昵称
  avatar    头像
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
    "_id": "5c6e953a224d199e15f12b9d",
    "userName": "xiaoming",
    "password": "asdjiy12h1j21787gzcb#134",
    "nickName": "小明明",
    "avatar": "http://l.asdllksad/asd",
    "createdAt": "2019-02-21T12:10:34.346Z",
    "updatedAt": "2019-02-21T12:10:34.346Z",
    "__v": 0
  }
```

4. 删除用户信息

```
url
  /api/v1/admin/users/5c6e953a224d199e15f12b9d
method
  delete
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
    "_id": "5c6e953a224d199e15f12b9d",
    "userName": "xiaoming",
    "password": "asdjiy12h1j21787gzcb#134",
    "nickName": "小明明",
    "avatar": "http://l.asdllksad/asd",
    "createdAt": "2019-02-21T12:10:34.346Z",
    "updatedAt": "2019-02-21T12:10:34.346Z",
    "__v": 0
  }
```

5. 获取指定用户的信息

```
url
  /api/v1/admin/users/5c6e953a224d199e15f12b9d
method
  get
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
    "_id": "5c6e953a224d199e15f12b9d",
    "userName": "xiaoming",
    "password": "asdjiy12h1j21787gzcb#134",
    "nickName": "小明明",
    "avatar": "http://l.asdllksad/asd",
    "createdAt": "2019-02-21T12:10:34.346Z",
    "updatedAt": "2019-02-21T12:10:34.346Z",
    "__v": 0
  }
```

6. 修改用户密码

```
url
  /api/v1/admin/users/reset_pwd/:id
method
  put
params
  password  密码
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
    "_id": "5c6e953a224d199e15f12b9d",
    "userName": "xiaoming",
    "password": "asdjiy12h1j21787gzcb#134",
    "nickName": "小明明",
    "avatar": "http://l.asdllksad/asd",
    "createdAt": "2019-02-21T12:10:34.346Z",
    "updatedAt": "2019-02-21T12:10:34.346Z",
    "__v": 0
  }
```

7. 获取用户收货地址

```
url
  /api/v1/admin/addresses/:user_id
method
  get
params
  per   每一页显示的数量,默认10
  page  当前页码,默认1
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
    "totalCount": 14,   // 总记录数量
    "pages": 1,         // 当前页码
    "addresses": [...]
  }
```

- 商品管理

1. 获取商品列表

```
url
  /api/v1/admin/products
method
  get
params
  per   每一页显示的数量,默认10
  page  当前页码,默认1
  name  商品名字
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
    "totalCount": 14,   // 总记录数量
    "pages": 1,         // 当前页码
    "products": [...]
  }
```

2. 新增商品信息

```
url
  /api/v1/admin/products
method
  post
params
  name          商品名字
  descriptions  商品简介
  quantity      数量(库存)
  price         价格
  coverImg      主图
  productCategory 商品分类id
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
    "quantity": 89,
    "price": 6999,
    "_id": "5c6e953a224d199e15f12b9d",
    "name": "Apple iPhone X",
    "descriptions": "Apple iPhone X (A1865) 64GB 银色 移动联通电信4G手机",
    "coverImg": "https://img10.360buyimg.com/n7/jfs/t7297/154/3413903491/65679/45ae4902/59e42830N9da56c41.jpg",
    "createdAt": "2019-02-21T12:10:34.346Z",
    "updatedAt": "2019-02-21T12:10:34.346Z",
    "__v": 0
  }
```

3. 修改商品信息

```
url
  /api/v1/admin/products/:id
method
  put
params
  name          商品名字
  descriptions  商品简介
  quantity      数量(库存)
  price         价格
  coverImg      主图
  productCategory 商品分类id
headers
  authorization Bearer token  // 需要提供jwt信息
return
  返回商品信息
  {
    "quantity": 89,
    "price": 6999,
    "_id": "5c6e953a224d199e15f12b9d",
    "name": "Apple iPhone X",
    "descriptions": "Apple iPhone X (A1865) 64GB 银色 移动联通电信4G手机",
    "coverImg": "https://img10.360buyimg.com/n7/jfs/t7297/154/3413903491/65679/45ae4902/59e42830N9da56c41.jpg",
    "createdAt": "2019-02-21T12:10:34.346Z",
    "updatedAt": "2019-02-21T12:10:34.346Z",
    "__v": 0
  }
```

4. 删除商品信息

```
url
  /api/v1/admin/products/:id
method
  delete
headers
  authorization Bearer token  // 需要提供jwt信息
return
  返回商品信息
  {
    "quantity": 191,
    "price": 6999.99,
    "_id": "5c6e965e224d199e15f12b9f",
    "name": "小米9",
    "descriptions": "牛逼的小米9",
    "createdAt": "2019-02-21T12:15:26.669Z",
    "updatedAt": "2019-02-21T12:15:26.669Z",
    "__v": 0
}
```

5. 根据 ID 获取商品信息

```
url
  /api/v1/admin/products/:id
method
  get
headers
  authorization Bearer token  // 需要提供jwt信息
return
  返回商品信息
  {
    "quantity": 191,
    "price": 6999.99,
    "_id": "5c6e965e224d199e15f12b9f",
    "name": "小米9",
    "descriptions": "牛逼的小米9",
    "createdAt": "2019-02-21T12:15:26.669Z",
    "updatedAt": "2019-02-21T12:15:26.669Z",
    "__v": 0
}
```

- 商品分类管理

1. 获取商品分类列表

```
url
  /api/v1/admin/product_categories
method
  get
params
  per   每一页显示的数量,默认10
  page  当前页码,默认1
  name  商品名字
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
    "totalCount": 14,   // 总记录数量
    "pages": 1,         // 当前页码
    "categories": [...]
  }
```

2. 新增商品分类信息

```
url
  /api/v1/admin/product_categories
method
  post
params
  name          商品名字
  descriptions  商品简介
  coverImg      主图
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
  }
```

3. 修改商品信息

```
url
  /api/v1/admin/product_categories/:id
method
  put
params
  name          商品名字
  descriptions  商品简介
  coverImg      主图
headers
  authorization Bearer token  // 需要提供jwt信息
return
  返回商品分类信息
  {
  }
```

4. 删除商品分类信息

```
url
  /api/v1/admin/product_categories/:id
method
  delete
headers
  authorization Bearer token  // 需要提供jwt信息
return
  返回商品分类信息
  {
  }
```

5. 根据 ID 获取商品分类信息

```
url
  /api/v1/admin/product_categories/:id
method
  get
headers
  authorization Bearer token  // 需要提供jwt信息
return
  返回商品分类信息
  {
}
```

- 订单管理

1. 获取订单列表

```
url
  /api/v1/admin/orders
method
  get
params
  per   每一页显示的数量,默认10
  page  当前页码,默认1
  no  订单号
  user 用户id
headers
  authorization Bearer token  // 需要提供jwt信息
return
  {
    "totalCount": 14,   // 总记录数量
    "pages": 1,         // 当前页码
    "orders": [...]
  }
```

2. 修改商品信息

```
url
  /api/v1/admin/orders/:id
method
  put
params
  isPayed          是否支付(true/false)
headers
  authorization Bearer token  // 需要提供jwt信息
return
  返回信息
  {
  }
```

3. 删除商品分类信息

```
url
  /api/v1/admin/orders/:id
method
  delete
headers
  authorization Bearer token  // 需要提供jwt信息
return
  返回信息
  {
  }
```

4. 根据 ID 获取商品分类信息

```
url
  /api/v1/admin/orders/:id
method
  get
headers
  authorization Bearer token  // 需要提供jwt信息
return
  返回订单信息
  {
}
```
