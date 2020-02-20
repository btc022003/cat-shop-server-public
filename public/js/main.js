var url = '/docs/api.pdf';
var pdfView = document.querySelector('#pdfContainer'),
  ctx = pdfView.getContext('2d'),
  scale = 1.2,
  btnPre = document.querySelector('#btnPre'),
  btnNext = document.querySelector('#btnNext'),
  currentPage = 1,
  pdf = {},
  pageCount = 1;


// 上一页
btnPre.onclick = function() {
  if(currentPage >= 1){
    currentPage--;
    rendPDFPage();
  }
}

// 下一页
btnNext.onclick = function() {
  if(currentPage <= pageCount){
    currentPage++;
    rendPDFPage();
  }
}

// 下载pdf文件
var pdfLib = pdfjsLib.getDocument(url);
pdfLib.promise.then(function(d){
  // console.log(pdf);
  pdf = d
  pageCount = d.numPages;
  rendPDFPage();
})

// 渲染到canvas
function rendPDFPage() {
  pdf.getPage(currentPage).then(function(page){
    var viewport = page.getViewport({scale});
    pdfView.width = viewport.width;
    pdfView.height = viewport.height;
    var renderContext = {
      canvasContext: ctx,
      viewport
    };
    page.render(renderContext);
  })
}
