Uma Tailors Admin Password System

1. The admin password is stored only as a SHA-256 hash in the file named:
   sai-2007

2. Initial password:
   180227

3. Initial SHA-256 hash in sai-2007:
   19effc30273f29040a6628de0125938ac4c5a4cdd92eeecef43b8df9c2fbea87

4. Authorized admin mobile numbers:
   7659951392
   6304305587
   8008597539

5. To change the password in Admin > Website settings > Change admin password,
   enter the original password, the current hash from sai-2007, the new password,
   and confirm the new password.

6. The server verifies both the original password hash and the supplied hash code,
   then replaces sai-2007 with the SHA-256 hash of the new password.

Important:
- The browser does not contain the password or the stored hash.
- This requires the Node/Express server (server.js). Do not open admin.html directly as a file.
- A normal server filesystem is used for sai-2007. Hosting platforms with ephemeral filesystems
  may reset this file after a redeploy/restart. For permanent production password storage,
  use a database or persistent disk.
