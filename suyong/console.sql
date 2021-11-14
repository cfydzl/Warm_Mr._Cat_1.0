select top 1 * from COMMENT where NAME = '1002722489' order by USERID desc
insert into COMMENT values('1002722489','good','2021-06-11',0)
--评论
create table COMMENT
(
    USERID int identity (1,1),
    NAME char(50),
    TEXT char(1500),
    TIME char(50),
    DING int
)
select *from COMMENT
insert into COMMENT values ('1002722489','666','2020-04-18',0)
drop table COMMENT
-- 菜单
create table MENU
(
    MENUID int identity (1,1),
    SPECIES char(500),
    NAME char(500),
    PRICE float,
    PICTURE char(500)
)
select *from COMMENT
drop table MENU
select *from MENU
-- 推荐
insert into MENU values ('%E6%8E%A8%E8%8D%90','麻婆豆腐',2.00,'../img/麻婆豆腐2.jpg')
insert into MENU values ('%E6%8E%A8%E8%8D%90','红烧茄子',8.00,'../img/红烧茄子8.jpg')
insert into MENU values ('%E6%8E%A8%E8%8D%90','水煮肉片',14.00, '../img/水煮肉片14.jpg')
insert into MENU values ('%E6%8E%A8%E8%8D%90','宫保鸡丁',16.00,'../img/宫保鸡丁16.jpg')
insert into MENU values ('%E6%8E%A8%E8%8D%90','回锅肉',18.00, '../img/回锅肉18.jpg')
insert into MENU values ('%E6%8E%A8%E8%8D%90','秘制蒜香排骨',20.00,'../img/秘制蒜香排骨20.jpg')
insert into MENU values ('%E6%8E%A8%E8%8D%90','水煮鱼',24.00, '../img/水煮鱼24.jpg')
insert into MENU values ('%E6%8E%A8%E8%8D%90','红烧鱼',24.00,'../img/红烧鱼24.jpg')
insert into MENU values ('%E6%8E%A8%E8%8D%90','醋溜土豆丝',3.00,'../img/醋溜土豆丝3.jpg')
-- 主食
insert into MENU values ('%E4%B8%BB%E9%A3%9F','红烧牛肉面',10.00,'../img/红烧牛肉面10.jpg')
insert into MENU values ('%E4%B8%BB%E9%A3%9F','黄金飞饼',5.00,'../img/黄金飞饼5.jpg')
insert into MENU values ('%E4%B8%BB%E9%A3%9F','饺子',8.00,'../img/饺子8.jpg')
insert into MENU values ('%E4%B8%BB%E9%A3%9F','凉粉',4.00,'../img/凉粉4.jpg')
insert into MENU values ('%E4%B8%BB%E9%A3%9F','米饭',1.00,'../img/米饭1.jpg')
insert into MENU values ('%E4%B8%BB%E9%A3%9F','奶油小馒头',8.00,'../img/奶油小馒头8.jpg')
-- 时素
insert into MENU values ('%E6%97%B6%E7%B4%A0','西红柿炒鸡蛋',6.00,'../img/西红柿炒鸡蛋6.jpg')
insert into MENU values ('%E6%97%B6%E7%B4%A0','醋溜白菜',6.00,'../img/醋溜白菜6.jpg')
insert into MENU values ('%E6%97%B6%E7%B4%A0','干锅茶树菇',12.00,'../img/干锅茶树菇12.jpg')
insert into MENU values ('%E6%97%B6%E7%B4%A0','脆口豆芽',3.00,'../img/脆口豆芽3.jpg')
insert into MENU values ('%E6%97%B6%E7%B4%A0','爆炒西兰花',6.00,'../img/爆炒西兰花6.jpg')
insert into MENU values ('%E6%97%B6%E7%B4%A0','干锅包菜',8.00,'../img/干锅包菜8.jpg')
-- 时荤
insert into MENU values ('%E6%97%B6%E8%8D%A4','青椒鱿鱼',36.00,'../img/青椒鱿鱼36.jpg')
insert into MENU values ('%E6%97%B6%E8%8D%A4','小龙虾',45.00,'../img/小龙虾45.jpg')
insert into MENU values ('%E6%97%B6%E8%8D%A4','酱香排骨',25.00,'../img/酱香排骨25.jpg')
insert into MENU values ('%E6%97%B6%E8%8D%A4','荔枝肉',22.00,'../img/荔枝肉22.jpg')
insert into MENU values ('%E6%97%B6%E8%8D%A4','雪花鸡柳',16.00,'../img/雪花鸡柳16.jpg')
insert into MENU values ('%E6%97%B6%E8%8D%A4','红烧猪蹄',24.00,'../img/红烧猪蹄24.jpg')
insert into MENU values ('%E6%97%B6%E8%8D%A4','土豆炒牛肉',26.00,'../img/土豆炒牛肉26.jpg')
-- 浓汤
insert into MENU values ('%E6%B5%93%E6%B1%A4','蛤蜊笋丝',18.00,'../img/蛤蜊笋丝18.jpg')
insert into MENU values ('%E6%B5%93%E6%B1%A4','山药排骨汤',22.00,'../img/山药排骨汤22.jpg')
insert into MENU values ('%E6%B5%93%E6%B1%A4','紫菜蛋花',12.00,'../img/紫菜蛋花12.jpg')
insert into MENU values ('%E6%B5%93%E6%B1%A4','鱼头豆腐',20.00,'../img/鱼头豆腐20.jpg')
insert into MENU values ('%E6%B5%93%E6%B1%A4','小鸡炖蘑菇',24.00,'../img/小鸡炖蘑菇24.jpg')
-- 小食
insert into MENU values ('%E5%B0%8F%E9%A3%9F','土豆薯条',8.00,'../img/土豆薯条8.jpg')
insert into MENU values ('%E5%B0%8F%E9%A3%9F','土豆薯片',8.00,'../img/土豆薯片8.jpg')
insert into MENU values ('%E5%B0%8F%E9%A3%9F','爆米花',8.00,'../img/爆米花8.jpg')
insert into MENU values ('%E5%B0%8F%E9%A3%9F','水果拼盘',12.00,'../img/水果拼盘12.jpg')
insert into MENU values ('%E5%B0%8F%E9%A3%9F','腰果',25.00,'../img/腰果25.jpg')
-- 酒水
insert into MENU values ('%E9%85%92%E6%B0%B4','雪津啤酒(330ml)',5.00,'../img/雪津啤酒5.jpg')
insert into MENU values ('%E9%85%92%E6%B0%B4','雪碧(1L)',8.00,'../img/雪碧8.jpg')
insert into MENU values ('%E9%85%92%E6%B0%B4','可乐(1L)',8.00,'../img/可乐8.jpg')
insert into MENU values ('%E9%85%92%E6%B0%B4','美汁源(1L)',10.00,'../img/美汁源10.jpg')
insert into MENU values ('%E9%85%92%E6%B0%B4','椰汁(1L)',12.00,'../img/椰汁12.jpg')
select  *from MENU where (NAME not in (select top 2 NAME from MENU where SPECIES='tuijian' order by PRICE,MENUID) and SPECIES='tuijian')order by PRICE,MENUID
select top 7 *from MENU
delete from MENU where (  NAME= 'java')
select *from MENU where (SPECIES = 'xiaoshi')
select top 1 *from MENU where
    (NAME not in (select top 5 NAME from MENU order by  MENUID desc ))order by  MENUID desc
