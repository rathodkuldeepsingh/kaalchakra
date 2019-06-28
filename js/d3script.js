            



            var windowWidth, windowHeight, width, height, radius;
            var nakshatra =[
                            {name:"Swati",value:1},
                            {name:"Vishakha",value:1},
                            {name:"Anuradha",value:1},
                            {name:"Jyeshtha",value:1},
                            {name:"Mula",value:1},
                            {name:"Purva Ashada",value:1},
                            {name:"Uttara Ashada",value:1},
                            {name:"Shravana",value:1},
                            {name:"Dhanishtha",value:1},
                            {name:"Shatabhisha",value:1},
                            {name:"Purva Bhadrapada",value:1},
                            {name:"Uttara Bhadrapada",value:1},
                            {name:"Revati",value:1},
                            {name:"Ashwini",value:1},
                            {name:"Bharani",value:1},
                            {name:"Krittika",value:1},
                            {name:"Rohini",value:1},
                            {name:"Mrigashirsha",value:1},
                            {name:"Ardra",value:1},
                            {name:"Punavasu",value:1},
                            {name:"Pushya",value:1},
                            {name:"Ashlesha",value:1},
                            {name:"Magha",value:1},
                            {name:"Purva Phalguni",value:1},
                            {name:"Uttara Phalguni",value:1},
                            {name:"Hasta",value:1},
                            {name:"Chitra",value:1}];                     
                     

            var rashi =new Array(12).fill(1);
            var rashival=[{name:"Meena",value:1},
                           {name:"Kumbha",value:1},
                           {name:"Makara",value:1},
                           {name:"Dhanush",value:1},
                           {name:"Vruschika",value:1}, 
                           {name:"Tula",value:1},
                           {name:"Kanya",value:1},
                           {name:"Simha",value:1},
                           {name:"Karaka",value:1},
                           {name:"Mithuna",value:1},
                           {name:"Vrushabaha",value:1},
                           {name:"Mesha",value:1}];

            var yoga = [{name:"Dhriti",value:1},
                        {name:"Shula",value:1},
                        {name:"Ganda",value:1},
                        {name:"Vriddhi",value:1},
                        {name:"Dhruva",value:1},
                        {name:"Vyaghata",value:1},
                        {name:"Harshana",value:1},
                        {name:"Vajra",value:1},
                        {name:"Siddhi",value:1},
                        {name:"Vyatipata",value:1},
                        {name:"Varigha",value:1},
                        {name:"Parigha",value:1},
                        {name:"Shiva",value:1},
                        {name:"Siddha",value:1},
                        {name:"Sadhya",value:1},
                        {name:"Shubha",value:1},
                        {name:"Shukla",value:1},
                        {name:"Brahma",value:1},
                        {name:"Indra",value:1},
                        {name:"Vaidhriti",value:1},
                        {name:"Vishkambha",value:1},
                        {name:"Ayushman",value:1},
                        {name:"Saubhagya",value:1},
                        {name:"Shobhana",value:1},
                        {name:"Atiganda",value:1},
                        {name:"Atiganda",value:1},
                        {name:"Sukarman",value:1}];
           
            var pada = new Array(108).fill(1);
            var tithi = new Array(354).fill(1);
            
            var days = new Array(365).fill(1);
            
            windowWidth=$(window).width();
            windowHeight=$(window).height();
           //controls dimentsions wrt orientaion
            

            //date formats
            var dateTime=d3.timeParse("%I:%M %p %m/%d/%Y");
            var dates=d3.timeParse("%m/%d/%Y");
            var time=d3.timeParse("%I:%M %p");
            var formatDate=d3.timeFormat("%m/%d/%Y");
            var formatTime=d3.timeFormat("%I:%M %p");
            var formatTime_hour=d3.timeFormat("%I");
            var formatTime_day=d3.timeFormat("%d");
            var formatTime_month=d3.timeFormat("%b");
            var formatMonth=d3.timeFormat("%m");
            var formatTime_daymonth=d3.timeFormat("%d %b");


            var tithi_lengths=[];
            var karana_length=[];
            var yoga_length=[];
            var nakshatra_length=[];

             var dat;
                
            

           
            

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
            
            
            d3.csv('panchang.csv',function(error,data){
             if(error){ throw error;}
             
             dat=data;
            })

           
            

