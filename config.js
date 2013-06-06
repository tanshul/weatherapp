/* Configuration: */
var count = 1;
var tabs = {
    "Western" : {
        "feed"      : "http://nadraki.com/index2.php?option=com_forecast&location=Western&type=rss&no_html=1&Itemid=55",
        "function"  : rss
    },
    
    "Northern": {
        "feed"      : "http://nadraki.com/index2.php?option=com_forecast&location=Northern&type=rss&no_html=1&Itemid=55",
        "function"  : rss
    },
    
    "Central": {
        "feed"      : "http://nadraki.com/index2.php?option=com_forecast&location=Central&type=rss&no_html=1&Itemid=55",
        "function"  : rss
    }
}

function rss(item)
{
        count=count++;
        var getimagenumber = item.enclosure.url.substr(item.enclosure.url.length - 6);
        //change icons depending on the image number
        if(getimagenumber === "/1.jpg")
            var imgclass = "sun";
        else  if(getimagenumber === "/2.jpg")
            var imgclass = "cloud sun";                
        else  if(getimagenumber === "/3.jpg")
            var imgclass = "cloud sun";                                
        else  if(getimagenumber === "/4.jpg")
            var imgclass = "cloud sun";                                
        else  if(getimagenumber === "/5.jpg")
            var imgclass = "cloud sun";                                
        else  if(getimagenumber === "/6.jpg") 
            var imgclass = "rain sun";                
        else  if(getimagenumber === "/7.jpg")
            var imgclass = "lightning sun";                                
        else  if(getimagenumber === "/8.jpg")
            var imgclass = "cloud";                                
        else  if(getimagenumber === "9.jpg")
            var imgclass = "rain";                                
        else  if(getimagenumber === "10.jpg")
            var imgclass = "downpour";                                
        else  if(getimagenumber === "11.jpg")
            var imgclass = "lightning";                                
        else  if(getimagenumber === "12.jpg")
            var imgclass = "tornado";                                

         var str = '<div class="glyph"><div class="descr"><h2>'+formatString(item.title)+'</h2>'+formatString(item.description)+'</div><span class="fs1 climacon '+imgclass+'" aria-hidden="true"></span></div>\
        </div>';          
    return $('<div class="today" id="'+count+'">').append(str);
}

function formatString(str)
{
    /* This function was taken from our Twitter Ticker tutorial - http://tutorialzine.com/2009/10/jquery-twitter-ticker/ */
    str = str.replace(/<[^>]+>/ig,'');
    str=' '+str;
    str = str.replace(/((ftp|https?):\/\/([-\w\.]+)+(:\d+)?(\/([\w/_\.]*(\?\S+)?)?)?)/gm,'<a href="$1" target="_blank">$1</a>');
    return str;
}

 function getWeather(key){
    var obj = tabs[key]; 
    if(!obj) return false;
     var stage = $('#tabContent_'+key);

    /* Forming the query: */
    var query = "select * from feed where url='"+obj.feed+"' LIMIT 2";
     /* Forming the URL to YQL: */
    var url = "http://query.yahooapis.com/v1/public/yql?q="+encodeURIComponent(query)+"&format=json&callback=?";

    $.getJSON(url,function(data){

        stage.empty();

        /* item exists in RSS and entry in ATOM feeds: */
        $.each(data.query.results.item,function(i){
            try{
                if(i==0){
                /*hack to break off feeds after one shot*/
                /* Trying to call the user provided function, "this" the rest of the feed data: */
                stage.append(obj['function'](this));
                }
                
            }
            catch(e){
                /* Notifying users if there are any problems with their handler functions: */
                var f_name =obj['function'].toString().match(/function\s+(\w+)\(/i);
                if(f_name) f_name = f_name[1];
                
                stage.append('<div>We are unable to display any weather feeds at the current moment, please check again later.</div>');
                return false;
            }
        })
    });
}
 
 