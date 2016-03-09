---
layout:     post
references: ["https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/set_up_device_detection|Sitecore Documentation - Set up Device Detection",
"https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/rules_and_parameters_for_device_detection|Sitecore Documentation - Device Detection Rules",
"https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/configure_sitecore_device_detection|Sitecore Documentation - Configuring Device Detection",
"https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/create_custom_rules_for_sitecore_device_detection|Sitecore Documentation - Creating Custom Rules",
"https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/api_reference_for_the_device_detection_service|Sitecore Documentation - Device Detection API",
"https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/using_device_detection|Sitecore Documentation - Using Device Detection"]
title:      "Developers Guide to Sitecore 8.1 Device Detection"
subtitle:   "Introduction to Device detection in Sitecore 8.1 and how to extend it"
date:       2016-03-09 12:12:00
description: "Introduction to Device detection in Sitecore 8.1 and how to extend it"
tags: [sitecore]
---

<p>The release of Sitecore 8.1 includes new functionality for enabling device 
detection. This post explains how developers can extend or customise the out 
of the box implementation.</p>

<h3>Activating Device Detection</h3>
<p>Sitecore has chosen <a href="http://www.netbiscuits.com/device-detection/">Netbiscuits</a>
as the provider for identifying devices and describing the capabilities they have. The 
service requires a subscription through the <em>Sitecore App Center</em> which can be 
found in the <em>Launch Pad</em> of Sitecore 8. In the UK, the monthly subscription 
cost is £119.21 for unlimited detections per month and until this is activated, the device 
detection functionality described below is disabled.</p>

<p>You can find more information for <a href="https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/set_up_device_detection">
setting up device detection on the Sitecore documentation site</a>.</p>

<h3>Using Device Detection</h3>
<p>You can read about <a href="https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/using_device_detection">
using Device Detection</a> on the Sitecore documentation site which goes through 
all of the integration points that are offered out of the box. The following points 
describe how this default functionality can be extended.</p>

<h4>Creating a Custom Provider</h4>
<p>If you already have device detection on your site using a different provider then you may 
want to carry on using that provider. Sitecore documentation provides some useful developer information for 
<a href="https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/configure_sitecore_device_detection">
configuring device detection</a> and as with most Sitecore functionality, you can patch the default 
configuration to plug in your own provider. This means that you can get all of the above functionality
but using a different implementation to the default Netbiscuits provider that ships with Sitecore 8.1.
The configuration section which will need replacing is:</p>

{% highlight xml %}
<configuration>
  <sitecore>
    <deviceDetectionManager defaultProvider="netbiscuits" patch:source="Sitecore.CES.DeviceDetection.config">
      <providers>
        <clear/>
        <add name="netbiscuits" type="Sitecore.CES.DeviceDetection.Netbiscuits.DeviceInformationProviderNetbiscuits, Sitecore.CES.DeviceDetection"/>
      </providers>
    </deviceDetectionManager>
  </sitecore>
</configuration>
{% endhighlight %}

<p>Using a custom include file to replace the default provider for your own implementation will
provide you full control of the device detection functionality within Sitecore 8.1, for example:</p>

{% highlight xml %}
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <deviceDetectionManager defaultProvider="netbiscuits">
      <patch:attribute name="defaultProvider" value="newProviderName" />
      <providers>
        <add patch:instead="*[@name='netbiscuits']" name="newProviderName" type="YourNameSpace.CustomDeviceInformationProvider, YourAssembly" />
      </providers>
    </deviceDetectionManager>
  </sitecore>
</configuration>
{% endhighlight %}

<p>The Sitecore documentation for the <a href="https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/api_reference_for_the_device_detection_service">
device detection API</a>, along with the following skeleton class should be enough to get going with 
your own implementation of a device information provider:</p>

{% highlight csharp %}
public class CustomDeviceInformationProvider : Sitecore.CES.DeviceDetection.DeviceInformationProviderBase
{
    public override bool IsEnabled
    {
        get
        {
          // TODO:Implement method to determine if functionality is enabled
		
          return CustomLogicToDetermineIsEnabled();
        }
    }
	
    public override DeviceInformation GetDeviceInformation(string userAgent)
    {
        Assert.ArgumentNotNull(userAgent, "userAgent");
        return base.GetDeviceInformation(userAgent);
    }
    
    protected override DeviceInformation DoGetDeviceInformation(string userAgent)
    {
        Assert.ArgumentNotNull(userAgent, "userAgent");
        
        // TODO: Implement functionality to fill in DeviceInformation from  supplier
		
        var deviceInformation = CustomLogicToGetDeviceInformation();
		
        DeviceInformation deviceInformation = new DeviceInformation
        {
            Browser = deviceInformation.Browser,
            BrowserCanJavaScript = deviceInformation.BrowserCanJavaScript,
            BrowserHtml5AudioCanAudio = deviceInformation.BrowserHtml5AudioCanAudio,
            BrowserHtml5VideoCanVideo = deviceInformation.BrowserHtml5VideoCanVideo,
            CanTouchScreen = deviceInformation.CanTouchScreen,
            DeviceIsSmartphone = deviceInformation.DeviceIsSmartphone,
            DeviceModelName = deviceInformation.DeviceModelName,
            DeviceOperatingSystemModel = deviceInformation.DeviceOperatingSystemModel,
            DeviceOperatingSystemVendor = deviceInformation.DeviceOperatingSystemVendor,
            DeviceType = deviceInformation.DeviceType,
            DeviceVendor = deviceInformation.DeviceVendor,
            HardwareDisplayHeight = deviceInformation.HardwareDisplayHeight,
            HardwareDisplayWidth = deviceInformation.HardwareDisplayWidth
        };
        
        return deviceInformation;
    }
}
{% endhighlight %}

<h4>Sitecore Rules Engine Integration</h4>
<p>One of the device detection integrations Sitecore provides
is a set of rules for use with the Sitecore rules engine. The rules can be 
found under the item <em>/sitecore/system/Settings/Rules/Definitions/Elements/Device
</em> and are described <a href="https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/rules_and_parameters_for_device_detection">
on the Sitecore Documentation site</a>. There is also a guide on how to 
<a href="https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/create_custom_rules_for_sitecore_device_detection">
create new custom rules</a>.</p>

<h4>Sitecore Device Items & Device Detection</h4>
<p>Another integration point for these rules are on the Sitecore device items found under
<em>/sitecore/layout/Devices/Default</em>. A new field, <em>Rule</em>, has been
added so that Sitecore will switch the user to that device item if the given rule evaluates
to true. For example, a <em>Mobile</em> Sitecore device item could use the rule <em><q>Device
type is equal to Smartphone</q></em> to activate it.</p>

<p>The rule configured on the Device Item is analysed within the <em>HttpRequestBegin</em>
pipeline step <em>Sitecore.Pipelines.HttpRequest.DeviceResolver</em>. This eventually calls
through into the method <code>Sitecore.Data.Items.DeviceItem.MatchesRule(HttpContext httpContext)</code> 
to analyse the set rule against the visitor's request device. This shouldn't need to be
customised, but if you find yourself needing to override the default <em>DeviceResolver</em>
then bear this functionality in mind.</p>

<h4>xDB Integration</h4>
<p>xDB also has an integration with Device Detection where reports can be generated showing a
breakdown of visitors by device type and then further filtered down to show a report by 
device model. You can see an <a href="https://doc.sitecore.net/~/media/446AB72ED1504A38B133E8EBD43D41A1.ashx?la=en">
example report on the Sitecore documentation.</p>