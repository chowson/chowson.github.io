---
layout:     post
path:       /sitecore-experience-analytics-cache-tuning
references: []
title:      "Sitecore Experience Analytics Cache Tuning"
subtitle:   "Experience Analytics Cache Settings"
date:       2016-04-29 16:12:00
description: "Increase the performance of the Experience Analytics Dashboard in Sitecore 8 and xDB"
tags: [sitecore]
---

Sitecore 8 and xDB sees the introduction of the Experience 
Analytics dashboard. To increase the performance of the dashboard,
there are a number of cache settings that can be configured 
within the configuration include file `App_Config\Include\ExperienceAnalytics\Sitecore.ExperienceAnalytics.WebAPI.config`.

## Categories of Data

To generate the graphs shown within the dashboard, Experience 
Analytics calls a WebAPI endpoint with a number of parameters.
The value of the *dateTo* parameter categorises the data 
into the following categories:

* **Safe** - *dateTo* parameter is greater than 72 hours ago
* **Risky** - *dateTo* parameter is greater than  3 hours ago but not *safe*.
* **Live** - *dateTo* parameter is within the last 3 hours

## Server Side Cache Settings

Depending on the category of the request, the cache 
expiration interval is retrieved from the following configuration
settings:

* **Safe** - ExperienceAnalytics.Api.ServerSideSafeRequestCacheExpiration
* **Risky** - ExperienceAnalytics.Api.ServerSideRiskyRequestCacheExpiration
* **Live** - ExperienceAnalytics.Api.CacheExpiration

## Client Side Caching

Additionally, Experience Analytics uses client side caching 
which can be configured using the following settings:

* **Safe** - ExperienceAnalytics.Api.ClientSideSafeRequestCacheExpiration
* **Risky** - ExperienceAnalytics.Api.ClientSideRiskyRequestCacheExpiration
* **Live** - ExperienceAnalytics.Api.CacheExpiration

## Internal Cache

The last setting that can be configured is *ExperienceAnalytics.InternalCacheExpiration*. 
This configures the internal Analytics definitions cache (e.g. segments, dimensions and sites).

If any of the settings above are set to *0*, then the default values will be used
rather than setting the cache expiry to *0*.

