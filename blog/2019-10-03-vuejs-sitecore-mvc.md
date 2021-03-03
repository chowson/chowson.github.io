---
title:      "Vue.js and Sitecore MVC"
path:       /vuejs-sitecore-mvc
date:       2019-10-03 19:54:11
description: "How to develop Vue.js and Sitecore MVC applications"
tags: ['sitecore']
---

There are many articles about using Vue.js with Sitecore, but they are mainly for JSS implementations.

The problem with integrating modern JS frameworks with Sitecore is the need to define your markup in razor view files. This is so that you can use the Sitecore HtmlHelper extension methods to render content so that it can be editable in the experience editor.

```csharp
@Html.Sitecore().Field("FieldName")
```

There are a few ways you can declare components with Vue.js, but these require you define your HTML template within a script. The most common method being [single file components](https://vuejs.org/v2/guide/single-file-components.html). This requires you to define your template within a *.vue* file, but this will prevent content from being editable within the experience editor.

So can you use Vue.js with regular Sitecore MVC builds without losing the experience editor capabilities?

Yes, using [slots](https://vuejs.org/v2/guide/components-slots.html) works very well. Slots enable you to define your template in the razor view, and then access them from the *.vue* file. There are 2 ways you can use slots, or a combination of both:

## Option 1 - [Scoped slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots)

- **Advantages** - HTML is defined all in one place
- **Disadvantages** - The render method is quite complex, need to map data/props to access in the scoped slot

**mycomponent.cshtml**

```vue-html
<mycomponent v-slot="data">
    <div>
      <p>@Html.Glass().Editable(m => m.Message) - {{ data.message }}</p>
      <p>@Html.Glass().Editable(m => m.Text)</p>
    </div>
</mycomponent>
```

**mycomponent.js**

```vue
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
```

## Options 2 - [Named slots](https://vuejs.org/v2/guide/components-slots.html#Named-Slots)

- **Advantages** - As close as you can get to Single File Components
- **Disadvantages** - Could end up passing through a lot of fields

**.cshtml**

```html
<mycomponent>
    <template v-slot:message>
        @Html.Glass().Editable(m => m.Message)
    </template>
    <template v-slot:text>
        @Html.Glass().Editable(m => m.Text)
    </template>
</mycomponent>
```

**mycomponent.vue**

```vue
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
```

<h2 class="text-lg">Conclusion</h2>

<p>Option 1 using named slots to pass through fields is as close to Vue as you can get and using Single File Components. Some situations could end up using a combination of both.</p>

<p>Either way, Vue.js is ready to use for Sitecore MVC builds.</p>