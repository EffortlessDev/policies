---
title: "Configuration Management"
---

# ​8​ Configuration Management Policy
EA standardizes and automates configuration management through the use of Chef/Salt scripts as well as documentation of all changes to production systems and networks. Chef and Salt automatically configure all EA systems according to established and tested policies, and are used as part of our Disaster Recovery plan and process.

## ​8.1​ Configuration Management Policies
1. Chef and Salt are used to standardize and automate configuration management.
1. No systems are deployed into EA environments without approval of the EA CTO.
1. All changes to production systems, network devices, and firewalls are approved by the EA 1. CTO before they are implemented to assure they comply with business and security requirements.
1. All changes to production systems are tested before they are implemented in production.
1. Implementation of approved changes are only performed by authorized personnel.
1. Tooling to generate an up-to-date inventory of systems, including corresponding architecture diagrams for related products and services, is hosted on GitHub.
    * All systems are categorized as production and utility to differentiate based on criticality.
    * The Security Officer maintains scripts to generate inventory lists on demand using APIs provided by each cloud provider.
    * These scripts are used to generate the diagrams and asset lists required by the Risk Assessment phase of EA's Risk Management procedures (see [Section 3.2.1]({{ site.baseurl }}/chapters/03-risk_management#risk_assessment)).
    * After every use of these scripts, the Security Officer will verify their accuracy by reconciling their output with recent changes to production systems. The Security Officer will address any discrepancies immediately with changes to the scripts.
1. All frontend functionality (developer dashboards and portals) is separated from backend (database and app servers) systems by being deployed on separate servers or containers.
1. All software and systems are tested using unit tests and end to end tests.
1. All committed code is reviewed using pull requests to assure software code quality and proactively detect potential security issues in development.
1. EA utilizes development and staging environments that mirror production to assure proper function.
1. All formal change requests require unique ID and authentication.
1. Clocks are continuously synchronized to an authoritative source across all systems using NTP or a platform-specific equivalent. Modifying time data on systems is restricted.

