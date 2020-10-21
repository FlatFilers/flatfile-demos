import FlatfileImporter from "@flatfile/adapter";
import $ from "jquery";
import {flatfileConfig} from "./flatfile-config"

const LICENSE_KEY = ''

if (LICENSE_KEY) {
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
