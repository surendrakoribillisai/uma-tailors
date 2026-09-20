Uma Tailors - GitHub Pages corrected version

Login behavior:
- Authorized mobile numbers: 7659951392, 6304305587, 8008597539
- Password: 180227
- SHA-256 hash is stored in sai-2007 and embedded in admin.html for static GitHub Pages login.
- Correct credentials hide the login screen and show the dashboard on the same page.
- Wrong credentials remain on the login screen with an error.
- No /api/ or server.js is required for GitHub Pages.

Important: client-side authentication on a public static site is not secure for sensitive production data.