//Backgdrop arc thickness
            var backdrop_arc=d3.arc()
                    .outerRadius(radius*0.7)
                    .innerRadius(0);

            //Rashi arc thickness
            var rashi_arc=d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius*0.85);

            //Nakshatra arc thickness
            var nakshatra_arc=d3.arc()
                    .outerRadius(radius*1.20)
                    .innerRadius(radius*1.05);

            //pada arc thickness        
            var pada_arc=d3.arc()
                    .outerRadius(radius*1.05)
                    .innerRadius(radius);

            //yoga arc thickness        
            var yoga_arc=d3.arc()
                    .outerRadius(radius*1.50)
                    .innerRadius(radius*1.35);

            //tithi arc thickness        
            var tithi_arc=d3.arc()
                    .outerRadius(radius*1.57)
                    .innerRadius(radius*1.52);

            //days arc thickness        
            var days_arc=d3.arc()
                    .outerRadius(radius*1.63)
                    .innerRadius(radius*1.58);


            //labels arc
            var labelArc=d3.arc()
                    .outerRadius(radius-50)
                    .innerRadius(radius-50);

           

            //pie generator
            var pieRashi=d3.pie()
                    .sort(null)
                   // .startAngle(-90 * Math.PI/180)
                   // .endAngle(-90 * Math.PI/180 + 2*Math.PI)
                    .value(function(d) {return d.value;});
            var pieNakshatra=d3.pie()
                    .sort(null)
                    //.startAngle(0)
                    //.endAngle( 2*Math.PI)
                    .value(function(d) {return d.value;});
            var piePada=d3.pie()
                    .sort(null)
                    .value(function(d) {return d;});
            var pieYoga=d3.pie()
                    .sort(null)
                    //.startAngle(-90 * Math.PI/180)
                   // .endAngle(-90 * Math.PI/180 + 2*Math.PI)
                    .value(function(d) {return d.value;});
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