-- 用户
create table INFORMATION
(
    ID int identity (1,1),
    USERNAME char(200) unique not null ,
    PASSWORD char(200) not null ,
    NAME char(200),
    PHONE char(200),
    ADDRESS char(2000),
    MANAGEMENT int,
)
drop table INFORMATION
delete INFORMATION
insert into INFORMATION values ('cfydzl','123506467','','','',1)
insert into INFORMATION values ('1002722489','123506467','','','',0)
insert into INFORMATION values ('1111111111','123506467','','','',0)
insert into INFORMATION values ('1111111112','123506467','','','',0)
alter table INFORMATION alter column ADDRESS char(1000)
select *from INFORMATION
select *from INFORMATION order by MANAGEMENT desc ,ID
select *from INFORMATION where (USERNAME='cfydzl' and PASSWORD='123506467')
delete from INFORMATION where ( USERNAME not in ('cfydzl'))
update INFORMATION set MANAGEMENT='1' where ( USERNAME='cfydl')
update INFORMATION set MANAGEMENT='0' where ( USERNAME='1002722489')
-- 订桌信息
create table RESTAURANT
(
    NAME char(20),
    NINE int check (NINE>=0 and NINE<=6),
    ELEVEN int check (ELEVEN>=0 and ELEVEN<=6),
    THIRTEEN int check (THIRTEEN>=0 and THIRTEEN<=6),
    FIFTEEN int check (FIFTEEN>=0 and FIFTEEN<=6),
    SEVENTEEN int check (SEVENTEEN>=0 and SEVENTEEN<=6),
    NINETEEN int check (NINETEEN>=0 and NINETEEN<=6)
)
select *from RESTAURANT
insert into RESTAURANT values ('two',6,6,6,6,6,6)
insert into RESTAURANT values ('four',6,6,6,6,6,6)
insert into RESTAURANT values ('six',6,6,6,6,6,6)
insert into RESTAURANT values ('eight',6,6,6,6,6,6)
select *from RESTAURANT where (NAME='two')
delete from RESTAURANT where ( NAME = 'two')
update RESTAURANT set NINE=NINE-1 where ( NAME='two')
select NINE from RESTAURANT where NAME='two'
update RESTAURANT set NINE=NINE+1 where NAME='two'

