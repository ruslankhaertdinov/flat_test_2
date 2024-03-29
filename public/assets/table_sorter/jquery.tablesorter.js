/*
 * 
 * TableSorter 2.0 - Client-side table sorting with ease!
 * Version 2.0.5b
 * @requires jQuery v1.2.3
 * 
 * Copyright (c) 2007 Christian Bach
 * Examples and docs at: http://tablesorter.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 */
/**
 * 
 * @description Create a sortable table with multi-column sorting capabilitys
 * 
 * @example $('table').tablesorter();
 * @desc Create a simple tablesorter interface.
 * 
 * @example $('table').tablesorter({ sortList:[[0,0],[1,0]] });
 * @desc Create a tablesorter interface and sort on the first and secound column column headers.
 * 
 * @example $('table').tablesorter({ headers: { 0: { sorter: false}, 1: {sorter: false} } });
 *          
 * @desc Create a tablesorter interface and disableing the first and second  column headers.
 *      
 * 
 * @example $('table').tablesorter({ headers: { 0: {sorter:"integer"}, 1: {sorter:"currency"} } });
 * 
 * @desc Create a tablesorter interface and set a column parser for the first
 *       and second column.
 * 
 * 
 * @param Object
 *            settings An object literal containing key/value pairs to provide
 *            optional settings.
 * 
 * 
 * @option String cssHeader (optional) A string of the class name to be appended
 *         to sortable tr elements in the thead of the table. Default value:
 *         "header"
 * 
 * @option String cssAsc (optional) A string of the class name to be appended to
 *         sortable tr elements in the thead on a ascending sort. Default value:
 *         "headerSortUp"
 * 
 * @option String cssDesc (optional) A string of the class name to be appended
 *         to sortable tr elements in the thead on a descending sort. Default
 *         value: "headerSortDown"
 * 
 * @option String sortInitialOrder (optional) A string of the inital sorting
 *         order can be asc or desc. Default value: "asc"
 * 
 * @option String sortMultisortKey (optional) A string of the multi-column sort
 *         key. Default value: "shiftKey"
 * 
 * @option String textExtraction (optional) A string of the text-extraction
 *         method to use. For complex html structures inside td cell set this
 *         option to "complex", on large tables the complex option can be slow.
 *         Default value: "simple"
 * 
 * @option Object headers (optional) An array containing the forces sorting
 *         rules. This option let's you specify a default sorting rule. Default
 *         value: null
 * 
 * @option Array sortList (optional) An array containing the forces sorting
 *         rules. This option let's you specify a default sorting rule. Default
 *         value: null
 * 
 * @option Array sortForce (optional) An array containing forced sorting rules.
 *         This option let's you specify a default sorting rule, which is
 *         prepended to user-selected rules. Default value: null
 * 
 * @option Boolean sortLocaleCompare (optional) Boolean flag indicating whatever
 *         to use String.localeCampare method or not. Default set to true.
 * 
 * 
 * @option Array sortAppend (optional) An array containing forced sorting rules.
 *         This option let's you specify a default sorting rule, which is
 *         appended to user-selected rules. Default value: null
 * 
 * @option Boolean widthFixed (optional) Boolean flag indicating if tablesorter
 *         should apply fixed widths to the table columns. This is usefull when
 *         using the pager companion plugin. This options requires the dimension
 *         jquery plugin. Default value: false
 * 
 * @option Boolean cancelSelection (optional) Boolean flag indicating if
 *         tablesorter should cancel selection of the table headers text.
 *         Default value: true
 * 
 * @option Boolean debug (optional) Boolean flag indicating if tablesorter
 *         should display debuging information usefull for development.
 * 
 * @type jQuery
 * 
 * @name tablesorter
 * 
 * @cat Plugins/Tablesorter
 * 
 * @author Christian Bach/christian.bach@polyester.se
 */
