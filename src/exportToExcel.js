import * as XLSX from "xlsx";
import * as path from "path";


export const exportToExcel = (data)=>{
    const columNames=[
        "Ad_Soyad",
        "Şirket",
        "Sektör",
        "Email",
        "Detay"
    ];
    const workSheetName = `talepler_${new Date().toISOString().slice(0, 10)}`;
    const filePath = `talepler_${new Date().toISOString().slice(0, 10)}.xlsx`;


    const reportData = data.map(record=>{
        return [record.fullName,record.company,record.industry,record.email,record.detail]
    });

    const workbook = XLSX.utils.book_new();
    const workSheetData = [
        columNames,
        ...reportData
    ]

    const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
    XLSX.utils.book_append_sheet(workbook,workSheet,workSheetName);
    XLSX.writeFile(workbook,path.resolve(filePath));
    return true;
}