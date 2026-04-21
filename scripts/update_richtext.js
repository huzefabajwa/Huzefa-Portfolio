const fetch = require('node-fetch');

(async () => {
  try {
    const pRes = await fetch('http://localhost:3001/api/projects/get');
    const pData = await pRes.json();
    
    for (const p of pData.data) {
      let richText = '';
      if (p.name.includes('Finance')) {
        richText = "<h2>Project Overview</h2><p>Acted as the lead CRM consultant to deliver a complete, end-to-end Salesforce implementation for a prominent financial services firm.</p><h3>Key Contributions</h3><ul><li><strong>System Administration:</strong> Configured users, roles, profiles, and complex sharing rules to comply with financial data security regulations.</li><li><strong>Custom Development:</strong> Engineered custom Apex classes and triggers to handle complex financial calculations securely on the platform.</li><li><strong>Workflow Optimization:</strong> Automated approval processes for financial product applications, reducing manual processing time by over 40%.</li></ul><p><em>Result:</em> A highly secure, streamlined Salesforce environment that became the single source of truth for the client's financial operations.</p>";
      } else if (p.name.includes('Compliance')) {
        richText = "<h2>Project Overview</h2><p>Designed and deployed a highly secure Salesforce Sales Cloud instance tailored specifically for the rigorous demands of the compliance sector.</p><h3>Key Contributions</h3><ul><li><strong>Sales Cloud Configuration:</strong> Customized Lead, Opportunity, and Account pipelines to align perfectly with compliance sales cycles.</li><li><strong>Security &amp; Auditing:</strong> Implemented strict field-level security, Shield Platform Encryption, and comprehensive audit trails.</li><li><strong>Process Automation:</strong> Utilized Process Builder and Flows to automate compliance checks at key deal stages.</li></ul><p><em>Result:</em> Accelerated sales pipeline velocity while ensuring 100% adherence to industry regulatory standards.</p>";
      } else if (p.name.includes('Custom Development')) {
        richText = "<h2>Project Overview</h2><p>Brought in to architect and develop complex, bespoke solutions on the Salesforce platform for a fast-growing technology company.</p><h3>Key Contributions</h3><ul><li><strong>Lightning Web Components (LWC):</strong> Built highly interactive, custom UI components to provide a seamless user experience that standard pages could not offer.</li><li><strong>Advanced Apex:</strong> Developed complex asynchronous Apex and batch jobs to handle massive daily data syncs with external systems.</li><li><strong>API Integrations:</strong> Engineered secure REST API integrations to connect Salesforce with the proprietary software stack.</li></ul><p><em>Result:</em> Eliminated system bottlenecks and provided the sales team with a unified, high-performance workspace.</p>";
      } else if (p.name.includes('Dynamics 365')) {
        richText = "<h2>Project Overview</h2><p>Led the modernization of enterprise operations through deep consultancy and administration of Microsoft Dynamics 365 and the Power Platform.</p><h3>Key Contributions</h3><ul><li><strong>Dynamics 365 Administration:</strong> Customized entities, forms, and views to match complex enterprise operations.</li><li><strong>PowerApps Development:</strong> Built bespoke canvas and model-driven apps for field workers to input data remotely.</li><li><strong>Power Automate (Flows):</strong> Designed intricate automated flows to sync data across Microsoft 365, SharePoint, and Dynamics seamlessly.</li></ul><p><em>Result:</em> Created a cohesive ecosystem that bridged the gap between office staff and field operators.</p>";
      } else if (p.name.includes('HubSpot')) {
        richText = "<h2>Project Overview</h2><p>Architected a fully automated marketing and sales tech stack using HubSpot as the central CRM hub, powered by advanced integrations.</p><h3>Key Contributions</h3><ul><li><strong>Middleware Architecture:</strong> Configured Zapier as the primary middleware layer to connect disparate systems without heavy custom code.</li><li><strong>Deep Integrations:</strong> Seamlessly connected HubSpot to <em>Clay, Apollo, Microsoft Teams, SharePoint, and Claude</em>.</li><li><strong>Workflow Automation:</strong> Automated lead enrichment (via Apollo/Clay), team notifications (Teams), and document generation (SharePoint).</li></ul><p><em>Result:</em> Reduced manual data entry to near zero, enabling the sales team to focus entirely on closing enriched, high-quality leads.</p>";
      }

      if (richText) {
        await fetch('http://localhost:3001/api/projects/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: p._id, description: richText })
        });
      }
    }
    console.log('Updated projects with rich HTML descriptions');
  } catch(e) { console.error(e) }
})();
