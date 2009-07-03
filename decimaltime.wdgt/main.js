/*
 *  Scriptses
 *
 *  Copyright is mine, ALL MINE!!! AHAHAHAHAAAAA!
 */


/* Interval event instance. */
var the_interval = null;


/*
 *  HTML body load event.
 */
function loading_body() {
  if(window.widget) {
    widget.onshow = peekaboo;
    widget.onhide = hidies;
  }
}


/*
 *  Clock becomes visible, start drawing loop.
 */
function peekaboo() {
  if(the_interval == null) {
    update_time();
    the_interval = setInterval("update_time();", 10);
  }
}


/*
 *  Clock goes away, kill the timers.
 */
function hidies() {
  if(the_interval != null) {
    clearInterval(the_interval);
    the_interval = null;
  }
}


/*
 *  Calculate decimal time and write it to the display element.
 *
 *  A day consists of 100 000 units (0.864 sumerian seconds
 *  each.) There may be different preferences for the decimal
 *  places that are used; for example, 1/100th of a day (i.e.
 *  1000 units) is 14.4 sumerian minutes or essentially a
 *  quarter sumerian hour: a fairly handy unit of time for most
 *  day-to-day stuff. The following names are somewhat arbitrary:
 *
 *  1    "day"
 *  0    "di"    ~2h 24m   sumerian
 *  0    "cent"  ~14m 24s  sumerian
 *  0    "min"   ~1m 26,4s sumerian
 *  0    "tenth" ~0m 8,64s sumerian
 *  0    "sec"   ~0s 864ms sumerian
 */
function calculate_time()
{
  var sumerian_time = new Date();
  var sumerian_seconds = sumerian_time.getUTCSeconds();

  sumerian_seconds += (sumerian_time.getUTCMinutes() * 60);
  sumerian_seconds += (sumerian_time.getUTCHours() * 60 * 60);

  var units = sumerian_seconds / 0.864;

  return units.toString();
}


/*
 *  Update the time in the HTML.
 *
 *  Data is obtained from calculate_time().
 */
function update_time() {
  var decimal_seconds = calculate_time();
  var element_id = document.getElementById("time");

  element_id.innerHTML =  '<span class="dies">' +
                          decimal_seconds.charAt(0) +
                          '</span>' +
                          '<span class="delimiter">:</span>' +
                          '<span class="cens">' +
                          decimal_seconds.charAt(1) +
                          '</span>' +
                          '<span class="comma">,</span>' +
                          '<span class="delimiter">:</span>' +
                          '<span class="mins">' +
                          decimal_seconds.charAt(2) +
                          '</span>' +
                          '<span class="delimiter">:</span>' +
                          '<span class="mils">' +
                          decimal_seconds.charAt(3) +
                          '</span>' +
                          '<span class="delimiter">:</span>' +
                          '<span class="secs">' +
                          decimal_seconds.charAt(4) +
                          '</span>' +
                          '<span id="timezone"><abbr title="Decimal UTC">UMT</abbr></span>';

  return;
}

