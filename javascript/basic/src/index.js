import FlatfileImporter from "flatfile-csv-importer";
import $ from "jquery";
import {flatfileConfig} from "./flatfile-config"

FlatfileImporter.setVersion(2);

const LICENSE_KEY = urlParams.get('license');
// const LICENSE_KEY = "4171f0b4-5f5c-4b32-a008-356ebb813e4e"

if (!LICENSE_KEY) {
    let github = document.getElementById('githubLogin')
    github.style.display = "none";
}

const importer = new FlatfileImporter(
    LICENSE_KEY, flatfileConfig
);

$("#launch").click(function() {
    importer.setCustomer({ userId: "1", email: "me@david.gs" });

    importer
        .requestDataFromUser()
        .then(function(results) {
            importer.displaySuccess("Thanks for your data.");
        })
        .catch(function(error) {
            console.info(error || "window close");
        });
});
