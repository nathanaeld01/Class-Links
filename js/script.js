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
        var period = [[28800, 31200], [32400, 34800], [36000, 38400], [39600, 42000], [43200, 45600], [50400, 52800]];
        var day = date.getDay();

        /*** Week-End OR Classes Ended ***/
        if(currTime > period[5][1]) {
            if(day == 0 || holi == true) {
                injectStatus("<span>Weekend! #godHeardUs</span>");
                clearInterval(checking);
            }
            else {
                $('tr').each(function() {
                    $(this).find('td.active').removeClass('active');
                });
                injectStatus("<span>Classes are Over! #freedom</span>");
                clearInterval(checking);
            }
        }
        if (currTime <= period[0][0]-1200) {
            var timeMin = date.getHours() * 60 + date.getMinutes();
            if(timeMin <= 480) {
                var rem = 480 - timeMin;
                injectStatus("<span>Classes starts in " + rem + " mins! #lazyForLife</span>");
            }
        }
        else {
            var i, j, k = 0;
            /*** Checking Time and Updating the Table ***/
            for(i = 1; i < 7; i++) {
                if(i == day) {
                    for(j = 0; j < 6; j++) {
                        if(currTime >= period[j][k] && currTime <= period[j][k+1]) {
                            $('tr').each(function() {
                                $(this).find('td.booting').removeClass('booting');
                            });
                            $('.day').eq(day-1).children('td').eq(j).addClass('active');
                            injectStatus("<span>Class is going on! #sleepWell</span>");
                        }
                        else if(currTime >= period[j][k]-1200 && currTime <= period[j][k]) {
                            if(j==5 && (k==0 || k==1)) {

                            }
                            else {
                                injectStatus("<span>Break Period. #haveMercyOnUs</span>");
                                $('tr').each(function() {
                                    $(this).find('td.active').removeClass('active');
                                });
                            }
                            $('.day').eq(day-1).children('td').eq(j).addClass('booting');
                        }
                    }
                }
            }
        }

        /*** Links
        var vp = "<a href='https://meet.google.com/lookup/h2hqw543e7?authuser=0&hs=179' target='_blank'>VP</a>";
        var mn = "<a href='https://meet.google.com/lookup/h2hqw543e7?authuser=0&hs=179' target='_blank'>Mentoring</a>";
        var vpl = "<a href='https://meet.google.com/lookup/h2hqw543e7?authuser=0&hs=179' target='_blank'>VP Lab</a>";
        var un = "<a href='https://meet.google.com/lookup/g3dqibjtfx' target='_blank'>UNIX</a>";
        var unl = "<a href='https://meet.google.com/lookup/g3dqibjtfx' target='_blank'>UNIX Lab</a>";
        var pd = "<a href='https://meet.google.com/lookup/eoldjkkpij?authuser=0&hs=179' target='_blank'>PD</a>";
        var or = "<a href='https://meet.google.com/lookup/aqo7vvtiwi' target='_blank'>OR</a>";
        var ge = "<a href='https://meet.google.com/lookup/djz3qz643d' target='_blank'>GE</a>";
        var la = "<a href='https://meet.google.com/lookup/hzs52xaobw?authuser=0&hs=179' target='_blank'>AE</a> | <a href='https://meet.google.com/lookup/cyce7hdeke?authuser=0&hs=179' target='_blank'>Hindi</a>";
        ***/

        /*** Fetching and Pushing Links
        var text, atrb, vari;
        $('.day').each(function() {
            $('td').each(function() {
                if($(this).hasClass('active') || $(this).hasClass('booting')) {
                    atrb = $(this).attr('class').split(' ')[0];
                    switch (atrb) {
                        case 'un': vari = un; break;
                        case 'unl': vari = unl; break;
                        case 'or': vari = or; break;
                        case 'mn': vari = mn; break;
                        case 'vp': vari = vp; break;
                        case 'vpl': vari = vpl; break;
                        case 'ge': vari = ge; break;
                        case 'la': vari = la; break;
                        case 'pd': vari = pd; break;
                    }
                    text = $(this).text();
                    $(this).html(text.replace(text, vari));
                }
            });
        });
        ***/
    }
});