## ​8.2​ Provisioning Production Systems
1. Before provisioning any systems, ops team members must file a request in the Asana Deployment Ticket (DT) project.
    * Asana access requires authenticated users.
    * The CTO grants access to the Asana DT project following the procedures covered in [Section 6.1]({{ site.baseurl }}/chapters/06-system_access#access).
1. The CTO must approve the provisioning request before any new system can be provisioned.
1. Once provisioning has been approved, the ops team member must configure the new system according to the standard baseline chosen for the system's role.
1. If the system will be used to house production data (ePHI), the ops team member must add an encrypted block data volume to the VM during provisioning.
    * For systems on AWS, the ops team member must add an encrypted Elastic Block Storage (EBS) volume.
    * For systems on other cloud providers, the ops team member must add a block data volume and set up OS-level data encryption using Salt or Chef.
1. Once the system has been provisioned, the ops team member must contact the security team to inspect the new system. A member of the security team will verify that the secure baseline has been applied to the new system, including (but not limited to) verifying the following items:
    * Removal of default users used during provisioning.
    * Network configuration for system.
    * Data volume encryption settings.
    * Intrusion detection and virus scanning software installed.
    * All items listed below in the operating system-specific subsections below.
1. Once the security team member has verified the new system is correctly configured, the team member must add that system to the Nessus security scanner configuration.
1. The new system may be rotated into production once the CTO verifies all the provisioning steps listed above have been correctly followed and has marked the Issue with the Approved state.

### ​8.2.1​ Provisioning Linux Systems
1. Linux systems have their baseline security configuration applied via Salt states. These baseline Salt states cover:
    * Ensuring that the machine is up-to-date with security patches and is configured to apply patches in accordance with our policies.
    * Stopping and disabling any unnecessary OS services.
    * Installing and configuring the OSSEC IDS agent.
    * Configuring 15-minute session inactivity timeouts.
    * Installing and configuring the ClamAV virus scanner.
    * Installing and configuring the NTP daemon, including ensuring that modifying system time cannot be performed by unprivileged users.
    * Configuring LUKS volumes for providers that do not have native support for encrypted data volumes, including ensuring that encryption keys are protected from unauthorized access.
    * Configuring authentication to the centralized LDAP servers.
    * Configuring audit logging as described in [Section 7]({{ site.baseurl }}/chapters/07-auditing).
1. Any additional Salt states applied to the Linux system must be clearly documented by the ops team member in the DT request by specifying the purpose of the new system.

### ​8.2.2​ Provisioning Windows Systems
1. Windows systems have their baseline security configuration applied via the combination of Group Policy settings and Chef recipes. These baseline settings cover:
    * Joining the Windows Domain Controller and applying the Active Directory Group Policy configuration.
    * Ensuring that the machine is up-to-date with security patches and is configured to apply patches in accordance with our policies.
    * Stopping and disabling any unnecessary OS services.
    * Installing and configuring the OSSEC IDS agent.
    * Configuring 15-minute session inactivity timeouts.
    * Installing and configuring the Avast virus scanner.
    * Configuring transport encryption according to the requirements described in [Section 16.8]({{ site.baseurl }}/chapters/16-data_integrity#transmission_security).
    * Configuring the system clock, including ensuring that modifying system time cannot be performed by unprivileged users.
    * Configuring audit logging as described in [Section 7]({{ site.baseurl }}/chapters/07-auditing).
1. Any additional Salt states applied to the system must be clearly documented by the ops team member in the DT request by specifying the purpose of the new system.

### ​8.2.3​ Provisioning Management Systems
1. Provisioning management systems such salt servers, LDAP servers, or VPN appliances follows the same procedure as provisioning a production system.
1. Provisioning the first Salt server for a production pod requires bootstrapping Salt. The VP Engineering will oversee provisioning a new Salt server.
    * Once the Salt server has been bootstrapped, the ops team member will apply the baseline configuration to the Salt server by performing a highstate operation as usual.
1. Critical infrastructure services such as logging, monitoring, LDAP servers, or Windows Domain Controllers must be configured with appropriate Salt states.
    * These Salt states have been approved by the VP Engineering and CTO to be in accordance with all EA policies, including setting appropriate:
        * Audit logging requirements.
        * Password size, strength, and expiration requirements.
        * Transmission encryption requirements.
        * Network connectivity timeouts.
1. Critical infrastructure roles applied to new systems must be clearly documented by the ops team member in the DT request.

## ​8.3​ Changing Existing Systems {#changing_systems}
1. Subsequent changes to already-provisioned systems are unconditionally handled by one of the following methods:
    * Changes to Salt states or pillar values.
    * Changes to Chef recipes.
    * For configuration changes that cannot be handled by Chef or Salt, a runbook describing exactly what changes will be made and by whom.
1. Configuration changes to Chef recipes or Salt states must be initiated by creating a Merge Request in GitHub.
    * The ops team member will create a feature branch and make their changes on that branch.
    * The ops team member must test their configuration change locally when possible, or on a development and/or staging sandbox otherwise.
    * At least one other ops team member must review the Chef or Salt change before merging the change into the main branch.
1. In all cases, before rolling out the change to production, the ops team member must file an Issue in the DT project describing the change. This Issue must link to the reviewed Merge Request and/or include a link to the runbook.
1. Once the request has been approved by the CTO, the ops team member may roll out the change into production environments.

## ​8.4​ Patch Management Procedures
1. EA uses automated tooling to ensure systems are up-to-date with the latest security patches.
1. On Ubuntu Linux systems, the unattended-upgrades tool is used to apply security patches in phases.
    * The security team maintains a mirrored snapshot of security patches from the upstream OS vendor. This mirror is synchronized bi-weekly and applied to development systems nightly.
    * If the development systems function properly after the two-week testing period, the security team will promote that snapshot into the mirror used by all staging systems. These patches will be applied to all staging systems during the next nightly patch run.
    * If the staging systems function properly after the two-week testing period, the security team will promote that snapshot into the mirror used by all production systems. These patches will be applied to all production systems during the next nightly patch run.
    * Patches for critical kernel security vulnerabilities may be applied to production systems using hot-patching tools at the discretion of the Security Officer. These patches must follow the same phased testing process used for non-kernel security patches; this process may be expedited for severe vulnerabilities.
1. On Windows systems, the baseline Group Policy setting configures Windows Update to implement the patching policy.

## ​8.5​ Software Development Procedures
1. All development uses feature branches based on the main branch used for the current release. Any changes required for a new feature or defect fix are committed to that feature branch.
    * These changes must be covered under 1) a unit test where possible, or 2) integration tests.
    * Integration tests are required if unit tests cannot reliably exercise all facets of the change.
1. Developers are strongly encouraged to follow the [commit message conventions suggested by GitHub](https://github.com/blog/926-shiny-new-commit-styles).
    * Commit messages should be wrapped to 72 characters.
    * Commit messages should be written in the present tense. This convention matches up with commit messages generated by commands like git merge and git revert.
1. Once the feature and corresponding tests are complete, a pull request will be created using the GitHub/GitHub web interface. The pull request should indicate which feature or defect is being addressed and should provide a high-level description of the changes made.
1. Code reviews are performed as part of the pull request procedure. Once a change is ready for review, the author(s) will notify other engineers using an appropriate mechanism, typically via an @channel message in Slack.
    * Other engineers will review the changes, using the guidelines above.
    * Engineers should note all potential issues with the code; it is the responsibility of the author(s) to address those issues or explain why they are not applicable.
1. If the feature or defect interacts with ePHI, or controls access to data potentially containing ePHI, the code changes must be reviewed by the Security Officer before the feature is marked as complete.
    * This review must include a security analysis for potential vulnerabilities such as those listed in the [OWASP Top 10](https://www.owasp.org/index.php/Top10).
    * This review must also verify that any actions performed by authenticated users will generate appropriate audit log entries.
1. Once the review process finishes, each reviewer should leave a comment on the pull request saying "looks good to me" or a message worded similarly, at which point the original author(s) may merge their change into the release branch.

## ​8.6​ Software Release Procedures
Software releases are treated as changes to existing systems and thus follow the procedure described in [Section 8.3](#changing_systems).