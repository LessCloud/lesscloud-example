##Lesscloud-example


###描述

这是一个用于创建基于 LessCloud 应用的 web 应用，它只是一个提供了项目的配置和应用的骨架，具体怎样实现业务，需要用户自己来开发，开发者可能需要对立面的某些不必要的功能删减，或者添加或修改自己需要的功能。

当前项目基于 Vue.js 2.2.4 和相关组件，依赖 LessCloud-App-Builder 支持实时构建项目，使用 webpack 构建，支持自动编译，前台使用websocket链接，一旦项目文件变更，自动编译项目并刷新页面。


###如何使用

#####1.安装依赖

首先在命令行下，进入项目目录，安装项目依赖：

	npm install


#####2.安装ElementUI theme

该项目使用 ElementUI 作为样式风格，安装ElementUI theme并非必要，

如果不需要安装可以跳过该步骤，

如果需要自定义 ElementUI，可以修改项目根目录下 src/index.js 注释第8行，并打开第9行注释


安装命令如下：

	npm i element-theme
	
安装默认主题：
	
	# 从 npm
	npm i element-theme-default -D
	
	# 从 GitHub
	npm i https://github.com/ElementUI/theme-default -D


你可以通过使用如下命令生成 css 样式文件，以覆盖 ElementUI 的默认样式


	node_modules/.bin/et -i ./src/assets/style/element-variables.css

开发过程中使用如下命令把修改后的css样式编译到项目中

	node_modules/.bin/et -c ./src/assets/style/element-variables.css

更多详细请参考 http://element.eleme.io/#/zh-CN/component/custom-theme


#####3.运行项目

安装完成后，你可以使用命令启动服务:

	npm run start
	
你可以在 http://localhost:8080 查看项目页面 （注：如果发生网络请求错误，请确认是否添加 http://localhost:8080 到应用设置中）

#####4.生成模型表单和数据表格

当你在 LessCloud Dashboard 中设置好了你的应用后，你可以运行命令：

	npm run app-builder
	
根据提示输入相关信息，系统会自动生成应用所需的表单文件和数据表格


###构建应用

开发完成后使用如下命令编译项目

	npm run build

