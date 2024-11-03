
document.addEventListener("DOMContentLoaded", function () {
    // Ensure the DOM is fully loaded before adding the event listener
    const buttonCSV = document.getElementById("downloadButtonCsv");
    const buttonXLXS = document.getElementById("downloadButtonXlxs");

    if (buttonCSV) {
        console.log("before called download btn")
        buttonCSV.addEventListener("click", saveHtmlTableAsCsv);
        buttonXLXS.addEventListener("click", saveHtmlTableAsXlsx);
        console.log("after called download btn")

    }

    if (buttonXLXS) {
        console.log("before called download btn")
        buttonXLXS.addEventListener("click", saveHtmlTableAsXlsx);
        console.log("after called download btn")

    }
});


function saveHtmlTableAsCsv() {
    console.log("Entered save csv")
    const table = document.getElementById("example-table");

    // Extract headers
    const headers = [];
    const headerCells = table.querySelectorAll('[role="columnheader"]');
    headerCells.forEach(cell => {
        headers.push(cell.getAttribute("tabulator-field") || cell.innerText.trim());
    });

    // Extract rows
    const rows = [];
    const rowElements = table.querySelectorAll('[role="row"]');
    rowElements.forEach(row => {
        const rowData = [];
        const cells = row.querySelectorAll('[role="gridcell"]');
        cells.forEach(cell => {
            rowData.push(cell.innerText.trim());
        });
        if (rowData.length > 0) rows.push(rowData);
    });

    // Convert to CSV format
    let csvContent = headers.join(",") + "\n"; // Headers as first row
    rows.forEach(row => {
        csvContent += row.join(",") + "\n";
    });

    // Download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "output.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function saveHtmlTableAsXlsx() {
    const table = document.getElementById("example-table");

    // Extract headers
    const headers = [];
    const headerCells = table.querySelectorAll('[role="columnheader"]');
    headerCells.forEach(cell => {
        headers.push(cell.getAttribute("tabulator-field") || cell.innerText.trim());
    });

    // Extract rows
    const rows = [];
    const rowElements = table.querySelectorAll('[role="row"]');
    rowElements.forEach(row => {
        const rowData = [];
        const cells = row.querySelectorAll('[role="gridcell"]');
        cells.forEach(cell => {
            rowData.push(cell.innerText.trim());
        });
        if (rowData.length > 0) rows.push(rowData);
    });

    // Combine headers and rows into one array
    const data = [headers, ...rows];

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Export the workbook as an .xlsx file
    XLSX.writeFile(workbook, "output.xlsx");
}

// Call the function to save the table data as an .xlsx file
saveHtmlTableAsXlsx();


// Call the function to save the table data as a CSV file
saveHtmlTableAsCsv();




/* document.addEventListener("DOMContentLoaded", function () {
    // Ensure the DOM is fully loaded before adding the event listener
    const button = document.getElementById("downloadButton");
    if (button) {
        console.log("before called download btn")
        button.addEventListener("click", downloadTableAsExcel);
        console.log("after called download btn")

    }
});

function downloadTableAsExcel() {
    const table = document.getElementById("example-table");
    // const worksheet = XLSX.utils.table_to_sheet(table);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // XLSX.writeFile(workbook, "table_data.xlsx");
    const wb = XLSX.utils.table_to_book(table);
    XLSX.writeFile(wb, "results.xlsx");
} */
