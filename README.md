# moneybirdjs

A wrapper for the Moneybird API

## Supported endpoints

- Administration
- Contacts*
- Custom Fields
- Document Styles
- Documents
    - General Documents
    - General Journal Documents
    - Purchase Invoices
    - Receipts
    - Typeless documents
- External Sales Invoices*
- Financial Accounts
- Financial Mutations
- Ledger Accounts
- Payments
- Reports
- Sales Invoices*
- Tax rates
- Users
- Verifications
- Workflows

*not all endpoints are yet implemented

## Usage

```javascript
const {Client} = require('moneybirdjs');

const client = new Client('api-token');

client.getAdministrations().then(async admins => {
    const contacts = await admins[0].getContacts();
    console.log(contacts);
})
```

### Links

- [GitHub](https://github.com/vanBrusselTechnologies/moneybirdjs)
- [npm](https://www.npmjs.com/package/moneybirdjs)