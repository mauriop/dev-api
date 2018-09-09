var dropdown, openDropdown;
var openingDd = false;
var tooltip, openTooltip, topSpace, btmSpace, leftSpace, rightSpace;
$(function() {

    $('.popup .close').click(function(event){
        event.preventDefault();
        closePopUp();
    });

    var skin2 = document.getElementById("skin2");
    var container = document.querySelector('.mainContainer');
    if (typeof(skin2) != 'undefined' && skin2 != null){
        skin2.addEventListener("click", function(e){
            container.classList.add("skin");
        });
    }

    var skin1 = document.getElementById("skin1");
    if (typeof(skin2) != 'undefined' && skin2 != null){
        skin1.addEventListener("click", function(e){
            container.classList.remove("skin");
        });
    }

    $('.openProfile').click(function(){
        if($(this).siblings('.profMenu').is(":visible")){
            $(this).siblings('.profMenu').slideUp(250, function(){
                $(this).removeAttr('style');
            });
        }else{
            $(this).siblings('.profMenu').slideDown(250);
        }
    });

    $('.openProfLinks').click(function(){
        if($('.profMenu').hasClass('openSub')){
            $('.profMenu').removeClass('openSub');
            $('.profLinks').slideUp(250, function(){
                $(this).removeAttr('style');
            });
        }else{
            $('.profMenu').addClass('openSub');
            $('.profLinks').slideDown();
        }
    });

    $('.burgerMenu').click(function(){
        if($('body').hasClass('openMenu')){
            $('body').removeClass('openMenu');
            $('.profMenuBlock').slideUp(250, function(){
                $(this).removeAttr('style');
                if($('.profMenu').hasClass('openSub')){
		            $('.profMenu').removeClass('openSub');
		            $('.profLinks').slideUp(250, function(){
		                $(this).removeAttr('style');
		            });
		        }
            });
        }else{
            $('body').addClass('openMenu');
            $('.profMenuBlock').slideDown(250, function(){
            	$('.profMenu').addClass('openSub');
            	$('.profLinks').slideDown();
            });
        }
    });

    $('.hideNum').click(function(){
        $('body').toggleClass('noNumber');
    });

    $('body').on('click', function (e) {
        if ($('.dd-menu-wrap').has(e.target).length === 0) {
            $('.dd-menu-wrap.open .dd-title').trigger('click');
        }
    });

    $('.inlineEdit .edit').click(function(event) {
       $(this).parents('.inlineEdit').addClass('editing');
       $(this).parents('.inlineEdit').find('input.name').focus();
    });

    $('body').on('click', '.dd-title', function(event) {
       event.preventDefault();
       dropDownEvents($(this).parents('.dd-menu-wrap'));
       ddPosition($(this));
    });

    $('.moreLink').click(function(event) {
        if($(this).siblings('.moreCnt').hasClass('visible')){
            $(this).siblings('.moreCnt').removeClass('visible').removeAttr('style');
            $(this).siblings('.moreCnt').animate({scrollTop: 0},0);
        }else{
            $(this).siblings('.moreCnt').addClass('visible');
        }
    });

    $('.acc-block.open .acc-content').css({display:'block'});

    var accOpening = false;
    $('body').on('click', '.open-acc', function(event) {
        if(accOpening == true){
            return false;
        }

        if ($(event.target).closest('a').length || $(event.target).hasClass('value') || $(event.target).hasClass('triggerable')) {
            return;
        }
        accActions($(this).parents('.acc-block'));
    });

    var goToTab, actTabHeader, tabHeader, actTab;
    var ischanging = false;
    tabs = {
        init:function(){
            this.registerEvents();
        },
        registerEvents : function(){
            var _this = this;
            $('.tab-header').click(function(event) {
                event.preventDefault();                
                if($(this).hasClass('active') || ischanging == true){
                    return
                }
                ischanging = true;
                goToTab = $(this).data('tab');
                tabHeader = $(this);
                actTab = tabHeader.parents('.tabs');
                if(actTab.find('.select-box.tabs-header').length > 0){
                    actTab.find('.selectWrap .selected').html(tabHeader.html());
                    if(window.innerWidth <= 767){
                        actTab.find('.select-box').slideUp(300, function(){
                            $(this).parents('.selectWrap').removeClass('open');
                            $(this).removeAttr('style');
                        });    
                    }
                }

                actTabHeader = actTab.find('.tab-header.active');
                actTabHeader.removeClass('active');
                actTab.find('.tab-header[data-tab='+goToTab+']').addClass('active');
                _this.change(goToTab, actTabHeader, tabHeader, actTab);                
                ischanging = false;
            });
        },
        change : function(goToTab, actTabHeader, tabHeader, actTab){
            actTab.find('.tab.active').fadeOut(150, function(){
                $(this).removeClass('active');
            });
            $('#'+goToTab).delay(150).fadeIn(150, function(){
                $(this).addClass('active');
                ischanging = false;
            });
        }
    }

    tabs.init();

    $('.selectWrap .selected').click(function(event) {
        if($(this).parents('.selectWrap').hasClass('open')){
            $(this).siblings('.select-box').slideUp(300, function(){
                $(this).parents('.selectWrap').removeClass('open');
                $(this).removeAttr('style');
            });
        }else{
            $(this).parents('.selectWrap').addClass('open');
            $(this).siblings('.select-box').slideDown(300);
        }
    });

    $('.barInfo input').on('change', function(event) {
        var barId = $(this).attr('id');
        $(this).parents('.barInfo').toggleClass('checked');
        $(".barItem[data-bar='" + barId + "']").toggleClass('checked');
    });

    $('.barInfo input').each(function(event) {
        if($(this).is(':checked')){
            $(this).parents('.barInfo').addClass('checked');
            $(".barItem[data-bar='" + $(this).attr('id') + "']").addClass('checked');
        }
    });

    $('body').on('click', '.tooltip button, .openTooltip', function(event) {
        event.preventDefault();
        if($(this).parents('.tooltip').hasClass('open')){
            closeTooltipFunc($(this));
        }else{
            openTooltipFunc($(this));
        }
    });

    $('#toTop').click(function(){
        $('html, body').animate({scrollTop:0},500);
    });

    var length = document.getElementsByTagName("select").length;
    var elements = document.getElementsByTagName("select");

    for (var i=0; i < length; i++){
        elements[i].addEventListener("click", function(e){
            var parentElm = e.target.parentNode;
            parentElm.classList.toggle('open');
        });

        elements[i].addEventListener("blur", function(e){
            var parentElm = e.target.parentNode;
            if(hasSomeParentTheClass(parentElm, "open")){
                parentElm.classList.toggle('open');
            }
        });
    }

    if($(".cardsSlider").length > 0){
        $(".cardsSlider").slick({
            accessibility: true,
            dots: true,
            slidesToShow: 4,
            responsive: [
                {
                  breakpoint: 1260,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 780,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    dots: false
                  }
                }
              ]
        });
    }

    $('body').on('change', 'input.showContent:checkbox', function(event) {
        var checkCnt = $(this).attr('id');
        if ($(this).is(':checked')) {
            $(".checkContent[data-check='" + checkCnt + "']").addClass('open');
        }else{
            $(".checkContent[data-check='" + checkCnt + "']").removeClass('open');
        }
    });

    $('.openBnfList').click(function(event) {
        $(this).parents('.autocomplete').toggleClass('open').find('.list').slideToggle(250);
    });

    $('.mobAcc-header').click(function(){
        if($(this).parents('.mobAcc').hasClass('open')){
            $(this).parents('.mobAcc').removeClass('open');
            $(this).parents('.mobAcc').find('.mobAcc-content').slideUp(250, function(){
                $(this).removeAttr('style');
            });
        }else{
            $(this).parents('.mobAcc').addClass('open');
            $(this).parents('.mobAcc').find('.mobAcc-content').slideDown(250);
        }
    });

    //radio toggle
    var radioToggle;
    $('.js_toggle_radio input[type=radio]').on('change', function(){
        var $this = $(this);
        radioToggle = $this.parent('[data-toggle]').data('toggle');
        if (radioToggle == '') {
           $this.closest('.fieldsBox').find('[data-toggle-content]').removeClass('active');
        }
        $('[data-toggle-content="'+radioToggle+'"]').addClass('active').siblings('[data-toggle-content]').removeClass('active');
    });

    $('.contentRadios input[type="radio"]').each(function(){
        var _this = $(this);
        var wrap = _this.parents('.radioItem');
        if(wrap.find('input[type="radio"]').prop('checked')){
            wrap.addClass('active');
        }
    });

    $('.contentRadios input[type="radio"]').change(function(){
        var _this = $(this);
        var wrap = _this.parents('.radioItem');
        if(wrap.find('input[type="radio"]').prop('checked')){
            wrap.siblings('.active').find('.content').slideUp(200, function(){
                $(this).parents('.radioItem').removeClass('active');
            });
            wrap.find('.content').slideDown(200, function(){
                $(this).parents('.radioItem').addClass('active');
            });
        }
    });

    //check select-unselect all
    var checkToggle;
    $('.js_toggle_check').on('click', function(){
        var $this = $(this);
        checkToggle = $this.data('check-toggle');
        if ($(this).find('input[type=checkbox]').is(':checked')) {
            $this.prop('checked', false);
            $('[data-check="'+checkToggle+'"]').each(function(){
                $(this).prop('checked', true);
            });
        } else {
            $this.prop('checked', true);
            $('[data-check="'+checkToggle+'"]').each(function(){
                $(this).prop('checked', false);
            });
        }
    });

    var dataCheck;
    $('[data-check]').on('change', function(){
        var $this = $(this);
        dataCheck = $this.data('check');
        if (!$this.is(':checked')) {
            $('[data-check-toggle="'+dataCheck+'"]').find('input[type=checkbox]').prop('checked', false);
        }
    });
});

