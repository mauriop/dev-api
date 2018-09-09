document.addEventListener("DOMContentLoaded", function(){
    document.querySelector(".mainSection").addEventListener('scroll', onScroll, false);    
});

function tableResize(){
    var tableHeaders = document.querySelectorAll(".tableWrap");
    for (var i = 0, tablelen = tableHeaders.length; i < tablelen; i++) {
        removeFixedHeader(tableHeaders[i]);
    }
    if(window.innerWidth >= 768){       
        scrollEvents();
    }
}

function scrollEvents(){
    if(window.innerWidth < 768)return;
    var tableHeaders = document.querySelectorAll(".tableWrap");
    
    for (var i = 0, tablelen = tableHeaders.length; i < tablelen; i++) {
        var nowHeader = tableHeaders[i].querySelector('thead');
        var nowBody = tableHeaders[i].querySelector('tbody');
        var tableOffsetTop = nowBody.getBoundingClientRect().top - nowHeader.offsetHeight;
        var tableHeight = nowBody.offsetHeight + nowHeader.offsetHeight;

        if(tableOffsetTop <= 0 && tableOffsetTop > -tableHeight + nowHeader.offsetHeight){
            if(tableHeaders[i].classList.contains("isTop"))return;
            addFixedHeader(tableHeaders[i]);
        }else{
            if(tableHeaders[i].classList.contains("isTop")){
                removeFixedHeader(tableHeaders[i]);
            }
        }
    }
}

function addFixedHeader(table){
    var nowHeader = table.querySelector('thead');
    var nowBody = table.querySelector('tbody');
    var thAll = nowHeader.getElementsByTagName("th");
    var tdAll = nowBody.getElementsByTagName("td");

    table.style.marginTop = nowHeader.offsetHeight + "px";

    for (var th = 0, thlen = thAll.length; th < thlen; th++) {
        thAll[th].style.width = tdAll[th].offsetWidth + "px";
    }

    for (var td = 0, tdlen = tdAll.length; td < tdlen; td++) {
        tdAll[td].style.width = thAll[td % thAll.length].offsetWidth + "px";
    }

    nowHeader.style.width = nowBody.offsetWidth + "px";

    table.classList.add("isTop");
}

function removeFixedHeader(table){
    var nowHeader = table.querySelector('thead');
    var nowBody = table.querySelector('tbody');
    var thAll = nowHeader.querySelectorAll("th");
    var tdAll = nowBody.querySelectorAll("td");

    table.removeAttribute("style");
    
    for (var th = 0, thlen = thAll.length; th < thlen; th++) {
        thAll[th].removeAttribute("style");
    }

    for (var td = 0, tdlen = tdAll.length; td < tdlen; td++) {
        tdAll[td].removeAttribute("style");
    }

    nowHeader.removeAttribute("style");

    table.classList.remove("isTop");
}

// start process
EventHandler.init('resize', function() {
    tableResize();
});

var ticking = false;
/**Callback for our scroll event - just keeps a track on the last scroll value*/
function onScroll() {
    requestTick();
}

/*** Calls rAF if it's not already been done already*/
function requestTick() {
    if(!ticking) {
        requestAnimFrame(update);
        ticking = true;
    }
}

/*** Our animation callback*/
function update() {
    scrollEvents();
    // allow further rAFs to be called
    ticking = false;
}

// only listen for scroll events
window.addEventListener('scroll', onScroll, false);

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


