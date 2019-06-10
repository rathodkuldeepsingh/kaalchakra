            



            var windowWidth, windowHeight, width, height, radius;
            var nakshatra =new Array(27).fill(1);
            var rashi =new Array(12).fill(1);
            var pada = new Array(108).fill(1);
            var tithi = new Array(354).fill(1);
            var yoga = new Array(27).fill(1);
            var days = new Array(365).fill(1);
            
            windowWidth=$(window).width();
            windowHeight=$(window).height();
           //controls dimentsions wrt orientaion
            

            //date formats
            var dateTime=d3.timeParse("%I:%M %p %m/%d/%Y");
            var dates=d3.timeParse("%m/%d/%Y");
            var time=d3.timeParse("%I:%M %p");
            var formatDateTime=d3.timeFormat();
            var formatTime_hour=d3.timeFormat("%I");
            var formatTime_day=d3.timeFormat("%d");
            var formatTime_month=d3.timeFormat("%b");
            var formatTime_daymonth=d3.timeFormat("%d,%b");


            var tithi_lengths=[];
                
            
           
           
            

function drawChart()
{           
            if(windowWidth<windowHeight)
            {
                width  = windowWidth*0.95,
                height = windowWidth*0.95,
                radius = width/3.5;
                


            }else{
                width  = windowHeight*0.8,
                height = windowHeight*0.8,
                radius = height/4;
                
            }
            
            
            

            //colors
            

//Backgdrop arc thickness
            var backdrop_arc=d3.arc()
                    .outerRadius(radius*0.65)
                    .innerRadius(0);

            //Rashi arc thickness
            var rashi_arc=d3.arc()
                    .outerRadius(radius*0.85)
                    .innerRadius(radius*0.65);

            //Nakshatra arc thickness
            var nakshatra_arc=d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius*0.85);

            //pada arc thickness        
            var pada_arc=d3.arc()
                    .outerRadius(radius*1.05)
                    .innerRadius(radius);

            //yoga arc thickness        
            var yoga_arc=d3.arc()
                    .outerRadius(radius*1.3)
                    .innerRadius(radius*1.15);

            //tithi arc thickness        
            var tithi_arc=d3.arc()
                    .outerRadius(radius*1.44)
                    .innerRadius(radius*1.4);

            //days arc thickness        
            var days_arc=d3.arc()
                    .outerRadius(radius*1.5)
                    .innerRadius(radius*1.46);


            //labels arc
            var labelArc=d3.arc()
                    .outerRadius(radius-50)
                    .innerRadius(radius-50);

           

            //pie generator
            var pieRashi=d3.pie()
                    .sort(null)
                    .value(function(d) {return d;});
            var pieNakshatra=d3.pie()
                    .sort(null)
                    .value(function(d) {return d;});
            var piePada=d3.pie()
                    .sort(null)
                    .value(function(d) {return d;});
            var pieYoga=d3.pie()
                    .sort(null)
                    .value(function(d) {return d;});
            var pieTithi=d3.pie()
                    .sort(null)
                    .value(function(d) {return d;});
            var pieDays=d3.pie()
                    .sort(null)
                    .value(function(d) {return d;});
            
            //define svg
            var svg = d3.select(".kundali_wheel").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("class","chart")
                    .append("g")
                    .attr("transform", "translate("+width/2+","+height/2+")")
                    .attr("class", "container");


//generate backdrop Arcs
                var n= svg.append("g")
                    .attr("class","backdrop");

                n.selectAll(".arc0")
                    .data(pieRashi(rashi))
                    .enter().append("g")
                    .attr("class", "arc0")
                    .append("path")
                    .attr("d",backdrop_arc)
                    .style("fill", function(d,i){
                        if($("#kundali_switch").checked)
                        {   
                            if(i%2==0)
                                return  d3.color("#555555");
                            else
                                return d3.color("#666666");
                        }
                        else
                        {   
                             return d3.color("rgba(0,0,0,0)");
                        }

                    })
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(2000)
                    .attrTween("d", pieTweenB);