function mainHeight(){
    $('.mainSection').removeAttr('style');
    if($('.mainSection').outerHeight() < window.innerHeight - $('footer').outerHeight() - $('header').outerHeight()){
        $('.mainSection').css({height: window.innerHeight - $('footer').outerHeight() - $('header').outerHeight()});
    }
}

var pageScroll;
function openPopUp() {
    pageScroll = $(document).scrollTop();
    $('.mainContainer').addClass('popupOpen');
    $('.mainWrapper').animate({scrollTop: pageScroll}, 0);
    $('.popup input,.popup textarea, .popup button, .popup a').each(function(){
       $(this).attr('tabindex',10);
    });
    $('.popup').fadeIn();
};

function closePopUp(){
    pageScroll = $('.mainWrapper').scrollTop();
    $('.mainContainer').removeClass('popupOpen');
    $('body, html').animate({scrollTop: pageScroll}, 0);
    $('.popup').fadeOut();
    $('.mainWrapper').removeAttr('tabindex').attr('aria-hidden', false);
};

function hasSomeParentTheClass(element, classname) {
    if (element.className.split(' ').indexOf(classname)>=0) return true;
    return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}

function openTooltipFunc(n) {
    tooltip = n.parents(".tooltip");
    openTooltip = $(".tooltip.open");
    topSpace = n.offset().top - $(window).scrollTop();
    btmSpace = $(window).scrollTop() + $(window).height() - n.offset().top;
    leftSpace = n.offset().left;
    rightSpace = $(window).width() - n.offset().left - n.outerWidth();
    topSpace < btmSpace ? n.parents(".tooltip").not(".bottom").addClass("bottom") : n.parents(".tooltip.bottom").removeClass("bottom");
    leftSpace < rightSpace ? (n.parents(".tooltip").not(".right").addClass("right"), n.siblings(".tooltipCnt").css({
        width: rightSpace - 15
    })) : (n.parents(".tooltip.right").removeClass("right"), n.siblings(".tooltipCnt").css({
        width: leftSpace - 15
    }));
    openTooltip.not(tooltip).removeClass("open right bottom");
    openTooltip.not(tooltip).find(".tooltipCnt").css({
        width: "",
        display: "none"
    });
    n.siblings(".tooltipCnt").show(0, function() {
        $(this).parents(".tooltip").addClass("open");
        $(this).css({
            overflow: ""
        })
    })
}

