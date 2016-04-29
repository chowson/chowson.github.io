---
layout:     post
references: []
title:      "Sitecore Experience Analytics Cache Tuning"
subtitle:   "Experience Analytics Cache Settings"
date:       2016-04-29 16:12:00
description: ""
tags: [sitecore]
---

<p>Sitecore 8 and xDB sees the introduction of the Experience 
Analytics dashboard. To increase the performance of the dashboard,
there are a number of cache settings that can be configured 
within the configuration include file <em>App_Config\Include\ExperienceAnalytics\Sitecore.ExperienceAnalytics.WebAPI.config</em>.</p>

<h3>Categories of Data</h3>
<p>To generate the graphs shown within the dashboard, Experience 
Analytics calls a WebAPI endpoint with a number of parameters.
The value of the <em>dateTo</em> parameter categorises the data 
into the following categories:</p>

<ul>
	<li><strong>Safe</strong> - <em>dateTo</em> parameter is greater than 72 hours ago</li>
	<li><strong>Risky</strong> - <em>dateTo</em> parameter is greater than  3 hours ago but not <em>safe</em>.</li>
	<li><strong>Live</strong> - <em>dateTo</em> parameter is within the last 3 hours</li>
</ul>

<h3>Server Side Cache Settings</h3>
<p>Depending on the category of the request, the cache 
expiration interval is retrieved from the following configuration
settings:</p>

<ul>
	<li><strong>Safe</strong> - ExperienceAnalytics.Api.ServerSideSafeRequestCacheExpiration</li>
	<li><strong>Risky</strong> - ExperienceAnalytics.Api.ServerSideRiskyRequestCacheExpiration</li>
	<li><strong>Live</strong> - ExperienceAnalytics.Api.CacheExpiration</li>
</ul>

<h3>Client Side Caching</h3>
<p>Additionally, Experience Analytics uses client side caching 
which can be configured using the following settings:</p>

<ul>
	<li><strong>Safe</strong> - ExperienceAnalytics.Api.ClientSideSafeRequestCacheExpiration</li>
	<li><strong>Risky</strong> - ExperienceAnalytics.Api.ClientSideRiskyRequestCacheExpiration</li>
	<li><strong>Live</strong> - ExperienceAnalytics.Api.CacheExpiration</li>
</ul>

<h3>Internal Cache</h3>
<p>The last setting that can be configured is <em>ExperienceAnalytics.InternalCacheExpiration</em>. 
This configures the internal Analytics definitions cache (e.g. 
segments, dimensions and sites).</p>

<p>If any of the settings above are set to <em>0</em>, then the default values will be used
rather than setting the cache expiry to <em>0</em>.</p>

