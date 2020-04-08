export const flatfileConfig = {
    type: "Data Hooks Example",
    fields: [
        {
            label: "First Name",
            key: "firstName",
            validators: [{ validate: "required" }]
        },
        {
            label: "Last Name",
            key: "lastName",
        },
        {
            label: "User ID",
            key: "user_id",
            validators: [{ validate: "required" }]
        },
        {
            label: "Address",
            key: "address",
        },
        {
            label: "City",
            key: "city",
        },
        {
            label: "State",
            key: "state",
        },
        {
            label: "Zip Code",
            key: "zip",
        }
    ],
    allowInvalidSubmit: true,
    managed: true,
    allowCustom: false,
    disableManualInput: false
};
