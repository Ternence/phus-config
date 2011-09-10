// ==UserScript==
// @name           Tiler
// @namespace      tiler
// @description    Html and Javascript Hack Script

// @include	  http://*.google.com/*
// @include	  https://*.google.com/*

// @include	  http://www1.pidown.info/*.php*
// @include	  http://www.jandown.com/*.php*
// @include	  http://www.haoseed.com/*.php*

// @include	  http://www.newsmth.net/*

// @exclude	  http://userscripts.org/*
// ==/UserScript==

function remove_google_ads()
{
    var css = "@namespace url(http://www.w3.org/1999/xhtml); /* QUICK LINKS*/ table.iY > tr > td:first-child + td > div { width: auto !important } table.iY > tr > td:first-child + td + td > div { width: 0 !important; position: relative !important; font-size: 85% !important; } table.iY > tr > td:first-child + td + td > div > div { position: absolute !important; right: 10px !important; top: -2px !important} table.iY div.hj { width: auto !important;} table.iY div.hj div.hk { display: inline !important; padding-right: 3px !important;} /* NO ADS! */ .u5, .u8 { display: none !important;} table[class=\"T1HY1 nH iY\"] { width: 100% !important;} div[class=\"ip iq\"] { margin-right: 13px !important;} textarea.ir { width: 100% !important;}";
    //css += "#gb {display:none !important;}";
    if (typeof GM_addStyle != "undefined"){
        GM_addStyle(css);
    } else if (typeof addStyle != "undefined"){
        addStyle(css);
    } else{
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0){
	        var node = document.createElement("style");
			node.type = "text/css";
	        node.appendChild(document.createTextNode(css));
	        heads[0].appendChild(node); 
        }
    }
}

function remove_html_attribute(strTagName, strAttributeName)
{
    var tags = document.getElementsByTagName(strTagName);
    for (var i = 0; i < tags.length; i++){
        tags[i].removeAttribute(strAttributeName);
    }  
}

function newsmth_fix()
{
    var tags = document.getElementsByTagName("a");
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].href.indexOf("http://www.newsmth.net/bbsdoc.php?board=") >= 0 && tags[i].href.indexOf("ftype") < 0) {
            tags[i].href += "&ftype=0";
        }
    }
}

(function(){ 
    location_url = document.location.href;
    if (location_url.indexOf(".google.com/") >= 0){
        remove_google_ads();
    } else if (location_url.indexOf("http://www1.pidown.info/") >= 0){
        remove_html_attribute("input", "onclick");
    } else if (location_url.indexOf("http://www.jandown.com/") >= 0) {
        remove_html_attribute("form", "onSubmit");
    } else if (location_url.indexOf("http://www.haoseed.com/") >= 0) {
        remove_html_attribute("form", "onSubmit");
    } else if (location_url.indexOf("http://www.newsmth.net/") >= 0) {
        newsmth_fix();
    }
})();
