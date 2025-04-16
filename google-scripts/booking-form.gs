function doPost(e) {
  try {
    // Lấy dữ liệu từ request
    const data = JSON.parse(e.postData.contents);
    
    // Mở Google Sheet
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Thêm dữ liệu vào sheet
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.service,
      data.date,
      data.time,
      data.message
    ]);
    
    // Trả về response thành công
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Trả về response lỗi
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
} 