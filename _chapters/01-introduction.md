---
title: "Introduction"
---

# 1. Introduction
Effortless Admin ("EA") is committed to ensuring the confidentiality, privacy, integrity, and availability of all electronic protected health information (ePHI) it receives, maintains, processes and/or transmits on behalf of its Customers. As providers of compliant, hosted infrastructure used by employers and Third Party Administrators (TPAs), EA strives to maintain compliance, proactively address information security, mitigate risk for its Customers, and ensure known breaches are completely and effectively communicated in a timely manner. The following addresses core policies used by EA to maintain compliance and assure the proper protections of infrastructure used to store, process, and transmit ePHI for EA Customers.

## 1.1 Software as a Service (SaaS)
SaaS Customers utilize hosted software and infrastructure from EA to run their TPA business. These customers are deployed into compliant containers run on systems secured and managed by EA. EA does not have insight or access into application level data of SaaS Customers and, as such, does not have the ability to secure or manage risk associated with application level vulnerabilities and security weaknesses. EA makes every effort to reduce the risk of unauthorized disclosure, access, and/or breach of SaaS Customer data through network (firewalls, dedicated IP spaces, etc) and server settings (encryption at rest and in transit, OSSEC throughout the Platform, etc).

## ​1.2​ Compliance
EA signs agreements with its Customers. These agreements outline EA obligations and Customer obligations, as well as liability in the case of a breach. In providing infrastructure and managing security configurations that are a part of the technology requirements that exist in PIPEDA as well as future compliance frameworks, EA manages various aspects of compliance for Customers. The aspects of compliance that EA manages for Customers are inherited by Customers, and EA assumes the risk associated with those aspects of compliance. In doing so, EA helps Customers achieve and maintain compliance, as well as mitigates Customer’s risk.

## 1.3 EA Organizational Concepts {#org}
The physical infrastructure environment is hosted at Peer1. The network components and supporting network infrastructure are contained within the Peer1 infrastructures and managed by Peer1. EA does not have physical access into the network components. The EA environment consists of firewalls, web servers and Microsoft SQL database servers.

Within the EA Platform on Peer1, all data transmission is encrypted and all hard drives are encrypted so data at rest is also encrypted; this applies to all servers,  databases, APIs, log servers, etc. EA assumes all data may contain ePHI, even though our Risk Assessment does not indicate this is the case, and provides appropriate protections based on that assumption.

In the case of SaaS Customers, it is the responsibility of the Customer to restrict, secure, and assure the privacy of all ePHI data at the Application Level, as this is not under the control or purview of EA.

EA has implemented strict logical access controls so that only authorized personnel are given access to the internal management servers. The environment is configured so that data is transmitted from the load balancers to the application servers over a TLS encrypted session.

The web servers are externally facing and accessible via the Internet on predefined ports. The database servers, where the ePHI resides, are located on an internal network and can only be accessed through a VPN connection. Access to the internal database is restricted to a limited number of personnel and strictly controlled to only those personnel with a business-justified reason.

All Platform features and operating systems are tested end-to-end for usability, security, and impact prior to deployment to production.

## ​1.4​ Requesting Audit and Compliance Reports
EA, at its sole discretion, shares audit reports with customers on a case by case basis. All audit reports are shared under explicit NDA in EA format between EA and party to receive materials. Audit reports can be requested by EA workforce members for Customers or directly by EA Customers.

The following process is used to request audit reports:
1. Email is sent to {{site.compliance_reports_email}}. In the email, please specify the type of report being requested and any required timelines for the report.
1. EA staff will log an Issue with the details of the request into the EA Compliance Review Activities Project on Asana. Asana is used to track requests status and outcomes.
1. EA will confirm if a current NDA is in place with the party requesting the audit report. If there is no NDA in place, EA will send one for execution.
1. Once it has been confirmed that an NDA is executed, EA staff will move the Asana Issue to "Under Review".
1. The EA Security Officer or Privacy Officer must Approve or Reject the Issue. If the Issue is rejected, EA will notify the requesting party that we cannot share the requested report.
1. If the Issue has been Approved, EA will send the customer the requested audit report and complete the Asana Issue for the request.

## ​1.5​ Version Control
Refer to the GitHub repository [({{site.git_url}})]({{site.git_url}}) for the full version history of these policies.