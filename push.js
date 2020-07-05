const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BM92JFTVsZo86xsk5xwA4g5UsRerrwIgdMjaM9fo-0bIIye2A-bc83D93wac03s7AehnIoeMP2J4ilz8XiDRUfo",
   "privateKey": "VJFNK392JEgUlqGa81VeypCZqEBJiiTAOycte9DXZ8U"
};
 
 
webPush.setVapidDetails(
   'mailto:muhirfaul@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cIfsvMORKb0:APA91bGVAZ_Zi43Sl9VcYFMLCId8qVqHXSJJ8m3_xgahn82QqmQ79bbMhFjsizPnXFp_zM3kGeJerTCIeGlWVvZION8f4ANiC7diCPDmilGCsYunLHNby0ods7HUOrW6wIxFHci_2T7k",
   "keys": {
       "p256dh": "BB3Y5sIwJK0cdnBUoHgMfhNExucP3NbwHtiNaU+lJD6h0CDF3Tr1qNLgxQhmMqsPFGFpqRXieeQYLizgsRnfYVU=",
       "auth": "1K4MQz0ZK1s1Rf6Uedm0Rg=="
   }
};
const payload = 'EPL Today ! Enjoy & Update Match Result, Fixtures & Data English Premier League';
 
const options = {
   gcmAPIKey: '131765605896',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);