//generate Days arcs
                var d= svg.append("g")
                          .attr("class","Days");

                d.append("circle")
                .attr("cx","0")
                .attr("cy","0")
                .attr("r",radius*1.4)
                .attr("stroke","#f57d5a")
                .attr("stroke-width",radius*0.2)
                .attr("fill","white");

                d.append("circle")
                .attr("cx","0")
                .attr("cy","0")
                .attr("r",radius*1.02)
                .attr("stroke","#f57d5a")
                .attr("stroke-width",radius*0.45)
                .attr("fill","white");

                
                
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
                    .attrTween("d", pieTweenY)
                    .each(function(d,i) {
                                //Search pattern for everything between the start and the first capital L
                                var firstArcSection = /(^.+?)L/;    

                                //Grab everything up to the first Line statement
                                var newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
                                //Replace all the comma's so that IE can handle it
                                newArc = newArc.replace(/,/g , " ");
                                
                                //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2) 
                                //flip the end and start position
                                if (d.endAngle > 90 * Math.PI/180) {
                                    var startLoc    = /M(.*?)A/,        //Everything between the first capital M and first capital A
                                        middleLoc   = /A(.*?)0 0 1/,    //Everything between the first capital A and 0 0 1
                                        endLoc      = /0 0 1 (.*?)$/;   //Everything between the first 0 0 1 and the end of the string (denoted by $)
                                    //Flip the direction of the arc by switching the start en end point (and sweep flag)
                                    //of those elements that are below the horizontal line
                                    var newStart = endLoc.exec( newArc )[1];
                                    var newEnd = startLoc.exec( newArc )[1];
                                    var middleSec = middleLoc.exec( newArc )[1];
                                    
                                    //Build up the new arc notation, set the sweep-flag to 0
                                    newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
                                }//if
                                
                                //Create a new invisible arc that the text can flow along
                                y.append("path")
                                    .attr("class", "hiddenYogArcs")
                                    .attr("id", "yogArc"+i)
                                    .attr("d", newArc)
                                    .style("fill", "none");
                            });
                                
                            //Append the label names on the outside
                            y.selectAll(".yognames")
                                .data(pieYoga(yoga))
                               .enter().append("text")
                                .attr("class", "yognames")
                                //Move the labels below the arcs for those slices with an end angle greater than 90 degrees
                                .attr("dy", function(d,i) { return (d.endAngle > 90 * Math.PI/180 ? -29 : 35); })
                               .append("textPath")
                                .attr("startOffset","50%")
                                .style("text-anchor","middle")
                                .attr("xlink:href",function(d,i){return "#yogArc"+i;})
                                .text(function(d){return d.data.name;
                            });


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
                    .attrTween("d", pieTweenN)
                    .each(function(d,i) {
                                //Search pattern for everything between the start and the first capital L
                                var firstArcSection = /(^.+?)L/;    

                                //Grab everything up to the first Line statement
                                var newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
                                //Replace all the comma's so that IE can handle it
                                newArc = newArc.replace(/,/g , " ");
                                
                                //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2) 
                                //flip the end and start position
                                if (d.endAngle > 90 * Math.PI/180) {
                                    var startLoc    = /M(.*?)A/,        //Everything between the first capital M and first capital A
                                        middleLoc   = /A(.*?)0 0 1/,    //Everything between the first capital A and 0 0 1
                                        endLoc      = /0 0 1 (.*?)$/;   //Everything between the first 0 0 1 and the end of the string (denoted by $)
                                    //Flip the direction of the arc by switching the start en end point (and sweep flag)
                                    //of those elements that are below the horizontal line
                                    var newStart = endLoc.exec( newArc )[1];
                                    var newEnd = startLoc.exec( newArc )[1];
                                    var middleSec = middleLoc.exec( newArc )[1];
                                    
                                    //Build up the new arc notation, set the sweep-flag to 0
                                    newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
                                }//if
                                
                                //Create a new invisible arc that the text can flow along
                                n.append("path")
                                    .attr("class", "hiddenNakArcs")
                                    .attr("id", "nakArc"+i)
                                    .attr("d", newArc)
                                    .style("fill", "none");
                            });
                                
                            //Append the label names on the outside
                            n.selectAll(".naknames")
                                .data(pieNakshatra(nakshatra))
                               .enter().append("text")
                                .attr("class", "naknames")
                                //Move the labels below the arcs for those slices with an end angle greater than 90 degrees
                                .attr("dy", function(d,i) { return (d.endAngle > 90 * Math.PI/180 ? 6 : 0); })
                               .append("textPath")
                                .attr("startOffset","50%")
                                .style("text-anchor","middle")
                                .attr("xlink:href",function(d,i){return "#nakArc"+i;})
                                .text(function(d){return d.data.name;
                            });

