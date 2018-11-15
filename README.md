# 科幻之家
一个可以了解，分享，交流科幻文化的平台

## 主要功能
  * 账号登录+注册+发送留言+回复留言+科幻新闻/电影/小说/动漫资讯+动态背景更换+用户资料更改+后台想法

---
## 描述
  * 技术栈： 
  > HTML+Javascript(JQUERY)+PHP+MYSQL<br />
  * 运行环境：
  > APACHE+PHP+MYSQL<br />
  * 总体原理：
  > 利用HTML负责前端的渲染，JS作为中间层转发请求到后台(PHP)，获取数据库内容，后台接收到请求后返回JSON数据包<br />  
 * 目录结构：
  ```
[Sciencs-Fuction-System]（主目录）
（前端）
│  culture-page.html
│  detail.html
│  function.html（登录后主页）
│  index.html（主视觉页）
│  list-movie.html
│  list-page.html
│  list.txt
│  login.html
│  news-page.html
│  note-reply.html
│  note-send.html
│  personal-edit.html
│  personal-space.html
│  register.html
│  search-page.html
│  
├─admin（后台界面）
│  │  comic-send.html
│  │  culture-edit.html
│  │  index.html（后台主页，新闻推送）
│  │  list-edit.html
│  │  movie-send.html
│  │  novel-send.html
│  │  rank-edit.html
│  │  roundabout-edit.html
│  │  
│  ├─js（后台交互）
│  │      comic-send.js
│  │      edit-edit.js
│  │      index.js
│  │      list-receive.js
│  │      movie-send.js
│  │      novel-send.js
│  │      rank-receive.js
│  │      roundabout-receive.js
│  │      
│  └─mysql（后台后端）
│          edit_data.php
│          list_data.php
│          list_num.php
│          list_operation.php
│          move_file.php
│          rank_data.php
│          rank_edit.php
│          roundabout_data.php
│          roundabout_edit.php
│          upload_data.php
│          upload_img.php
│          
├─css
│    	各种前端样式
│  
├─dynamic-background
│      各类背景特效模版            
│      
├─img
│	各种图片素材
│          
├─jquery（AOS动画库、文件上传，图片截取）
│      aos.js
│      jquery-1.4.2.min.js
│      jquery-3.3.1.min.js
│      jquery.color.js
│      jquery.fileupload.js
│      jquery.iframe-transport.js
│      jquery.Jcrop.min.js
│      jquery.ui.widget.js
│      
├─js（主功能交互）
│  │  background.js
│  │  culture-receive.js
│  │  detail.js
│  │  function-index.js
│  │  function.js
│  │  index.js
│  │  list-movie-receive.js
│  │  list-receive.js
│  │  login.js
│  │  navi.js
│  │  neon-text.js
│  │  news-receive.js
│  │  note-reply.js
│  │  note-send.js
│  │  personal-edit-profile.js
│  │  personal-edit.js
│  │  personal-space.js
│  │  register.js
│  │  reply-data.js
│  │  search-receive.js
│  │  star.js
│  │          
│  └─roundabout（轮播图）
│          gallery_init.js
│          roundabout.js
│          roundabout_shapes.js
│          
├─json（预存数据）
│      background.json
│      
├─mouse（鼠标）
│      01.cur
│      06.cur
│      15.cur
│      
├─mysql（后端）
│      background_change.php
│      culture_data.php
│      detail.php
│      forjs_function.php
│      function_popularity.php
│      function_roundabout.php
│      img_upload.php
│      list_data.php
│      list_num.php
│      login.php
│      mysql_conf.php
│      news_data.php
│      note_data.php
│      note_reply.php
│      note_send.php
│      personal_data.php
│      personal_edit.php
│      php_function.php
│      register.php
│      reply_data.php
│      search_data.php
│      search_num.php
│      upload_profile.php
│      
├─tmppic（临时图片上传地，不可删除）
├─upload-img（文件储存地）
│  ├─comic_img
│  │      各种漫画图片ID.jpg
│  │      
│  ├─movie_img
│  │      各种电影图片ID.jpg
│  │      
│  ├─news_img
│  │      各种新闻图片ID.jpg
│  │      
│  ├─novel_img
│  │      各种小说图片ID.jpg
│  │      
│  └─roundabout_img
│          轮播图图片ID.jpg
│          
└─user-profile
        头像图片ID.jpg
  ```
---

## 使用方法
  * 环境
  > 任意web服务器(nginx,apache)，扔到www或虚拟目录访问即可（需搭载PHP，MYSQL运行环境）<br />
  * 数据库：
  > 创建myphp数据库，导入a.sql即可,数据库密码默认为空，如需更改，请修改数据库配置文件 mysql/mysql_conf.php
---

## 浏览:
 ###  · 主页
 ![主页](https://github.com/maizhenhui/Science-Fiction-Home/blob/master/md.pic/true-index.jpg)
 ###  · 主页-文章推荐（常态）
 ![主页](https://github.com/maizhenhui/Science-Fiction-Home/blob/master/md.pic/true-index-intr.jpg)
 ###  · 主页-文章推荐（动态）
 ![主页](https://github.com/maizhenhui/Science-Fiction-Home/blob/master/md.pic/true-index-hovor.jpg)
 ###  · 新闻列表
 ![主页](https://github.com/maizhenhui/Science-Fiction-Home/blob/master/md.pic/page-list-news.jpg)
 ###  · 电影列表
 ![主页](https://github.com/maizhenhui/Science-Fiction-Home/blob/master/md.pic/page-list-movie.jpg)
 ###  · 动漫列表
 ![主页](https://github.com/maizhenhui/Science-Fiction-Home/blob/master/md.pic/page-list-comic.jpg)  
 ###  · 小说列表
 ![主页](https://github.com/maizhenhui/Science-Fiction-Home/blob/master/md.pic/page-list-novel.jpg)
 ###  · 文章区
 ![主页](https://github.com/maizhenhui/Science-Fiction-Home/blob/master/md.pic/page-culture.jpg)
 ###  · 留言列表
 ![主页](https://github.com/maizhenhui/Science-Fiction-Home/blob/master/md.pic/page-list-note.jpg)
 ###  · 留言+回复
 ![主页](https://github.com/maizhenhui/Science-Fiction-Home/blob/master/md.pic/note-detail.jpg)
  ###  · 后台-文章编辑
 ![主页](https://github.com/maizhenhui/Science-Fiction-Home/blob/master/md.pic/admin-page-edit.jpg)
  ###  · 后台-轮播图编辑
 ![主页](https://github.com/maizhenhui/Science-Fiction-Home/blob/master/md.pic/admin-roundabout-edit.jpg)
