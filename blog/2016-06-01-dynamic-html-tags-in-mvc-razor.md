---
layout:     post
path:       /dynamic-html-tags-in-mvc-razor
references: []
title:      "Dynamic HTML Tags in MVC Razor"
subtitle:   "Output clean HTML markup for data driven dynamic HTML"
date:       2016-06-01 09:12:00
description: "Html.BeginForm for any HTML Tag"
tags: [mvc]
---
The HTML helper method *Html.BeginForm* is a useful way to dynamically create
`<form>` tags. It would be useful to be able to do this for other HTML
tags so that the HTML output is dynamically generated keeping your markup clean.

## Example

In the following example, `_dataProvider.GetAdvertDataAttributes()` returns
an `IDictionary<string, object>` and defines any additional data attributes
required on the component:

```csharp
// Controller
var model = new AdvertModel();
model.AdvertImageSrc = "/path/to/image.jpg";
model.AdvertImageAlt = "Advert Image"
model.AdvertClass = _dataProvider.GetAdvertClass();
model.AdvertDataAttributes = _dataProvider.GetAdvertDataAttributes();
```

Usually *AdvertDataAttributes* would require expanding into a string to output in 
the Razor view, for example:

```html
<!-- Razor View -->
<div class="@Model.AdvertClass"@Model.AdvertDataAttributesString>
    <img src="@Model.AdvertImageSrc" alt="@Model.AdvertImageAlt" />
</div>
```

This requires code to convert the dictionary into a string ensuring that the attributes
are encoded properly using `HttpUtility.HtmlAttributeEncode`. Also, it could lead to 
`class=""` being output to the page.

## Solution

Using the extension method for `System.Web.Mvc.HtmlHelper` and supporting *MvcTag*
class found at the end of the post, it becomes a lot simpler to create the dynamic
HTML required.

```csharp
// Razor View
using (Html.BeginTag("div", Model.AdvertClass, Model.AdvertDataAttributes))
{
    <img src="@Model.AdvertImageSrc" alt="@Model.AdvertImageAlt" />
}
```

```html
<!-- HTML output -->
<div class="advert-container" data-name="advert1">
    <img src="/path/to/image.jpg" alt="Advert Image" />
</div>
```

The benefit of this is that if the model variables *AdvertClass*
and *AdvertDataAttributes* were *null*, then the HTML output 
would not have any empty attributes, i.e.

```html
<!-- HTML output -->
<div>
    <img src="/path/to/image.jpg" alt="Advert Image" />
</div>
```

## Code

To achieve this, the following *HtmlHelper* extension method and 
supporting *MvcTag* class are required:

```csharp
// HtmlHelperExtensions.cs
public static class HtmlHelperExtensions
{
    public static IDisposable BeginTag<T>(this HtmlHelper<T> htmlHelper, string tag, string className = "", IDictionary<string, object> htmlAttributes = null)
    {
        return (htmlAttributes != null)
            ? new MvcTag(htmlHelper.ViewContext, tag, className, new RouteValueDictionary(htmlAttributes))
            : new MvcTag(htmlHelper.ViewContext, tag, className);
    }
}
```

```csharp
// MvcTag.cs
public class MvcTag : IDisposable
{
    private readonly TagBuilder _tagBuilder;
    private bool _disposed;
    private readonly FormContext _originalFormContext;
    private readonly ViewContext _viewContext;
    private readonly TextWriter _writer;
    
    public MvcTag(ViewContext viewContext, string tag, string className = "", RouteValueDictionary attributes = null)
    {
        if (viewContext == null)
        {
            throw new ArgumentNullException("viewContext");
        }
    
        _viewContext = viewContext;
        _writer = viewContext.Writer;
        _originalFormContext = viewContext.FormContext;
        viewContext.FormContext = new FormContext();
    
        _tagBuilder = new TagBuilder(tag);
        _tagBuilder.MergeAttributes(attributes);
        if (!string.IsNullOrEmpty(className))
        {
            _tagBuilder.AddCssClass(className);
        }
    
        Begin();
    }
    
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
    
    public void Begin()
    {
        _writer.WriteLine(new MvcHtmlString(_tagBuilder.ToString(TagRenderMode.StartTag)));
    }
    
    private void End()
    {
        _writer.WriteLine();
        _writer.WriteLine(new MvcHtmlString(_tagBuilder.ToString(TagRenderMode.EndTag)));
    }
    
    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            _disposed = true;
            End();
    
            if (_viewContext != null)
            {
                _viewContext.OutputClientValidation();
                _viewContext.FormContext = _originalFormContext;
            }
    
        }
    }
    
    public void EndForm()
    {
        Dispose(true);
    }
}
```