//generate Rashi arcs
                //append g element
                var r= svg.append("g")
                    .attr("class","wheelRashi");

                r.selectAll(".arc")
                    .data(pieRashi(rashival))
                    .enter().append("g")
                    .attr("class", "arc")
                    .append("path")
                    .attr("id","try")
                    .attr("d",rashi_arc)
                    .style("fill", d3.color("#ff652f"))
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(2000)
                    .attrTween("d", pieTweenR)
                    .each(function(d,i) {
                                //Search pattern for everything between the start and the first capital L
                                var firstArcSection = /(^.+?)L/;    

                                //Grab everything up to the first Line statement
                                var newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
                                //Replace all the comma's so that IE can handle it
                                newArc = newArc.replace(/,/g , " ");
                                
                                //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2) 
                                //flip the end and start position
                                if (d.endAngle > 90 * Math.PI/180) {
                                    var startLoc    = /M(.*?)A/,        //Everything between the first capital M and first capital A
                                        middleLoc   = /A(.*?)0 0 1/,    //Everything between the first capital A and 0 0 1
                                        endLoc      = /0 0 1 (.*?)$/;   //Everything between the first 0 0 1 and the end of the string (denoted by $)
                                    //Flip the direction of the arc by switching the start en end point (and sweep flag)
                                    //of those elements that are below the horizontal line
                                    var newStart = endLoc.exec( newArc )[1];
                                    var newEnd = startLoc.exec( newArc )[1];
                                    var middleSec = middleLoc.exec( newArc )[1];
                                    
                                    //Build up the new arc notation, set the sweep-flag to 0
                                    newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
                                }//if
                                
                                //Create a new invisible arc that the text can flow along
                                r.append("path")
                                    .attr("class", "hiddenRashiArcs")
                                    .attr("id", "rashiArc"+i)
                                    .attr("d", newArc)
                                    .style("fill", "none");
                            });
                                
                            //Append the label names on the outside
                            r.selectAll(".rashinames")
                                .data(pieRashi(rashival))
                               .enter().append("text")
                                .attr("class", "rashinames")
                                //Move the labels below the arcs for those slices with an end angle greater than 90 degrees
                                .attr("dy", function(d,i) { return (d.endAngle > 90 * Math.PI/180 ? -29 : 35); })
                               .append("textPath")
                                .attr("startOffset","50%")
                                .style("text-anchor","middle")
                                .attr("xlink:href",function(d,i){return "#rashiArc"+i;})
                                .text(function(d){return d.data.name;
                            });

