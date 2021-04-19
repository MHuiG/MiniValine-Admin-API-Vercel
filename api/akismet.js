import { AkismetClient } from 'akismet-api'
module.exports = async(req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  let data=JSON.parse(req.body)
  const key = 'xxxxxxxxxxxx'
  const blog = 'https://xxxxxxxxxx'
  const client = new AkismetClient({ key, blog })

  if (data.type=="checkSpam") {
    const isSpam = await client.checkSpam(data.comment)
    res.status(200).send(isSpam);
  }else if (data.type=="submitSpam") {
    await client.submitSpam(data.comment)
    res.status(200).send("OK");
  }else if (data.type=="submitHam") {
    await client.submitHam(data.comment)
    res.status(200).send("OK");
  }
};



