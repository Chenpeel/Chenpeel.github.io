<style>
.book{
    border: 2px solid gray;
    margin: 30px;
    padding: 20px;
    margin: 0 auto;
    text-align: center;
    background-color: rgba(0,0,0,0.1);;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transition: transform 0.3s ease;
    text-align: center;
}
.book:hover{
    transform: translateY(-5px); 
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); 
}
.copyright{
    background-color: rgba(0,0,0,0.1); 
    text-align: center; 
    padding: 10px 0; 
    font-size: 14px;
}
</style>


<h2>Make</h2>

>《跟我一起写Makefile》是 `陈皓`发表在其CSDN博客上的系列文章。


> 该系列文章翻译整理自 `GNU Make Manual`，一直受到读者的推荐，是很多人学习Makefile的首选文档。



<div class="book"
    onclick="
    var pdfContainer = document.getElementById('pdf-container');
    if (pdfContainer.style.display === 'none') {
      pdfContainer.style.display = 'block';
    } else {
      pdfContainer.style.display = 'none';
    }
    ">
  <p>跟我一起写 Makefile</p>
  
  <div class="pdf-container" id="pdf-container" style="display: none;">
    <iframe src="https://drive.google.com/file/d/1xSS2JFO3zd2N9StvCbJ3nLpyFZgY0BlV/preview?usp=drive_link" width="100%" height="1000"></iframe>
  </div>
  
  <div class="copyright">
    Copyright &copy; 2023 Github User: 
    <a href="https://github.com/seisman">Dongdong Tian</a>
    /
    <a href="https://github.com/seisman/how-to-write-makefile">How-to-Write-Makefile</a>
  </div>
</div>
















