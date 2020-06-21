---
layout:     post
path:       /sitecore-8-1-device-detection
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

The release of Sitecore 8.1 includes new functionality for enabling device 
detection. This post explains how developers can extend or customise the out 
of the box implementation.

### Activating Device Detection
Sitecore has chosen [Netbiscuits](http://www.netbiscuits.com/device-detection/)
as the provider for identifying devices and describing the capabilities they have. The 
service requires a subscription through the *Sitecore App Center* which can be 
found in the *Launch Pad* of Sitecore 8. In the UK, the monthly subscription 
cost is £119.21 for unlimited detections per month and until this is activated, the device 
detection functionality described below is disabled.

You can find more information for [setting up device detection on the Sitecore documentation site](https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/set_up_device_detection).

### Using Device Detection

You can read about [using Device Detection](https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/using_device_detection) on the Sitecore documentation site which goes through all of the integration points that are offered out of the box. The following points 
describe how this default functionality can be extended.

#### Creating a Custom Provider

If you already have device detection on your site using a different provider then you may 
want to carry on using that provider. Sitecore documentation provides some useful developer information for 
[configuring device detection](https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/configure_sitecore_device_detection) and as with most Sitecore functionality, you can patch the default configuration to plug in your own provider. This means that you can get all of the above functionality but using a different implementation to the default Netbiscuits provider that ships with Sitecore 8.1. The configuration section which will need replacing is:

```xml
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
```

Using a custom include file to replace the default provider for your own implementation will
provide you full control of the device detection functionality within Sitecore 8.1, for example:

```xml
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
```

The Sitecore documentation for the [device detection API](https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/api_reference_for_the_device_detection_service), along with the following skeleton class should be enough to get going with your own implementation of a device information provider:

```csharp
public class CustomDeviceInformationProvider : Sitecore.CES.DeviceDetection.DeviceInformationProviderBase
{
    private readonly ReaderWriterLockSlim _readerWriterLockSlim = new ReaderWriterLockSlim();

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
        
        using (new ReadScope(_readerWriterLockSlim))
        {
            // TODO: Implement functionality to fill in DeviceInformation from  supplier
			
            var deviceInformation = CustomLogicToGetDeviceInformation();
            
            return deviceInformation;
        }
    }
}
```

Calling the base class's implementation of *GetDeviceInformation* ensures that
the result is cached within the Sitecore *DeviceItemsCache* and therefore only 
1 lookup is required per user agent (until the cache is cleared).

#### Sitecore Rules Engine Integration

One of the device detection integrations Sitecore provides is a set of rules for use with the Sitecore rules engine. The rules can be found under the item `/sitecore/system/Settings/Rules/Definitions/Elements/Device` and are described [on the Sitecore Documentation site](https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/rules_and_parameters_for_device_detection). There is also a guide on how to [create new custom rules](https://doc.sitecore.net/sitecore_experience_platform/developing/device_detection/create_custom_rules_for_sitecore_device_detection).

#### Sitecore Device Items & Device Detection

Another integration point for these rules are on the Sitecore device items found under
`/sitecore/layout/Devices/Default`. A new field, *Rule*, has been added so that Sitecore will switch the user to that device item if the given rule evaluates to true. For example, *Mobile* Sitecore device item could use the rule *`Device type is equal to Smartphone`* to activate it.

The rule configured on the Device Item is analysed within the *HttpRequestBegin*
pipeline step *Sitecore.Pipelines.HttpRequest.DeviceResolver*. This eventually calls
through into the method `Sitecore.Data.Items.DeviceItem.MatchesRule(HttpContext httpContext)` to analyse the set rule against the visitor's request device. This shouldn't need to be
customised, but if you find yourself needing to override the default *DeviceResolver*
then bear this functionality in mind.

#### xDB Integration

xDB also has an integration with Device Detection where reports can be generated showing a
breakdown of visitors by device type and then further filtered down to show a report by 
device model. You can see an [example report](https://doc.sitecore.net/~/media/446AB72ED1504A38B133E8EBD43D41A1.ashx?la=en) on the Sitecore documentation.
