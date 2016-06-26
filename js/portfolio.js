/**
 * Created by Alex.W on 2016/5/19.
 */
$(function() {

    $('#portfolio').sortable({stop:function() {
        alert("close the window")
    }});
    $('#search').keypress(function() {
        var val = $(this).val();

        $('#portfolio li').each(function() {
            if ($(this.attr('class').indexOf(val) < 0)) {
                $(this).fadeOut();
            }
        })
    });
    function setImg(src,id) {
        var img = $('<img src="" alt=""/>');
        this.img = img.attr('src',src);
        var path = "text/" + id + '.txt';
        $.get(path, function(data) {
            $('#description').html(data)
        });
        return this.img;
    }
    $("#portfolio img").click(function() {
        var src = $(this).attr('src');
        var id = $(this).attr('id');
        current_li = $(this).parent();
        setImg(src,id);
        //var img = setImg().img;
        $("#frameContainer").append(img);
        $('#overlay').fadeIn();
        $('#frame').fadeIn();
    });

    //$(document).click(function(e) {
    //    //if(!$('#frame').is(e.target)) {
    //    if(e.target.id != 'frame' && !$('img').is(e.target)) {
    //        $('#frame').fadeOut();
    //        $('#overlay').fadeOut();
    //        $('#frame img').remove();
    //    }
    //
    //})

    $('#overlay').click(function() {
        $('#frame').fadeOut();
        $('#overlay').fadeOut();
        $('#frame img').remove();
    });

    $('#leftArrow').click(function() {
        var width = $('#frameContainer').width() * 2;
        $('#frameContainer').css({'width': width +'px'});
        if(current_li.is(':first-child')) {
            var pre_img = $('#portfolio li').last().children();
        } else {
            var pre_img = current_li.prev().children();
        }
        var pre_id = pre_img.attr('id');
        var pre_src = pre_img.attr('src');
        var preFrameImg = setImg(pre_src,pre_id);
        $('#frameContainer').append(preFrameImg);
        //for(var i =1, len = $('#frameContainer img').length; i <= len; i ++) {
        //    width *= i;
        //    $('#frameContainer').css({'width': width +'px'});
        //}

        $('#frameContainer').animate({marginLeft:'-=800'},function() {
            if($('#frameContainer img').length > 1) {
                $('#frameContainer img').first().remove();
                //当img的个数大于1个的时候，就把原来那个img的node点给去掉，这样可以避免在反向
                //滑动的时候因为新的node点位置的加入而导致的混乱
                $('#frameContainer').css({'margin-left' : '0'},{'width':'1600'})
            }
        });

        current_li = pre_img.parent();
    });

    $('#rightArrow').click(function() {
        var width = $('#frameContainer').width() * 2;
        $('#frameContainer').css({'width': width +'px'});
        if(current_li.is(':last-child')) {
            var next_img = $('#portfolio li').first().children();
        } else {
            var next_img = current_li.next().children();
        }

        var next_id = next_img.attr('id');
        var next_src = next_img.attr('src');
        var nextFrameImg = setImg(next_src,next_id);

        $("#frameContainer").css({"margin-left":"-=800"});
        $('#frameContainer').prepend(nextFrameImg);

        //for(var i = 1, len = $("#frameContainer img").length; i <= len; i ++) {
        //    width *= i;
        //    $('#frameContainer').css({'width': width + 'px'});
        //}

        $('#frameContainer').animate({marginLeft:'-=-800'},function() {
            if($('#frameContainer img').length > 1){
                $('#frameContainer img').last().remove();
                $('#frameContainer').css({'margin-left':'0'});
            }
        });
        current_li = next_img.parent();
    });

    $("#leftArrow, #rightArrow").mouseover(function() {
        $(this).css('opacity',0.9);
    });

    $('#leftArrow,#rightArrow').mouseleave(function() {
        $(this).css('opacity',0.6);

    });

    $('#container .category li').click(function() {
        var category = $(this).html();
        $('.category li').removeClass();
        $(this).addClass('active');
        if(category == 'All') {
            $('#portfolio li').fadeIn();
        } else {
            $('#portfolio li').hide();
        }
        $('#portfolio li').each(function() {
            if($(this).hasClass(category)) {
                $(this).fadeIn();
            }
        })
    })
});