//generate planetary orbits
            var orb=svg.append("g")
                    .attr("class","orbits");
                
                orb.append("circle")
                .attr("class","saturn_orb")
                .attr("cx","0")
                .attr("cy","0")
                .attr("r",radius*0.7)
                .attr("stroke","#f57d5a")
                .attr("stroke-width",radius*0.01)
                .attr("stroke-dasharray","2")
                .attr("fill","white");  

                orb.append("circle")
                .attr("class","jupiter_orb")
                .attr("cx","0")
                .attr("cy","0")
                .attr("r",radius*0.6)
                .attr("stroke","#f57d5a")
                .attr("stroke-width",radius*0.01)
                .attr("stroke-dasharray","2")
                .attr("fill","white");  

                orb.append("circle")
                .attr("class","mars_orb")
                .attr("cx","0")
                .attr("cy","0")
                .attr("r",radius*0.5)
                .attr("stroke","#f57d5a")
                .attr("stroke-width",radius*0.01)
                .attr("stroke-dasharray","2")
                .attr("fill","white");  

                orb.append("circle")
                .attr("class","sun_orb")
                .attr("cx","0")
                .attr("cy","0")
                .attr("r",radius*0.4)
                .attr("stroke","#f57d5a")
                .attr("stroke-width",radius*0.01)
                .attr("stroke-dasharray","2")
                .attr("fill","white");  

                orb.append("circle")
                .attr("class","venus_orb")
                .attr("cx","0")
                .attr("cy","0")
                .attr("r",radius*0.3)
                .attr("stroke","#f57d5a")
                .attr("stroke-width",radius*0.01)
                .attr("stroke-dasharray","2")
                .attr("fill","white");    

                 orb.append("circle")
                .attr("class","mercury_orb")
                .attr("cx","0")
                .attr("cy","0")
                .attr("r",radius*0.2)
                .attr("stroke","#f57d5a")
                .attr("stroke-width",radius*0.01)
                .attr("stroke-dasharray","2")
                .attr("fill","white");

                orb.append("circle")
                .attr("class","moon_orb")
                .attr("cx","0")
                .attr("cy","0")
                .attr("r",radius*0.1)
                .attr("stroke","#f57d5a")
                .attr("stroke-width",radius*0.01)
                .attr("stroke-dasharray","2")
                .attr("fill","white");   

               

                  




 //genertae planets
            
            var pl=svg.append("g")
                .attr("class","planets");

               
                pl.append("image")
                .attr("class","moon")
                .attr("transform-origin","0 0")
                .attr("xlink:href","img/moon.png") 
                .attr("height",radius*0.04)  
                .attr("width",radius*0.04)
                .attr("x",-radius*0.12)
                .attr("y",-radius*0.02);     

                
                pl.append("image")
                .attr("class","mercury")
                .attr("transform-origin","0 0")
                .attr("xlink:href","img/mercury.png") 
                .attr("height",radius*0.05)  
                .attr("width",radius*0.05)
                .attr("x",-radius*0.225)
                .attr("y",-radius*0.025);     

                
                pl.append("image")
                .attr("class","venus")
                .attr("transform-origin","0 0")
                .attr("xlink:href","img/venus.png") 
                .attr("height",radius*0.06)  
                .attr("width",radius*0.06)
                .attr("x",-radius*0.33)
                .attr("y",-radius*0.03);    

                
                pl.append("image")
                .attr("class","sun")
                .attr("transform-origin","0 0")
                .attr("xlink:href","img/sun.png") 
                .attr("height",radius*0.11)  
                .attr("width",radius*0.11)
                .attr("x",-radius*0.455)
                .attr("y",-radius*0.055);  

               
                pl.append("image")
                .attr("class","mars")
                .attr("transform-origin","0 0")
                .attr("xlink:href","img/mars.png") 
                .attr("height",radius*0.05)  
                .attr("width",radius*0.05)
                .attr("x",-radius*0.525)
                .attr("y",-radius*0.025);     

                
                pl.append("image")
                .attr("class","jupiter")
                .attr("transform-origin","0 0")
                .attr("xlink:href","img/jupiter.png") 
                .attr("height",radius*0.08)  
                .attr("width",radius*0.08)
                .attr("x",-radius*0.64)
                .attr("y",-radius*0.04);     

                
                pl.append("image")
                .attr("class","saturn")
                .attr("transform-origin","0 0")
                .attr("xlink:href","img/saturn.png") 
                .attr("height",radius*0.07)  
                .attr("width",radius*0.07)
                .attr("x",-radius*0.735)
                .attr("y",-radius*0.035)
                .attr("transform","rotate(30)");                     
             





                





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



    function rotateKundaliWheel(a,d){
        var tody=formatDate(d);
        var todaymon=formatMonth(d);
        var tit,nak,yog,kar,va;
        var nak_no,tit_no,yog_no;
        for(var i=(todaymon-1)*28;i<dat.length;i++)
        {  
            if(dat[i].DTSTART.replace(/\s/g,"")==tody.replace(/\s/g,""))
            {   tit=dat[i].TITHI;
                nak=dat[i].NAKSHATRA;
                yog=dat[i].YOGA;
                kar=dat[i].KARANA;
                va=dat[i].WEEKDAY;
                break;
            }  

        }

        for(var i=0;i<yoga.length;i++)
        {   
            
            if(yoga[i].name.replace(/\s/g,"")==yog.replace(/\s/g,""))
            {
                yog_no=i;
                
                break;
            }
        }
        for(var i=0;i<nakshatra.length;i++)
        {   
            if(nakshatra[i].name.replace(/\s/g,"")==nak.replace(/\s/g,""))
            {
                nak_no=i;
                
                break;
            }
        }
        

        var nak_rot=360-(((nak_no+1)*360/27)-7);
        var yog_rot=360-(((yog_no+1)*360/27)-7);
        
        if(a==1)
        {   //rotate for vertical axis
            d3.select(".wheelNakshatra")
                .attr("transform"," rotate("+nak_rot+",0,0)");
            d3.select(".wheelYoga")
                .attr("transform"," rotate("+yog_rot+",0,0)");
            d3.select(".marker")
                .attr("transform"," rotate(0,0,0)");
            d3.selectAll(".chart>.container>.values").remove();
            var g=d3.select(".chart>.container").append("g")
                    .attr("class","values");
                
            g.append("text")
                .attr("class","upar")
                .attr("id","one")
                .text(va);
            g.append("text")
                .attr("class","cap")
                .attr("id","one")
                .text("Vaara:");
            g.append("text")
                .attr("class","upar")
                .attr("id","two")
                .text(tit);
            g.append("text")
                .attr("class","cap")
                .attr("id","two")
                .text("Tithi:");
            g.append("text")
                .attr("class","upar")
                .attr("id","three")
                .text(nak);
            g.append("text")
                .attr("class","cap")
                .attr("id","three")
                .text("Nakshatra:");
            g.append("text")
                .attr("class","upar")
                .attr("id","four")
                .text(yog);
            g.append("text")
                .attr("class","cap")
                .attr("id","four")
                .text("Yoga:");
            g.append("text")
                .attr("class","upar")
                .attr("id","five")
                .text(kar);
            g.append("text")
                .attr("class","cap")
                 .attr("id","five")
                .text("Karana:");
        }
        else if(a==2)
        {   d3.select(".wheelNakshatra")
                .attr("transform"," rotate("+nak_rot+90+",0,0)");
            d3.select(".wheelYoga")
                .attr("transform"," rotate("+yog_rot+90+",0,0)");
            d3.select(".marker")
                .attr("transform"," rotate(90,0,0)");
            d3.selectAll(".chart>.container>.values").remove();
            var g= d3.select(".chart>.container").append("g")
                    .attr("class","values");
                
            g.append("text")
                .attr("class","side")
                .attr("id","one")
                .text(va);
            g.append("text")
                .attr("class","capi")
                .attr("id","one")
                .text("Vaara:");
            g.append("text")
                .attr("class","side")
                .attr("id","two")
                .text(tit);
            g.append("text")
                .attr("class","capi")
                .attr("id","two")
                .text("Tithi:");
            g.append("text")
                .attr("class","side")
                .attr("id","three")
                .text(nak);
            g.append("text")
                .attr("class","capi")
                .attr("id","three")
                .text("Nakshatra:");
            g.append("text")
                .attr("class","side")
                .attr("id","four")
                .text(yog);
            g.append("text")
                .attr("class","capi")
                .attr("id","four")
                .text("Yog:");
            g.select(".chart>.container")
                .append("text")
                .attr("class","side")
                 .attr("id","five")
                .text(kar);
            g.append("text")
                .attr("class","capi")
                .attr("id","five")
                .text("Karana:");

        }else
        {
            d3.select(".wheelNakshatra")
                .attr("transform"," rotate(0,0,0)");
            d3.select(".wheelYoga")
                .attr("transform"," rotate(0,0,0)");

        }
        

    }

    drawChart.rotateKundaliWheel=rotateKundaliWheel;





} 

