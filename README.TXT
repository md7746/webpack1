gulp出文件夹 dest ；
把 dest 文件夹复制一份改名为 src2 ；
把 js 文件夹下的 index.js 文件移到 src 目录下进行修改（require引入相关css样式等），修改为webpack入口文件；
提取页面上需要按需加载的模块（模块的html和js放在 src 下新建的 components 文件夹下对应的文件夹下），
模块中html有图片引用的请修改引用路径：../../imaegs/***.jpg|png|gif...。

多页面在 src2 中新建 common 文件夹，存放公用部分（如头部，尾部……从 src2 中的index.html中提取）
再src2中新建文件夹 page 文件夹，放置项目多页页（引用了公用部分），然后gulp task出 src2 文件夹下相应的多页面


gulp build => dest;
gulp serve

npm run build
npm run dev
npm run dev-hrm

reCss
gulp getlasthtml
gulp min