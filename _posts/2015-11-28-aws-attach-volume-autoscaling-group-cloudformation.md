---
layout:     post
references: ["http://docs.aws.amazon.com/AutoScaling/latest/DeveloperGuide/GettingStartedTutorial.html|Auto Scaling Documentation", "http://docs.aws.amazon.com/AutoScaling/latest/DeveloperGuide/WorkingWithLaunchConfig.html|Creating Launch Configuration", "http://docs.aws.amazon.com/AutoScaling/latest/DeveloperGuide/schedule_time.html|Scheduled Scaling"]
title:      "Attach Volume to EC2 instance in Auto Scaling Group"
subtitle:   "Attaching a volume to an EC2 instance in an Auto Scaling Group using Powershell and CloudFormation"
date:       2015-11-28 22:12:00
description: "Attaching a volume to an EC2 instance in an Auto Scaling Group using Powershell and CloudFormation"
tags: [aws]
---
<p>During the process of creating an <em>AWS Auto Scaling group</em>, you will need to create
a <em>Launch Configuration</em> to describe how EC2 instances will be created. When configuring
the storage options, new volumes can be added and can be optionally be based off a snapshot.
However, there is no option to attach an existing volume.</p>

<p>The reason behind this is a volume can only be attached to a single EC2 instance and
an <em>Auto Scaling Group</em> is likely to have multiple instances created from 
the same <em>Launch Configuration</em>. However, in the scenario where a group is being scaled 
between 0 and 1 instance, there is no reason why you can't add a volume to the instance when 
you scale up to 1 instance. I had this scenario with a dev server which was scaled to 0
instances at night and back to 1 instance during working hours.</p>

<p>To get a volume to attach to an EC2 instance when it is created, add the following 
Powershell to the <em>UserData</em> property of the <em>Launch Configuration</em>. This ensures
each time an instance is created, the volume will be available in the same state as the previous
day.</p>

{% highlight xml %}
<powershell>
$instanceId = Invoke-RestMethod -Uri http://169.254.169.254/latest/meta-data/instance-id 
Add-EC2Volume -instanceId $instanceId -VolumeId vol-xxxxxxxx -Device xvdb -Region eu-west-1
Get-Disk | %{ Set-Disk -Number $_.Number -IsOffline $False }
</powershell>
{% endhighlight %}

<p>If you are using <em>CloudFormation</em>, this would be added to the template as follows:</p>
{% highlight json %}
{
  "AWSTemplateFormatVersion": "2010-09-09",
  ...
  "Resources": {
    ...
    "LaunchConfig": {
      "Type": "AWS::AutoScaling::LaunchConfiguration",
      "Properties": {
        ...
    	"UserData": {
          "Fn::Base64": {
            "Fn::Join": [
              "",
              [
                "<powershell>\n",
                "$instanceId = Invoke-RestMethod -Uri http://169.254.169.254/latest/meta-data/instance-id \n",
                "Add-EC2Volume -instanceId $instanceId -VolumeId vol-xxxxxxxx -Device xvdb -Region eu-west-1\n",
                "Get-Disk | %{ Set-Disk -Number $_.Number -IsOffline $False }\n",
                "</powershell>\n"
              ]
            ]
          }
        }
      }
    }
    ...
  }
  ...
{% endhighlight %}
