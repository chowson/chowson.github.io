---
layout:     post
references: []
title:      "7 tips to get started with Sitecore Commerce 9"
subtitle:   "You've installed Sitecore Commerce 9, here's what you need to know next"
date:       2018-03-29 15:12:34
description: "7 tips to get started with Sitecore Commerce 9"
tags: [sitecore]
---
<style>
ol li { font-weight: bold;}
ol li p,
ol li pre,
ol li span,
ol li ol li {
	font-weight: normal;
	margin-top:0px;
}
</style>

<p>Here are some tips to help you get started after installing Sitecore Experience Commerce 9 Update-1:</p>

<ol>
	<li>
		<strong>Commerce Business Tools</strong>
		<p>There's a new icon added to your launchpad which is how to navigate into the backend commerce system.
		<img src="/assets/2018-03-29-7-tips-to-get-started-with-sitecore-commerce-9/business-tools.png" alt="Business Tools icon on the Launchpad" /></p>
	</li>	
	<li>
		<strong>Commerce Business Tools runs off localhost</strong>
		<p>The install script (Deploy-Sitecore-Commerce.ps1) provided by Sitecore installs the
		Business tools to run off https://localhost:4000/. There's no top-level parameter to
		change this. Instead, it is set in each application's SIF config file. It would be nice
		to see this added in future updates to Commerce to make configuring a public URL easier.</p>
		<p>To make Commerce Business Tools work on your public accessible host you'll need to:
			<ol>
				<li>Dig through the JSON configuration files of the various applications Commerce installed.</li>
				<li>Update the <em>Link</em> field of the core database item
					<pre>/sitecore/client/Applications/Launchpad/PageSettings/Buttons/Commerce/BusinessTools</pre>
				</li>
			</ol>
		</p>
	</li>
	<li>
		<strong>New Commerce Chunk</strong>
		<p>The ribbon in the Content Editor has a new Commerce chunk, this is very useful to know about (see below).
		<img src="/assets/2018-03-29-7-tips-to-get-started-with-sitecore-commerce-9/commerce-toolbar.JPG" alt="New commerce chunk in the content editor ribbon" /></p>
	</li>
	<li>
		<strong>Getting new categories / products to show in the content editor</strong>
		<p>The section of the tree <em>/sitecore/Commerce/Catalog Management</em> dynamically creates items mimicking the 
		structure of your catalog. This allows them to be used as datasources. Before new categories and products appear, 
		you need to clear the commerce cache.</p>
		<p>To do this, click the <em>Refresh Commerce Cache</em> button within the new <em>Commerce</em> chunk. Then refresh the tree 
		and the new items will appear.</p>
	</li>
	<li>
		<strong>Adding a new Catalog</strong>
		<p>New catalogs won't show in the <em>Catalog Management</em> section of the content editor by default. To configure which
		catalogs appear, edit the <em>Selected Catalogs</em> field on the item <em>/sitecore/Commerce/Catalog Management/Catalogs</em>.
		<img src="/assets/2018-03-29-7-tips-to-get-started-with-sitecore-commerce-9/new-catalog-config.JPG" alt="Configuring which catalogs to show in the content editor" /></p>
	</li>
	<li>
		<strong>Searching for Product Images</strong>
		<p>When adding images to a product in Business Tools, the UI searches for an image in the media library. 
		If you don't know the exact name or how it is nested within sub-folders, you can use a wildcard (*) to help find the image.</p>
		<p>For example, <em>*image1*</em> will match <em>/folder/image1_01</em>. This is very useful as you don't need 
		to remember the full path of the image to find it.</p>
	</li>
	<li>
		<strong>Control Enforce HTTPS for your Store</strong>
		<p>By default, SSL is enabled on your store. To configure it, update <em>Enforce SSL</em> on the store configuration item:</p>
		<pre>/sitecore/Commerce/Commerce Control Panel/Storefront Settings/Storefronts/YOURSTOREFRONT/Storefront Configuration</pre>
		<span><em>Note: Replace YOURSTOREFRONT with your store name.</em></span>
	</li>
</ol>
<br />
<h3>Future feature requests</h3>

<p>From my brief time with Sitecore Experience Commerce 9, it would be nice to see the following features added
to make life a bit easier:</p>
<ol>
	<li><strong>More configuration parameters in the PowerShell script</strong>
	<p>For example, the URL of commerce business tools and the install directory currently need copy/pasting
	through various SIF config files. Making things more configurable at the top level PowerShell script 
	removes duplication.</p></li>
	<li><strong>More interactive image search</strong><p>Searching for images by name isn't very friendly 
	to people managing the catalog. Having a more interactive search with a tree view of the media folder
	with previews of the images would help a lot.</p></li>
	<li><strong>Category Product Search</strong><p>There's currently a search at the top level of the 
	merchandising area. It would be good to have this persisted at category level.</p></li>
</ol>