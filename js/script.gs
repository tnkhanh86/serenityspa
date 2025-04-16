function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    console.log('Received data:', data);

    // Get the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Newsletter') || ss.insertSheet('Newsletter');
    
    // If the sheet is empty, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone']);
    }
    
    // Format the timestamp
    const timestamp = new Date().toLocaleString('vi-VN');
    
    // Append the new data
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.phone
    ]);
    
    // Send confirmation email
    const emailSubject = 'Xác nhận đăng ký nhận thông tin ưu đãi';
    const emailBody = `
      Xin chào ${data.name},
      
      Cảm ơn bạn đã đăng ký nhận thông tin ưu đãi từ Serenity Spa!
      
      Chúng tôi sẽ gửi cho bạn những thông tin mới nhất về:
      - Các chương trình ưu đãi đặc biệt
      - Dịch vụ mới
      - Sự kiện sắp diễn ra
      
      Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.
      
      Trân trọng,
      Đội ngũ Serenity Spa
    `;
    
    GmailApp.sendEmail(data.email, emailSubject, emailBody);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('Error:', error);
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Service is running'
  })).setMimeType(ContentService.MimeType.JSON);
}

function createResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendConfirmationEmail(email) {
  const subject = 'Cảm ơn bạn đã đăng ký nhận thông tin ưu đãi từ Serenity Spa';
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #f4a460; text-align: center; margin-bottom: 20px;">Chào mừng bạn đến với Serenity Spa!</h2>
        <p style="color: #333; line-height: 1.6;">Cảm ơn bạn đã đăng ký nhận thông tin ưu đãi từ chúng tôi.</p>
        <p style="color: #333; line-height: 1.6;">Bạn sẽ là người đầu tiên nhận được thông tin về các chương trình khuyến mãi đặc biệt và ưu đãi hấp dẫn.</p>
        
        <div style="background-color: #fff; padding: 20px; margin: 20px 0; border-radius: 5px; border: 1px solid #eee;">
          <h3 style="color: #f4a460; margin-bottom: 15px;">Ưu đãi đặc biệt hiện tại:</h3>
          <ul style="color: #333; line-height: 1.6;">
            <li>Giảm 20% cho tất cả các dịch vụ</li>
            <li>Miễn phí tắm trắng khi đăng ký gói chăm sóc da</li>
            <li>Quà tặng voucher 500.000đ cho lần sử dụng dịch vụ tiếp theo</li>
          </ul>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #333; line-height: 1.6;">Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua:</p>
          <ul style="color: #333; line-height: 1.6;">
            <li>Email: khanhtran.230386@gmail.com</li>
            <li>Điện thoại: 0123 456 789</li>
          </ul>
        </div>

        <p style="margin-top: 30px; font-size: 12px; color: #666; text-align: center;">
          Đây là email tự động, vui lòng không trả lời email này.
        </p>
      </div>
    </div>
  `;

  try {
    GmailApp.sendEmail(
      email,
      subject,
      '',
      {
        htmlBody: htmlBody,
        name: 'Serenity Spa',
        replyTo: 'khanhtran.230386@gmail.com'
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send confirmation email');
  }
} 