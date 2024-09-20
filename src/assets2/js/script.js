// Global var to cache info about indicators for easy access.
var indicators = [];

$(window).load(function(){

  //
  //	CREATE THE INDICATORS AND ADD TO PAGE
  //

  var rawIndicators = "";
  var $articles = $("article");
  // Create a bubble for each article
  $articles.each(function(i) {
    var iInverse = $articles.length - i - 1;
    // Top margin is a function of the nodes before it, bottom is proportional to those after. determines stacking at top / bottom static positions
    var margins = 'margin: ' + ((i*1.5)+0.5) + 'em 0 ' + ((iInverse*1.5)+0.5) + 'em 0;';
    rawIndicators +=  '<a class="indicator indicator--upcoming" style="' + margins + '" href="#' + this.id + '"><span class="indicator-tooltip">' + $(this).find("h1").text() + '</span></a>';
  });
  $("body").append(rawIndicators);

  // Utility function to calculate the proper top coordinate for a bubble when it's on the move (position: absolute)
  var getNodeTopPos = function(indicator, target) {
    var indMargTop = parseInt(indicator.css("margin-top").replace("px", ""));
    var targCenter =  target.outerHeight(false)/2;
    var indCenter = indicator.outerHeight(false)/2;
    return target.offset().top - indMargTop + targCenter - indCenter;
  }


  //
  // INITIAL SET UP OF INDICATOR OBJECT
  //

  var calcIndicatorInfo = function(){

    indicators = []
    $(".indicator").each(function(){

      var o = {
        $indicator: $(this),
        $target: $( $(this).attr("href") ),
        $targetTitle: $( $(this).attr("href") + " h1" )
      };

      // When it's abs positioned (on the move), this is the top pos
      o.absPos = getNodeTopPos(o.$indicator, o.$targetTitle);

      // When it's abs positioned, at this scroll pos we should make the indicator fixed to the bottom
      o.absBottomStop = window.innerHeight - (o.absPos + o.$indicator.outerHeight(true));

      // Top / bottom stops for being 'viewable'
      o.viewableTopStop = o.$target.offset().top - window.innerHeight;
      o.viewableBottomStop = o.$target.offset().top + o.$target.outerHeight();
      indicators[indicators.length] = o;

    });
  };

  //
  // ON RESIZE FUNCTION - UPDATE THE CACHED POSITON VALUES
  //

  var initIndicators = function() {
    calcIndicatorInfo();
    // Bug fix - without timeout scroll top reports 0, even when it scrolls down the page to last page loaded position
    // http://stackoverflow.com/questions/16239520/chrome-remembers-scroll-position
    setTimeout(function(){
      var st = $(document).scrollTop();
      $(indicators).each(function(){
        if(st<=this.absPos && st>=(-1*this.absBottomStop))
          this.$indicator.removeClass("indicator--upcoming").removeClass("indicator--passed").addClass("indicator--active")
              .css({ "top" : this.absPos });
        else if(st>=(-1*this.absBottomStop))
          this.$indicator.removeClass("indicator--active").removeClass("indicator--upcoming").addClass("indicator--passed").css({ "top" : "" });
        else
          this.$indicator.removeClass("indicator--active").removeClass("indicator--passed").addClass("indicator--upcoming").css({ "top" : "" });

        if(st>=this.viewableTopStop && st<=(this.viewableBottomStop))
          this.$indicator.addClass("indicator--viewing");
        else
          this.$indicator.removeClass("indicator--viewing");
      });
    }, 0);
  }

  //
  // SCROLL FUNCTION - UPDATE ALL OF THE INDICATORS
  //

  var adjustIndicators = function() {
    var st = $(document).scrollTop();

    // The indicators that SHOULD be scrolling
    var anticipated = _.filter(indicators, function(o) { return (st<=o.absPos && st>=(-1*o.absBottomStop)) });

    // The $ elements that are indeed scrolling
    var active$ = $(".indicator--active");

    // Anything in anticipated that isn't in active should be activated ...
    var needsActivation = _.filter(anticipated, function(o) { return !_.contains(active$, o.$indicator[0]); })

    // ... And anything thats in active that isn't in anticipated needs to be stopped.
    var anticipatedEls = _.pluck(anticipated, "$indicator");
    var needsDeactivation = _.filter(active$, function(o) {
      return !_.find(anticipatedEls, function(e){ return e[0] == o });
    });

    // Do the Activation
    _.each(needsActivation, function(o) {
      o.$indicator
        .removeClass("indicator--upcoming").removeClass("indicator--passed")
        .addClass("indicator--active")
        .css({ "top" : o.absPos })
    });

    _.each(needsDeactivation, function(i$){
      var indicator = _.find(indicators, function(i) {
        return i.$indicator[0] == i$;
      });
      if(st>=indicator.absPos) {
        // Went off top. now passed.
        indicator.$indicator.removeClass("indicator--active").addClass("indicator--passed").css({ "top" : "" });
      }
      else {
        // Went off bottom. now upcoming.
        indicator.$indicator.removeClass("indicator--active").addClass("indicator--upcoming").css({ "top" : "" });
      }
    });

    $(indicators).each(function(){
      if(st>=this.viewableTopStop && st<=(this.viewableBottomStop))
        this.$indicator.addClass("indicator--viewing");
      else
        this.$indicator.removeClass("indicator--viewing");
    });

  }

  //
  // BIND EVENTS
  //

  $(document).scroll(function() {
    adjustIndicators();
  });
  $(window).resize(function() {
    initIndicators();
    adjustIndicators();
  });

  initIndicators();
  adjustIndicators();

  $(".indicator").click(function(){
    initIndicators();
    adjustIndicators();
  })

});






