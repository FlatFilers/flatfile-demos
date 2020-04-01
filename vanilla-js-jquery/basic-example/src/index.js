import FlatfileImporter from "flatfile-csv-importer";
import $ from "jquery";
import { makeFloat } from "./functions";
import { translations } from "./translations";

FlatfileImporter.setVersion(2);

const versaImporter = new FlatfileImporter(
    "4171f0b4-5f5c-4b32-a008-356ebb813e4e", // Put your license key in to show imports on your client dashboard
    {
        fields: [
            {
                key: "code",
                alternates: ["sku", "productcode", "produktnummer", "artikelnummer"],
                label: "Artikelnummer", // EN - Article number
                description: "Der Code unter dem das Produkt im System geführt wird", // EN - The code under which the product is listed in the system
                validators: [{ validate: "required" }]
            },
            {
                key: "title",
                alternates: ["name", "productname", "titel"],
                label: "Titel", // EN - Title
                description: "Name des Produkts", // EN - Name of the product
                validators: [{ validate: "required" }]
            },
            {
                key: "gtin",
                alternates: ["ean"],
                label: "GTIN", // EN - GTIN
                description: "GTIN des Produkts", // EN - 	GTIN of the product
                validators: [
                    {
                        validate: "regex_matches",
                        regex: "^[0-9]*$",
                        error: "Must be a whole number"
                    }
                ]
            },
            {
                key: "price",
                alternates: ["preis"],
                label: "Preis", // EN - Price
                description: "Preis des Produkts" // EN - Price of the product
                // formatted with the data hooks below
                // strip everything - treturn float
            },
            {
                key: "code_of_parent",
                label: "Hauptprodukt Artikelnummer", // EN -  Article number Main product
                description: "Artikelnummer des Hauptprodukts" // EN - Article number of the Main product
                // For validation here, we can use a column hook (example below)
                // to batch this entire column and validate it against an external
                // data source (ie. you can send to your server and then provide feedback
                // and send it back)
            },
            {
                key: "compare_at_price",
                alternates: ["streichpreis", "vergleichspreis"],
                label: "Streichpreis", // EN - Compare at price
                description: "Streichpreis des Produkts" // EN - Compare price of the product
                // formatted with data hooks below
            },
            {
                key: "subtitle",
                alternates: ["untertiel"],
                label: "Untertiel", // EN - Subtitle
                description: "Untertitel des Produkts" // EN - Subtitle of the product
            },
            {
                key: "description",
                alternates: ["beschreibung"],
                label: "Beschreibung", // EN - Description
                description: "Beschreibung des Produkts" // EN -	Description of the product
            },
            {
                key: "vendor",
                alternates: ["hersteller"],
                label: "Hersteller", // EN - Vendor
                description: "Hersteller des Produkts" // EN - Vendor of the product
            },
            {
                key: "category",
                alternates: ["kategorie", "typ", "art"],
                label: "Kategorie", // EN -	Category
                description: "Produktkategorie" // EN - Product category
            },
            {
                key: "weight",
                alternates: ["gewicht"],
                label: "Gewicht", //EN - Weight
                description: "Produktgewicht" // EN -Product weight
            },
            {
                key: "stock",
                alternates: ["bestand", "anzahl", "stückzahl", "stück"],
                label: "Bestand", // EN - Stock
                description: "Produktbestand", // EN -	Product stock
                validators: [
                    {
                        validate: "regex_matches",
                        regex: "^[0-9]*$",
                        error: "Must be a whole number"
                    }
                ]
            },
            {
                key: "base_unit",
                alternates: ["mengeneinheit", "einheit"],
                label: "Grundmengeneinheit", // EN - 	Basic unit of measure
                description: "Mengeneinheit des Produkts" // EN - 	Unit of measure of the product
            },
            {
                key: "visible",
                alternates: ["sichtbar"],
                label: "Sichtbar", // EN - 	Visible
                description: "Soll das Produkt sichtbar sein", // EN - 	Should the product be visible
                type: "checkbox"
            },
            {
                key: "active",
                alternates: ["online", "aktiv"],
                label: "Aktiv", // EN - 	Active
                description: "Soll das Produkt aktiv sein", // EN - 	Should the product be active
                type: "checkbox"
            },
            {
                key: "consider_stock",
                label: "Bestand berücksichtigen", // EN - 	Consider stock
                description: "Soll der Produktbestand berücksichtigt werden", // EN - 	Should the stock be considered	"
                type: "checkbox"
            },
            {
                key: "shows_stock_amount",
                label: "Bestand anzeigen", // EN - 	Show stock amount
                description: "Soll der Produktbestand angezeigt werden", // EN - 	Should the stock amount be visible	"
                type: "checkbox"
            },
            {
                key: "featured",
                alternates: ["vorgestellt", "angebot"],
                label: "Top Produkt", // EN - 	Featured product
                description: "Ist das Produkt ein Top-Produkt", // EN - 	Is the product a featured product	"
                type: "checkbox"
            },
            {
                key: "new",
                alternates: ["neu"],
                label: "Neues Produkt", // EN - 	New product
                description: "Ist das Produkt ein neues Produkt", // EN - 	Is the product a new product	"
                type: "checkbox"
            },
            {
                key: "base_quantity",
                alternates: ["menge"],
                label: "Grundmenge", // EN - 	Basic quantitiy
                description: "Die Anzahl der Verpackungseinheiten in einer verpackung", // EN - 	The number of packaging units in a package	"
                validators: [
                    {
                        validate: "regex_matches",
                        regex: "^[0-9]*$",
                        error: "Must be a whole number"
                    }
                ]
            },
            {
                key: "base_quantity_sold",
                label: "Verpackungseinheit in stück", // EN - 	Packaging unit in pieces
                description: "Die Menge, auf die sich die Grundpreisrechnung bezieht", // EN - 	The quantity to which the basic price calculation refers	"
                validators: [
                    {
                        validate: "regex_matches",
                        regex: "^[0-9]*$",
                        error: "Must be a whole number"
                    }
                ]
            },
            {
                key: "base_quantity_package",
                label: "Verpackungseinheit", // EN - 	Packaging unit
                description:
                    "Der Anteil der Mengeneinheit, die sich in einer Verpackung befinden", // EN - 	The proportion of the unit of measure that is in a package	"
                validators: [
                    {
                        validate: "regex_matches",
                        regex: "^[0-9]*$",
                        error: "Must be a whole number"
                    }
                ]
            },
            {
                key: "base_perform_calculation",
                label: "Grundpreisberechnung", // EN - 	Basic price calculation
                description: "Soll der Grundpreis berechnet werden", // EN - 	Should the basic price be calculated	"
                type: "checkbox"
            },
            {
                key: "packaging_duration",
                alternates: ["packzeit"],
                label: "Packzeit in Stunden", // EN - 	Packaging duration in hours
                description: "Packzeit in Stunden", // EN - 	Packaging duration in hours	"
                validators: [
                    {
                        validate: "regex_matches",
                        regex: "^[0-9]*$",
                        error: "Must be a whole number"
                    }
                ]
            },
            {
                key: "option_01_label",
                label: "Option_01_Bezeichnung", // EN - 	Option_01_Description
                description: "Bezeichnung der ersten Produkt Option", // EN - 	Description of the first product option	"
                validators: [
                    {
                        validate: "required_with",
                        fields: ["option_02_label", "option_03_label"]
                    }
                ]
            },
            {
                key: "option_02_label",
                label: "Option_02_Bezeichnung", // EN - 	Option_02_Description
                description: "Bezeichnung der zweiten Produkt Option", // EN - 	Description of the second product option
                validators: [{ validate: "required_with", fields: ["option_03_label"] }]
            },
            {
                key: "option_03_label",
                label: "Option_03_Bezeichnung", // EN - 	Option_03_Description
                description: "Bezeichnung der dritten Produkt Option" // EN - 	Description of the third product option
            },
            {
                key: "option_01",
                label: "Option_01_Wert", // EN - 	Option_01_Value
                description: "Wert der ersten Produkt Option", // EN - 	Value of the first product option
                validators: [
                    { validate: "required_with", fields: ["option_02", "option_03"] }
                ]
            },
            {
                key: "option_02",
                label: "Option_02_Wert", // EN - 	Option_02_Value
                description: "Wert der zweiten Produkt Option", // EN - 	Value of the second product option
                validators: [{ validate: "required_with", fields: ["option_03"] }]
            },
            {
                key: "option_03",
                label: "Option_03_Wert", // EN - 	Option_03_Value
                description: "Wert der dritten Produkt Option" // EN - 	Value of the third product option
            },
            {
                key: "handle",
                alternates: ["permalink"],
                label: "Permalink", // EN - 	Permalink
                description: "Permalink des produkts" // EN - 	Permalink of the product
            },
            {
                key: "custom_url",
                label: "Benutzerdefinierte URL", // EN - 	Custom URL
                description: "Benutzerdefinierte URL für das Produkt" // EN - 	Custom URL for the product
            },
            {
                key: "content_title_tag",
                label: "Inhalt Title-Tag", // EN - 	Content Title-Tag
                description: "Inhalt des Title-Tags" // EN - 	Content of the Title-Tag
            },
            {
                key: "content_meta_description",
                label: "Inhalt Description-Tag", // EN - 	Content Description-Tag
                description: "Inhalt des Decription-Tags" // EN - 	Content of the Description-Tag
            },
            {
                key: "content_meta_keywords",
                label: "Inhalt Keywords-Tag", // EN - 	Content Keywords-Tag
                description: "Inhalt des Keyword-Tags" // EN - 	Content of the Keywords-Tag
            },
            {
                key: "image_url_1",
                label: "Bild_url_1", // EN - 	Image_url_1
                description: "URL des ersten Bildes", // EN - 	URL of the first image
                validators: [
                    {
                        validate: "required_with",
                        fields: ["image_url_2", "image_url_3"],
                        error: "Must use Image URL 1 before Image URL 2 or 3"
                    }
                ]
            },
            {
                key: "image_url_2",
                label: "Bild_url_2", // EN - 	Image_url_2
                description: "URL des zweiten Bildes", // EN - 	URL of the second image
                validators: [
                    {
                        validate: "required_with",
                        fields: ["image_url_3"],
                        error: "Must use Image URL 2 before Image URL 3"
                    }
                ]
            },
            {
                key: "image_url_3",
                label: "Bild_url_3", // EN - 	Image_url_3
                description: "URL des dritten Bildes" // EN - 	URL of the third image
            },
            {
                key: "property_key_1",
                label: "Attribut-Schlüssel 1", // EN - 	Property-Key 1
                description: "Eigenschaften-Bezeichnung 1" // EN - 	Property-Description 1
            },
            {
                key: "property_value_1",
                label: "Attribut-Wert 1", // EN - 	Property-Value 1
                description: "Eigenschaften-Wert 1" // EN - 	Property-Value 1
            },
            {
                key: "property_key_2",
                label: "Attribut-Schlüssel 2", // EN - 	Property-Key 2
                description: "Eigenschaften-Bezeichnung 2" // EN - 	Property-Description 2
            },
            {
                key: "property_value_2",
                label: "Attribut-Wert 2", // EN - 	Property-Value 2
                description: "Eigenschaften-Wert 2" // EN - 	Property-Value 2
            },
            {
                key: "property_key_3",
                label: "Attribut-Schlüssel 3", // EN - 	Property-Key 3
                description: "Eigenschaften-Bezeichnung 3" // EN - 	Property-Description 3
            },
            {
                key: "property_value_3",
                label: "Attribut-Wert 3", // EN - 	Property-Value 3
                description: "Eigenschaften-Wert 4" // EN - 	Property-Value 3
            },
            {
                key: "recommended_product_code_1",
                label: "Produktempfehlung 1 Artikelnummer", // EN - 	Recommended Product Article number 1
                description: "Artikelnummer der ersten Produktempfehlung" // EN - 	Article number of the first recommended product
            },
            {
                key: "recommended_product_description_1",
                label: "Produktempfehlung 1 Beschreibung", // EN - 	Recommended Product description 1
                description: "Beschreibung der ersten Produktempfehlung" // EN - 	Description of the first recommended product
            },
            {
                key: "recommended_product_code_2",
                label: "Produktempfehlung 2 Artikelnummer", // EN - 	Recommended Product Article number 2
                description: "Artikelnummer der zweiten Produktempfehlung" // EN - 	Article number of the second recommended product
            },
            {
                key: "recommended_product_description_2",
                label: "Produktempfehlung 2 Beschreibung", // EN - 	Recommended Product description 2
                description: "Beschreibung der zweiten Produktempfehlung" // EN - 	Description of the second recommended product
            },
            {
                key: "recommended_product_code_3",
                label: "Produktempfehlung 3 Artikelnummer", // EN - 	Recommended Product Article number 3
                description: "Artikelnummer der dritten Produktempfehlung" // EN - 	Article number of the third recommended product
            },
            {
                key: "recommended_product_description_3",
                label: "Produktempfehlung 3 Beschreibung", // EN - 	Recommended Product description 3
                description: "Beschreibung der dritten Produktempfehlung" // EN - 	Description of the third recommended product
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

// here is a good example column hook using our dummy API
let codes;
versaImporter.registerFieldHook("code", values => {
    let nonBlank = [];
    values.map(item => {
        if (item[0] !== "" && item[0] !== undefined) {
            nonBlank.push(item);
        }
    });
    nonBlank = nonBlank.map(item => {
        return item[0];
    });
    codes = nonBlank;
    return [nonBlank];
});

versaImporter.registerRecordHook((record, index) => {
    const out = {};
    // below are used to make sure price is a float value without the € symbol
    if (record.price) {
        let formatCurrency = makeFloat(record.price);

        out.price = {
            value: formatCurrency
        };
    }

    if (record.compare_at_price) {
        let formatCurrency = makeFloat(record.compare_at_price);

        out.compare_at_price = {
            value: formatCurrency
        };
    }

    if (record.weight) {
        if (!record.weight.includes(".")) {
            out.weight = {
                value: record.weight + ".0",
                info: [{ message: "formatted to a decimal", level: "info" }]
            };
        }
    }

    // below used to verify that image urls don't contain versacommerce.de
    if (record.image_url_1) {
        if (record.image_url_1.toLowerCase().includes("versacommerce.de")) {
            out.image_url_1 = {
                info: [
                    {
                        message: "Cannot upload images from versacommerce.de",
                        level: "error"
                    }
                ]
            };
        }
    }
    if (record.image_url_2) {
        if (record.image_url_2.toLowerCase().includes("versacommerce.de")) {
            out.image_url_2 = {
                info: [
                    {
                        message: "Cannot upload images from versacommerce.de",
                        level: "error"
                    }
                ]
            };
        }
    }
    if (record.image_url_3) {
        if (record.image_url_3.toLowerCase().includes("versacommerce.de")) {
            out.image_url_3 = {
                info: [
                    {
                        message: "Cannot upload images from versacommerce.de",
                        level: "error"
                    }
                ]
            };
        }
    }
    if (record.code_of_parent) {
        if (!codes.includes(record.code_of_parent)) {
            out.code_of_parent = {
                info: [
                    {
                        message:
                            "Only fill in this field if the main product already exists in your shop (or this table)",
                        level: "warning"
                    }
                ]
            };
        }
    }

    return out;
});

$("#launch").click(function() {
    versaImporter.setCustomer({ userId: "1", email: "me@david.gs" });

    versaImporter
        .requestDataFromUser()
        .then(function(results) {
            versaImporter.displaySuccess("Thanks for your data.");
        })
        .catch(function(error) {
            console.info(error || "window close");
        });
});
