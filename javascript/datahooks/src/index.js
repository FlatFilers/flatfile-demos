import FlatfileImporter from "flatfile-csv-importer";
import $ from "jquery";
import {flatfileConfig} from "./flatfile-config"

FlatfileImporter.setVersion(2);

const urlParams = new URLSearchParams(window.location.search);
const LICENSE_KEY = urlParams.get('license'); // You can place your license key here

if (LICENSE_KEY) {
    let github = document.getElementById('githubLogin')
    github.style.display = "none";
}

const importer = new FlatfileImporter(
    LICENSE_KEY, flatfileConfig
);

$("#launch").click(function() {

    importer.registerRecordHook((record, index) => {
        const out = {};
        if (record.firstName && !record.lastName) {
            if (record.firstName.includes(" ")) {
                const components = record.firstName.split(" ");
                out.firstName = { value: components.shift() };
                out.lastName = { value: components.join(" ") };
            }
        }
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
        if (!record.zip && (!record.city || !record.state)) {
            out.zip = {
                info: [
                    {
                        message: "Either city/state or zip must be provided.",
                        level: "error"
                    }
                ]
            }
        }
        if (!record.zip && (!record.city || !record.state)) {
            out.city = {
                info: [
                    {
                        message: "Either city/state or zip must be provided.",
                        level: "error"
                    }
                ]
            }
        }
        if (!record.zip && (!record.city || !record.state)) {
            out.state = {
                info: [
                    {
                        message: "Either city/state or zip must be provided.",
                        level: "error"
                    }
                ]
            }
        }
        return out;
    });

    importer.setCustomer({
        userId: "19235",
        name: "John Doe"
    });

    importer
        .requestDataFromUser()
        .then(function(results) {
            importer.displaySuccess("Thanks for your data.");
        })
        .catch(function(error) {
            console.info(error || "window close");
        });
});