-- 桌台预定信息
select  *from BOOK_DESK where ID=19

create table BOOK_DESK
(
    ID int identity (1,1),
    BOOK_ID char(50),
    USERNAME char(50),
    TYPE char(500),
    TIME char(50)
)
select *from BOOK_DESK where ID=1
delete  BOOK_DESK
select *from BOOK_DESK
insert into BOOK_DESK values ('BOOK_ID','666','666','666')
delete from BOOK_DESK where ( ID=7)
select top 1 *from BOOK_DESK where
    (ID not in (select top 0 ID from BOOK_DESK where USERNAME='1002722489' )
        and USERNAME='1002722489')
-- 订餐信息
select * from BOOK_MENU where TYPE like '(%E5%AE%8C%E6%88%90%E8%AE%A2%E5%8D%95)%'
select * from BOOK_MENU where TYPE like '(%E5%8F%96%E6%B6%88%E8%AE%A2%E5%8D%95)%'
select *from BOOK_MENU where USERNAME = '1002722489' ORDER BY LEN(TYPE) ASC,ID
create table BOOK_MENU
(
    ID int identity (1,1),
    MENU_ID char(50),
    USERNAME char(50),
    MENU_TEXT char(7000),
    MENU_NUM char(50),
    TYPE char(500)
)
select  *from BOOK_MENU where ID=1
drop table BOOK_MENU
select *from BOOK_MENU where MENU_ID like '%20200421'
delete from BOOK_MENU where ( USERNAME = '1002722489')
update BOOK_MENU set TYPE='into' where ID='1'
select count(*)num from BOOK_MENU
select top 1 *from BOOK_MENU where
    (ID not in (select top 1 ID from BOOK_MENU where USERNAME='1002722489')
        and USERNAME='1002722489')
update BOOK_MENU set TYPE='堂食' where USERNAME='1002722489'
