(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,n,t){e.exports=t(46)},23:function(e,n,t){},24:function(e,n,t){e.exports=t.p+"static/media/logo.495d93cc.svg"},45:function(e,n,t){},46:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(15),i=t.n(r),c=(t(23),t(2)),l=t(3),u=t(5),s=t(4),d=t(6),f=(t(24),t(16)),g=(t(25),t(7)),p=t.n(g),h={getPages:function(){return p.a.get("/api/page")},getPage:function(e){return p.a.get("/api/page/"+e)},deletePage:function(e){return p.a.delete("/api/page/"+e)},savePage:function(e){return p.a.post("/api/page",e)}},m=function(e){function n(){var e,t;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(t=Object(u.a)(this,(e=Object(s.a)(n)).call.apply(e,[this].concat(o)))).state={pages:[]},t.loadPages=function(){h.getPages().then(function(e){return t.setState({pages:e.data})}).catch(function(e){return console.log(e)})},t}return Object(d.a)(n,e),Object(l.a)(n,[{key:"componentDidMount",value:function(){this.loadPages()}},{key:"render",value:function(){return console.log(this.state.pages),o.a.createElement("div",null,o.a.createElement(f.Glide,{height:400,width:1e3,autoPlay:!1,autoPlaySpeed:2e3,dots:!1,infinite:!0,onSlideChange:function(){return console.log("slide changed")}},this.state.pages.map(function(e){return o.a.createElement("img",{src:e.imageUrl})}),o.a.createElement("div",null)))}}]),n}(o.a.Component),v=function(e){function n(){return Object(c.a)(this,n),Object(u.a)(this,Object(s.a)(n).apply(this,arguments))}return Object(d.a)(n,e),Object(l.a)(n,[{key:"render",value:function(){return o.a.createElement("header",{style:w},o.a.createElement("h1",null,"Ling's Tales"),o.a.createElement("p",null,"Home"),o.a.createElement("p",null,"Read"),o.a.createElement("p",null,"Amazon"))}}]),n}(o.a.Component),w={background:"#BE2625",color:"#fff",textAlign:"left",padding:"10px"},b=v,E=(t(45),function(e){function n(){return Object(c.a)(this,n),Object(u.a)(this,Object(s.a)(n).apply(this,arguments))}return Object(d.a)(n,e),Object(l.a)(n,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"App-header"},o.a.createElement(b,null),o.a.createElement("break",null),o.a.createElement(m,null)))}}]),n}(a.Component)),j=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function O(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(o.a.createElement(E,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("","/service-worker.js");j?function(e){fetch(e).then(function(n){404===n.status||-1===n.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):O(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e):O(e)})}}()}},[[17,1,2]]]);
//# sourceMappingURL=main.7b38e107.chunk.js.map