const nodemailer = require("nodemailer");
const SITEPATH = "https://xxxxxxxxxxxxx";
function PostMail(p, s) {
  let to = p.mail;
  let subject = `${p.nick}，您在『xxx's Blog』上的评论收到了回复`;
  let html = `
  <div style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;">
    <h2 style="border-bottom:1px solid #dddddd;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;">
      您在<a style="text-decoration:none;color: #12ADDB;" href="${SITEPATH}" target="_blank">xxxx's Blog</a>上的评论有了新的回复
    </h2>
    ${p.nick} 同学，您曾发表评论：
    <div style="padding:0 12px 0 12px;margin-top:18px">
      <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">${p.commentHtml}</div>
      <p><strong>${s.nick}</strong>回复说：</p>
      <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">${s.commentHtml}</div>
      <p>
        您可以点击<a style="text-decoration:none; color:#12addb" href="${SITEPATH}${s.url}" target="_blank">查看回复的完整內容</a>，
        欢迎再次光临<a style="text-decoration:none; color:#12addb" href="${SITEPATH}" target="_blank">xxxx's Blog</a>。<br>
      </p>
    </div>
  </div>`;

  return {
    "to":to,
    "subject":subject,
    "html":html,
  }
}
function PostMailAdmin(s) {
  let to = "AdminEmail@qq.com";
  let subject = `xxxx's Blog 评论提醒`;
  let html = `
  <div style="border-top:2px solid #12addb;box-shadow:0 1px 3px #aaaaaa;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;">
    <h2 style="border-bottom:1px solid #dddddd;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;">
      您在<a style="text-decoration:none;color: #12addb;" href="${SITEPATH}" target="_blank">xxxx's Blog</a>上的文章有了新的评论
    </h2>
    <p><strong>${s.nick}</strong>回复说：</p>
    <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">${s.commentHtml}</div>
    <p>您可以点击<a style="text-decoration:none; color:#12addb" href="${SITEPATH}${s.url}" target="_blank">查看回复的完整內容</a><br></p>
  </div>`;

  return {
    "to":to,
    "subject":subject,
    "html":html,
  }
}
module.exports = async(req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  let data=JSON.parse(req.body)
  let meta;
  if(data.type==1){
    meta=PostMail(data.p, data.s)
  }else if(data.type==2){
    meta=PostMailAdmin(data.s)
  }
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    auth: {
      user: "xxxxxxx@163.com", // generated ethereal user
      pass: "xxxxxxxxxxxxxx", // generated ethereal password
    },
    service:"163xxxx",
  });
  transporter.verify(function (error, success) {
    if (error) throw new Error('SMTP 邮箱配置异常：', error)
    else if (success) console.log('SMTP 邮箱配置正常')
  })
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"MyNamexxxxx" <xxxxxxxxx@163.com>', // sender address
    to: meta.to, // list of receivers
    subject: meta.subject, // Subject line
    html: meta.html, // html body
  });


  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.status(200).send("OK");
};