//generate Rashi arcs
                //append g element
                var r= svg.append("g")
                    .attr("class","wheelRashi");

                r.selectAll(".arc")
                    .data(pieRashi(rashi))
                    .enter().append("g")
                    .attr("class", "arc")
                    .append("path")
                    .attr("id","try")
                    .attr("d",rashi_arc)
                    .style("fill", d3.color("#ff652f"))
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(2000)
                    .attrTween("d", pieTweenR);

                    
                //append the text(labels)
                r.append("text")
                    //.transition()
                    //.ease(d3.easeLinear)
                    //.duration(2000)
                    .append("textPath")
                    .attr("xlink:href","#try")
                    .style("text-anchor","middle")
                    .attr("startOffset","50%")
                    //.attr("transform", function(d) {return "translate(" + labelArc.centroid(d)+ ")"; })
                    //.attr("dy",".35em")
                    .text(function(d) {return "Something";});
                /*y.append("text")
                .append("textPath")
                .attr("xlink:href","#try")
                .style("text-anchor","middle")
                .attr("startOffset","50%")
                .text("Hey, my boy wassup");
                */

//generate Nakshtra Arcs
                var n= svg.append("g")
                          .attr("class","wheelNakshatra");
                    
                n.selectAll(".arc1")
                    .data(pieNakshatra(nakshatra))
                    .enter().append("g")
                    .attr("class", "arc1")
                    .append("path")
                    .attr("d",nakshatra_arc)
                    .style("fill",d3.color("#ff652f"))
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(2000)
                    .attrTween("d", pieTweenN);

//generate Pada arcs
                var p= svg.append("g")
                          .attr("class","wheelPada");
                p.selectAll(".arc2")
                    .data(piePada(pada))
                    .enter().append("g")
                    .attr("class", "arc2")
                    .append("path")
                    .attr("d",pada_arc)
                    .style("fill",d3.color("#ff652f"))
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(2000)
                    .attrTween("d", pieTweenP);

//generate Yoga arcs
                var y= svg.append("g")
                          .attr("class","wheelYoga");
                
                y.selectAll(".arc3")
                    .data(pieYoga(yoga))
                    .enter().append("g")
                    .attr("class", "arc3")
                    .append("path")
                    .attr("d",yoga_arc)
                    .style("fill",d3.color("rgba(0,0,0,0)"))
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(2000)
                    .attrTween("d", pieTweenY);

                

//generate Tithi arcs
                var t= svg.append("g")
                          .attr("class","wheelThithi");

                t.selectAll(".arc4")
                    .data(pieTithi(tithi))
                    .enter().append("g")
                    .attr("class", "arc4")
                    .append("path")
                    .attr("d",tithi_arc)
                    .style("fill",d3.color("rgba(0,0,0,0)"))
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(2000)
                    .attrTween("d", pieTweenT);

//generate Days arcs
                var d= svg.append("g")
                          .attr("class","Days");
                
                d.selectAll(".arc5")
                    .data(pieDays(days))
                    .enter().append("g")
                    .attr("class", "arc5")
                    .append("path")
                    .attr("d",days_arc)
                    .style("fill",d3.color("rgba(0,0,0,0)"))
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(2000)
                    .attrTween("d", pieTweenD);

