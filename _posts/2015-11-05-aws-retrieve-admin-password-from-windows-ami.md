---
layout:     post
references: ["http://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/troubleshooting-windows-instances.html#password-not-available|Troubleshooting Windows Instance Passwords",
			"http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html|AWS Documentation on AMIs",
			"http://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/UsingConfig_WinAMI.html|Configuring a Windows Instance Using the EC2Config Service"]
title:      "AWS: EC2 Password Retrieval of Windows AMI instance"
subtitle:   "Enabling administrator password retrieval of an EC2 instance created from a custom Windows AMI"
date:       2015-11-05 18:48:00
description: "Enabling administrator password retrieval of an EC2 instance created from a custom Windows AMI"
tags: [aws]
---

<p>When working with AWS EC2, it's always good practice to create an AMI of your instance whether it is for DR purposes
or for a reference point to spin up new instances using CloudFormation. By default, when you launch an instance from
your custom Windows AMI, you will see the following message when trying to retrieve the administrator password in the AWS console:</p>

<blockquote>
Password is not available.<br /><br />
The instance was launched from a custom AMI, or the default password has changed. A password cannot be retrieved for this instance.
If you have forgotten your password, you can reset it using the Amazon EC2 configuration service. For more information,
see <a target="_blank" href="https://docs.aws.amazon.com/console/ec2/instances/connect/windows-password">Passwords for a Windows Server instance</a>.
</blockquote>

<p>If you no longer have the administrator password for the instance from the original instance, then you have to follow this 
<a target="_blank" href="http://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/ec2-windows-passwords.html#ResettingAdminPassword">long process</a>.</p>

<p>To avoid having to run through this process, you can create your AMI so that it generates a new random password each time an instance is created
and also enable the password to be retrieved from the EC2 console. To do this, configure the EC2Config service as follows:</p>

<ol>
	<li>Remote desktop to your Windows instance and open the EC2Config Service.</li>
	<li>Click the <em>Image</em> tab and then under <em>Administrator Password</em> click <em>Random</em>.</li>
	<li>Click <em>Shutdown with Sysprep</em> and wait for the instance to become <em>Stopped</em>.</li>
	<li>Once the instance is stopped, create your AMI as normal.</li>
</ol>

<div class="centre">
	<img src="/assets/2015-11-05-aws-retrieve-admin-password-from-windows-ami/EC2ConfigService-RandomPassword.png" alt="Configuring EC2Config service for random generated passwords" />
</div>

<p>The next time you create an EC2 instance from this AMI, you will be able to retrieve the Administrator password from the console
as normal rather than getting the error message above.</p>