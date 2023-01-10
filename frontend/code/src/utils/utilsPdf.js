import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import utilsReport from "./utilsReport";

async function createPdf({doc, elements}){
    let top = 20;
    const padding = 10;
    let i = 1;

    const iterator = elements.values();
    for(let el = null; el = iterator.next().value;){
        const imgData = await htmlToImage.toPng(el);
        let elHeight = el.offsetHeight;
        let elWidth = el.offsetWidth;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        if(elWidth > pageWidth){
            const ratio = pageWidth / elWidth;
            //resize chart dimensions
            elHeight = elHeight * ratio - padding;
            elWidth = elWidth * ratio - padding;
        }
        //add another page if the element does not fit the page
        if(top + elHeight > pageHeight){
            doc.addPage();
            top = 20;
        }
        doc.addImage(imgData, "PNG", 10, top, elWidth, elHeight, `image${i}`);
        top += elHeight;
        i++;
    }
}

export async function exportToPDF(text) {
    const doc = new jsPDF("p", "px");
    let day = new Date();
    let elements = utilsReport.elements;
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    doc.text(20, 20, text + '   ' + day.toLocaleDateString('en-US', options));
    //console.log(elements[0])
    await createPdf({doc, elements});

    doc.save(text);
}