//create the marker line
                var l=svg.append("line")
                        .attr("class","marker")
                        .style("stroke", "black")
                        .attr("x1",0)
                        .attr("y1",0)
                        .attr("x2",0)
                        .attr("y2",-width/2);




            function pieTweenR(b){
                b.innerRadius=0;
                var i=d3.interpolate({startAngle:0,endAngle:0},b);
                return function(t){return rashi_arc(i(t));};

            }
            function pieTweenN(b){
                b.innerRadius=0;
                var i=d3.interpolate({startAngle:0,endAngle:0},b);
                return function(t){return nakshatra_arc(i(t));};

            }
            function pieTweenP(b){
                b.innerRadius=0;
                var i=d3.interpolate({startAngle:0,endAngle:0},b);
                return function(t){return pada_arc(i(t));};

            }
            function pieTweenY(b){
                b.innerRadius=0;
                var i=d3.interpolate({startAngle:0,endAngle:0},b);
                return function(t){return yoga_arc(i(t));};

            }
            function pieTweenT(b){
                b.innerRadius=0;
                var i=d3.interpolate({startAngle:0,endAngle:0},b);
                return function(t){return tithi_arc(i(t));};

            }
            function pieTweenD(b){
                b.innerRadius=0;
                var i=d3.interpolate({startAngle:0,endAngle:0},b);
                return function(t){return days_arc(i(t));};

            }
            function pieTweenB(b){
                b.innerRadius=0;
                var i=d3.interpolate({startAngle:0,endAngle:0},b);
                return function(t){return backdrop_arc(i(t));};

            }


    //make kundali
            //generate grid data
            function gridData() {
                var data = new Array();
                var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
                var ypos = 1;
                var gridWidth = radius*0.22;
                var gridHeight = radius*0.22;
                
                // iterate for rows 
                for (var row = 0; row < 4; row++) {
                    data.push( new Array() );

                    // iterate for cells/columns inside rows
                    for (var column = 0; column < 4; column++) {
                        data[row].push({
                            x: xpos,
                            y: ypos,
                            width: gridWidth,
                            height: gridHeight,
                            i:row,
                            j:column
                        })
                        // increment the x position. I.e. move it over by 50 (width variable)
                        xpos += gridWidth;
                       
                    }
                    // reset the x position after a row is complete
                    xpos = 1;
                    // increment the y position for the next row. Move it down 50 (height variable)
                    ypos += gridHeight; 
                }
                return data;
            }
            //assign data to variable
            var gridData = gridData();

     
     function kundaliChart(a){    
         
        if(a==1)
            {         var grid= svg.append("g")
                        .attr("class","kundaliNorth")
                        .attr("transform", "translate(-"+radius*0.445+",-"+radius*0.445+")")
                        .selectAll(".row")
                        .data(gridData)
                        .enter().append("g")
                        .attr("class", "row");
            
                

            

                        //adding columns
                        var column = grid.selectAll(".square")
                            .data(function(d) { return d; })
                            .enter().append("rect")
                            .attr("class","square")
                            .attr("x", function(d) { return d.x; })
                            .attr("y", function(d) { return d.y; })
                            .attr("width", function(d) { return d.width; })
                            .attr("height", function(d) { return d.height; })
                            .style("fill", function(d){
                                if(d.i%2==0)
                                    {   if(d.j%2==0 )
                                        {
                                            if(d.i>=1&&d.j>=1)
                                                {return "#fff";}
                                            else
                                                {return "#ccc";}
                                            
                                        }
                                        else 
                                        {   if(d.i>=1 && d.j<=2)
                                                {return "#fff";}
                                            else
                                                {return "#aaa";} 
                                        }
                                    }
                                else{   if(d.j%2==0)
                                        {   if(d.i<=2&&d.j>=1)
                                                {return "#fff";}
                                            else
                                                {return "#aaa";}
                                        }
                                        else
                                        {   if(d.i<=2&&d.j<=2)
                                                {return "#fff";}
                                            else
                                                {return "#ccc";}
                                        } 
                                    }

                            })
                        .style("stroke-width",function(d){
                            if(d.i==1||d.i==2)
                            {   if(d.j==1||d.j==2){return "0";}
                                else{ return "1";}
                            }
                            else{return "1"}
                        })
                        .style("stroke","white");
                }
            else if(a==2)
                {
                    //display north Indian Kundali
                }
            else{
                    d3.select(".kundaliNorth").remove();
                }
        }

    drawChart.kundaliChart=kundaliChart;
} 

