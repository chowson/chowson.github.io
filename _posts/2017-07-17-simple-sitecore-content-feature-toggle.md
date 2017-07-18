---
layout:     post
references: []
title:      "Managing Sitecore Content with Continuous Delivery"
subtitle:   "Simple Sitecore Content Feature Toggle"
date:       2017-07-18 08:45:34
description: "Simple Sitecore Content Feature Toggle for Continuous Delivery"
tags: [sitecore]
---

<p>The standard way in Sitecore to prevent content being seen by users before
it's ready is to use publishing restrictions. Marking the content as unpublishable 
ensures any publishes don't push the content to the web database.</p>

<img src="/assets/2017-07-17-simple-sitecore-content-feature-toggle/item-publishing-restrictions.jpg" />

<p>Whilst developing a new area of the site, continuous delivery will deploy partially
completed pages. To ensure the new content is hidden from users, it is marked 
as  unpublishable. The problem with this is the new content needs to be visible on test environments 
and each deployment to the test environment resets the item to unpublishable.</p>

<p>Having to mark the items as publishable and publish them on the test environments breaks 
the continuous delivery deployment pipeline because it introduces a manual step. Continuous 
delivery aims to have a fully automated process that you can deploy and release any version 
of the software to any environment.</p>

<p>The following solution allows new content to be deployed to both master and web
databases with continuous delivery but prevents public users from seeing it.</p>

<p>To achieve this, a <em>Controller Rendering</em> is added to a new page and returns 
404 response unless some particular criteria is matched. The example provided checks for
the existence of a known querystring:</p>

{% highlight csharp %}
public class SitecoreContentFeatureToggleController : Controller
{
    private const string ToggleOverrideQueryStringKey = "SomethingNotEasyToGuess";
	
    public ActionResult Index()
    {
        if (ToggleOverridePresent())
        {
            return new EmptyResult();
        }

        return HttpNotFound();
    }

    private bool ToggleOverridePresent()
    {
        string enableToggleOverride = Request.QueryString[ToggleOverrideQueryStringKey];

        return !string.IsNullOrEmpty(enableToggleOverride) && enableToggleOverride.Equals("true");
    }
}
{% endhighlight %}

<p>Other simple checks could be implemented instead of checking the querystring:</p>
<ul>
    <li>Existence of a particular request header</li>
	<li>Existence of a particular cookie (with particular value)</li>
	<li>Request IP address whitelist</li>
</ul>

<p>When making the <em>Controller Rendering</em>, it is important to ensure the rendering's caching 
fields are all unchecked. If it is marked as cacheable then the check is only applied to the first
visitor rather than to each request.</p>

<p>As the title suggests, this is a simple feature toggle and does not prevent 
other parts of the site from linking to the new content. For example, using this 
for news articles would not prevent the new article being picked up on the news 
landing page.</p>

<p>To use this approach, simply create the controller rendering and add it to the 
content item instead of marking the item as unpublishable.</p>

<h3>Benefits of Approach</h3>
<ul>
	<li>The deployment process for each environment is the same.</li>
    <li>The test team don't need to make the new content items publishable and then publish them
	on each deployment to the test environment.</li>
	<li>Each deployment to the UAT environment won't require the unpublishable flag removing and
	the content being published.</li>
	<li>If the client wants to see the new features on the live site, then they can.</li>
	<li>Public users receive a 404 response when they hit the URL.</li>
</ul>

<h3>When to use this?</h3>

<ul>
    <li>When the new content is isolated
	    <ul>
		    <li>e.g. Developing a new homepage - publishing the item to a URL with the
			feature toggle rendering will allow authorised people to see the new page on 
			the without the public being able to see it.</li>
		</ul>
	</li>
</ul>

<h3>When not to use it?</h3>
<ul>
    <li>Any new page which other pages have been set up to link to.</li>
</ul>

