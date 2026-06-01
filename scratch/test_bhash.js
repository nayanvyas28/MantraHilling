const phone = "7974899898";
const generatedOtp = "123456";
const param1 = generatedOtp;
const param2 = "OTP";
const url = `https://bhashsms.com/api/sendmsg.php?user=MisCRM&pass=123456&sender=MisCRM&phone=${phone}&text=service_rejected_hindi&priority=wa&stype=normal&Params=${encodeURIComponent(param1)},${encodeURIComponent(param2)}`;

console.log("Requesting URL:", url);
fetch(url)
  .then(res => res.text())
  .then(text => {
    console.log("BhashSMS Response:", text);
  })
  .catch(err => {
    console.error("Error:", err);
  });
