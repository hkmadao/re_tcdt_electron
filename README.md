# template code design tools serice electron client
[template code design tools serice electron client](https://github.com/hkmadao/re_tcdt_electron.git)
# template code design tools serice web
[template code design tools serice web](https://github.com/hkmadao/re_tcdt_web.git)
# template code design tools serice service
rust project [template code design tools serice](https://github.com/hkmadao/re_tcdt_rust.git)

# 目的
开发一个通过图形化设计数据库对应的对象，根据代码模板配置，生成sql、后台、前台模板代码功能的系统   
本系统从设计表结构或对象功能开始，功能分为面向开发过程的表结构或对象设计、单对象或一主多子对象设计、DTO数据结构设计三个模块。目的是在不侵入业务代码前提下，根据业务系统的特点可从三个模块中编写业务代码模板。
# 模型设计功能
此功能由react开发的前端工程和java开发的服务功能组成，提供一个web界面设计模型
## 整体模型设计功能
系统的数据库对应的对象设计，设计数据模型对应的对象及关联关系
## 一主多子模型设计功能
从整体模型设计中挑选部分对象，作为一个功能点，设计单对象或一主多子对象的功能
## DTO模型设计功能
设计功能较为复杂的接口的出参及入参对象，数据可引用整体模型的对象数据
## 代码下载解压到对应目录功能
此功能是web端的补充，由于web端操作不了本地文件系统，无法解压下载代码并拷贝到对应的目录，通过由electron开发的桌面工程和rust开发的服务工程，提供一个桌面客户端，可通过客户端设计模型和下载代码，解压到业务系统的代码目录等

==如果网页能访问和下载，但是客户端下载失败，请检查客户端配置的远程地址是否和服务器开放的地址一致，请使用服务器ip尝试==
