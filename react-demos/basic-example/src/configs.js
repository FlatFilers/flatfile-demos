import Validators from "./validators.csv";
import Simple from "./simple.csv";
import FlatfileImporter from "flatfile-csv-importer";

export const flatfileConfigs = [{
    type: "Simple Example",
    fields: [
        {
            label: "Customer Number",
            key: "customer-id",
            description: "The unique customer ID",
            validators: [
                {validate: "unique", error: "The Customer Number must be unique and can't match another Customer's Number"},
                {validate: "required", error: "This field is required"},
                {validate: "regex_matches", regex: "^[0-9]{10}$", error: "This number should be exactly 10 numbers"}
            ]
        },
        {
            label: "Customer Name",
            key: "name",
            description: "Full Name",
            validators: [
                {validate: "required"}
            ]
        },
        {
            label: "Customer City",
            key: "customer_city",
            description: "US City",
            validators: [
                {validate: "required_without", fields: ["zip-code"]}
            ]
        },
        {
            label: "Customer State",
            key: "customer_state",
            description: "US State",
            validators: [
                {validate: "required_without", fields: ["zip-code"]}
            ]
        },
        {
            label: "Customer Zip Code",
            key: "zip_code",
            description: "US Postal Code",
            validators: [
                {validate: "required_without", fields: ["state", "city"]},
                {validate: "regex_matches", regex: "^[0-9]{5}$", error: "Must be 5 digits"}
            ]
        },
        {
            label: "Education Level",
            key: "education",
            description: "Highest Education Achieved",
            type: "select",
            options: [
                {value: "none", label: "none"},
                {value: "high_school", label: "High School/GED"},
                {value: "some_college", label: "Some College"},
                {value: "associates", label: "Associates/2-Year Degree"},
                {value: "bachelors", label: "Bachelors"},
                {value: "masters", label: "Masters or more"}
            ]
        },
        {
            label: "Currently Employed",
            key: "employed",
            description: "Employment Status",
            type: "boolean"
        }
    ],
    allowInvalidSubmit: true,
    managed: true,
    allowCustom: false,
    disableManualInput: true
},
{
    type: "Record Hooks Example",
    fields: [
        {
            label: "Customer Number",
            key: "id",
            description: "The unique customer ID",
            validators: [
                {validate: "unique", error: "The Customer Number must be unique and can't match another Customer's Number"},
                {validate: "required", error: "This field is required"}
            ]
        },
        {
            label: "Customer First Name",
            key: "first_name",
            description: "First Name",
            validators: [
                {validate: "required"}
            ]
        },
        {
            label: "Customer Last Name",
            key: "last_name",
            description: "First Name",
            validators: [
                {validate: "required"}
            ]
        },
        {
            label: "Customer City",
            key: "city",
            description: "US City"
        },
        {
            label: "Customer State",
            key: "state",
            description: "US State",
        },
        {
            label: "Customer Zip Code",
            key: "zip",
            description: "US Postal Code"
        },
        {
            label: "Date of Birth",
            key: "dob",
            description: "The customer birth date."
        }
    ],
    allowInvalidSubmit: true,
    managed: true,
    allowCustom: false,
    disableManualInput: true
}];

export const filesToUse = [Simple, Validators]

let promiseArray = []
let finalArray = []

filesToUse.forEach(file => getFile(file))

async function getFile(url) {
    var response = await fetch(url).then(response => response.text())
    promiseArray.push(response)
}

const splitCsv = (csvString) => {
    let breakOnNewline = csvString.split('\n')
    let breakOnComma = Array.from(breakOnNewline, (element => {
        return element.split(',')
    }))
    for (let i = 0; i < breakOnComma.length; i++) {
        for (let j = 0; j < breakOnComma[i].length; j++) {
            breakOnComma[i][j] = {value: breakOnComma[i][j]}
        }
    }
    return breakOnComma
};

const loopIfUnresolved = () => {
    if (promiseArray.length === 0) {
        setTimeout(loopIfUnresolved, 1500)
    } else {
        for (let i = 0; i < promiseArray.length; i++) {
            finalArray.push(splitCsv(promiseArray[i]))
        }
    }
};
loopIfUnresolved(promiseArray);

export const RecordHooks = () => {
    FlatfileImporter.registerRecordHook((record, index) => {
        const out = {};
        if (record.zip && record.zip.length < 5) {
            out.zip = {
                value: record.zip.padStart(5, "0"),
                info: [
                    {
                        message: "Zipcode was padded with zeroes",
                        level: "warning"
                    }
                ]
            };
        }
    })
};

export default finalArray