// var activecalss = document.querySelectorAll('.tab_otions > ul > li > a');

// for (var i = 0; i < activecalss.length; i++) {
//   activecalss[i].addEventListener('click',function() {
//   for (var i = 0; i < activecalss.length; i++) {
//     activecalss[i].classList.remove('active');
  
   
//     this.classList.add('active');
   
//   }
// })
// }

$(document).ready(function() {

  // var scrollLink = $('.tab_otions > ul > li > a');


  // scrollLink.click(function(e) {
  //   e.preventDefault();
  //   $('body,html').animate({
  //     scrollTop: $(this.hash).offset().top
  //   }, 30 );
  // });

  // Active link switching
  // $(window).scroll(function() {
  //   var scrollbarLocation = $(this).scrollTop();

  //   scrollLink.each(function() {

  //     var sectionOffset = $(this.hash).offset().top;

  //     if ( sectionOffset <= scrollbarLocation ) {
  //       $(this).parent().addClass('active');
  //       $(this).parent().siblings().removeClass('active');
  //     }
  //   })

  // })

})

$(window).bind('scroll', function () {
  if ($(window).scrollTop() > 600) {
    $('.tab_otions').addClass('active');
  } else {
    $('.tab_otions').removeClass('active');
  }
});

 window.addEventListener("scroll", function () {
                var header = document.querySelector(".tg-btnscrolltop");
                header.classList.toggle("active", scrollY > 1200);

                // var links = document.querySelector('.links');
                // links.classList.toggle('sticky2',scrollY > 50);
            });
var body = jQuery("body");
var _tg_btnscrolltop = jQuery("#tg-btnscrolltop");
_tg_btnscrolltop.on("click", function () {
    var _scrollUp = jQuery("html, body");
    _scrollUp.animate({ scrollTop: 0 });
});
function ferror(input_id, error_m, error_id) {
        $(error_id).html(error_m);
        $(error_id).addClass('active');
        if(input_id==""){}
            else
            {
              $('#' + input_id ).focus();
              $('#' + input_id ).addClass('done');
              $('#' + input_id ).addClass('has-error');
              $('#' + input_id ).parent().removeClass('has-error');}
              setTimeout(function() { $(error_id).removeClass('active');
                $(error_id).html("");
            }, 2500);
            return false;
    }

    function validateEmail(sEmail)
    {
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (filter.test(sEmail)) {
            return true;
        }
        else {
            return false;
        }
    }

	$('#mobile').on('keypress', function(key) {
		if(key.charCode < 48 || key.charCode > 57) return false;
	});