function closeTooltipFunc(n) {
    n.parents(".tooltip").removeClass("open bottom right");
    n.siblings(".tooltipCnt").css({
        width: "",
        display: "none"
    })
}

var ddTop, ddBtm;
function ddPosition(ddElement){
    ddElement = ddElement.parents(".dd-menu-wrap");
    ddElement.removeClass('top bottom')

    ddTop = ddElement.offset().top - $(window).scrollTop();
    ddBtm = $(window).scrollTop() + $(window).height() - ddElement.offset().top;

    ddTop < ddBtm ? ddElement.addClass("bottom") : ddElement.addClass("top");
}

//update 05-04-2017
var headerTop;
var stickyHeader = function(hd){
	if ($(window).width() > 1023 ) {
		$('body.stickyHeader').removeClass('stickyHeader');
	} else {
		if ($(window).scrollTop() > hd) {
			$('body').not('.stickyHeader').addClass('stickyHeader');
		} else {
			$('body.stickyHeader').removeClass('stickyHeader');
		}
	}
}

$(window).on("load", function () {
	loadEvents();
});

function getoutput(el) {
    el.parentElement.children[1].innerHTML = el.value;
}

function accActions(actAcc){
    accOpening = true;
   if(actAcc.hasClass('open')){
        actAcc.find('.acc-content').slideUp(200, function(){
            actAcc.removeClass('open');
            accOpening = false;
        });
   }else{
        actAcc.addClass('open');
        actAcc.find('.acc-content').slideDown(200, function(){
            accOpening = false;
        });
   }
}

