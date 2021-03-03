---
layout:     post
path:		/sitecore-7-2-150408-clones-performance-issue
references: ["https://kb.sitecore.net/articles/853187|How to use public reference numbers",
			"https://sdn.sitecore.net/upload/sitecore7/72/content_author's_cookbook_sc72-a4.pdf|Sitecore Content Author's Cookbook"]
title:      "Sitecore 7.2 rev.150408 Clones Performance Issue"
subtitle:   "Performance issue after upgrading to Sitecore 7.2 rev.150408"
date:       2015-10-01 08:48:00
description: "Performance issue after upgrading to Sitecore 7.2 rev.150408"
tags: [sitecore,debugging]
---

Recently after upgrading a project from Sitecore 7.2 rev.140314 (Update 1), the application
start up time increased from about 30 seconds to load the first page to over 3 minutes. The only
change that was made was following the upgrade steps as described on the SDN.

After some help diagnosing from Sitecore support, they suggested adding a hidden setting
to our configuration to see if it resolved the issue. This was the suggested setting to add:

```xml
<setting name="ItemCloning.Enabled" value="false" />
```

The impact of adding this setting is as expected, it disables the cloning functionality
(you can read about Sitecore's cloning functionality in Section 4.6 of the
[Content Author's Cookbook](https://sdn.sitecore.net/upload/sitecore7/72/content_author's_cookbook_sc72-a4.pdf)). The other impact found was that the site start up time had returned to its previous speed and resolved the issue.

The issue has been raised as a bug with the software and can be tracked using the reference
number 436659 (for information on reference numbers you can read the [KB article](https://kb.sitecore.net/articles/853187).

## Update 29/10/2015
The [release notes of Sitecore 7.2 Update-5](https://sdn.sitecore.net/products/sitecore%20v5/sitecore%20cms%207/releasenotes/changelog/release%20history%20sc72.aspx) indicate that this issue has been resolved.


> The performance of the get item operation for both regular and clone items has been increased by introducing a separate shared field called ‘__Source Item’. This now allows you to keep a reference to original item. (436659)
