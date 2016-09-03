---
layout:     post
references: []
title:      "Sitecore Item Paths in SQL Queries"
subtitle:   "Viewing and Querying by Item Path in Sitecore SQL Databases"
date:       2016-09-03 09:45:34
description: "Sitecore Item Paths in SQL Queries"
tags: [sitecore,debugging]
---
<p>Developing or debugging Sitecore applications can quite often lead 
to executing SQL queries to try and work out how something works or 
where the issue lies.</p>

<p>One piece of information that cannot be easily accessed in an 
SQL query is the hierarchy of items because the item path isn't saved 
as a field value within the database. Item hierarchy is instead stored 
by each row in the <em>Items</em> table storing the ID of its parent 
in the <em>ParentID</em> column.</p>

<p>Running the following SQL statement will create a 
view which is a copy of the <em>Items</em> table but with an additional 
column defining the item's full path:</p>

{% highlight SQL %}
CREATE VIEW [dbo].[ItemsPath]
AS
    WITH ItemsTable (ItemPath, ID, Name, TemplateID, MasterID, ParentID, Created, Updated)
    AS
    (
        SELECT CAST('/' + base.Name AS nvarchar(MAX)) as ItemPath,
            base.ID, base.Name, base.TemplateID, base.MasterID, base.ParentID, base.Created, base.Updated
			
        FROM Items as base
        WHERE base.ID = '11111111-1111-1111-1111-111111111111'	

        UNION ALL
	
        SELECT CAST(ItemPath + '/' + child.Name AS nvarchar(MAX)),
            child.ID, child.Name, child.TemplateID, child.MasterID, child.ParentID, child.Created, child.Updated
			
        FROM ItemsTable as parent 
        INNER JOIN Items as child 
            ON child.ParentID = parent.ID 
    )	
    SELECT ItemPath, ID, Name, TemplateID, MasterID, ParentID, Created, Updated
    FROM ItemsTable
GO
{% endhighlight %}

<p>Running the query below will return the following result:</p>

{% highlight SQL %}
SELECT * FROM ItemsPath
{% endhighlight %}

<img src="/assets/2016-08-03-sitecore-item-paths-in-sql-queries/ItemPaths.jpg	" />

<p>Once the view is created, queries can be run like the 
following:</p>

{% highlight SQL %}
--Returns all descendants of the /sitecore/template item

SELECT * 
FROM ItemsPath
WHERE ItemPath LIKE '/sitecore/templates%'

--Returns all rows in the WorkflowHistory table for all 
--descendants of the news item (/sitecore/content/Home/News)

SELECT	 WorkflowHistory.*
FROM WorkflowHistory
JOIN dbo.ItemsPath ON ItemsPath.ID = WorkflowHistory.ItemID
WHERE ItemPath LIKE '/sitecore/content/Home/News%'
{% endhighlight %}