function dropDownEvents(dropdown){
    openDropdown = $('.dd-menu-wrap.open');
        
    openDropdown.not(dropdown).removeClass('open');
    openDropdown.not(dropdown).find('.dd-menu').slideUp(100, function(){
        $(this).closest('.row.over').removeClass('over');
    });

    if(!dropdown.hasClass('open')){
        $(this).closest('.row').addClass('over');
        dropdown.addClass('open');
        dropdown.find('.dd-menu').slideDown(100, function(){
            openingDd = false;
        });
    }else{
        $(this).closest('.row.over').removeClass('over');
        dropdown.find('.dd-menu').slideUp(100, function(){
            dropdown.removeClass('open');
            openingDd = false;
        });
    }
}

function boxesSlider(){
    if(window.innerWidth < 767){
        $('.boxesSlider').not('.slick-initialized').each(function() {
            $(this).slick({
                accessibility: true,
                slidesToShow: 1
            });
        });
    }else{
        $('.boxesSlider.slick-initialized').each(function() {
            $(this).slick('unslick');
        });
    }
}

function fixedElm(){
    if(!$('.stickyElm').length > 0){
        return false;
    }
    if($(window).scrollTop() >= $('.stickyBlock').offset().top &&  $(window).scrollTop()  < $('.stickyBlock').offset().top + $('.stickyBlock').outerHeight() - ($('.stickyElm').outerHeight()*2) ){
        $('.stickyBlock').addClass('fixed');
    }else{
        $('.stickyBlock').removeClass('fixed');
    }
}

function loadEvents(){
    boxesSlider();
    fixedElm();
    mainHeight();

    //update 05-04-2017
    if($('.headerMain').length > 0){
        headerTop = $('.headerMain').offset().top;
        stickyHeader(headerTop);
    }
}

function resizeEvents(){
    boxesSlider();
    mainHeight();

    //update 05-04-2017
    if($('.headerMain').length > 0){
	   stickyHeader(headerTop);
    }
}

function scrollEvents(){
    fixedElm();
}

var EventHandler = (function() {

    var callbacks = [],
        running = false,
        timers = {},
        delayedCallbacks = [];

    // fired on resize event

    function FiredEvent() {
        if (!running) {
            running = true;

            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(runCallbacks);
            } else {
                setTimeout(runCallbacks, 66);
            }
        }
    }

    // run the actual callbacks
    function runCallbacks() {
        callbacks.forEach(function(callback) {
            callback();
        });

        delayedCallbacks.forEach(function(dcallback) {
            var uid = dcallback.uid;
            var ms = dcallback.delay;
            if (timers[uid]) {
                clearTimeout(timers[uid]);
            }
            timers[uid] = setTimeout(function(){
                dcallback.callback()
            }, ms);
        });
        running = false;
    }

    // adds callback to loop
    function addCallback(callback) {
        if (callback) {
            callbacks.push(callback);
        }
    }

    function CallbackDetails(callback, delay, uid) {
        this.callback = callback;
        this.delay = delay;
        this.uid = uid;
    }

    function addDelayedCallback(callback, delay, uid) {
        if (callback && delay) {
            var c = new CallbackDetails(callback, delay, uid)
            delayedCallbacks.push(c);
        }
    }

    return {
        // initalize resize event listener
        init: function(event, callback) {
            window.addEventListener(event, FiredEvent);
            addCallback(callback);
        },
        // public method to add additional callback
        add: function(callback) {
            addCallback(callback);
        }
    }
}());

EventHandler.init('resize', function() {
    resizeEvents();
});

var ticking = false;

/**Callback for our scroll event - just keeps a track on the last scroll value*/
function onScroll() {
	//update 05-04-2017
    if($('.headerMain').length > 0){
	   stickyHeader(headerTop);
    }
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
