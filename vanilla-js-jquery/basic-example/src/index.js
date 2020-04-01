import FlatfileImporter from "flatfile-csv-importer";
import $ from "jquery";
import { makeFloat } from "./functions";
import { translations } from "./translations";

FlatfileImporter.setVersion(2);

const importer = new FlatfileImporter(
    "4171f0b4-5f5c-4b32-a008-356ebb813e4e", // Put your license key in to show imports on your client dashboard
    {
        fields: [
            {
                key: "code",
                alternates: ["sku", "productcode", "produktnummer", "artikelnummer"],
                label: "Artikelnummer", // EN - Article number
                description: "Der Code unter dem das Produkt im System geführt wird", // EN - The code under which the product is listed in the system
                validators: [{ validate: "required" }]
            }
        ],
        type: "Products",
        allowInvalidSubmit: false, // being set to false, the end user has to fix all the issues for the data before submitting to you all
        managed: true, // this gives you access to see impoorts on our dashboard
        allowCustom: true, // this lets your users upload a custom column that you haven't accounted for in the above fields
        disableManualInput: false, // this would let someone manually input the data instead of uploading a file
        i18nOverrides: {
            "en-US": translations,
            de: translations,
            en: translations
        }
    }
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
