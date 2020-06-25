export const flatfileConfig = {
    type: 'CRM Example',
    fields: [
        {
            label: 'Company',
            key: 'company',
            validators: [{ validate: 'required' }],
        },
        {
            label: 'Contact',
            key: 'contact',
            validators: [{ validate: 'required' }],
        },
        {
            label: 'Deal status',
            key: 'status',
            type: 'select',
            options: [
                { value: 'contract', label: 'Contract' },
                { value: 'closed', label: 'Closed' },
                { value: 'discovery', label: 'Discovery' },
                { value: 'stale', label: 'Stale' },
                { value: 're-engage', label: 'Re-engage' },
            ],
        },
        {
            label: 'Industry',
            key: 'industry',
        },
        {
            label: 'Address',
            key: 'address',
        },
        {
            label: 'City',
            key: 'city',
        },
        {
            label: 'State',
            key: 'state',
        },
        {
            label: 'Postal code',
            key: 'zip',
        },
        {
            label: 'Company size',
            key: 'size',
        },
        {
            label: 'Phone Number',
            key: 'phone',
        },
        {
            label: 'Primary product interest',
            key: 'product',
        },
    ],
    allowInvalidSubmit: true,
    managed: true,
    allowCustom: false,
    disableManualInput: false,
}
