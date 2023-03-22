---
layout:     post
path:       /empty-sitecore-recycle-bin-periodically
references: []
title:      "Empty Sitecore Recycle Bin Periodically"
subtitle:   "Removing Sitecore archive entries older than a specified date"
date:       2016-07-26 09:45:34
description: "Empty Sitecore Recycle Bin Periodically"
tags: [sitecore]
---
The recycle bin and archive within Sitecore are useful features
for content editors, the problem is that unless somebody proactively 
keeps removing items from them, then they will keep growing in size. 
For example, I once saw the archive tables reach 3GB.

Firstly, the following Sitecore setting must be set to *true* 
to ensure items are put in the recycle bin rather than being 
permanently deleted when a content editor deletes an item:

```xml
<setting name="RecycleBinActive" value="true"/>
```

To remove the need for somebody to keep going into the Sitecore 
client and cleaning up the recycle bin (or archive) manually, the following 
Sitecore Job will keep checking the entries on a set interval and 
remove any items older than the configured *DaysToKeep* setting. 
For example, you could configure the job to keep all items deleted in the past 
90 days but remove older items as they are unlikely to be needed:

```csharp
public class CleanupArchiveEntries
{
    private const int PageSize = 100;

    public int DaysToKeep { get; set; }
    public string ArchiveName { get; set; }
    public string DatabaseName { get; set; }

    public void Run()
    {
        Assert.IsNotNullOrEmpty(ArchiveName, "ArchiveName was not provided, please use recyclebin or archive");
        Assert.IsNotNullOrEmpty(DatabaseName, "DatabaseName was not provided");
        Assert.IsNotNull(DaysToKeep, "Days to keep was not provided");

        var archive = ArchiveManager.GetArchive(ArchiveName, Database.GetDatabase(DatabaseName));
        LogEntryCount(archive);
        var entriesToRemove = FindOldArchiveEntries(archive).ToArray();
        RemoveOldArchiveEntries(archive, entriesToRemove);
        LogEntryCount(archive);
    }

    private static ArchiveEntry[] GetArchivePageEntries(Archive archive, int page)
    {
        return archive.GetEntries(page, PageSize).ToArray();
    }

    private ArchiveEntry[] GetArchiveEntryItemsToRemove(ArchiveEntry[] archiveEntries)
    {
        return archiveEntries.Where(item => item.ArchiveDate < DateTime.Now.AddDays(DaysToKeep * -1)).ToArray();
    }

    private void LogEntryCount(Archive archive)
    {
        var archiveCount = archive.GetEntryCount();
        Log.Info(string.Format("Archive ({0}) contains {1} entries", archive.Name, archiveCount), this);
    }

    private void RemoveOldArchiveEntries(Archive archive, ArchiveEntry[] entriesToRemove)
    {
        Log.Info(string.Format("Removing {0} entries", entriesToRemove.Length), this);

        foreach (var itemToRemove in entriesToRemove)
        {
            Context.Job.Status.Processed++;
            archive.RemoveEntries(new ID(itemToRemove.ArchivalId));
        }
    }

    private IEnumerable<ArchiveEntry> FindOldArchiveEntries(Archive archive)
    {
        int page = 0;
        var itemsToRemove = new List<ArchiveEntry>();
        var archiveItems = GetArchivePageEntries(archive, page);

        while (archiveItems.Any())
        {
            var pageItemsToRemove = GetArchiveEntryItemsToRemove(archiveItems);
            if (pageItemsToRemove.Any())
            {
                itemsToRemove.AddRange(pageItemsToRemove);
            }

            page++;
            archiveItems = GetArchivePageEntries(archive, page);
        }

        return itemsToRemove;
    }
}
```

To add the job to your application, create a new include file with 
the following configuration:

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <scheduling>
        <agent type="Your.Namespace.CleanupArchiveEntries, Mamba.Presentation.Website" method="Run" interval="12:00:00">
            <DaysToKeep>365</DaysToKeep>
            <ArchiveName>recyclebin</ArchiveName><!-- recyclebin or archive -->
            <DatabaseName>master</DatabaseName>
        </agent>
    </scheduling>
  </sitecore>
</configuration>
```

You can configure the *DaysToKeep*, *ArchiveName* and *DatabaseName*
parameters to customise the job to run how you need it to be run. To run
against multiple databases or multiple archives, simply specify multiple
*agent* configuration nodes for each setup required.

When the job runs, it will log something similar to the following 
if *INFO* logging is enabled:

```tex
12:27:32 ManagedPoolThread #2 INFO  Job started: Your.Namespace.CleanupArchiveEntries
12:27:32 ManagedPoolThread #2 INFO  Archive (recyclebin) contains 218 entries
12:27:32 ManagedPoolThread #2 INFO  Removing 61 entries
12:27:36 ManagedPoolThread #2 INFO  Archive (recyclebin) contains 157 entries
12:27:36 ManagedPoolThread #2 INFO  Job ended: Your.Namespace.CleanupArchiveEntries (units processed: 61)
```