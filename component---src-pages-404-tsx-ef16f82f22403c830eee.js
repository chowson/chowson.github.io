"use strict";(self.webpackChunkchowson_github_io=self.webpackChunkchowson_github_io||[]).push([[218],{3555:function(e,t,r){r.d(t,{Z:function(){return c}});var l=r(1883),a=r(7294);const n=()=>{const{0:e,1:t}=(0,a.useState)(""),{0:r,1:n}=(0,a.useState)(!1),{0:o,1:c}=(0,a.useState)(0),s=(0,a.useRef)([]),m=(0,a.useRef)(null),i=(0,a.useCallback)((()=>{const t=new RegExp(""+e,"i");return s.current.filter((e=>t.test(e.title)))}),[e]),h=()=>{var e;null===(e=m.current)||void 0===e||e.focus()};(0,a.useEffect)((()=>(window.addEventListener("keyup",h),()=>window.removeEventListener("keyup",h))),[]);return a.createElement("div",{className:"relative"},a.createElement("div",{className:"relative w-80"},a.createElement("input",{ref:m,type:"text",placeholder:'Search (Press  "/" to focus)',className:"bg-background-form border border-gray-500 rounded-full px-4 pl-10 py-2 outline-none focus:border-brand-500 w-80",value:e,autoComplete:"off",onChange:e=>t(e.target.value),onFocus:()=>{n(!0),fetch("/search/posts.json").then((e=>e.json())).then((e=>{s.current=e}))},onKeyUp:e=>{"ArrowUp"===e.key?o>0&&c(o-1):"ArrowDown"===e.key?o+1!==i().length&&c(o+1):"Enter"===e.key&&(0,l.navigate)(i()[o].path),setTimeout((()=>{var e;return null===(e=document.querySelector(".search-highlighted"))||void 0===e?void 0:e.scrollIntoView({block:"nearest"})}),1)}}),a.createElement("div",{className:"absolute top-0 ml-3",style:{top:"10px"}},a.createElement("svg",{fill:"currentColor",className:"text-gray-500 h-5 w-5",viewBox:"0 0 24 24",width:"24",height:"24"},a.createElement("path",{className:"heroicon-ui",d:"M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"}))),e.length>0&&a.createElement("button",{className:"absolute top-0 right-0 text-2xl mr-3 cursor-pointer text-gray-600 hover:text-gray-800 h-fit",onClick:()=>{t("")}},"×")),e.length>0&&r&&a.createElement("div",{className:"normal-case absolute border left-0 right-0 w-108 max-w-full text-left mb-4 mt-2 rounded-lg shadow overflow-hidden z-10 overflow-y-auto",style:{maxHeight:"32rem"}},i().length>0?a.createElement("div",{className:"flex flex-col"},i().map(((e,t)=>{var r,n;return a.createElement(l.Link,{to:null!==(r=e.path)&&void 0!==r?r:"#",className:"bg-background-form border-b border-gray-400 text-xl cursor-pointer p-4 search-hover "+(o===t&&"underline search-highlighted"),key:null!==(n=e.title)&&void 0!==n?n:t},e.title,a.createElement("span",{className:"block font-normal text-copy-primary text-sm my-1"},e.description))}))):a.createElement("div",{className:"bg-background-form font-normal w-full border-b cursor-pointer p-4"},a.createElement("p",{className:"my-0"},"No results for '",a.createElement("strong",null,e),"'"))))},o=()=>{const{0:e,1:t}=(0,a.useState)("theme-light");(0,a.useEffect)((()=>{t(window.__theme)}),[]);return a.createElement("span",{className:"mr-4 flex items-center"},a.createElement("a",{href:"#",className:"text-copy-primary hover:text-gray-600",onClick:r=>{const l="theme-light"===e?"theme-dark":"theme-light";localStorage.setItem("theme",l),t(l),window.__setPreferredTheme(l),r.preventDefault()},"aria-label":"Switch theme"},"theme-light"===e?a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-moon"},a.createElement("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"})):a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-sun"},a.createElement("circle",{cx:"12",cy:"12",r:"5"}),a.createElement("path",{d:"M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"}))))};var c=e=>{let{children:t}=e;const{0:r,1:c}=(0,a.useState)(!1);return a.createElement("div",{className:"content-wrapper bg-background-primary font-sans text-copy-primary leading-normal flex flex-col min-h-screen"},a.createElement("header",{className:"border-t-14 border-brand-900"},a.createElement("nav",{className:"container mx-auto flex flex-wrap justify-between items-center py-8"},a.createElement("div",null,a.createElement(l.Link,{to:"/",className:"logo flex items-center"},a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-terminal"},a.createElement("polyline",{points:"4 17 10 11 4 5"}),a.createElement("line",{x1:"12",y1:"19",x2:"20",y2:"19"})),a.createElement("span",{className:"font-bold m-2"},"chowson.github.io"))),a.createElement("div",{className:"flex md:hidden"},a.createElement(o,null),a.createElement("div",{className:"block"},a.createElement("button",{onClick:()=>{c(!r)},className:"flex items-center px-3 py-2 border rounded border-gray-500 hover:text-gray-600 hover:border-gray-600",name:"Open menu"},a.createElement("svg",{className:"current-color h-3 w-3",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},a.createElement("title",null,"Open Menu"),a.createElement("path",{d:"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z",fill:"gray"}))))),a.createElement("ul",{className:"uppercase tracking-wide font-bold w-full block flex-grow md:space-x-8 space-y-6 md:space-y-0 md:flex md:flex-initial md:w-auto items-center mt-8 md:mt-0 "+(r?"block":"hidden")},a.createElement("li",{className:"mb-6 md:mb-0"},a.createElement(n,null)),a.createElement("li",{className:"hidden md:block"},a.createElement(o,null))))),a.createElement("div",{className:"flex-grow"},t),a.createElement("footer",{className:"bg-brand-900 text-white"},a.createElement("div",{id:"contact",className:"container mx-auto flex flex-col items-center py-8"},a.createElement("div",{className:"mb-3"},a.createElement(l.Link,{to:"/tag",className:"text-white hover:text-white flex font-normal hover:underline"},a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-tag"},a.createElement("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"}),a.createElement("line",{x1:"7",y1:"7",x2:"7.01",y2:"7"})),a.createElement("span",{className:"pl-2"},"Browse posts by tag"))),a.createElement("ul",{className:"flex items-center space-x-8 mb-3"},a.createElement("li",null,a.createElement("a",{href:"https://github.com/chowson","aria-label":"Github",target:"_blank",rel:"noreferrer",className:"rounded-full bg-opacity-80 block bg-gray-800 p-2 text-white hover:text-gray-400"},a.createElement("svg",{width:"24",height:"23",viewBox:"0 0 20 19",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},a.createElement("path",{d:"M10 0c1.814 0 3.487.435 5.02 1.306a9.827 9.827 0 0 1 3.639 3.542A9.33 9.33 0 0 1 20 9.734c0 2.121-.636 4.03-1.908 5.723a9.783 9.783 0 0 1-4.928 3.518c-.234.042-.408.012-.52-.09a.49.49 0 0 1-.17-.38l.006-.969c.005-.621.007-1.19.007-1.705 0-.82-.226-1.42-.677-1.8.495-.05.94-.126 1.335-.228a5.4 5.4 0 0 0 1.223-.494 3.62 3.62 0 0 0 1.055-.843c.282-.334.512-.777.69-1.33.178-.554.267-1.19.267-1.909a3.7 3.7 0 0 0-1.028-2.61c.32-.77.286-1.631-.105-2.586-.243-.076-.594-.03-1.054.14-.46.168-.86.354-1.198.557l-.495.304a9.478 9.478 0 0 0-2.5-.33c-.86 0-1.693.11-2.5.33a11.6 11.6 0 0 0-.553-.342c-.23-.135-.593-.298-1.088-.488-.494-.19-.863-.247-1.106-.171-.391.955-.426 1.816-.105 2.585A3.7 3.7 0 0 0 3.62 9.227c0 .719.089 1.352.267 1.902.178.549.406.993.683 1.33.278.339.627.622 1.048.85a5.4 5.4 0 0 0 1.224.494c.395.102.84.178 1.335.228-.338.305-.551.74-.638 1.306a2.631 2.631 0 0 1-.586.19 3.782 3.782 0 0 1-.742.063c-.287 0-.57-.09-.853-.272a2.256 2.256 0 0 1-.723-.792 2.068 2.068 0 0 0-.631-.66c-.256-.168-.471-.27-.645-.304l-.26-.038c-.182 0-.308.02-.378.057-.07.038-.09.087-.065.146.026.06.065.118.117.178.053.059.109.11.17.152l.09.063c.192.085.38.245.567.482.187.236.324.452.41.646l.13.292c.113.32.304.58.574.78.269.198.56.325.872.38.312.054.614.084.905.088.29.004.532-.01.723-.044l.299-.05c0 .32.002.694.007 1.12l.006.692a.49.49 0 0 1-.17.38c-.112.101-.286.13-.52.089a9.783 9.783 0 0 1-4.928-3.518C.636 13.763 0 11.855 0 9.734a9.33 9.33 0 0 1 1.341-4.886 9.827 9.827 0 0 1 3.64-3.542C6.512.436 8.185 0 10 0zM3.79 13.98c.025-.058-.005-.11-.092-.151-.087-.026-.143-.017-.17.025-.025.06.005.11.092.152.078.05.134.042.17-.025zm.403.432c.06-.043.052-.11-.026-.203-.087-.076-.157-.089-.209-.038-.06.042-.052.11.026.203.087.084.157.097.209.038zm.39.57c.078-.06.078-.14 0-.24-.07-.11-.143-.136-.221-.077-.078.042-.078.118 0 .228.078.11.152.14.221.089zm.547.532c.07-.067.052-.148-.052-.24-.104-.102-.19-.115-.26-.039-.078.068-.061.148.052.241.104.102.19.114.26.038zm.742.317c.026-.093-.03-.16-.169-.203-.13-.033-.213-.004-.247.09-.035.092.021.155.169.19.13.05.213.025.247-.077zm.82.064c0-.11-.073-.157-.22-.14-.14 0-.209.047-.209.14 0 .11.074.156.221.139.14 0 .209-.046.209-.14zm.756-.127c-.017-.093-.096-.131-.234-.114-.14.025-.2.088-.183.19.018.101.096.135.235.101.139-.034.2-.093.182-.177z",fillRule:"nonzero"}))))),a.createElement("div",null,"Copyright · chowson.github.io · ",(new Date).getFullYear()))))}},4001:function(e,t,r){r.d(t,{H:function(){return n}});var l=r(7294),a=r(4740);const n=e=>{let{title:t,description:r,pathname:n,children:o}=e;const{title:c,siteUrl:s,description:m}=(0,a.$)(),i={title:t?t+" | "+c:c+" | "+m,image:s+"/images/logo.png",url:""+s+(n||"")};return l.createElement(l.Fragment,null,l.createElement("title",null,i.title),l.createElement("meta",{name:"image",content:i.image}),l.createElement("meta",{name:"theme-color",content:"#2F855A"}),l.createElement("link",{rel:"icon",href:"/favicon.png"}),l.createElement("link",{rel:"preconnect",href:"https://fonts.gstatic.com"}),l.createElement("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap"}),o)}},4740:function(e,t,r){r.d(t,{$:function(){return a}});var l=r(1883);const a=()=>(0,l.useStaticQuery)("1942088059").site.siteMetadata},2513:function(e,t,r){r.r(t),r.d(t,{Head:function(){return o}});var l=r(7294),a=r(3555),n=r(4001);t.default=()=>l.createElement(a.Z,null,l.createElement("div",{className:"container-inner mx-auto py-16"},l.createElement("h2",{className:"text-4xl font-bold mb-16"},"Page Not Found"),l.createElement("img",{src:"/images/404.svg",alt:"404 page not foud"})));const o=()=>l.createElement(n.H,{title:"Page Not Found"})}}]);
//# sourceMappingURL=component---src-pages-404-tsx-ef16f82f22403c830eee.js.map