(function($){$.extend({tablesorter:new function(){function benchmark(e,t){log(e+","+((new Date).getTime()-t.getTime())+"ms")}function log(e){typeof console!="undefined"&&typeof console.debug!="undefined"?console.log(e):alert(e)}function buildParserCache(e,t){if(e.config.debug)var n="";if(e.tBodies.length==0)return;var r=e.tBodies[0].rows;if(r[0]){var i=[],s=r[0].cells,o=s.length;for(var u=0;u<o;u++){var a=!1;$.metadata&&$(t[u]).metadata()&&$(t[u]).metadata().sorter?a=getParserById($(t[u]).metadata().sorter):e.config.headers[u]&&e.config.headers[u].sorter&&(a=getParserById(e.config.headers[u].sorter)),a||(a=detectParserForColumn(e,r,-1,u)),e.config.debug&&(n+="column:"+u+" parser:"+a.id+"\n"),i.push(a)}}return e.config.debug&&log(n),i}function detectParserForColumn(e,t,n,r){var i=parsers.length,s=!1,o=!1,u=!0;while(o==""&&u)n++,t[n]?(s=getNodeFromRowAndCellIndex(t,n,r),o=trimAndGetNodeText(e.config,s),e.config.debug&&log("Checking if value was empty on row:"+n)):u=!1;for(var a=1;a<i;a++)if(parsers[a].is(o,e,s))return parsers[a];return parsers[0]}function getNodeFromRowAndCellIndex(e,t,n){return e[t].cells[n]}function trimAndGetNodeText(e,t){return $.trim(getElementText(e,t))}function getParserById(e){var t=parsers.length;for(var n=0;n<t;n++)if(parsers[n].id.toLowerCase()==e.toLowerCase())return parsers[n];return!1}function buildCache(e){if(e.config.debug)var t=new Date;var n=e.tBodies[0]&&e.tBodies[0].rows.length||0,r=e.tBodies[0].rows[0]&&e.tBodies[0].rows[0].cells.length||0,i=e.config.parsers,s={row:[],normalized:[]};for(var o=0;o<n;++o){var u=$(e.tBodies[0].rows[o]),a=[];if(u.hasClass(e.config.cssChildRow)){s.row[s.row.length-1]=s.row[s.row.length-1].add(u);continue}s.row.push(u);for(var f=0;f<r;++f)a.push(i[f].format(getElementText(e.config,u[0].cells[f]),e,u[0].cells[f]));a.push(s.normalized.length),s.normalized.push(a),a=null}return e.config.debug&&benchmark("Building cache for "+n+" rows:",t),s}function getElementText(e,t){var n="";return t?(e.supportsTextContent||(e.supportsTextContent=t.textContent||!1),e.textExtraction=="simple"?e.supportsTextContent?n=t.textContent:t.childNodes[0]&&t.childNodes[0].hasChildNodes()?n=t.childNodes[0].innerHTML:n=t.innerHTML:typeof e.textExtraction=="function"?n=e.textExtraction(t):n=$(t).text(),n):""}function appendToTable(e,t){if(e.config.debug)var n=new Date;var r=t,i=r.row,s=r.normalized,o=s.length,u=s[0].length-1,a=$(e.tBodies[0]),f=[];for(var l=0;l<o;l++){var c=s[l][u];f.push(i[c]);if(!e.config.appender){var h=i[c].length;for(var p=0;p<h;p++)a[0].appendChild(i[c][p])}}e.config.appender&&e.config.appender(e,f),f=null,e.config.debug&&benchmark("Rebuilt table:",n),applyWidget(e),setTimeout(function(){$(e).trigger("sortEnd")},0)}function buildHeaders(e){if(e.config.debug)var t=new Date;var n=$.metadata?!0:!1,r=computeTableHeaderCellIndexes(e);return $tableHeaders=$(e.config.selectorHeaders,e).each(function(t){this.column=r[this.parentNode.rowIndex+"-"+this.cellIndex],this.order=formatSortingOrder(e.config.sortInitialOrder),this.count=this.order;if(checkHeaderMetadata(this)||checkHeaderOptions(e,t))this.sortDisabled=!0;checkHeaderOptionsSortingLocked(e,t)&&(this.order=this.lockedOrder=checkHeaderOptionsSortingLocked(e,t));if(!this.sortDisabled){var n=$(this).addClass(e.config.cssHeader);e.config.onRenderHeader&&e.config.onRenderHeader.apply(n)}e.config.headerList[t]=this}),e.config.debug&&(benchmark("Built headers:",t),log($tableHeaders)),$tableHeaders}function computeTableHeaderCellIndexes(e){var t=[],n={},r=e.getElementsByTagName("THEAD")[0],i=r.getElementsByTagName("TR");for(var s=0;s<i.length;s++){var o=i[s].cells;for(var u=0;u<o.length;u++){var a=o[u],f=a.parentNode.rowIndex,l=f+"-"+a.cellIndex,c=a.rowSpan||1,h=a.colSpan||1,p;typeof t[f]=="undefined"&&(t[f]=[]);for(var d=0;d<t[f].length+1;d++)if(typeof t[f][d]=="undefined"){p=d;break}n[l]=p;for(var d=f;d<f+c;d++){typeof t[d]=="undefined"&&(t[d]=[]);var v=t[d];for(var m=p;m<p+h;m++)v[m]="x"}}}return n}function checkCellColSpan(e,t,n){var r=[],i=e.tHead.rows,s=i[n].cells;for(var o=0;o<s.length;o++){var u=s[o];u.colSpan>1?r=r.concat(checkCellColSpan(e,headerArr,n++)):(e.tHead.length==1||u.rowSpan>1||!i[n+1])&&r.push(u)}return r}function checkHeaderMetadata(e){return $.metadata&&$(e).metadata().sorter===!1?!0:!1}function checkHeaderOptions(e,t){return e.config.headers[t]&&e.config.headers[t].sorter===!1?!0:!1}function checkHeaderOptionsSortingLocked(e,t){return e.config.headers[t]&&e.config.headers[t].lockedOrder?e.config.headers[t].lockedOrder:!1}function applyWidget(e){var t=e.config.widgets,n=t.length;for(var r=0;r<n;r++)getWidgetById(t[r]).format(e)}function getWidgetById(e){var t=widgets.length;for(var n=0;n<t;n++)if(widgets[n].id.toLowerCase()==e.toLowerCase())return widgets[n]}function formatSortingOrder(e){return typeof e!="Number"?e.toLowerCase()=="desc"?1:0:e==1?1:0}function isValueInArray(e,t){var n=t.length;for(var r=0;r<n;r++)if(t[r][0]==e)return!0;return!1}function setHeadersCss(e,t,n,r){t.removeClass(r[0]).removeClass(r[1]);var i=[];t.each(function(e){this.sortDisabled||(i[this.column]=$(this))});var s=n.length;for(var o=0;o<s;o++)i[n[o][0]].addClass(r[n[o][1]])}function fixColumnWidth(e,t){var n=e.config;if(n.widthFixed){var r=$("<colgroup>");$("tr:first td",e.tBodies[0]).each(function(){r.append($("<col>").css("width",$(this).width()))}),$(e).prepend(r)}}function updateHeaderSortCount(e,t){var n=e.config,r=t.length;for(var i=0;i<r;i++){var s=t[i],o=n.headerList[s[0]];o.count=s[1],o.count++}}function multisort(table,sortList,cache){if(table.config.debug)var sortTime=new Date;var dynamicExp="var sortWrapper = function(a,b) {",l=sortList.length;for(var i=0;i<l;i++){var c=sortList[i][0],order=sortList[i][1],s=table.config.parsers[c].type=="text"?order==0?makeSortFunction("text","asc",c):makeSortFunction("text","desc",c):order==0?makeSortFunction("numeric","asc",c):makeSortFunction("numeric","desc",c),e="e"+i;dynamicExp+="var "+e+" = "+s,dynamicExp+="if("+e+") { return "+e+"; } ",dynamicExp+="else { "}var orgOrderCol=cache.normalized[0].length-1;dynamicExp+="return a["+orgOrderCol+"]-b["+orgOrderCol+"];";for(var i=0;i<l;i++)dynamicExp+="}; ";return dynamicExp+="return 0; ",dynamicExp+="}; ",table.config.debug&&benchmark("Evaling expression:"+dynamicExp,new Date),eval(dynamicExp),cache.normalized.sort(sortWrapper),table.config.debug&&benchmark("Sorting on "+sortList.toString()+" and dir "+order+" time:",sortTime),cache}function makeSortFunction(e,t,n){var r="a["+n+"]",i="b["+n+"]";if(e=="text"&&t=="asc")return"("+r+" == "+i+" ? 0 : ("+r+" === null ? Number.POSITIVE_INFINITY : ("+i+" === null ? Number.NEGATIVE_INFINITY : ("+r+" < "+i+") ? -1 : 1 )));";if(e=="text"&&t=="desc")return"("+r+" == "+i+" ? 0 : ("+r+" === null ? Number.POSITIVE_INFINITY : ("+i+" === null ? Number.NEGATIVE_INFINITY : ("+i+" < "+r+") ? -1 : 1 )));";if(e=="numeric"&&t=="asc")return"("+r+" === null && "+i+" === null) ? 0 :("+r+" === null ? Number.POSITIVE_INFINITY : ("+i+" === null ? Number.NEGATIVE_INFINITY : "+r+" - "+i+"));";if(e=="numeric"&&t=="desc")return"("+r+" === null && "+i+" === null) ? 0 :("+r+" === null ? Number.POSITIVE_INFINITY : ("+i+" === null ? Number.NEGATIVE_INFINITY : "+i+" - "+r+"));"}function makeSortText(e){return"((a["+e+"] < b["+e+"]) ? -1 : ((a["+e+"] > b["+e+"]) ? 1 : 0));"}function makeSortTextDesc(e){return"((b["+e+"] < a["+e+"]) ? -1 : ((b["+e+"] > a["+e+"]) ? 1 : 0));"}function makeSortNumeric(e){return"a["+e+"]-b["+e+"];"}function makeSortNumericDesc(e){return"b["+e+"]-a["+e+"];"}function sortText(e,t){return table.config.sortLocaleCompare?e.localeCompare(t):e<t?-1:e>t?1:0}function sortTextDesc(e,t){return table.config.sortLocaleCompare?t.localeCompare(e):t<e?-1:t>e?1:0}function sortNumeric(e,t){return e-t}function sortNumericDesc(e,t){return t-e}function getCachedSortType(e,t){return e[t].type}var parsers=[],widgets=[];this.defaults={cssHeader:"header",cssAsc:"headerSortUp",cssDesc:"headerSortDown",cssChildRow:"expand-child",sortInitialOrder:"asc",sortMultiSortKey:"shiftKey",sortForce:null,sortAppend:null,sortLocaleCompare:!0,textExtraction:"simple",parsers:{},widgets:[],widgetZebra:{css:["even","odd"]},headers:{},widthFixed:!1,cancelSelection:!0,sortList:[],headerList:[],dateFormat:"us",decimal:"/.|,/g",onRenderHeader:null,selectorHeaders:"thead th",debug:!1},this.benchmark=benchmark,this.construct=function(e){return this.each(function(){if(!this.tHead||!this.tBodies)return;var t,n,r,i,s,o=0,u;this.config={},s=$.extend(this.config,$.tablesorter.defaults,e),t=$(this),$.data(this,"tablesorter",s),r=buildHeaders(this),this.config.parsers=buildParserCache(this,r),i=buildCache(this);var a=[s.cssDesc,s.cssAsc];fixColumnWidth(this),r.click(function(e){var n=t[0].tBodies[0]&&t[0].tBodies[0].rows.length||0;if(!this.sortDisabled&&n>0){t.trigger("sortStart");var o=$(this),u=this.column;this.order=this.count++%2,this.lockedOrder&&(this.order=this.lockedOrder);if(!e[s.sortMultiSortKey]){s.sortList=[];if(s.sortForce!=null){var f=s.sortForce;for(var l=0;l<f.length;l++)f[l][0]!=u&&s.sortList.push(f[l])}s.sortList.push([u,this.order])}else if(isValueInArray(u,s.sortList))for(var l=0;l<s.sortList.length;l++){var c=s.sortList[l],h=s.headerList[c[0]];c[0]==u&&(h.count=c[1],h.count++,c[1]=h.count%2)}else s.sortList.push([u,this.order]);return setTimeout(function(){setHeadersCss(t[0],r,s.sortList,a),appendToTable(t[0],multisort(t[0],s.sortList,i))},1),!1}}).mousedown(function(){if(s.cancelSelection)return this.onselectstart=function(){return!1},!1}),t.bind("update",function(){var e=this;setTimeout(function(){e.config.parsers=buildParserCache(e,r),i=buildCache(e)},1)}).bind("updateCell",function(e,t){var n=this.config,r=[t.parentNode.rowIndex-1,t.cellIndex];i.normalized[r[0]][r[1]]=n.parsers[r[1]].format(getElementText(n,t),t)}).bind("sorton",function(e,t){$(this).trigger("sortStart"),s.sortList=t;var n=s.sortList;updateHeaderSortCount(this,n),setHeadersCss(this,r,n,a),appendToTable(this,multisort(this,n,i))}).bind("appendCache",function(){appendToTable(this,i)}).bind("applyWidgetId",function(e,t){getWidgetById(t).format(this)}).bind("applyWidgets",function(){applyWidget(this)}),$.metadata&&$(this).metadata()&&$(this).metadata().sortlist&&(s.sortList=$(this).metadata().sortlist),s.sortList.length>0&&t.trigger("sorton",[s.sortList]),applyWidget(this)})},this.addParser=function(e){var t=parsers.length,n=!0;for(var r=0;r<t;r++)parsers[r].id.toLowerCase()==e.id.toLowerCase()&&(n=!1);n&&parsers.push(e)},this.addWidget=function(e){widgets.push(e)},this.formatFloat=function(e){var t=parseFloat(e);return isNaN(t)?0:t},this.formatInt=function(e){var t=parseInt(e);return isNaN(t)?0:t},this.isDigit=function(e,t){return/^[-+]?\d*$/.test($.trim(e.replace(/[,.']/g,"")))},this.clearTableBody=function(e){if($.browser.msie){function t(){while(this.firstChild)this.removeChild(this.firstChild)}t.apply(e.tBodies[0])}else e.tBodies[0].innerHTML=""}}}),$.fn.extend({tablesorter:$.tablesorter.construct});var ts=$.tablesorter;ts.addParser({id:"text",is:function(e){return!0},format:function(e){return $.trim(e.toLocaleLowerCase())},type:"text"}),ts.addParser({id:"digit",is:function(e,t){var n=t.config;return $.tablesorter.isDigit(e,n)},format:function(e){return $.tablesorter.formatFloat(e)},type:"numeric"}),ts.addParser({id:"currency",is:function(e){return/^[£$€?.]/.test(e)},format:function(e){return $.tablesorter.formatFloat(e.replace(new RegExp(/[£$€]/g),""))},type:"numeric"}),ts.addParser({id:"ipAddress",is:function(e){return/^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(e)},format:function(e){var t=e.split("."),n="",r=t.length;for(var i=0;i<r;i++){var s=t[i];s.length==2?n+="0"+s:n+=s}return $.tablesorter.formatFloat(n)},type:"numeric"}),ts.addParser({id:"url",is:function(e){return/^(https?|ftp|file):\/\/$/.test(e)},format:function(e){return jQuery.trim(e.replace(new RegExp(/(https?|ftp|file):\/\//),""))},type:"text"}),ts.addParser({id:"isoDate",is:function(e){return/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(e)},format:function(e){return $.tablesorter.formatFloat(e!=""?(new Date(e.replace(new RegExp(/-/g),"/"))).getTime():"0")},type:"numeric"}),ts.addParser({id:"percent",is:function(e){return/\%$/.test($.trim(e))},format:function(e){return $.tablesorter.formatFloat(e.replace(new RegExp(/%/g),""))},type:"numeric"}),ts.addParser({id:"usLongDate",is:function(e){return e.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/))},format:function(e){return $.tablesorter.formatFloat((new Date(e)).getTime())},type:"numeric"}),ts.addParser({id:"shortDate",is:function(e){return/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(e)},format:function(e,t){var n=t.config;e=e.replace(/\-/g,"/");if(n.dateFormat=="us")e=e.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$1/$2");else if(n.dateFormat=="uk")e=e.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$2/$1");else if(n.dateFormat=="dd/mm/yy"||n.dateFormat=="dd-mm-yy")e=e.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/,"$1/$2/$3");return $.tablesorter.formatFloat((new Date(e)).getTime())},type:"numeric"}),ts.addParser({id:"time",is:function(e){return/^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(e)},format:function(e){return $.tablesorter.formatFloat((new Date("2000/01/01 "+e)).getTime())},type:"numeric"}),ts.addParser({id:"metadata",is:function(e){return!1},format:function(e,t,n){var r=t.config,i=r.parserMetadataName?r.parserMetadataName:"sortValue";return $(n).metadata()[i]},type:"numeric"}),ts.addWidget({id:"zebra",format:function(e){if(e.config.debug)var t=new Date;var n,r=-1,i;$("tr:visible",e.tBodies[0]).each(function(t){n=$(this),n.hasClass(e.config.cssChildRow)||r++,i=r%2==0,n.removeClass(e.config.widgetZebra.css[i?0:1]).addClass(e.config.widgetZebra.css[i?1:0])}),e.config.debug&&$.tablesorter.benchmark("Applying Zebra widget",t)}})})(jQuery);