$("#quote_submit").on('click', function(e){
    e.preventDefault();
    var name = $("#name").val();
	var email = $("#email").val();
	var mobile = $("#mobile").val();
	var holiday_book = $('#holiday_book').find(':selected').val();
	var msg = $("#exampleFormControlTextarea1").val();
	if(name == ""){
		ferror("name", "Please enter your name.", "#notify");
	}
	else if(email == ""){
		ferror("email", "Please enter your email.", "#notify");
	}
	else if (!validateEmail(email)) {
		ferror("email", "Please enter valid email address.", "#notify");
	}
	else if(mobile == ""){
		ferror("mobile", "Please enter your mobile.", "#notify");
	}
	else if(holiday_book == ""){
		ferror("holiday_book", "Please select the type of holiday you want to book.", "#notify");
	}
	else if(msg == ""){
		ferror("msg", "Please enter your message.", "#notify");
	}
	else{
		var data = {

			"name": name,
			"mobile" : mobile,
			"email" : email,
			"holiday_book" : holiday_book,
			"msg" : msg,
			"type" : "request_form"
		}
		//console.log(data);
		$.ajax({
            type: 'POST',
            url: 'php/',
            data: data,
            dataType: 'json',
            encode: true,
			statusCode: {
                404: function() {ferror("", "Request page not found.", "#notify");}
            },
            beforeSend: function (xhr) {
				console.log("wait");
        $('.spiner_box_').show();
			}
        })
        .done(function(data) {
			if(!data.success)
            {
                if (data.errors.error) {
					ferror("", data.errors.error, "#notify");
                }
            }
            else
			{
				ferror("", data.message, "#notify");
        $('.spiner_box_').hide();
				setTimeout(function() {
					location.reload();
                 }, 2000);
            }
        })
        .fail(function(data) {
			//console.log("hlo");
		});

	}
})

$("#contact_send").on('click', function(e){
    e.preventDefault();
    var name = $("#name").val();
	var m_email = $("#m_email").val();
	var msg = $("#exampleFormControlTextarea1").val();
	if(name == ""){
		ferror("name", "Please enter your name.", "#notify");
	}
	else if(m_email == ""){
		ferror("m_email", "Please enter your email.", "#notify");
	}
	else if (!validateEmail(m_email)) {
		ferror("m_email", "Please enter valid email address.", "#notify");
	}

	else if(msg == ""){
		ferror("msg", "Please enter your message.", "#notify");
	}
	else{
		var data = {

			"name": name,
			"email" : m_email,
			"msg" : msg,
			"type" : "contact"
		}
		console.log(data);
		$.ajax({
            type: 'POST',
            url: 'php/',
            data: data,
            dataType: 'json',
            encode: true,
			statusCode: {
                404: function() {ferror("", "Request page not found.", "#notify");}
            },
            beforeSend: function (xhr) {
				console.log("wait");
        $('.spiner_box_c').show();
			}
        })
        .done(function(data) {
			if(!data.success)
            {
                if (data.errors.error) {
					ferror("", data.errors.error, "#notify");
                }
            }
            else
			{
				ferror("", data.message, "#notify");
         $('.spiner_box_c').hide();
				setTimeout(function() {
					location.reload();
                 }, 2000);
            }
        })
        .fail(function(data) {
			//console.log("hlo");
		});

	}
})

$("#newletter_submit").on('click', function(e){
    e.preventDefault();

	var me_email = $("#me_email").val();

	if(me_email == ""){
		ferror("me_email", "Please enter your email.", "#notify");
	}
	else if (!validateEmail(me_email)) {
		ferror("me_email", "Please enter valid email address.", "#notify");
	}

	else{
		var data = {


			"email" : me_email,

			"type" : "newsletter"
		}
		//console.log(data);
		$.ajax({
            type: 'POST',
            url: 'php/',
            data: data,
            dataType: 'json',
            encode: true,
			statusCode: {
                404: function() {ferror("", "Request page not found.", "#notify");}
            },
            beforeSend: function (xhr) {
				console.log("wait");
			}
        })
        .done(function(data) {
			if(!data.success)
            {
                if (data.errors.error) {
					ferror("", data.errors.error, "#notify");
                }
            }
            else
			{
				ferror("", data.message, "#notify");
				setTimeout(function() {
					location.reload();
                 }, 2000);
            }
        })
        .fail(function(data) {
			//console.log("hlo");
		});

	}
})

