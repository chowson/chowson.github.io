---
layout:     post
references: []
title:      "Dynamic HTML Tags in MVC Razor"
subtitle:   "Output clean HTML markup for data driven dynamic HTML"
date:       2016-06-01 09:12:00
description: "Html.BeginForm for any HTML Tag"
tags: [mvc]
---
<p>The HTML helper method <em>Html.BeginForm</em> is a useful 
way to dynamically create <em>&lt;form&gt;</em> tags. It 
would be useful to be able to do this for other HTML tags so that  
the HTML output is dynamically generated keeping your markup clean.</p>

<h4>Example</h4>

<p>In the following example, <em>_dataProvider.GetAdvertDataAttributes()</em>
returns an <em>IDictionary&lt;string, object&gt;</em> and defines any 
additional data attributes required on the component:</p>

{% highlight csharp %}
//Controller

var model = new AdvertModel();
model.AdvertImageSrc = "/path/to/image.jpg";
model.AdvertImageAlt = "Advert Image"
model.AdvertClass = _dataProvider.GetAdvertClass();
model.AdvertDataAttributes = _dataProvider.GetAdvertDataAttributes();
{% endhighlight %}

<p>Usually <em>AdvertDataAttributes</em> would require expanding into a string to output in 
the Razor view, for example:</p>

{% highlight html %}
<!-- Razor View -->
<div class="@Model.AdvertClass"@Model.AdvertDataAttributesString>
    <img src="@Model.AdvertImageSrc" alt="@Model.AdvertImageAlt" />
</div>
{% endhighlight %}

<p>This requires code to convert the dictionary into a string 
ensuring that the attributes are encoded properly using 
<em>HttpUtility.HtmlAttributeEncode</em>. Also, it could lead to 
<em>class=""</em> being output to the page.</p>

<h4>Solution</h4>

<p>Using the extension method for <em>System.Web.Mvc.HtmlHelper</em>
and supporting <em>MvcTag</em> class found at the end of the post, it 
becomes a lot simpler to create the dynamic HTML required.</p>

{% highlight csharp %}
//Razor View

using (Html.BeginTag("div", Model.AdvertClass, Model.AdvertDataAttributes))
{
    <img src="@Model.AdvertImageSrc" alt="@Model.AdvertImageAlt" />
}
{% endhighlight %}

{% highlight html %}
<!-- HTML output -->
<div class="advert-container" data-name="advert1">
    <img src="/path/to/image.jpg" alt="Advert Image" />
</div>
{% endhighlight %}

The benefit of this is that if the model variables <em>AdvertClass</em> 
and <em>AdvertDataAttributes</em> were <em>null</em>, then the HTML output 
would not have any empty attributes, i.e.

{% highlight html %}
<!-- HTML output -->
<div>
    <img src="/path/to/image.jpg" alt="Advert Image" />
</div>
{% endhighlight %}

<h4>Code</h4>

To achieve this, the following <em>HtmlHelper</em> extension method and 
supporting <em>MvcTag</em> class are required:

{% highlight csharp %}
//HtmlHelperExtensions.cs

public static class HtmlHelperExtensions
{
    public static IDisposable BeginTag<T>(this HtmlHelper<T> htmlHelper, string tag, string className = "", IDictionary<string, object> htmlAttributes = null)
    {
        return (htmlAttributes != null)
            ? new MvcTag(htmlHelper.ViewContext, tag, className, new RouteValueDictionary(htmlAttributes))
            : new MvcTag(htmlHelper.ViewContext, tag, className);
    }
}
{% endhighlight %}

{% highlight csharp %}
//MvcTag.cs

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
{% endhighlight %}