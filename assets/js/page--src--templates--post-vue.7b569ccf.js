(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{178:function(t,e,a){},179:function(t,e){},184:function(t,e,a){var s=a(14),i=Date.prototype,n=i.toString,o=i.getTime;new Date(NaN)+""!="Invalid Date"&&s(i,"toString",(function(){var t=o.call(this);return t==t?n.call(this):"Invalid Date"}))},185:function(t,e,a){"use strict";var s=a(178);a.n(s).a},186:function(t,e,a){"use strict";var s=a(179),i=a.n(s);e.default=i.a},192:function(t,e,a){"use strict";a.r(e);a(133),a(134),a(36),a(81),a(184);var s={metaInfo:function(){if(this.$page&&this.$page.post){var t=new Date(this.$page.post.date),e="".concat(t.getFullYear(),"-").concat(("0"+t.getMonth()).slice(-2),"-").concat(("0"+t.getDate()).slice(-2));return{title:this.$page.post.title,meta:[{description:this.$page.post.description}],script:[{innerHTML:JSON.stringify({"@context":"https://schema.org/","@type":"BlogPosting",mainEntityOfPage:{"@type":"WebPage","@id":"https://chowson.github.io".concat(this.$page.post.path)},headline:"headling",author:{"@type":"Person",name:"Chris Howson",sameAs:"https://github.io/chowson"},publisher:{"@type":"Organization",name:"chowson.github.io",logo:{"@type":"ImageObject",url:"https://chowson.github.io/images/logo.png"}},image:"https://chowson.github.io/images/logo.png",dateCreated:e,datePublished:e,dateModified:e,description:this.$page.post.description}),type:"application/ld+json"}]}}}},i=(a(185),a(13)),n=a(186),o=Object(i.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Layout",[a("div",{staticClass:"container-inner mx-auto my-8"},[t.$page&&t.$page.post?a("article",[a("h1",{staticClass:"text-4xl font-bold leading-tight"},[t._v(t._s(t.$page.post.title))]),a("div",{staticClass:"text-xl text-gray-600"},[t._v(t._s(t.$page.post.date))]),a("div",{staticClass:"text-sm text-gray-600 mb-4"},[t._v(t._s(t.$page.post.timeToRead)+" min read")]),a("div",{staticClass:"flex mb-8 text-sm"},t._l(t.$page.post.tags,(function(e){return a("g-link",{key:e.id,staticClass:"bg-gray-300 rounded-full px-4 py-2 mr-4 text-brand-900 hover:bg-brand-300",attrs:{to:e.path}},[t._v("\n          "+t._s(e.title)+"\n        ")])})),1),a("div",{directives:[{name:"g-image",rawName:"v-g-image"}],staticClass:"markdown-body mb-8",domProps:{innerHTML:t._s(t.$page.post.content)}}),t.$page.post.references.length>0?a("div",{staticClass:"mb-6 pt-6 border-t-1 border-gray-600"},[a("h4",{staticClass:"text-xl"},[t._v("References")]),a("ul",{staticClass:"list-disc list-inside"},t._l(t.$page.post.references,(function(e){return a("li",{key:e},[a("a",{staticClass:"external mb-1 inline-block",attrs:{target:"_blank",rel:"noreferrer",href:e.split("|")[0]}},[t._v(t._s(e.split("|")[1]))])])})),0)]):t._e(),a("div",{staticClass:"mb-8 pt-2 border-t-3 border-double border-gray-600"},[a("g-link",{staticClass:"font-bold uppercase",attrs:{to:"/"}},[t._v("Back to Blog")])],1)]):t._e()])])}),[],!1,null,null,null);"function"==typeof n.default&&Object(n.default)(o);e.default=o.exports}}]);