function drawTithiChart(){

        // variable for holding csv data   
            var dat; 

            d3.csv('panchang.csv',function(error,data){
             if(error){ throw error;}
             
             dat=data;
             var chart=d3.select(".timeline");
             

        // scale for x-axis
             var xScale=d3.scaleTime().range([0,windowWidth*100])
                .domain([dateTime("12:00 AM 01/01/2019"),dateTime("11:59 PM 12/31/2019")]);
                

        //x-axis
                chart.append("svg")
                    .attr("width",windowWidth*100)
                    .attr("height",height*0.05)
                    .attr("transform","translate(0,"+windowHeight*0.5+")")
                    .append("g")
                    .attr("class","x-axis-day")
                    .attr("text-anchor","end")
                    .call(d3.axisBottom(xScale).ticks(9000)
                        .tickFormat(function(d)
                        {   
                            return formatTime_hour(d);
                        }));

        //month
                chart.append("svg")
                    .attr("transform","translate(0,"+windowHeight*0.475+")")
                    .attr("class","x-axis-mon")
                    .attr("text-anchor","end")
                    .attr("width",windowWidth*100)
                    .attr("height",height*0.05)
                    .call(d3.axisBottom(xScale).ticks(700)
                            .tickFormat(function(d){
                                return formatTime_daymonth(d);
                            }
                        ).tickSize(20));

                    var chart_bars=chart.append("svg")
                     .attr("width",windowWidth*100)
                     .attr("height",height/2);

                     chart_bars.append("g")
                     .attr("class","barTithi");
                     chart_bars.append("g")
                     .attr("class","barNakshatra");
                     chart_bars.append("g")
                     .attr("class","barYoga");
                     chart_bars.append("g")
                     .attr("class","barKarana");


        //iterate through the dat for generating bars             
                data.forEach(function(d,i){
                    
                    
                    var val;
        //Drawing tithi bars            
                    d3.select(".barTithi")
                     .append("rect")
                     .attr("class",d.TITHI)
                     .attr("width",function(){
                        val=giveLength("T",i);
                        filltithis(val,i,d.TITHI);
                        return xScale(dateTime(val[1]))-xScale(dateTime(val[0]));
                        
                     })
                     .attr("height","50px")
                     .attr("rx",10)
                     .attr("x", function(){
                        return xScale(dateTime(val[0]));
                     })
                     .attr("y",320)
                     .attr("fill","#F06292");
        // drawing tithi 2
                    if(d.TITHI2.replace(/\s/g,"")!="None")
                    {
                     d3.select(".barTithi")
                     .append("rect")
                     .attr("class",d.TITHI2)
                     .attr("width",function(){
                        filltithis([d.TITHIEND.concat(" ",d.DTSTART),d.TITHI2END.concat(" ",d.DTEND)],i,d.TITHI2);
                        return xScale(dateTime(d.TITHI2END.concat(" ",d.DTEND)))-xScale(dateTime(d.TITHIEND.concat(" ",d.DTSTART)));//giveTithi(data[i].TITHIEND,data[i].DTSTART,);
                        
                     })
                     .attr("height","50px")
                     .attr("rx",10)
                     .attr("x",xScale(dateTime(d.TITHIEND.concat(" ",d.DTSTART))))
                     .attr("y",320)
                     .attr("fill","#cccaca");

                    }

        //draw Nakshatra bars
                    d3.select(".barNakshatra")
                     .append("rect")
                     .attr("class",d.NAKSHATRA)
                     .attr("width",function(){
                        val=giveLength("N",i);
                        //console.log(d.NAKSHATRA+" : "+val[0]+" , "+ val[1]);
                        return xScale(dateTime(val[1]))-xScale(dateTime(val[0]));
                        
                     })
                     .attr("height","50px")
                     .attr("rx",10)
                     .attr("x", function(){
                        return xScale(dateTime(val[0]));
                     })
                     .attr("y",269)
                     .attr("fill","#FFC107");
        // drawing Nakshatra 2
                    if(d.NAKSHATRA2.replace(/\s/g,"")!="None")
                    {
                     d3.select(".barNakshatra")
                     .append("rect")
                     .attr("class",d.NAKSHATRA2)
                     .attr("width",function(){
                        
                        return xScale(dateTime(d.NAKSHATRA2END.concat(" ",d.DTEND)))-xScale(dateTime(d.NAKSHATRAEND.concat(" ",d.DTSTART)));//giveTithi(data[i].TITHIEND,data[i].DTSTART,);
                        
                     })
                     .attr("height","50px")
                     .attr("rx",10)
                     .attr("x",xScale(dateTime(d.NAKSHATRAEND.concat(" ",d.DTSTART))))
                     .attr("y",269)
                     .attr("fill","#ffe082");

                    }
        //draw Yoga bars
                    d3.select(".barYoga")
                     .append("rect")
                     .attr("class",d.YOGA)
                     .attr("width",function(){
                        val=giveLength("Y",i);
                        //console.log(d.YOGA+" : "+val[0]+" , "+ val[1]);
                        return xScale(dateTime(val[1]))-xScale(dateTime(val[0]));
                        
                     })
                     .attr("height","50px")
                     .attr("rx",10)
                     .attr("x", function(){
                        return xScale(dateTime(val[0]));
                     })
                     .attr("y",217)
                     .attr("fill","#9ccc65");
        // drawing Yoga 2 bars
                    if(d.YOGA2.replace(/\s/g,"")!="None")
                    {
                     d3.select(".barYoga")
                     .append("rect")
                     .attr("class",d.YOGA2)
                     .attr("width",function(){
                        
                        return xScale(dateTime(d.YOGA2END.concat(" ",d.DTEND)))-xScale(dateTime(d.YOGAEND.concat(" ",d.DTSTART)));//giveTithi(data[i].TITHIEND,data[i].DTSTART,);
                        
                     })
                     .attr("height","50px")
                     .attr("rx",10)
                     .attr("x",xScale(dateTime(d.YOGAEND.concat(" ",d.DTSTART))))
                     .attr("y",217)
                     .attr("fill","#aed581");

                    }
                    
        //draw Karana bars
                    d3.select(".barKarana")
                     .append("rect")
                     .attr("class",d.KARANA)
                     .attr("width",function(){
                        val=giveLength("K",i);
                        //console.log(d.KARANA+" : 1 : "+val[0]+" , "+ val[1]);
                        return xScale(dateTime(val[1]))-xScale(dateTime(val[0]));
                        
                     })
                     .attr("height","50px")
                     .attr("rx",10)
                     .attr("x", function(){
                        return xScale(dateTime(val[0]));
                     })
                     .attr("y",165)
                     .attr("fill","#4FC3F7");
        // drawing Karana 2 bars
                   if(d.KARANA2.replace(/\s/g,"")!="None" && d.KARANA2END.replace(/\s/g,"")!="FullNight")
                    {
                     d3.select(".barKarana")
                     .append("rect")
                     .attr("class",d.KARANA2)
                     .attr("width",function(){
                        val=giveLength("K",i);
                        //console.log(d.KARANA2+" : 2 :"+dat[i].KARANAEND.concat(" ",dat[i].DTSTART)+" , "+ val[2]);
                        return xScale(dateTime(val[2]))-xScale(dateTime(dat[i].KARANAEND.concat(" ",dat[i].DTSTART)));
                        //return xScale(dateTime(d.KARANA2END.concat(" ",d.DTEND)))-xScale(dateTime(d.KARANAEND.concat(" ",d.DTSTART)));//giveTithi(data[i].TITHIEND,data[i].DTSTART,);
                        
                     })
                     .attr("height","50px")
                     .attr("rx",10)
                     .attr("x",xScale(dateTime(d.KARANAEND.concat(" ",d.DTSTART))))
                     .attr("y",165)
                     .attr("fill","#4FC3F7");

                    }
                    
        // drawing Karana 3
                    if(d.KARANA3.replace(/\s/g,"")!="None")
                    {
                     d3.select(".barKarana")
                     .append("rect")
                     .attr("class",d.KARANA3)
                     .attr("width",function(){
                        
                        return xScale(dateTime(d.KARANA3END.concat(" ",d.DTEND)))-xScale(dateTime(d.KARANA2END.concat(" ",d.DTSTART)));//giveTithi(data[i].TITHIEND,data[i].DTSTART,);
                        
                     })
                     .attr("height","50px")
                     .attr("rx",10)
                     .attr("x",xScale(dateTime(d.KARANA2END.concat(" ",d.DTSTART))))
                     .attr("y",165)
                     .attr("fill","#4FC3F7");

                    }
                    



                })
                

               


            });

        //gives the width of bars   
            function filltithis(value,i,tithi){
                tithi_lengths[i]=[dat[i].DTSTART,tithi,value[0],value[1]];
                 //[date, tithi, start_time, end_time]
                
            } 

            function giveLength(name,i)
            {   
                var tmStart=0,
                dtStart=0, 
                tmEnd=0,
                dtEnd=0; 
         

                var start,end;


        //code for TIthi
                if(name=="T")
                {
                    
            //identify if the tithi is ending on next Date
                        
                    if(i==dat.length-1)
                    {
                        dtEnd="12/31/2019";
                        tmEnd="04:01 PM";

                    }
                    else if(dat[i].TITHIEND.replace(/\s/g,"")!="FullNight")
                    {
                       
                        dtEnd=pickDate(dat[i].DTSTART,dat[i].TITHIEND,dat[i+1].SUNRISE,i);
                        tmEnd=dat[i].TITHIEND;
                    }
                    else
                    {   
                        dtEnd=pickDate(dat[i+1].DTSTART,dat[i+1].TITHIEND,dat[i+2].SUNRISE,i+1);
                        tmEnd=dat[i+1].TITHIEND;
                    }

            //find the starting date
                    if(i=="0")
                    {
                        dtStart="01/01/2019";
                        tmStart="01:16 AM";
                    }
                    else if(dat[i-1].TITHIEND.replace(/\s/g,"")=="FullNight")
                    {
                        dtStart=pickDate(dat[i-2].DTSTART,dat[i-2].TITHIEND,dat[i-1].SUNRISE,i-2);
                        tmStart=dat[i-2].TITHIEND;
                    }
                    else if(dat[i-1].TITHI2.replace(/\s/g,"")=="None")
                    {
                        dtStart=pickDate(dat[i-1].DTSTART,dat[i-1].TITHIEND,dat[i].SUNRISE,i-1);
                        tmStart=dat[i-1].TITHIEND;
                        
                    }
                    else{
                        dtStart=pickDate(dat[i-1].DTSTART,dat[i-1].TITHI2END,dat[i].SUNRISE,i-1);
                        tmStart=dat[i-1].TITHI2END;
                    }

                    start=tmStart.concat(" ",dtStart);
                    end=tmEnd.concat(" ",dtEnd );
                    return [start,end];
                          
                }
        //code for Nakshatra        
                else if(name == "N")
                {
                                
            //identify if the nakshatra is ending on next Date
                        
                    if(i==dat.length-1)
                    {
                        dtEnd="1/1/2020";
                        tmEnd="11:59 PM";

                    }
                    else if(dat[i].NAKSHATRAEND.replace(/\s/g,"")!="FullNight")
                    {
                       
                        dtEnd=pickDate(dat[i].DTSTART,dat[i].NAKSHATRAEND,dat[i+1].SUNRISE,i);
                        tmEnd=dat[i].NAKSHATRAEND;
                    }
                    else
                    {   
                        dtEnd=pickDate(dat[i+1].DTSTART,dat[i+1].NAKSHATRAEND,dat[i+2].SUNRISE,i+1);
                        tmEnd=dat[i+1].NAKSHATRAEND;
                    }

            //find the starting date
                    if(i=="0")
                    {
                        dtStart="12/31/2018";
                        tmStart="12:00 AM";
                    }
                    else if(dat[i-1].NAKSHATRAEND.replace(/\s/g,"")=="FullNight")
                    {
                        dtStart=pickDate(dat[i-2].DTSTART,dat[i-2].NAKSHATRAEND,dat[i-1].SUNRISE,i-2);
                        tmStart=dat[i-2].NAKSHATRAEND;
                    }
                    else if(dat[i-1].NAKSHATRA2.replace(/\s/g,"")=="None")
                    {
                        dtStart=pickDate(dat[i-1].DTSTART,dat[i-1].NAKSHATRAEND,dat[i].SUNRISE,i-1);
                        tmStart=dat[i-1].NAKSHATRAEND;
                        
                    }
                    else{
                        dtStart=pickDate(dat[i-1].DTSTART,dat[i-1].NAKSHATRA2END,dat[i].SUNRISE,i-1);
                        tmStart=dat[i-1].NAKSHATRA2END;
                    }

                    start=tmStart.concat(" ",dtStart);
                    end=tmEnd.concat(" ",dtEnd );
                    return [start,end];
                }
                else if(name == "Y")
                {
        //identify if the Yoga is ending on next Date
                        
                    if(i==dat.length-1)
                    {
                        dtEnd="1/1/2020";
                        tmEnd="11:59 PM";

                    }
                    else if(dat[i].YOGAEND.replace(/\s/g,"")!="FullNight")
                    {
                       
                        dtEnd=pickDate(dat[i].DTSTART,dat[i].YOGAEND,dat[i+1].SUNRISE,i);
                        tmEnd=dat[i].YOGAEND;
                    }
                    else
                    {   
                        dtEnd=pickDate(dat[i+1].DTSTART,dat[i+1].YOGAEND,dat[i+2].SUNRISE,i+1);
                        tmEnd=dat[i+1].YOGAEND;
                    }

            //find the starting date
                    if(i=="0")
                    {
                        dtStart="12/31/2018";
                        tmStart="12:00 AM";
                    }
                    else if(dat[i-1].YOGAEND.replace(/\s/g,"")=="FullNight")
                    {
                        dtStart=pickDate(dat[i-2].DTSTART,dat[i-2].YOGAEND,dat[i-1].SUNRISE,i-2);
                        tmStart=dat[i-2].YOGAEND;
                    }
                    else if(dat[i-1].YOGA2.replace(/\s/g,"")=="None")
                    {
                        dtStart=pickDate(dat[i-1].DTSTART,dat[i-1].YOGAEND,dat[i].SUNRISE,i-1);
                        tmStart=dat[i-1].YOGAEND;
                        
                    }
                    else{
                        dtStart=pickDate(dat[i-1].DTSTART,dat[i-1].YOGA2END,dat[i].SUNRISE,i-1);
                        tmStart=dat[i-1].YOGA2END;
                    }

                    start=tmStart.concat(" ",dtStart);
                    end=tmEnd.concat(" ",dtEnd );
                    return [start,end];
                }
                else if(name=="K")
                {
        //identify if the Karana is ending on next Date
                    var dt2End,tm2End;
                    if(i==dat.length-1)  //last date
                    {
                        dtEnd="1/1/2020";
                        tmEnd="11:59 PM";

                    }
                    else  //cases fot normal karana
                    {   
                        dtEnd=pickDate(dat[i].DTSTART,dat[i].KARANAEND,dat[i+1].SUNRISE,i);
                        tmEnd=dat[i].KARANAEND;
                    }

                    if(i==dat.length-1)  //last date
                    {
                        dt2End="1/1/2020";
                        tm2End="11:59 PM";

                    }
                    else if(dat[i].KARANA2END.replace(/\s/g,"")!="FullNight")
                    {
                        dt2End=pickDate(dat[i].DTSTART,dat[i].KARANA2END,dat[i+1].SUNRISE,i);
                        tm2End=dat[i].KARANA2END;
                    }
                    else{
                        dt2End=pickDate(dat[i+1].DTSTART,dat[i+1].KARANAEND,dat[i+2].SUNRISE,i);
                        tm2End=dat[i+1].KARANAEND;
                    }
                 
                    

                    

            //find the starting date
                    if(i=="0")
                    {
                        dtStart="12/31/2018";
                        tmStart="12:00 AM";
                    }
                    else if(dat[i-1].KARANA2END.replace(/\s/g,"")=="FullNight") //karna2 full night cases
                    {
                        dtStart=pickDate(dat[i-1].DTSTART,dat[i-1].KARANAEND,dat[i].SUNRISE,i-1);
                        tmStart=dat[i-1].KARANAEND;
                    }
                    else if(dat[i-1].KARANA3.replace(/\s/g,"")=="None" && dat[i-1].KARANA2END.replace(/\s/g,"")!="FullNight")  //normal cases karna2 ending same day
                    {
                        dtStart=pickDate(dat[i-1].DTSTART,dat[i-1].KARANA2END,dat[i].SUNRISE,i-1);
                        tmStart=dat[i-1].KARANA2END;
                        
                    }
                    else { 

                        dtStart=pickDate(dat[i-1].DTSTART,dat[i-1].KARANA3END,dat[i].SUNRISE,i-1);
                        tmStart=dat[i-1].KARANA3END;
                    }


                    
                    start = tmStart.concat(" ",dtStart);
                    end=tmEnd.concat(" ",dtEnd );
                    var end2=tm2End.concat(" ",dt2End);

                    return [start,end,end2];
                }

              
                



                
                   
              
                
            }

            function pickDate(d,t,s,i)
            {
                if(time(t)>time("12:00 AM") && time(t)<time(s))
                    {   
                        return dat[i+1].DTSTART;

                            
                    }
                else
                    {
                        return dat[i].DTSTART;
                             
                    }
            }

           

} // tithi time line ends here


