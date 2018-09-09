$(document).ready(function(){
	//keycode 13 = enter
	//keycode 27 = esc
    //keycode 38 = up
    //keycode 40 = down

    $('body').bind('keyup', function (e) {
        if (e.keyCode === 27) {
            $('.dd-menu-wrap.open').trigger('click');
        }   
        //temp go to skin Alt + 1, Alt + 2
        if (e.altKey && e.keyCode === 49) {
            $('#skin1').trigger('click');
        }   
        if (e.altKey && e.keyCode === 50) {
            $('#skin2').trigger('click');
        }   
    }); 


	$('.dd-title').bind('keyup', function (e) {
        var $this = $(this);
        if (e.keyCode === 13) {
            $this.trigger('click');
        }
        if (e.keyCode === 27) {
	  	  	$this.trigger('click');
	    }   
    }); 

	//close open dropdown on esc click
    $('.dd-menu').bind('keyup', function (e) {
        var $this = $(this);
        if (e.keyCode === 27) {
	  	  	$this.prev('.dd-title').trigger('click');
	    }   
    }); 

	$('.profMenu').bind('keyup', function (e) {
        var $this = $(this);
        if (e.keyCode === 13) {
            $this.trigger('click');
        }
        if (e.keyCode === 27) {
	  	  if ($('.profMenu').is(":visible")) {
			$('.openProfile').trigger('click');
		  }
	    }   
    }); 

    $('.popup').bind('keyup', function (e) {
        var $this = $(this);
        if (e.keyCode === 27) {
            $this.find('.close').trigger('click');
        }    
    }); 

     $('.dd-menu-wrap.hoverShow').bind('keyup', function (e) {
        var $this = $(this);
        if (e.keyCode === 13) {
            $this.find('.dd-title').trigger('click');
        }   
    }); 

    
    
    $('.popup input,.popup textarea, .popup button, .popup a').each(function(){
       $(this).attr('tabindex',10);
    });

    $('.stripeAction').bind('keyup', function (e) {
        if (e.keyCode === 13) {
            $(this).find('button,a').trigger('click');
        }   
    }); 
    
});

