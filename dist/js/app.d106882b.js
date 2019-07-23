(function(t){function e(e){for(var n,s,u=e[0],i=e[1],c=e[2],f=0,p=[];f<u.length;f++)s=u[f],o[s]&&p.push(o[s][0]),o[s]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);l&&l(e);while(p.length)p.shift()();return a.push.apply(a,c||[]),r()}function r(){for(var t,e=0;e<a.length;e++){for(var r=a[e],n=!0,u=1;u<r.length;u++){var i=r[u];0!==o[i]&&(n=!1)}n&&(a.splice(e--,1),t=s(s.s=r[0]))}return t}var n={},o={app:0},a=[];function s(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=n,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(r,n,function(e){return t[e]}.bind(null,n));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],i=u.push.bind(u);u.push=e,u=u.slice();for(var c=0;c<u.length;c++)e(u[c]);var l=i;a.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"034f":function(t,e,r){"use strict";var n=r("64a9"),o=r.n(n);o.a},"25a0":function(t,e,r){},"56d7":function(t,e,r){"use strict";r.r(e);r("cadf"),r("551c"),r("f751"),r("097d");var n=r("2b0e"),o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("section",[r("h1",[t._v(t._s(t.appName))]),r("h2",[t._v(t._s(t.appDescr))]),r("rateForm")],1),r("gitBtns")],1)},a=[],s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("form",{attrs:{action:""}},[r("p",[r("label",[t._v("Enter your hourly rate")]),r("number-input",{attrs:{size:"large",min:1,center:"",controls:""},model:{value:t.form.rate,callback:function(e){t.$set(t.form,"rate",e)},expression:"form.rate"}})],1),r("p",[r("label",[t._v("Enter hours worked")]),r("number-input",{attrs:{size:"large",min:1,center:"",controls:""},model:{value:t.form.h,callback:function(e){t.$set(t.form,"h",e)},expression:"form.h"}})],1),r("p",[r("label",{attrs:{for:"minutes"}},[t._v("Enter minutes worked")]),r("number-input",{attrs:{size:"large",max:60,center:"",controls:""},model:{value:t.form.m,callback:function(e){t.$set(t.form,"m",e)},expression:"form.m"}})],1),r("p",{staticClass:"price-converter"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.convertToUAH,expression:"convertToUAH"}],staticClass:"apple-switch",attrs:{id:"convertToUAH",type:"checkbox"},domProps:{checked:Array.isArray(t.convertToUAH)?t._i(t.convertToUAH,null)>-1:t.convertToUAH},on:{change:function(e){var r=t.convertToUAH,n=e.target,o=!!n.checked;if(Array.isArray(r)){var a=null,s=t._i(r,a);n.checked?s<0&&(t.convertToUAH=r.concat([a])):s>-1&&(t.convertToUAH=r.slice(0,s).concat(r.slice(s+1)))}else t.convertToUAH=o}}}),r("label",{attrs:{for:"convertToUAH"}},[t._v("Convert to UAH")])]),r("mark",[t._v("\n    "+t._s(t.convertToUAH?"₴":"$")+"\n    "),r("span",[t._v(t._s(t.convertToUAH?t.calcTotalsUAH:t.calcTotals))])])])},u=[],i=(r("c5f6"),r("8203")),c=r.n(i);r("e054");n["a"].component(),n["a"].use(c.a);var l={name:"HourlyRateForm",data:function(){return{form:{rate:0,h:0,m:0},convertToUAH:!1,exchange:null}},beforeMount:function(){var t=this;this.$route.query.s&&(this.form=JSON.parse(this.$route.query.s));var e=sessionStorage.getItem("exchange");e?this.exchange=JSON.parse(e):fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then(function(t){return t.json()}).then(function(e){t.exchange=e,sessionStorage.setItem("exchange",JSON.stringify(e))})},computed:{time2minites:function(){return 60*Number(this.form.h)+Number(this.form.m)},calcTotals:function(){var t=this.form.rate/60*this.time2minites;return isNaN(t)?0:t.toFixed(2)},calcTotalsUAH:function(){var t=this.calcTotals*Number(this.exchange[0].sale);return isNaN(t)?0:t.toFixed(2)}},methods:{saveURI:function(t){this.$router.push({query:{s:JSON.stringify(t)}})}},watch:{form:{deep:!0,immediate:!1,handler:function(t){this.$router.push({query:{s:JSON.stringify(t)}})}}}},f=l,p=(r("7c4b"),r("2877")),h=Object(p["a"])(f,s,u,!1,null,null,null),m=h.exports,v=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},b=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"git-bttns"},[r("a",{staticClass:"github-button",attrs:{href:"https://github.com/tusko","aria-label":"Follow @tusko on GitHub"}},[t._v("Follow @tusko")]),r("a",{staticClass:"github-button",attrs:{href:"https://github.com/tusko/hourlyrate.js","data-icon":"octicon-star","data-count-href":"/tusko/hourlyrate.js/stargazers","data-count-api":"/repos/tusko/hourlyrate.js#stargazers_count","data-count-aria-label":"# stargazers on GitHub","aria-label":"Star tusko/hourlyrate.js on GitHub"}},[t._v("Star")]),r("a",{staticClass:"github-button",attrs:{href:"https://github.com/tusko/hourlyrate.js/archive/master.zip","data-icon":"octicon-cloud-download","aria-label":"Download tusko/hourlyrate.js on GitHub"}},[t._v("Download")])])}],d=r("67b0");n["a"].use(d["a"]);var g={name:"GitButtons",beforeMount:function(){this.$loadScript("https://buttons.github.io/buttons.js")}},y=g,_=Object(p["a"])(y,v,b,!1,null,null,null),x=_.exports,k={name:"app",components:{rateForm:m,gitBtns:x},data:function(){return{appName:"Hourlyrate.js",appDescr:"Convert your hours to dollars"}}},H=k,T=(r("034f"),Object(p["a"])(H,o,a,!1,null,null,null)),j=T.exports,w=r("8c4f");r("fb98");n["a"].use(w["a"]);var A=new w["a"]({});n["a"].config.productionTip=!1,new n["a"]({router:A,render:function(t){return t(j)}}).$mount("#app")},"64a9":function(t,e,r){},"7c4b":function(t,e,r){"use strict";var n=r("25a0"),o=r.n(n);o.a},e054:function(t,e,r){},fb98:function(t,e,r){}});
//# sourceMappingURL=app.d106882b.js.map