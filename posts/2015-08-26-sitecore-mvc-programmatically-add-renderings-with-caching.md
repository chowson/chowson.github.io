---
layout:     post
path:       /sitecore-mvc-programmatically-add-renderings-with-caching
references: []
title:      "Programmatically Adding Sitecore MVC Renderings with Caching"
subtitle:   "Sitecore helper method to add a rendering within a view with caching"
date:       2015-08-26 16:18:00
description: "Sitecore helper method to add a rendering within a view with caching"
tags: [sitecore,mvc]
---

Sitecore provides a suite of web controls for Web Forms development within the 
*Sitecore.Web.UI.WebControls* namespace and one of these controls is *Sublayout*.
This was used to programmatically add a Sitecore sublayout to the current sublayout.
This control inherits from *Sitecore.Web.UI.WebControls.WebControl* which contains
all of the standard caching properties such as *Cacheable, VaryByData, VaryByQueryString*
etc. Example usage of the *Sublayout* control:

```csharp
<sc:Sublayout runat="server" Path="/layouts/Header.ascx" placeholder="content" Cacheable="True" VaryByData="True"></sc:Sublayout>
```

In Sitecore MVC, the equivalent of the *Sublayout* control is to use the *Rendering*
method on the *Sitecore.Mvc.Helpers.SitecoreHelper* within the view. For example:

```csharp
@Html.Sitecore().Rendering("{00000000-0000-0000-0000-000000000000}")
```

One important thing to note is that when adding a rendering programmatically, the
cache settings specified on the sublayout/rendering definition item in Sitecore are
**NOT** picked up. To define cache settings on the *Rendering* method, you must
use a method overload to specify the caching behaviour on the rendering. There is no
intuitive overload where you can pass in values for *Cacheable* or *VaryByData* as with
the *WebControl*. To add caching to the example above, an anonymous type needs to be
defined, for example:

```csharp
@Html.Sitecore().Rendering("{00000000-0000-0000-0000-000000000000}", new { Cacheable = true, Cache_VaryByData = true })
```

There is no IntelliSense when defining this and so it is hard to remember the property
names without decompiling the Sitecore code or to look back at another project to see
how you achieved this previously. The following code provides a method which accepts
a strongly typed class to define the caching properties. It also provides the ability
to cache a rendering by *TimeSpan* which could come in useful and isn't exposed as part
of the standard Sitecore caching functionality.

```csharp
public class RenderingCachingSettings
{
    public bool? Cacheable { get; set; }
    
    public TimeSpan? Cache_Timeout { get; set; }
    
    public bool? Cache_VaryByData { get; set; }
    
    public bool? Cache_VaryByDevice { get; set; }
    
    public bool? Cache_VaryByLogin { get; set; }
    
    public bool? Cache_VaryByParameters { get; set; }
    
    public bool? Cache_VaryByQueryString { get; set; }
    
    public bool? Cache_VaryByUser { get; set; }
}

public static class SitecoreHelperExtensions
{
    public static HtmlString CachedRendering(this SitecoreHelper sitecoreHelper, string pathOrId, RenderingCachingSettings renderingCachingSettings)
    {
        return sitecoreHelper.Rendering(pathOrId, renderingCachingSettings);
    }
}
```

This method is then used in a view such as:

```csharp
@Html.Sitecore().CachedRendering("{00000000-0000-0000-0000-000000000000}", new RenderingCachingSettings { Cacheable = true, Cache_VaryByQueryString = true })

@Html.Sitecore().CachedRendering("{00000000-0000-0000-0000-000000000000}", new RenderingCachingSettings { Cacheable = true, Cache_Timeout = new TimeSpan(0, 0, 0, 30)})
```

If the extension method does not show up, you will need to ensure you have the
namespace imported where it is defined. Adding the namespace to the *web.config*
within the views directory will ensure it is available for all views, for example:

```xml
<configuration>
  <system.web.webPages.razor>
    <pages pageBaseType="System.Web.Mvc.WebViewPage">
	  <add namespace="Your.Namespace" />
	</pages>
  </system.web.webPages.razor>
</configuration>
```