$(document).ready(function(){
	$('.spiner_box').hide();
})

$("#book_now").on('click', function(e){
    e.preventDefault();
    var form = $("#member_form")[0];
		    var dataforupload = new FormData();
    var fname = $("#f_name").val();
    var address = $("#address").val();
    var date = $("#date").val();
    var f_phone = $("#f_phone").val();
    var f_mobile = $("#f_mobile").val();
	var f_email = $("#f_email").val();
	var ff_name = $("#ff_name").val();
	var f_relation = $("#f_relation").val();
	var ff_address = $("#ff_address").val();
	var ff_tel =$("#ff_tel").val();
	 var ff_mobile = $("#ff_mobile").val();
	var ff_email = $("#ff_email").val();
	var holiday_type = $('#holiday_book').find(':selected').val();
	var covid_jab = $("input[name='covid_jab']:checked").val();
	var medication = $("#medication").val();
	var diet = $("#dietary").val();
	var room = $("input[name='room']:checked").val();
	var holiday = $("input[name='holiday']:checked").val();
	var policy_no = $("#policy_no").val();
	var e_contact = $("#e_contact").val();
	var pay_method = $("#pay_method").val();
	var allVals = [];
			$('input[class="form-check-input checkboxes"]:checked').each(function() {
				allVals.push($(this).val());
			});


	if(fname == ""){
	    ferror("f_name", "Please enter your name.", "#notify");
	}
	else if(address == ""){
	    ferror("address", "Please enter your address.", "#notify");
	}
	else if(f_mobile == ""){
	    ferror("f_mobile", "Please enter your mobile number.", "#notify");
	}
	else if(f_email == ""){
		ferror("f_email", "Please enter your email.", "#notify");
	}
	else if (!validateEmail(f_email)) {
		ferror("f_email", "Please enter valid email address.", "#notify");
	}

	else if(!($('#tnc').is(":checked"))){
	    ferror("tnc", "Please verify our terms and conditions..", "#notify");
	}
	else{

	    dataforupload.append('fname', fname);
			    dataforupload.append('address',address);
			    dataforupload.append('date', date);
		    	dataforupload.append('f_phone', f_phone);
		    	dataforupload.append('f_mobile', f_mobile);
    			dataforupload.append('f_email',f_email);
    			dataforupload.append('ff_name', ff_name);
    			dataforupload.append('f_relation', f_relation);
    			dataforupload.append('ff_address', ff_address);
    			dataforupload.append('ff_tel',ff_tel);
    			dataforupload.append('ff_mobile',ff_mobile);
    			dataforupload.append('ff_email', ff_email);
    			dataforupload.append('pay_method', pay_method);
                dataforupload.append('covid_jab', covid_jab);
                dataforupload.append('medication', medication);
				dataforupload.append('holiday_type', holiday_type);
                dataforupload.append('diet', diet);
                dataforupload.append('room', room);
                dataforupload.append('holiday', holiday);
                dataforupload.append('policy_no', policy_no);
                dataforupload.append('e_contact', e_contact);
				dataforupload.append('allVals',allVals);

    			dataforupload.append('type', 'book_now');

		$.ajax({
            type: 'POST',
            url: 'php/',
            data: dataforupload,
            enctype: 'multipart/form-data',
				processData: false,
				contentType: false,
                dataType: 'json',
                encode: true,
			statusCode: {
                404: function() {ferror("", "Request page not found.", "#notify");}
            },
            beforeSend: function (xhr) {
				console.log("wait");
				$('.spiner_box').show();
			}
        })
        .done(function(data) {
			if(!data.success)
            {
                if (data.errors.error) {
					ferror("", data.errors.error, "#notify");
                }
            }
            else
			{
				ferror("", data.message, "#notify");
				$('.spiner_box').hide();
				setTimeout(function() {
					location.reload();
                 }, 2000);
            }
        })
        .fail(function(data) {
			//console.log("hlo");
		});

	}
})


