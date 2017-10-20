---
title: "Data Integrity"
---

# 16 Data Integrity Policy
EA takes data integrity very seriously. As stewards and partners of EA Customers, we strive to assure data is protected from unauthorized access and that it is available when needed. The following policies drive many of our procedures and technical settings in support of the EA mission of data protection.

Production systems that create, receive, store, or transmit Customer data (hereafter "Production Systems") must follow the guidelines described in this section.

## ​16.1​ Disabling Non-Essential Services
All Production Systems must disable services that are not required to achieve the business purpose or function of the system.
​
## 16.2​ Monitoring Login Attempts
All access to Production Systems must be logged. This is done following the EA [Auditing Policy]({{ site.baseurl }}/chapters/07-auditing).

## 16.3​ Prevention of Malware on Production Systems
1. All Production Systems must have McAfee AntiVirus (or equivalent or better virus scanning engine) running, and set to scan on-access, plus a full scan every 2 hours and at reboot to assure not malware is present. Detected malware is evaluated and removed.
1. Virus scanning software is run on all Production Systems for antivirus protection.
    * Hosts are scanned daily for malicious binaries in critical system paths.
    * The malware signature database is checked daily and automatically updated if new signatures are available.
    * Logs of virus scans are maintained according to the requirements outlined in [16.5](#intrusion_detection).
1. All Production Systems are to only be used for EA business needs.

## ​16.4​ Patch Management
1. Software patches and updates will be applied to all systems in a timely manner. In the case of routine updates, they will be applied after thorough testing. In the case of updates to correct known vulnerabilities, priority will be given to testing to speed the time to production. Critical security patches are applied within 30 days from testing and all security patches are applied within 90 days after testing.
1. Administrators subscribe to mailing lists to assure up to date on current version of all EA managed software on Production Systems.

## 16.5 Intrusion Detection and Vulnerability Scanning  {#intrusion_detection}
1. Production systems are monitored using intrusion detection systems (IDS). Suspicious activity is logged and alerts are generated.
1. Vulnerability scanning of Production Systems must occur on a predetermined, regular basis, no less than annually. Currently it is weekly. Scans are reviewed by Security Officer, with defined steps for risk mitigation, and retained for future reference.

## 16.6​ Production System Security
1. System, network, and server security is managed and maintained by the CTO and the Security Officer.
1. Up to date system lists and architecture diagrams are kept for all production environments.
1. Access to Production Systems is controlled using centralized tools and two-factor authentication.

## 16.7​ Production Data Security {#data_security}
1. Reduce the risk of compromise of Production Data.
1. Implement and/or review controls designed to protect Production Data from improper alteration or destruction.
1. Ensure that confidential data is stored in a manner that supports user access logs for potential security incidents.
1. Ensure EA Customer Production Data is segmented and only accessible to Customer authorized to access data.
1. All Production Data at rest is stored on encrypted volumes using encryption keys managed by EA. Encryption at rest is ensured through the use of automated deployment scripts referenced in section 8.
1. Volume encryption keys and machines that generate volume encryption keys are protected from unauthorized access. Volume encryption key material is protected with access controls such that the key material is only accessible by privileged accounts.
1. Encrypted volumes use AES encryption with a minimum of 256-bit keys, or keys and ciphers of equivalent or higher cryptographic strength.

## 16.8​ Transmission Security {#transmission_security}
1. All data transmission is encrypted end to end using encryption keys managed by EA. Encryption is not terminated at the network endpoint, and is carried through to the application.
1. Transmission encryption keys and machines that generate keys are protected from unauthorized access. Transmission encryption key material is protected with access controls such that the key material is only accessible by privileged accounts.
1. Transmission encryption keys use a minimum of 2048-bit RSA keys, or keys and ciphers of equivalent or higher cryptographic strength (e.g., 256-bit AES session keys in the case of IPsec encryption).
1. Transmission encryption keys are limited to use for one year and then must be regenerated.
1. In the case of EA provided APIs, provide mechanisms to assure person sending or receiving data is authorized to send and save data.
1. System logs of all transmissions of Production Data access. These logs must be available for audit.
