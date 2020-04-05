export const flatfileConfig = {
    type: "Basic Example",
    fields: [
        {
            label: "Name",
            key: "name",
            validators: [{ validate: "required" }]
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
            validators: [{validate: "required_without", fields: ["zip"], error: "Must have either city and state OR zip code"}]
        },
        {
            label: "State",
            key: "state",
            validators: [
                { validate: "regex_matches", regex: "^[a-zA-Z]{0,2}$", error: "Must be the 2 letter state code" },
                {validate: "required_without", fields: ["zip"], error: "Must have either city and state OR zip code"}
            ]
        },
        {
            label: "Zip Code",
            key: "zip",
            validators: [{validate: "required_without", fields: ["city", "state"], error: "Must have either city and state OR zip code"}]
        }
    ],
    allowInvalidSubmit: true,
    managed: true,
    allowCustom: false,
    disableManualInput: true
};



