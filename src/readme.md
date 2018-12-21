components存放木偶组件，只负责数据的展示
containers存放所有页面，即智能组件，它是木偶组件的使用者，它负责数据的获取，并通过props等向木偶组件传递数据
util存放一些工具方法
index.tmpl.html是html模板
index.jsx是入口文件
test-app和test-reducer用于测试redux
store用于生成store并导出，方便整个工程使用