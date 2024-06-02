var myClass = document.getElementsByClassName("js-time_limited");

for (var i = 0; i < myClass.length; i++) {
          var appearTime = myClass[i].getAttribute("data-appear_time");←data-appear_timeの値をappearTimeに代入
          var disappearTime = myClass[i].getAttribute("data-disappear_time");←data-disappear_timeの値をappearTimeに代入
          var threshould_start = Date.parse(appearTime);
          var threshould_end = Date.parse(disappearTime);

          var current = new Date();

          if (threshould_start < current && threshould_end > current) {
            myClass[i].classList.add("js-time_limited_fire");
          } else {  // 同じ時間、もしくはそれ以前ならば
            myClass[i].classList.remove("js-time_limited_fire");
          }

          var performStartTime = myClass[i].getAttribute("perform-start_time");
          var threshould_p_start = Date.parse(performStartTime);
          var current = new Date();

          if (threshould_p_start < current && threshould_end > current){
            myClass[i].classList.add("js-time_limited_now");
          } else {
            myClass[i].classList.remove("js-time_limited_now");
         }
}
