(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{174:function(t,e,s){"use strict";var a=s(4),n=s(79).includes,o=s(131);a({target:"Array",proto:!0,forced:!s(37)("indexOf",{ACCESSORS:!0,1:0})},{includes:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),o("includes")},175:function(t,e,s){"use strict";s(36),s(174),s(24),s(132),s(80);var a={props:["base","totalPages","currentPage"],computed:{showPreviousPage:function(){return 1!==this.currentPage},previousPage:function(){return[0,1].includes(this.currentPage-1)?"/":"".concat(this.getBaseUrl,"/").concat(this.currentPage-1)},showNextPage:function(){return this.currentPage!==this.totalPages},nextPage:function(t,e){return this.totalPages>this.currentPage?"".concat(this.getBaseUrl,"/").concat(this.currentPage+1):"".concat(this.getBaseUrl,"/").concat(this.currentPage)},getBaseUrl:function(){return this.base.endsWith("/")?this.base.replace(/\/$/,""):this.base}}},n=s(13),o=Object(n.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("nav",{staticClass:"flex justify-between text-xl items-center"},[t.showPreviousPage?s("g-link",{class:{"text-gray-400 hover:text-gray-400 cursor-not-allowed":!t.showPreviousPage},attrs:{rel:"prev",to:t.previousPage,exact:""}},[t._v("← Prev")]):s("span"),s("div",{staticClass:"text-base"},[t._v("Page "+t._s(t.currentPage)+" of "+t._s(t.totalPages))]),s("g-link",{class:{"text-gray-400 hover:text-gray-400 cursor-not-allowed":!t.showNextPage},attrs:{rel:"next",to:t.nextPage,active:""}},[t._v("Next →")])],1)}),[],!1,null,null,null);e.a=o.exports},180:function(t,e){},187:function(t,e,s){"use strict";var a=s(180),n=s.n(a);e.default=n.a},193:function(t,e,s){"use strict";s.r(e);var a=s(175),n={metaInfo:{titleTemplate:"chowson.github.io | %s",title:"Sitecore, C# & ASP.NET Development blog",links:[{rel:"canonical",href:"https://chowson.github.io"}],script:[{innerHTML:JSON.stringify({"@context":"https://schema.org/","@type":"WebSite",name:"chowson.github.io",url:"https://chowson.github.io"}),type:"application/ld+json"}]},components:{PaginationPosts:a.a},computed:{totalPageCount:function(){return Math.ceil(this.$page.posts.totalCount/5)}}},o=s(13),r=s(187),i=Object(o.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("Layout",[s("hero"),s("div",{staticClass:"container-inner mx-auto py-16"},[t._l(t.$page.posts.edges,(function(e){return s("div",{key:e.id,staticClass:"post border-gray-400 border-b mb-12"},[s("h2",{staticClass:"text-3xl font-bold"},[s("g-link",{staticClass:"text-copy-primary",attrs:{to:e.node.path}},[t._v(t._s(e.node.title))])],1),s("div",{staticClass:"text-copy-secondary mb-4"},[s("span",[t._v(t._s(e.node.date))]),s("span",[t._v(" · ")]),s("span",[t._v(t._s(e.node.timeToRead)+" min read")])]),s("div",{staticClass:"text-lg mb-4"},[t._v("\n        "+t._s(e.node.description)+"\n      ")]),s("div",{staticClass:"mb-8"},[s("g-link",{staticClass:"font-bold uppercase",attrs:{to:e.node.path}},[t._v("Read More")])],1)])})),s("pagination-posts",{attrs:{base:"/blog",totalPages:t.totalPageCount,currentPage:1}})],2)],1)}),[],!1,null,null,null);"function"==typeof r.default&&Object(r.default)(i);e.default=i.exports}}]);