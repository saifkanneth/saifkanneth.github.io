$(document).ready(onReady);
var _index;
var currClick;
var curr_sec;
var leftMove;
var sample_type;
var skillSelect=false;
var sample_json;
function onReady(){
    sample_type=["web","app","game"];
    $.ajax({
  dataType: "json",
  url: "./sample.json",
  success: showSample
});
    $('.parallax').scroll(updateOnScroll);
    $(".skills").hide();
    $('.about').show();
    if(!skillSelect&&$(window).width()<=768){
             $('.exp_des_ex:eq(0)').find('i').addClass('exp_des_ex_active');
             
        }
        
    $('#work_carousel_mob').bind('slid.bs.carousel', function (e) {
        $(".work_prog .curr").html($('#work_carousel_mob').find('.item.active').index()+1)
        $(".work_prog .tot").html($('#work_carousel_mob').find('.item').length);
});
    $(window).resize(function(){
        if(skillSelect)
        moveIcons();
if(!skillSelect&&$(window).width()<=768){
             $('.exp_des_ex:eq(0)').find('i').addClass('exp_des_ex_active');
             console.log("Add Color")
        }else if(!skillSelect){
            $('.exp_des_ex:eq(0)').find('i').removeClass('exp_des_ex_active');
        }
        
    })
    $(".progress-bar").loading();
    $(".img_main").addClass('img_main_anim_focus');
$(".main_cont_in").addClass('main_cont_in_tr');
    $(".menu .menu_item").click(function () {
        
        sample_type=[];
        if($(this).attr("id")=="general")
            sample_type=["web","app","game"];
        else
            sample_type.push($(this).attr("id"))
        showSample(sample_json);
		
		 curr_sec = $(this).attr("id");
        _index=$(this).index();
        $('.menu .menu_item').each(function(){
            if($(this).attr("id")!=curr_sec){
                $(this).removeClass('menu_item_active')
            }else{
                $(this).addClass('menu_item_active')
            }
    })

    });
    $(".land_dir").click(function(){
        console.log($("#exp_div").offset().top)
         $('.parallax').animate({
                    scrollTop: $("#group1").height()
                }, 500);
    });
    $(".exp_des_ex").click(function(){
        skillSelect=true;
        curr_sec = $(this).attr("id");
        currClick=$(this);
        _index=$(this).index();
        $('.exp_des_ex').each(function(){
            if($(currClick).index()!=$(this).index()){
                $(this).find('i').removeClass('exp_des_ex_active')
                $(this).animate({
            'opacity':'.2'
        },300,function(){
            moveIcons();
        })
        }else{
                $(this).find('i').addClass('exp_des_ex_active')
                 $(this).animate({
            'opacity':'1'
        },300)
            }
        })
        
        

    });
    
   
}
function showSample(v){
    sample_json=v;
    $("#work_carousel .carousel-inner,#work_carousel_mob .carousel-inner").empty();
    $("#work_carousel .carousel-indicators,#work_carousel_mob .carousel-indicators").empty();
    $.each(sample_type,function (key,val) {
        if(key==0){
            $("#work_carousel .carousel-inner").append('<div class="item active row"  id="'+val+'"></div>');
            $("#work_carousel .carousel-indicators").append('<li data-target="#work_carousel" data-slide-to="'+key+'" class="active"></li>')
        }
        else{
             $("#work_carousel .carousel-inner").append('<div class="item  row"  id="'+val+'"></div>');
             $("#work_carousel .carousel-indicators").append('<li data-target="#work_carousel" data-slide-to="'+key+'" ></li>')
        }
        $.each(sample_json[val],function (key1,val1) {
            $('#work_carousel #'+val+'').append('<div class="work_sample col-xs-6 col-sm-3"><div class="work_cover"><div class="work_cover_in"><h3>'+val1.name+'</h3><a href="'+val1.web_url+'" target="blank"><i class="fa fa-link" aria-hidden="true"></i></a></div></div><div class="work_img"><img  src="'+val1.img_url+'"></div></div>');
        });
    })
    $.each(sample_type,function (key,val) {
        
        $.each(sample_json[val],function (key1,val1) {
            console.log(String(key)+String(key1))
            if(key==0&&key1==0){
            $("#work_carousel_mob .carousel-inner").append('<div class="item active row"  id="'+String(key)+String(key1)+'"></div>');
            $("#work_carousel_mob .carousel-indicators").append('<li data-target="#work_carousel" data-slide-to="'+String(key)+String(key1)+'" class="active"></li>')
        }
        else{
             $("#work_carousel_mob .carousel-inner").append('<div class="item  row"  id="'+String(key)+String(key1)+'"></div>');
             $("#work_carousel_mob .carousel-indicators").append('<li data-target="#work_carousel" data-slide-to="'+String(key)+String(key1)+'" ></li>')
        }
            $('#work_carousel_mob .item:last').append('<div class="work_sample col-xs-12"><div class="work_cover"><div class="work_cover_in"><h3>'+val1.name+'</h3><a href="'+val1.web_url+'" target="blank"><i class="fa fa-link" aria-hidden="true"></i></a></div></div><div class="work_img"><img  src="'+val1.img_url+'"></div></div>');
        });
    })
      $(".work_prog .curr").html($('#work_carousel_mob').find('.item.active').index()+1)
        $(".work_prog .tot").html($('#work_carousel_mob').find('.item').length);


    
}
function updateOnScroll() {
      if($('.parallax').scrollTop()>=($("#group1").height()/2)){
         $('.exp_des_ex').eq(0).addClass('exp_des_ex_show');
         setTimeout(function(){
       $('.exp_des_ex').eq(1).addClass('exp_des_ex_show');
   }, 200);
   setTimeout(function(){
       $('.exp_des_ex').eq(2).addClass('exp_des_ex_show');
   }, 400);
}
    }
function moveIcons(){
  $(".skills").hide();
  $(".skills").removeClass('visible');
    if($(window).width()<768){
        setDisplay();
    }else{
 $('.exp_des').animate({
            'margin-left':-1*$('.exp_des_ex').innerWidth()*_index+100
        },500,function() {
            if($(window).width()>768)
                leftMove='50%';
            else
                leftMove='0%';
            $(".exp_show").animate({
            'left':leftMove
            
        },0,setDisplay)
        })
    }
   
}

function setDisplay(){
               switch (curr_sec) {
        case "about":
            $('.about').css('display','table');
            break;
    case "work":
            $('.work').css('display','table');
            break;
        default:
        $('.act_skill').css('display','table');
            break;
    }
            $('.skill').each(function() {
                skill=$(this)
                $(this).find('.score').animate({
                    width:String(parseInt($(skill).find('.percent').html()))+'%'
                })
            })
        
}