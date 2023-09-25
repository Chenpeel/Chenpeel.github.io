<style>
/* 文章链接 */
.article-link {
    color: rgb(95, 136, 224);
    font-size: small;
    text-decoration:none;
}
/* 文章标题 */
.article-title {
    text-align: center;
    font-size: large;
}
/* 文章前言格式 */
.aritcle-pre {
    text-indent: 2em;
    font-size: small;
}
/* 文章正文格式 */
.article-main{
    text-indent: 2em;
    font-size: larger;
}
/* 居中诗文 */
.article-center {
    text-align: center;
    font-size: larger;
}
/* 注释 */
.article-comment{
    font-size: smaller;
}
/* 页面行内文字图片插入 */
.inline-img-responsive {
    display:inline;
    width: 1em;
    height: 1em;
}
/* 卡片跳转 */
.jump-to-article{
    border: 2px,solid,gray;
    margin: 30px;
    padding: 20px;
    margin:0 auto;
    text-align: center; 
    background-color: #f0f9f0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transition: transform 0.3s ease;
}
/* 悬停上浮投影 */
.jump-to-article:hover {
    transform: translateY(-5px); 
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); 
}
</style>




<h1 class="article-title"> Title </h1>

<a href="https://chenpeel.github.io" clas="article-link"> Showed Link </a>

<p class="artcle-pre"> pre in article </p>

<p class="article-main"> MAIN </p>

<p class="article-center"> MAIN_CENTER </p>

<p class=article-comment> comment </p>

<img src="../../public/imgs/yi.png" class="inline-img-responsive" />


<div class="jump-to-article" onclick="location.href='https://github.com'"> Jump Card </div>