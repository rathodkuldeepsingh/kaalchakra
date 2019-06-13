    var menu=2;
    var menubutton=0;
    var scroll;
    var sidebtn=6;
    var today=new Date();;
    var formatTim_hour=d3.timeFormat("%I:%M");
    var formatTime_month=d3.timeFormat("%b");
    var formatate=d3.timeFormat("%e");
    var formatTimeap=d3.timeFormat("%p");

    $(document).ready(function(){
        

        var width=$(window).width();
        var height=$(window).height();

        showKundaliWheel();
       drawTithiChart();
       drawTithiWheel();
        

        //date picker
        $("#datepick").appendDtpicker({

            onSelect:function(date){
                var temp=$('#datepick').handleDtpicker('getDate');
               today=temp;
                d3.selectAll(".datetime>div").remove();

                d3.select(".datetime")
                .append("div")
                .attr("class","date")
                .text(formatate(temp));
                d3.select(".datetime")
                .append("div")
                .attr("class","month")
                .text(formatTime_month(temp));
                d3.select(".datetime")
                .append("div")
                .attr("class","time")
                .text(formatTim_hour(temp));
                d3.select(".datetime")
                .append("div")
                .attr("class","ampm")
                .text(formatTimeap(temp));
                d3.select(".datetime")
                .append("div")
                .attr("class","year")
                .text("2019");

                drawChart.rotateKundaliWheel(1,today);
                
            }
        });
        







        $(".sub-menu1, .sub-menu2").css({"width":width*0.8*0.53-height*0.195});


        $(window).resize(function(){
            d3.selectAll("svg").remove();
          showKundaliWheel();
           drawTithiChart();
           drawTithiWheel();
            width=$(window).width();
            height=$(window).height();

        //dimensioning
            $(".sub-menu1, .sub-menu2").css({"width":width*0.8*0.53-height*0.195});



        });

        $(".flex_info").scroll(function (event) {
            scroll = $(".flex_info").scrollTop();
            //console.log(scroll);
            var flex_content_scroll=$(".flex_content").offset().top;
            var flex_header_scroll=$(".flex_header").offset().top;

            $(".flex_logo, .flex_header").css({"top":scroll});

    //the disappearing logo
            if(flex_content_scroll<flex_header_scroll+$(".flex_header").outerHeight()){
                $(".flex_logo, .flex_header").css({"opacity":"0"});
            }
            else{
                $(".flex_logo, .flex_header").css({"opacity":"1"});
            }
    //the transparent background;
    
            if($(".end").offset().top<($(window).scrollTop()+($(window).outerHeight()/1.5)))
            {   //console.log("ho gaya");
                $(".flex").css({"opacity":"0.7"});
                $(".flex_content").css({"opacity":"0"});
                
                showTransp(0);

            }
            else{
                $(".flex").css({"opacity":"1"});
                $(".flex_content").css({"opacity":"1"});
                
                showTransp(1);
                $(".flex>i").css({"opacity":"0"});
            }

        });
        
        $(".info").scroll(function(event){
            
        })



    //hover over the circular buttons
        $(".part").hover(function(){
            var index=$(".part").index(this);
            
            setback2(index);
            
        },function(){
             var index=$(".part").index(this);
             if(sidebtn==index)
             {
                $(this).addClass("selected");
             }
             if(sidebtn!=6)
             {
                 setback2(sidebtn);
             }
             else{
                $(".back2").css({"background": "#f57d5a40"});
             }
            
             

        });

    //hover on timeline
        $(".timeline").hover(function(){
            drawTithiChart.movingline();
        },function(){

        });



        $(".wheelRashi").hover(function(){
            drawChart.rotateKundaliWheel(1,today);
            
        },function(){

        });

    //closing the flex screen
        $(".flex>i").click(function(){
            $(".flex").addClass("hide");
            $(".transp>div").addClass("hide");
            showBackground(0);
            showMainContainer();
            showTransp(2);

        });


    //clicking the circlar button
        $(".part").click(function(){
            if($(".part").index(this)!=sidebtn)
            {
                sidebtn=$(".part").index(this);
                $(".part").eq(sidebtn).addClass("selected");
                $(".info>div").eq(sidebtn+1).addClass("show");
                deselectother(sidebtn);
                setback2(sidebtn);
                slideKundali(0);

            //draw tithi chart
                if($(".part").index(this)==1){
                    
                    //drawTithiWheel();
                }
                else
                {
                    //d3.selectAll(".tithi-circle>svg").remove();
                }

                //code for continuous inof page scroll     
                /* $(".info").animate({
                        scrollTop: $(".show#Vaara").eq(sidebtn+1).offset().top
                }, 2000);
                */
                $(".info").scrollTop(0);
            }
            else
            {
                sidebtn=6;
                
                
                slideKundali(1);
                if($(".part").index(this)==1){
                    
                    //d3.selectAll(".tithi-circle>svg").remove();
                }
            }
            
            deselectother(sidebtn);
            setback2(sidebtn);
            
        });

    //clicking the menu
        $(".item").click(function(){
            var new_value=$(".item").index(this);
            if(menu==new_value)
            {
                menu=2; //no menu selected


            }
            else
            {   
                menu=new_value;
                if(menu==0) //first menu selected
                {   
                    showMenu(0,this);
                }
                else   //second value selected
                {
                    showMenu(1,this);
                }
            }

        });

        $(".sub-menu1>p, .sub-menu2>p").click(function(){
            showPanel(this,menu);
            sidebtn=6;
            deselectother(sidebtn);
            slideKundali(1);
        })

//info button click
        $(".menu>i").click(function(){
            
            if(menubutton==0)
            {
                $(".fa-info-circle").removeClass("open");
                $(".fa-window-close").addClass("open");
                $(".menu_panel").addClass("open");
                menubutton=1;
            }
            else
            {   
                $(".fa-info-circle").addClass("open");
                $(".fa-window-close").removeClass("open");
                $(".menu_panel").removeClass("open");
                menubutton=0;
            }


        })

//home button
        $("#logo").click(function(){
            home();
        });

//date picker
        $(".datetime").click(function(){
            if($(".pickdate").hasClass("show"))
            {$(".pickdate").removeClass("show");
                console.log($('#datepick').handleDtpicker('getDate'));
            }
            else
            {$(".pickdate").addClass("show");}
            
        });

        $("#kundali_switch").change(function(){
            if(this.checked){
                
               // console.log("clicked")
                drawChart.kundaliChart(1);
            }
            else{
                
                $(".arc0 path").css({"fill":"rgba(0,0,0,0)"});
                drawChart.kundaliChart(0);
            }
        });
        

        /*
        var userId = '604389';
        var apiKey = '2b4854378ff96d476a1e2cca65d058f3';
        var data = 'JSON Request Data';
        var request = $.ajax({
        url: "https://json.astrologyapi.com/v1/basic_panchang",
        method: "POST",
        dataType:'json',
        headers: {
        "authorization": "Basic " + btoa(userId+":"+apiKey),
        "Content-Type":'application/json'
        },
        data:JSON.stringify(data)
        });
        // Returns A promiss
        return( request.then( function(resp){
        return resp;
        }, function(err){
        return err;
        }));
        */
        





    })

    /*$('#iframe1').load( function(){
        var $iFrameContents = $('#iframe1').contents(),
        $city   = $iFrameContents.find('div.feed> b:nth-child(1)');
        console.log($city+"______");
        //$iFrameContents.find('html').replaceWith($city);
    }); 
    */
    function rotateChart(){
        var panchang={Vaara:1, Thithi:2, Nakshatra:2, Yoga:5, Karana:6};
        var vAngle=(panchang.Nakshatra-0.5)*(360/27);
        var tAngle=(panchang.Nakshatra-0.5)*(360/27);
        var nAngle=(panchang.Nakshatra-0.5)*(360/27);
        var yAngle=(panchang.Nakshatra-0.5)*(360/27);
        var kAngle=(panchang.Nakshatra-0.5)*(360/27);
        $(".Nakshatra").css({"transform":"rotate("+nAngle+" deg)"});
    }
    
    function showKundaliWheel()
    {
        $(".kundali_wheel").removeClass("hide");
        $(".default>.img#one").addClass("show");
        $(".default>.img#two").removeClass("show");
        drawChart();

    }
    function hideKundaliWheel()
    {
        $(".kundali_wheel").addClass("hide");
    }
    function showTimeline()
    {
        $(".timel").removeClass("hide");
        $(".default>.img#one").removeClass("show");
        $(".default>.img#two").addClass("show");
    }
    function hideTimeline()
    {
        $(".timel").addClass("hide");
        $(".default>.img#one").shoeClass("show");
        $(".default>.img#two").removeClass("show");
    }
    function showMenu(a,ref){
        if(a==0)
        {
            //$(".sub-menu1").css({"visibility":"visible","transform":"translate(0,107%)","opacity":"1"});
            $(".sub-menu1").addClass("show");
            $(".sub-menu2").removeClass("show");
            $(".item").eq(0).addClass("selected");
            $(".item").eq(1).removeClass("selected");
        }
        else{
            $(".sub-menu2").addClass("show");
            $(".sub-menu1").removeClass("show");
            $(".item").eq(1).addClass("selected");
            $(".item").eq(0).removeClass("selected");
        }
    }
   
    function home(){
        for(var i=0;i<3;i++)
        {
            
                 $(".panel").eq(i).removeClass("big");
           
        }
        showMainContainer();
    }

    function showPanel(a,b){
        
        if(b==0)
        {var index=$(".sub-menu-item").index(a);
            
            for(var i=0;i<3;i++)
            {
                if(i==index)
                {
                    $(".panel").eq(index).addClass("big");
                    //console.log("index="+index);
                }        
                else{
                     $(".panel").eq(i).removeClass("big");
                }

            }
            hideKundaliWheel();
            hideTimeline();
            $(".info").addClass("hide");
        }
        else{
            var index=$(".sub-menu2>p").index(a);
            
            for(var i=0;i<3;i++)
            {
                
                     $(".panel").eq(i).removeClass("big");
                
            }
            if(index==0)
            {
                showKundaliWheel();
                hideTimeline();
            }
            else{
                showTimeline();
                hideKundaliWheel();
            }
        }

        $(this).addClass("selected");
        
        
    }

    function showMainContainer(){
        $(".main.container").addClass("show");
        $(".back, .back2").addClass("show");
        $(".right").addClass("show");
        showKundaliWheel();
        showSideBtn(sidebtn);
        $(".info").removeClass("hide");
    }
    function showBackground(a){
        if (a==0)
        {
            $(".back,.back2").addClass("show");
        }
    }
    function showTransp(a){
        if(a==0){
            $(".transp").css({"opacity":"1"});
            $(".transp>#one").css({"opacity":"1","transform":"translate(0,0)"});
            $(".transp>#two").css({"opacity":"1","transform":"translate(0,0)"});
            $(".transp>#three").css({"opacity":"1","transform":"translate(0,0)"});
            $(".flex>i").css({"opacity":"1"});

        }
        else if(a==1){
            $(".transp").css({"opacity":"0"});
            $(".transp>#one").css({"opacity":"0","transform":"translate(0,-50%)"});
            $(".transp>#two").css({"opacity":"0","transform":"translate(0,-50%)"});
            $(".transp>#three").css({"opacity":"0","transform":"translate(0,-50%)"});

        }
        else if(a==2){
            $(".transp").css({"opacity":"0","display":"none"});
            $(".transp>#one").css({"opacity":"0","transform":"translate(0,-50%)"});
            $(".transp>#two").css({"opacity":"0","transform":"translate(0,-50%)"});
            $(".transp>#three").css({"opacity":"0","transform":"translate(0,-50%)"});
            

        }
    }

    function showSideBtn(a)
    {
        if(a==0)
        {
            $(".info>.default").addClass("show");
            $(".info>.legends").addClass("show");
            //show default info panel
        }

        else if(a==1)
        {
            //show 1st panel
        }

    }

    function slideKundali(a){
        if(a==0)
        {
            $(".left").css({"width":"17vw"});
            $(".right").css({"width":"83vw"});
            //$(".switch").hide(500);
            drawChart.rotateKundaliWheel(2,today);
        }
        else
        {
            $(".left").css({"width":"50vw"});
            $(".right").css({"width":"50vw"});
            //$(".switch").show(500);
            drawChart.rotateKundaliWheel(1,today);

        }
    }

    function setback2(a){
            if(a==0)
            {
                $(".back2").css({"background": "#f57d5a40 url(../img/leo.png) no-repeat right top","background-size":"contain"});
            }
            else if(a==1)
            {   
                $(".back2").css({"background": "#f57d5a40 url(../img/aries.png) no-repeat right top","background-size":"contain"});
            }
            else if(a==2)
            {
                $(".back2").css({"background": "#f57d5a40 url(../img/scorpio.png) no-repeat right top","background-size":"contain"});
            }
            else if(a==3)
            {
                $(".back2").css({"background": "#f57d5a40 url(../img/pisces.png) no-repeat right top","background-size":"contain"});
            }
            else if(a==4)
            {
                $(".back2").css({"background": "#f57d5a40 url(../img/libra.png) no-repeat right top","background-size":"contain"});
            }
            else{
                $(".back2").css({"background": "#f57d5a40"});
            }
    }

    function deselectother(a)
    {   var j=a+1;
        for(var i=0;i<=6;i++)
        {
            if(i!=a && i<6){
                $(".part").removeClass("selected");
                //console.log("hata a: "+a);
            }

            if(i!=j && i<6)
            {   //console.log("hata j: "+j);
                $(".info>div").eq(i).removeClass("show");
            }
            if(i==6 && a==6)
            {
                $(".default").addClass("show");
            }
            
        }
    }

    function displaynone(a)
    {
        setTimeout(
          function() 
          {
            //$(a).css("display":"none");
          }, 1000);
    }
