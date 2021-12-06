$(document).ready(function() {
    checkWeek();
    var checking = setInterval(function() {
        var secs = new Date().getSeconds();
        if(secs % 10 == 0) {
            $(document).find('td.active').removeClass('active');
            $(document).find('td.active').removeClass('booting');
            checkTable();
        }
    }, 1000);
    var holi = false;
    $(window).focus(function() {
        checkWeek();
    });
    function injectStatus(statusText) {
        $('.status').html($('.status').text().replace($('.status').text(), statusText));
    }
    function checkWeek() {
        var d = new Date();
        var getTot = daysInMonth(d.getMonth(), d.getFullYear()); //Get total days in a month
        var sat = new Array();   //Declaring array for inserting Saturdays

        for(var i=1;i<=getTot;i++){    //looping through days in month
            var newDate = new Date(d.getFullYear() ,d.getMonth(),i)
            if(newDate.getDay()==6){   //if Saturday
                sat.push(i);
            }
        }
        function daysInMonth(month,year) {
            return new Date(year, month, 0).getDate();
        }
        var week = d.getDate();
        var fweek = week + (6-d.getDay());
        if((sat[1] >= week && sat[1] <= fweek) || (sat[3] >= week && sat[3] <= fweek)) {
            $('.day').eq(5).remove();
            if(true && d.getDay()==6) {
                holi = true;
            }
        }
        checkTable();
    }
    function checkTable() {
        var date = new Date();
        var currTime = (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
        var period = [[32400, 35400], [35600, 38700], [39900, 42900], [43200, 46200], [48300, 51000], [51300, 54000]];
        var day = date.getDay();

        /*** Week-End OR Classes Ended ***/
        if(currTime > period[5][1]) {
            if(day == 0 || holi == true) {
                injectStatus("<span>Weekend!</span>");
                clearInterval(checking);
            }
            else {
                $('tr').each(function() {
                    $(this).find('td.active').removeClass('active');
                });
                injectStatus("<span>Classes are Over!</span>");
                clearInterval(checking);
            }
        }
        if (currTime <= period[0][0]-1200) {
            var timeMin = date.getHours() * 60 + date.getMinutes();
            if(timeMin <= 480) {
                var rem = 480 - timeMin;
                injectStatus("<span>Classes starts in " + rem + " mins!</span>");
            }
        }
        else {
            var i, j, k = 0;
            /*** Checking Time and Updating the Table ***/
            for(i = 1; i < 7; i++) {
                if(i == day) {
                    for(j = 0; j < 6; j++) {
                        if(currTime >= period[j][k] && currTime <= period[j][k+1]) {
                            $('.day').eq(day-1).children('td').eq(j).addClass('active');
                            injectStatus("<span>Class is going on!</span>");
                        }
                    }
                }
            }
        }
    }
});