function drawTithiWheel(){


        var dat; 
        var innerRadius= windowHeight*0.16,
        outerRadius= windowHeight*0.25;
        var dom=["Purnima","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Amavasya",];
        var tithis=["Prathma","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Purnima",];
//generating SVG     
        var chart=d3.select(".tithi-circle");
        var chart_g=chart.append("svg")
                .attr("width",windowHeight*0.7)
                .attr("height",windowHeight*0.7)
                .append("g")
                .attr("transform","translate("+windowHeight*0.35+","+windowHeight*0.35+")");

//loading csv        
        d3.csv('panchang.csv',function(error,data){
             if(error){ throw error;}
             
             dat=data;
             
    //x scale
        var x=d3.scaleBand()
            .range([0,Math.PI]) //outcome is angles for full circle
            .domain(dom);
        var x2=d3.scaleBand()
            .range([Math.PI,2*Math.PI]) //outcome is angles for full circle
            .domain(dom);
    //y scale
        var y=d3.scaleLinear()
            .range([innerRadius,outerRadius])
            .domain([20,27]);


    
            
            
    

    //parent for radial markings and moons                
        var radial_marker=chart_g.append("g")
                    .attr("class","radial_markings")
                    .attr("transform","rotate(6,0,0)");

    

    //parent for circular markers
        var marker=chart_g.append("g")
            .attr("class","markings");

    // tithi text
        var text_marker=chart_g.append("g")
            .attr("class","text_markers");

    //draw circular markers
        for (var i=0;i<5;i++)
            {
                marker.append("circle")
                    .attr("r",y(20+i*1.75))
                    .attr("cx",0)
                    .attr("cy",0)
                    .attr("stroke","black")
                    .attr("stroke-width",0.75)
                    .attr("stroke-dasharray","1,1")
                    .attr("fill",function(){
                        if(i==0){ return "#fff";}
                        else{ return "#ffffff00";}
                    });
            }

    //parent for tithi bars in circle       
        var bars=chart_g.append("g")
                    .attr("class","tithi_bars");


//adding bars
        data.forEach(function(d,i){
            
            if(i<=15)
            {
                bars.append("path")
                    .attr("class",dat[i].TITHI)
                    .attr("fill","#BA68C8")
                    .attr("d",d3.arc()
                        .innerRadius(innerRadius)
                        .outerRadius(function(d){
                            console.log(tithi_lengths[i][1]+" "+tithi_lengths[i][2]+" "+tithi_lengths[i][3]);
                            return y((dateTime(tithi_lengths[i][3])-dateTime(tithi_lengths[i][2]))/60/60/1000);
                            })
                        .startAngle(function(){
                            if(tithi_lengths[i][1].replace(/\s/g,"")=="Pratipada")
                            {
                                return x("Purnima");
                            }
                            else{
                                return x(tithi_lengths[i][1].replace(/\s/g,""));
                            }
                            
                        })
                        .endAngle(function(){
                            if(tithi_lengths[i][1].replace(/\s/g,"")=="Pratipada")
                            {
                                return x("Purnima")+x.bandwidth();
                            }
                            else{
                                return x(tithi_lengths[i][1].replace(/\s/g,""))+x.bandwidth();
                            }
                            
                        })
                        .padAngle(0.01)
                        .padRadius(innerRadius)

                        );

                var cont=radial_marker.append("g")
                        .attr("class","cont")
                        .attr("transform","rotate("+12*i+",0,0)");
                        
                        cont.append("line")
                        .attr("x1","0")
                        .attr("y1","0")
                        .attr("x2","0")
                        .attr("y2",outerRadius*1.35)
                        .attr("stroke","black")
                        .attr("stroke-width","0.25")
                        .attr("stroke-dasharray","2,5");
                       
                       cont.append("circle")
                        .attr("r",windowHeight*0.021)
                        .attr("cx",0)
                        .attr("cy",outerRadius*1.13)
                        .attr("stroke","black")
                        .attr("stroke-width",0.25)
                        .attr("fill","gray");

                
                    


            }
            else if(i>15&& i<=30)
            {
                bars.append("path")
                    .attr("class",dat[i].TITHI)
                    .attr("fill","#BA68C8")
                    .attr("d",d3.arc()
                        .innerRadius(innerRadius)
                        .outerRadius(function(d){
                            console.log(tithi_lengths[i][1]+" "+tithi_lengths[i][2]+" "+tithi_lengths[i][3]);
                            return y((dateTime(tithi_lengths[i][3])-dateTime(tithi_lengths[i][2]))/60/60/1000);
                            })
                        .startAngle(function(){
                            if(tithi_lengths[i][1].replace(/\s/g,"")=="Pratipada")
                            {
                                return x2("Purnima");
                            }
                            else{
                                return x2(tithi_lengths[i][1].replace(/\s/g,""));
                            }
                            
                        })
                        .endAngle(function(){
                            if(tithi_lengths[i][1].replace(/\s/g,"")=="Pratipada")
                            {
                                return x2("Purnima")+x.bandwidth();
                            }
                            else{
                                return x2(tithi_lengths[i][1].replace(/\s/g,""))+x.bandwidth();
                            }
                            
                        })
                        .padAngle(0.01)
                        .padRadius(innerRadius)

                        );


                var cont=radial_marker.append("g")
                        .attr("class","cont")
                        .attr("transform","rotate("+12*i+",0,0)");
                        
                        cont.append("line")
                        .attr("x1","0")
                        .attr("y1","0")
                        .attr("x2","0")
                        .attr("y2",outerRadius*1.35)
                        .attr("stroke","black")
                        .attr("stroke-width","0.25")
                        .attr("stroke-dasharray","2,4");

                        cont.append("circle")
                        .attr("r",windowHeight*0.021)
                        .attr("cx",0)
                        .attr("cy",outerRadius*1.13)
                        .attr("stroke","black")
                        .attr("stroke-width",0.25)
                        .attr("fill","gray");

                        cont.append("text")
                            .attr("x",40)
                            .attr("y",outerRadius+35)
                            .text(function(){return tithis[i-16]})
                            .attr("transform","rotate("+90+",0,"+outerRadius+35+")");

                        
                        

                        


            }






        }) //data for each end

    

        


        }) // csv end
             






}


     