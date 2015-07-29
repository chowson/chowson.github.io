---
layout:     post
title:      "Find Sitecore users with profile setting"
subtitle:   "SQL to find users with profile setting, e.g. IsAdministrator, FullName"
date:       2015-07-28 19:14:00
description: "Find Sitecore users with profile setting"
---

<p>Through the role manager, you can easily find which users are in a particular role but you can't easily
get a list of users which are an administrator. This is because the administrator setting is stored as a
profile value on the user. To generate a list of administrators run the following script against your
<em>core</em> database.</p>

<p>You can also modify the script to find users with the existence of any profile key and optionally users which
have a profile key that matches a particular  value. To do this you will need to modify the <em>@propertyKey</em>
and <em>@expectedValue</em> variables at the top of the script. Leaving <em>@expectedValue</em> as an empty string
will return users which have the existence of a profile key rather than trying to match it to a value.</p>

{% highlight sql %}
DECLARE @propertyKey AS nvarchar(50), @expectedValue AS nvarchar(255)

--SET PROPERTY KEY AND EXPECTED VALUE HERE
SET @propertyKey = 'IsAdministrator'
SET @expectedValue = 'True'


DECLARE @userId AS uniqueidentifier
DECLARE @username AS nvarchar(255)

DECLARE userCursor CURSOR 
  LOCAL STATIC READ_ONLY FORWARD_ONLY
FOR 
SELECT DISTINCT UserId FROM aspnet_Profile WHERE PropertyNames LIKE '%' + @propertyKey + '%'

OPEN userCursor
FETCH NEXT FROM userCursor INTO @userId
WHILE @@FETCH_STATUS = 0
BEGIN
    -- Get property value start/end indexes from PropertyNames
    DECLARE @propertyNames AS NVARCHAR(max)
    SET @propertyNames = (SELECT PropertyNames FROM aspnet_Profile WHERE UserId = @userId)
    SET @username = (SELECT UserName FROM aspnet_Users WHERE UserId = @userId)
    DECLARE @startIndex AS int, @endIndex as int
    SET @startIndex = (CHARINDEX(@propertyKey + ':S:', @propertyNames)) + LEN(@propertyKey + ':S:')
    
    DECLARE @pos AS int, @count AS int
    SET @count = 0
    SET @pos = @startIndex
    
    WHILE(@count != 2 AND SUBSTRING(@propertyNames, @pos, 1) != '')
		BEGIN
		IF SUBSTRING(@propertyNames, @pos, 1) = ':'
			SET @count = @count + 1
		SET @pos = @pos + 1
		END
    
    SET @propertyNames = (SUBSTRING(@propertyNames, @startIndex, (@pos - @startIndex - 1)))
    SET @startIndex = (SUBSTRING(@propertyNames, 1, (CHARINDEX(':', @propertyNames) -1)))
    SET @endIndex = (SUBSTRING(@propertyNames, (CHARINDEX(':', @propertyNames)  + 1), (LEN(@propertyNames) - CHARINDEX(':', @propertyNames))))
    
    -- Verify PropertyValue for IsAdministrator profile key is 'True'
    DECLARE @propertyStrings AS nvarchar(MAX)
    SET @propertyStrings = (SELECT PropertyValuesString FROM aspnet_Profile WHERE UserId = @userId)
	
	IF @expectedValue = ''
		BEGIN
			print @username + ', ' + (SUBSTRING(@propertyStrings, @startIndex + 1, @endIndex))
		END
	ELSE
		BEGIN
			IF SUBSTRING(@propertyStrings, @startIndex, @endIndex + 1) = @expectedValue
				BEGIN
				print @username   
			END
		END
		
    FETCH NEXT FROM userCursor INTO @userId
END
CLOSE userCursor
DEALLOCATE userCursor
{% endhighlight %}