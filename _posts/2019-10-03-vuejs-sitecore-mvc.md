---
layout:     post
references: []
title:      "Vue.js and Sitecore MVC"
subtitle:   "How to develop Vue.js and Sitecore MVC applications"
date:       2019-10-03 19:54:11
description: "How to develop Vue.js and Sitecore MVC applications"
tags: [sitecore]
---
<p>There are many articles about using Vue.js with Sitecore, but they are mainly for JSS implementations.</p>

<p>The problem with integrating modern JS frameworks with Sitecore is the need to define your markup in razor view files. This is so that you can use the Sitecore HtmlHelper extension methods to render content so that it can be editable in the experience editor</p>

<pre>@Html.Sitecore().Field("FieldName")</pre>

<p>There are a few ways you can declare components with Vue.js, but these require you define your HTML template within a script. The most common method being <a href="https://vuejs.org/v2/guide/single-file-components.html">single file components</a>. This requires you to define your template within a <em>.vue</em> file, but this will prevent content from being editable within the experience editor.</p>

<p>So can you use Vue.js with regular Sitecore MVC builds without losing the experience editor capabilities?</p>

<p>Yes, using <a href="https://vuejs.org/v2/guide/components-slots.html">slots</a> works very well. Slots enable you to define your template in the razor view, and then access them from the <em>.vue</em> file. There are 2 ways you can use slots, or a combination of both:</p>

<h3>Option 1 - <a href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots">Scoped slots</a></h3>

<ul>
    <li><strong>Advantages</strong> - HTML is defined all in one place</li>
    <li><strong>Disadvantages</strong> - The render method is quite complex, need to map data/props to access in the scoped slot</li>
</ul>

<strong>mycomponent.cshtml</strong>
{% highlight html %}
<mycomponent v-slot="data">
    <div>
      <p>@Html.Glass().Editable(m => m.Message) - {{ data.message }}</p>
      <p>@Html.Glass().Editable(m => m.Text)</p>
    </div>
</mycomponent>
{% endhighlight %}

<strong>mycomponent.js</strong>
{% highlight javascript %}
module.exports = {
    data: function() {
        return {
            message: "This is a message"
        }
    },  

    render(createElement) {
        if (this.$scopedSlots != null && this.$scopedSlots.default != null)
        {
            return createElement("div", { class: "my-component" }, this.$scopedSlots.default({
                message: this.message
            }));
        }

        return createElement("div", "NO DEFAULT SLOT FOUND - PLEASE DEFINE THE HTML FOR THIS COMPONENT");
    }
};
{% endhighlight %}

<h3>Options 2 - <a href="https://vuejs.org/v2/guide/components-slots.html#Named-Slots)">Named slots</a></h3>

<ul>
    <li><strong>Advantages</strong> - As close as you can get to Single File Components</li>
    <li><strong>Disadvantages</strong> - Could end up passing through a lot of fields</li>
</ul>

<strong>.cshtml</strong>
{% highlight html %}
<mycomponent>
    <template v-slot:message>
        @Html.Glass().Editable(m => m.Message)
    </template>
    <template v-slot:text>
        @Html.Glass().Editable(m => m.Text)
    </template>
</mycomponent>
{% endhighlight %}

<strong>mycomponent.vue</strong>
{% highlight vue %}
<template>
  <div>
    <p><slot name="message" /> - { { message } }</p>
    <p><slot name="text" /></p>
  </div>
</template>

<style scoped>
</style>

<script>
module.exports = {
    data: function() {
        return {
            message: "This is a message"
        }
    }
}
</script>
{% endhighlight %}

<h3>Conclusion</h3>

<p>Option 1 using named slots to pass through fields is as close to Vue as you can get and using Single File Components. Some situations could end up using a combination of both.</p>

<p>Either way, Vue.js is ready to use for Sitecore MVC builds.</p>