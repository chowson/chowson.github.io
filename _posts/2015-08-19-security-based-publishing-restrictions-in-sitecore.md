---
layout:     post
references: []
title:      "Security Based Publishing Restrictions in Sitecore"
subtitle:   "Providing publishing based on item security"
date:       2015-08-19 16:18:00
description: "Providing publishing based on item security"
tags: [sitecore]
---

<h4>Problem...</h4>

<p>In order to grant a user permissions to publish in Sitecore, they need to be part of the <em>Sitecore Client Publishing</em> role. Once
a user is a member of this role, the publishing buttons become visible to the user within the content editor ribbon as well as the main menu.
The consequence of this is that it grants the user permission to publish everything via a site publish and in larger applications
this can prevent other users from publishing for hours with no easy way to cancel the publish job.</p>

<p>Out of the box Sitecore provides a couple of options around this:
  <ol>
    <li>Remove read permissions to the 'Publish site' option for the role. To do this, edit the read permission
    on the core database item <em>/sitecore/content/Applications/Content Editor/Menues/Publish/Publish Site</em>.
      <ul>
        <li>Issue: A user could still initiate a publish from the /sitecore root item and include all sub-items, effectively performing
        a site publish.</li>
      </ul>
    </li>
    <li>Configure a publishing scheduled task to perform an periodic incremental publish picking up all new changes.
      <ul>
        <li>Issue: If workflow isn't enabled on all items you can end up with things published that are incomplete.</li>
      </ul>
    </li>
  </ol>
</p>

<h4>Solution...</h4>

<p>A potential solution around this is to hide the publishing buttons on items which the context user doesn't have permissions to
write to, therefore only allowing them to publish sections of the tree that they can author. For areas of the tree where
they only have read access, the publishing button will be hidden. To achieve this, you can follow these steps:</p>

<ol>
	<li>Create a new class that inherits the Sitecore default command and add logic to the <em>QueryState</em> method to check for write access, for example:
    {% highlight csharp %}
public class PublishItemCheckSecurity : PublishItem
{
    public override CommandState QueryState(CommandContext context)
    {
        var item = context.Items[0];

        var baseState = base.QueryState(context);

        return baseState == CommandState.Enabled && item != null && !item.Security.CanWrite(Context.User)
            ? CommandState.Hidden
            : baseState;
        }
    }
{% endhighlight %}
  </li>
  <li>Patch in the new command referenced in step 1 to replace the default Sitecore command:
  {% highlight xml %}
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <commands>
      <command name="item:publishnow">
        <patch:attribute name="type">Your.Namespace.PublishItemCheckSecurity, Your.Namespace</patch:attribute>
      </command>
    </commands>
  </sitecore>
</configuration>
{% endhighlight %}
  </li>
</ol>

<p>Once your solution recompiled, create a new user which is a member of the <em>Sitecore Client Publishing</em> role and then
viewing different content items should see the button appearing for items the user can write to and disappearing for items that they cannot.</p>
