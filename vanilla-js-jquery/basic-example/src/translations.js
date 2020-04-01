export const translations = {
    // ^ Change this locale to whatever your default locale is
    alreadyMatched: "{{priorMatch}} already been matched to {{label}}.",
    autoMatchedField1: "Matched to the ",
    autoMatchedField2: " field.",
    breadcrumbs: {
        columns: " columns",
        complete: "Complete",
        match: "Match",
        problems: " problems",
        repair: "Repair",
        spreadsheet: " your spreadsheet",
        upload: "Upload"
    },
    buttons: {
        back: "Go back",
        cancel: "Cancel",
        clear: "Clear data",
        complete: "Complete",
        confirm: "Confirm",
        confirmMapping: "Confirm mapping",
        continue: "Continue",
        customField: "Include as custom field",
        edit: "Edit",
        ignore: "Ignore this column",
        no: "No",
        ok: "Ok",
        review: "Review",
        yes: "Yes"
    },
    clearAllChanges:
        "Are you sure you want to clear all changes to data in progress in this stage?",
    clearAndClose:
        "Are you sure you want to close the importer and clear all data?",
    columnHeader: "Does this row contain column names?",
    confirmedMapping: "Confirmed mapping",
    devMode: "Development mode",
    dropzone: {
        accepted: "{{types}} spreadsheets accepted.",
        button: "Upload data from file",
        description:
            "You can upload any {{file}} file with any set of columns as long as it has 1 record per row. The next step will allow you to match your spreadsheet columns to the right data points. You'll be able to clean up or remove any corrupted data before finalizing your report."
    },
    errors: {
        anomolies:
            "The CSV-to-JSON parser tracked some anomalies in your CSV file. The errors were not fatal, but you can review them below and choose to edit them before including them in your data set, or you can choose to ignore them and they will be skipped.",
        dupHeaders:
            "There are duplicate headers: {{headers}}. Please fix and upload again.",
        error: "Errors: {{errors}}",
        fileReader: "FileReader is not supported in this browser.",
        maxRecords:
            "The maximum number of rows we accept is {{maxRecords}}. Consider breaking your file into multiple parts.",
        notSupported: "This file type is not supported.",
        parsing: "Parsing errors",
        unreadable: "Cannot read file!",
        unresolvedFormat:
            "You have {{errorCount}} rows with unresolved format issues."
    },
    fileTypes:
        "You can upload any {{fileTypes}} file with any set of columns as long as it has 1 record per row. The next step will allow you to match your spreadsheet columns to the right data points. You'll be able to clean up or remove any corrupted data before finalizing your report.",
    flatfile: "Powered by ",
    header: "Here's a test line for your {{number}} {{thing}}", // Test line
    header2: "Here's a test line for your {{thing}}", // Test line
    ignored: "Ignored",
    inconvenience:
        "Sorry for the inconvenience. The XLS file you uploaded may be using features that make it difficult for us to extract the correct data. In order to continue, save your XLS file as a CSV and re-upload. Here are some instructions: ",
    inconvenienceDocs: "Read instructions on exporting a CSV from Excel",
    lookupMatchingFields: "Lookup matching fields",
    manual: "...or just manually enter your data here:",
    noMatchSelected: "No match selected. We suggest '{{suggestedMatch}}'",
    nothingPasted: "There is no data pasted to be submitted!",
    onlyShow: "Only show rows with problems",
    poweredBy: "Powered by",
    poweredTitle:
        "flatfile.io makes data imports easy and secure for modern web applications",
    readySubmit: "Are you ready to submit?",
    required: "required",
    reviewFix: "Review and fix the format issues.",
    rowsFail: "{{failed}}% of rows fail validation (repair on next step)",
    rowsHaveValue: "{{rows}} of your rows have a value for this column",
    submitAnyway: "Submit your data anyways (errors may occur).",
    success: "Success!",
    unableToMatch: "Unable to automatically match",
    uploading: "Uploading...",
    validationPass: "All values pass validation for this field"
};