function drawTithiChart(){

        // variable for holding csv data   
          

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
                    .attr("transform","translate(0,"+windowHeight*0.58+")")
                    .call(d3.zoom().on("zoom", function () {
                        svg.attr("transform", d3.event.transform)
                     }))
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
                    .attr("transform","translate(0,"+windowHeight*0.55+")")
                    .attr("class","x-axis-mon")
                    .attr("text-anchor","end")
                    .attr("width",windowWidth*100)
                    .attr("height",height*0.05)
                    .call(d3.axisBottom(xScale).ticks(700)
                            .tickFormat(function(d){
                                return formatTime_daymonth(d);
                            }
                        ).tickSize(10));

                    var chart_bars=chart.append("svg")
                     .attr("width",windowWidth*100)
                     .attr("height",height*0.59)
                     .attr("transform","translate(0,"+windowHeight*0.02+")");

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
                     .attr("height",height*0.04)
                     .attr("rx",10)
                     .attr("x", function(){
                        return xScale(dateTime(val[0]));
                     })
                     .attr("y",height*0.53)
                     .attr("fill","#F06292")
                     .on("mouseover", mouseover).on("mouseout", mouseout).on("mousemove", mousemove);
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
                     .attr("height",height*0.04)
                     .attr("rx",10)
                     .attr("x",xScale(dateTime(d.TITHIEND.concat(" ",d.DTSTART))))
                     .attr("y",height*0.53)
                     .attr("fill","#cccaca")
                     .on("mouseover", mouseover).on("mouseout", mouseout).on("mousemove", mousemove);

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
                     .attr("height",height*0.04)
                     .attr("rx",10)
                     .attr("x", function(){
                        return xScale(dateTime(val[0]));
                     })
                     .attr("y",height*0.47)
                     .attr("fill","#FFC107")
                     .on("mouseover", mouseover).on("mouseout", mouseout).on("mousemove", mousemove);
        // drawing Nakshatra 2
                    if(d.NAKSHATRA2.replace(/\s/g,"")!="None")
                    {
                     d3.select(".barNakshatra")
                     .append("rect")
                     .attr("class",d.NAKSHATRA2)
                     .attr("width",function(){
                        
                        return xScale(dateTime(d.NAKSHATRA2END.concat(" ",d.DTEND)))-xScale(dateTime(d.NAKSHATRAEND.concat(" ",d.DTSTART)));//giveTithi(data[i].TITHIEND,data[i].DTSTART,);
                        
                     })
                     .attr("height",height*0.04)
                     .attr("rx",10)
                     .attr("x",xScale(dateTime(d.NAKSHATRAEND.concat(" ",d.DTSTART))))
                     .attr("y",height*0.47)
                     .attr("fill","#ffe082")
                     .on("mouseover", mouseover).on("mouseout", mouseout).on("mousemove", mousemove);

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
                     .attr("height",height*0.04)
                     .attr("rx",10)
                     .attr("x", function(){
                        return xScale(dateTime(val[0]));
                     })
                     .attr("y",height*0.41)
                     .attr("fill","#9ccc65")
                     .on("mouseover", mouseover).on("mouseout", mouseout).on("mousemove", mousemove);
        // drawing Yoga 2 bars
                    if(d.YOGA2.replace(/\s/g,"")!="None")
                    {
                     d3.select(".barYoga")
                     .append("rect")
                     .attr("class",d.YOGA2)
                     .attr("width",function(){
                        
                        return xScale(dateTime(d.YOGA2END.concat(" ",d.DTEND)))-xScale(dateTime(d.YOGAEND.concat(" ",d.DTSTART)));//giveTithi(data[i].TITHIEND,data[i].DTSTART,);
                        
                     })
                     .attr("height",height*0.04)
                     .attr("rx",10)
                     .attr("x",xScale(dateTime(d.YOGAEND.concat(" ",d.DTSTART))))
                     .attr("y",height*0.41)
                     .attr("fill","#aed581")
                     .on("mouseover", mouseover).on("mouseout", mouseout).on("mousemove", mousemove);

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
                     .attr("height",height*0.04)
                     .attr("rx",10)
                     .attr("x", function(){
                        return xScale(dateTime(val[0]));
                     })
                     .attr("y",height*0.35)
                     .attr("fill","#4FC3F7")
                     .on("mouseover", mouseover).on("mouseout", mouseout).on("mousemove", mousemove);
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
                     .attr("height",height*0.04)
                     .attr("rx",10)
                     .attr("x",xScale(dateTime(d.KARANAEND.concat(" ",d.DTSTART))))
                     .attr("y",height*0.35)
                     .attr("fill","#4FC3F7")
                     .on("mouseover", mouseover).on("mouseout", mouseout).on("mousemove", mousemove);

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
                     .attr("height",height*0.04)
                     .attr("rx",10)
                     .attr("x",xScale(dateTime(d.KARANA2END.concat(" ",d.DTSTART))))
                     .attr("y",height*0.35)
                     .attr("fill","#4FC3F7");

                    }
                    



                }) // for each ends here

        function mousemove() {
             //var x0 = xScale.invert(d3.mouse(this)[0]);
            // console.log("chua move");

          }
          function mouseover() {
             
             
          }
          function mouseout() {
            // var x0 = xScale.invert(d3.mouse(this)[0]);
            // console.log("chua out");
            var x0 = xScale.invert(d3.mouse(this)[0]);
             var da=formatDate(x0);
             var ti=formatTime(x0);
             var mo=formatMonth(x0);
           
             for(var i=(mo-1)*28;i<dat.length;i++)
             {  
                if(dat[i].DTSTART.replace(/\s/g,"")==da.replace(/\s/g,""))
                {   

                    d3.selectAll(".move>p").remove();
                    d3.selectAll(".move>div").remove();

                    var tit=dat[i].TITHI;
                    var nak=dat[i].NAKSHATRA;
                    var yog=dat[i].YOGA;
                    var kar=dat[i].KARANA;
                    var su=dat[i].SUNSIGN;
                    var sur=dat[i].SUNRISE;


                    if(new Date(dat[i].TITHIEND)<=new Date(ti))
                    {   
                        if(dat[i].TITHI2END.replace(/\s/g,"")!="None")
                        {
                            tit=dat[i].TITHI2;
                        }
                        else
                        {
                            tit=dat[i+1].TITHI;
                        }

                    }
                   

                    var move= d3.select(".move");

                   move.append("p")
                   .text(kar);

                   move.append("p")
                   .text(yog);

                   move.append("p")
                   .text(nak);

                   move.append("p")
                   .text(tit);

                   var insun=move.append("div")
                   .attr("class","sun");
                   
                   insun.append("p")
                   .text("Sunsign");
                   insun.append("p")
                   .text(su);
                   insun.append("p")
                   .text("Sunrise");
                   insun.append("p")
                   .text(sur);
                    break;
                   
                }
             }
          }


                

               


            });


        drawTithiChart.movingline=movingline;
        // the horizontal moving line on timeline
            function movingline(){
                $(".timeline").mousemove(function (e) {
                    $(".timeline>.move").offset({ left: e.pageX });
                }).click(function () {
                    //$(this).unbind("mousemove");
                });
            }



          



        //gives the width of bars   
            function filltithis(value,i,tithi){
                tithi_lengths[i]=[dat[i].DTSTART,tithi,value[0],value[1]];
                 //[date, tithi, start_time, end_time]
                
            } 

            function fillkarana(value,i,tithi){

            }
            function fillyoga(value,i,tithi)
            {

            }
            function fillnakshatra(value,i,tithi)
            {

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
                            //console.log(tithi_lengths[i][1]+" "+tithi_lengths[i][2]+" "+tithi_lengths[i][3]);
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
                            //console.log(tithi_lengths[i][1]+" "+tithi_lengths[i][2]+" "+tithi_lengths[i][3]);
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



function showPlanets(tod){
    var pladat;

    d3.csv("planetary position.csv",function(error, data){
        if(error){ throw error;}

        pladat=data;

        console.log(pladat[168]);
        for(var i=(formatMonth(tod)-1)*28;i<=365;i++)
        {   console.log(tod+" , "+dates(pladat[i].DATE));
            if(pladat[i].DATE==formatDate(tod))
            {
                d3.select("image.moon").attr("transform","rotate("+angle(pladat[i].MOON, pladat[i].MOON_P)+")");
                d3.select("image.mercury").attr("transform","rotate("+angle(pladat[i].MERCURY, pladat[i].MERCURY_P)+")");
                d3.select("image.venus").attr("transform","rotate("+angle(pladat[i].VENUS, pladat[i].VENUS_P)+")");
                d3.select("image.sun").attr("transform","rotate("+angle(pladat[i].SUN, pladat[i].SUN_P)+")");
                d3.select("image.mars").attr("transform","rotate("+angle(pladat[i].MARS, pladat[i].MARS_P)+")");
                d3.select("image.jupiter").attr("transform","rotate("+angle(pladat[i].JUPITER, pladat[i].JUPITER_P)+")");
                d3.select("image.saturn").attr("transform","rotate("+angle(pladat[i].SATURN, pladat[i].SATURN_P)+")");
                break;
            }

        }





      /*  data.forEach(function(d,i){
            var ra=pladat[i].SUN_P;
            var planet_ang=angle(pladat[i].SUN, ra);



        })
        */
    });




    function angle(ab, ra){

        var ang=ab.split(" ");
        var an=parseFloat(ang[0])+parseFloat(ang[1]/60);
       
        for (var i=0;i<12;i++)
        {  // console.log("Rashi :"+rashival[i].name+", val: "+ra);
            if(rashival[i].name==ra.replace(/\s/g,""))
            {   
                an=an+parseFloat(i*30);
                break;
            }
        }
        
        return an;
    }
}


     