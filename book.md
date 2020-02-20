## 小说信息接口

#### 获取小说分类

```
url
  /api/v1/book_categories
method
  get
params
  per   每一页显示数量
  page  页码
headers
return
  {
  }
```

#### 获取小说列表

```
url
  /api/v1/books
method
  get
params
  per   每一页显示数量
  page  页码
  title 模糊查询(可选)
  sort  排序(默认正序,传-1表示倒序)
  category 指定分类的数据
headers
return
  {
  }
```

#### 获取小说详情

```
url
  /api/v1/books/:id
method
  get
params
headers
return
  {
  }
```

#### 获取章节

```
url
  /api/v1/book_chapters
method
  get
params
  per   每一页显示数量
  page  页码
  title 模糊查询(可选)
  sort  排序(默认正序,传-1表示倒序)
  book  书籍id
headers
return
  {
  }
```

#### 获取章节详情

```
url
  /api/v1/book_chapters/:id
method
  get
params
headers
return
  {
  }
```
