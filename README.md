# THUeat Frontend

# 测试
单元测试工具：Vue-test-utils, Jest

参考链接：https://next.vue-test-utils.vuejs.org/guide/, https://jestjs.io/docs/getting-started

E2E测试工具：Cypress

参考链接：https://docs.cypress.io/guides/overview/why-cypress

Quasar相关测试：https://quasar.dev/quasar-cli/testing-and-auditing, https://github.com/quasarframework/quasar-testing/tree/next

注：私人页面已安装 quasar test extension, 公共页面由渊升负责处理


档主页面情况：
1. 未完成部分：图片处理与创建新菜品的API（还在和后台协调），API链接（未换上正确的）
2. API GET 和 POST 的写法如果不清楚有需要可以参考，里面已写上注释帮助理解


清华大学食堂App前端

注意：现在已增加 Fake API的文件夹，用来设置jsonserver进行提取数据

启动jsonserver方法：
1. npm install -g json-server (若还未安装)
2. cd FakeAPI （转到FakeAPI所在的文件夹）
3. 输入命令 json-server --watch db.json

添加数据方法：
1. 直接打开db.json在里面更改即可

更多详情请看：https://www.npmjs.com/package/json-server


