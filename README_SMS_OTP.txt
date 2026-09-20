UMA TAILORS — REAL SMS OTP ADMIN LOGIN

This version removes the Demo OTP. The server generates a fresh random 6-digit OTP and sends it by SMS through Twilio. The OTP expires after 5 minutes.

AUTHORIZED ADMIN NUMBERS
- 7659951392
- 6304305587
- 8008597539

HOW TO RUN
1. Install Node.js 18 or newer.
2. Create a Twilio account and configure SMS sending for India (+91).
3. Copy .env.example to .env.
4. Fill in TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN.
5. Set TWILIO_MESSAGING_SERVICE_SID OR TWILIO_FROM_NUMBER, depending on your Twilio setup.
6. Set OTP_HASH_SECRET to a long random value.
7. Open a terminal in this folder and run:
   npm install
   npm start
8. Open:
   http://localhost:3000/
9. Open the admin page directly at:
   http://localhost:3000/admin.html

OTP BEHAVIOR
- A new random 6-digit OTP is generated for each successful OTP request.
- OTP expires after 5 minutes.
- A short 15-second resend cooldown helps prevent accidental SMS spam.
- The OTP is NOT returned to the browser and is NOT displayed on the page.
- The OTP is stored only as a hash in server memory.
- Restarting the server invalidates pending OTPs.

IMPORTANT FOR INDIA
SMS delivery in India can require the correct Twilio sender configuration, registered sender/template, and applicable telecom/DLT requirements. Complete the Twilio setup for your account and destination before using this in production.

SECURITY NOTE
This package provides the requested SMS OTP flow, but the existing product/order data is still stored in browser localStorage. For a fully production-grade multi-device admin system, move products/orders/settings to a server database and protect admin sessions server-side.


IMPORTANT — FIXED LOGIN ERROR
Do not double-click admin.html. If opened as a file, the browser cannot call /api/send-otp and will show a fetch error. Run the Node server and open http://localhost:3000/admin.html.

NAVIGATION
The customer website now has highlighted Home, Products, Services, About and Contact navigation. Call and WhatsApp are available in the header and as a fixed contact menu on every section/screen.
